import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildWeeklyTasks, getPhase, getPlanProgressLabel, getWeeklyPlan,
  planWindow, reconcileStoredWeeks, reconcileWeeklyPlan,
} from './weeklyPlan.js'

test('the six-week restart runs from August 31 through October 11', () => {
  const dates = ['2026-08-31', '2026-09-07', '2026-09-14', '2026-09-21', '2026-09-28', '2026-10-05']
  const firstTasks = ['setup-repo', 'input-movement', 'health-damage', 'game-flow', 'game-feel', 'fix-top5']
  dates.forEach((date, index) => {
    assert.equal(getPlanProgressLabel(date), `第 ${index + 1} / 6 周`)
    assert.equal(buildWeeklyTasks(date)[0].id, firstTasks[index])
    assert.equal(buildWeeklyTasks(date).length, 4)
  })
  assert.equal(planWindow.start, dates[0])
  assert.equal(planWindow.end, '2026-10-11')
  assert.equal(planWindow.nextUpdate, '2026-09-28')
  assert.equal(buildWeeklyTasks(dates[0]).reduce((sum, item) => sum + item.minutes, 0), 435)
})

test('dates outside the task window do not generate extra catch-up tasks', () => {
  assert.equal(getWeeklyPlan('2026-08-24'), null)
  assert.deepEqual(buildWeeklyTasks('2026-08-24'), [])
  assert.deepEqual(buildWeeklyTasks('2026-10-12'), [])
  assert.equal(getPlanProgressLabel('2026-08-24'), '计划开始前')
  assert.equal(getPlanProgressLabel('2026-10-12'), '等待月度更新')
  assert.equal(getPhase('2026-08-30').id, 'explore')
  assert.equal(getPhase('2026-09-13').id, 'explore')
  assert.equal(getPhase('2026-09-14').id, 'unity')
})

test('a fresh week begins uncompleted with the current revision', () => {
  const week = reconcileWeeklyPlan('2026-08-31')
  assert.equal(week.planRevision, planWindow.revision)
  assert.equal(week.tasks.length, 4)
  assert.ok(week.tasks.every((item) => item.generated && !item.completed))
})

test('cached week two is replaced by week one while custom work and old evidence survive', () => {
  const oldTask = { id: 'input-movement', generated: true, completed: true, title: '旧移动任务' }
  const custom = { id: 'my-task', completed: true, title: '自定义作业', generated: false }
  const saved = { tasks: [oldTask, custom], note: '保留额外字段' }
  const before = JSON.stringify(saved)
  const week = reconcileWeeklyPlan('2026-08-31', saved)

  assert.equal(JSON.stringify(saved), before)
  assert.equal(week.tasks[0].id, 'setup-repo')
  assert.equal(week.tasks.length, 5)
  assert.ok(week.tasks.filter((item) => item.generated).every((item) => !item.completed))
  assert.equal(week.tasks.at(-1), custom)
  assert.equal(week.note, saved.note)
  assert.deepEqual(week.planHistory, [{ revision: 'legacy', tasks: [oldTask] }])
})

test('matching task IDs retain completion but receive refreshed instructions', () => {
  const saved = { tasks: [{ id: 'setup-repo', title: '旧说明', completed: true, generated: true }] }
  const week = reconcileWeeklyPlan('2026-08-31', saved)
  assert.equal(week.tasks[0].completed, true)
  assert.notEqual(week.tasks[0].title, '旧说明')
  assert.ok(week.tasks[0].resources.length > 0)
  assert.deepEqual(week.planHistory, [])
})

test('reloads are idempotent and never re-add deleted custom tasks or duplicate history', () => {
  const oldTask = { id: 'input-movement', generated: true, completed: false }
  const first = reconcileWeeklyPlan('2026-08-31', { tasks: [oldTask] })
  first.tasks[0].completed = true
  assert.equal(reconcileWeeklyPlan('2026-08-31', first), first)
  assert.equal(first.planHistory.length, 1)
})

test('all cached or imported weeks migrate without moving historic records', () => {
  const history = { tasks: [{ id: 'setup-repo', generated: true, completed: true }] }
  const weeks = {
    '2026-08-24': history,
    '2026-08-31': { tasks: [{ id: 'input-movement', generated: true, completed: false }] },
    '2026-09-07': { tasks: [{ id: 'health-damage', generated: true, completed: true }] },
    '2026-10-05': { tasks: [] },
  }
  const before = JSON.stringify(weeks)
  const updated = reconcileStoredWeeks(weeks)
  assert.equal(JSON.stringify(weeks), before)
  assert.equal(updated['2026-08-24'], history)
  assert.equal(updated['2026-08-31'].tasks[0].id, 'setup-repo')
  assert.equal(updated['2026-08-31'].tasks[0].completed, false)
  assert.equal(updated['2026-09-07'].tasks[0].id, 'input-movement')
  assert.equal(updated['2026-10-05'].tasks[0].id, 'fix-top5')
  assert.equal(reconcileStoredWeeks(updated), updated)
  assert.deepEqual(reconcileStoredWeeks(), {})
})
