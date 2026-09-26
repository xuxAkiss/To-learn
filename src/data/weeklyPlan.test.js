import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildWeeklyTasks, getPhase, getPlanProgressLabel, getWeeklyPlan,
  planWindow, reconcileStoredWeeks, reconcileWeeklyPlan,
} from './weeklyPlan.js'

test('the dual-track task window covers setup weekend and four full 24-hour weeks', () => {
  const dates = ['2026-09-21', '2026-09-28', '2026-10-05', '2026-10-12', '2026-10-19']
  const firstTasks = ['dual-route-switch', 'math-limits', 'math-continuity', 'math-derivative', 'math-app-review']
  dates.forEach((date, index) => {
    assert.equal(getPlanProgressLabel(date), `第 ${index + 1} / 5 周`)
    assert.equal(buildWeeklyTasks(date)[0].id, firstTasks[index])
    assert.equal(buildWeeklyTasks(date).length, index === 0 ? 5 : 6)
  })
  assert.equal(planWindow.start, dates[0])
  assert.equal(planWindow.end, '2026-10-25')
  assert.equal(planWindow.nextUpdate, '2026-10-25')
  assert.equal(buildWeeklyTasks('2026-09-21').reduce((sum, item) => sum + item.minutes, 0), 240)
  assert.equal(buildWeeklyTasks('2026-09-28').reduce((sum, item) => sum + item.minutes, 0), 1440)
  assert.deepEqual(buildWeeklyTasks('2026-09-28').map((item) => item.minutes), [480, 300, 120, 240, 240, 60])
})

test('dates outside the task window do not invent catch-up tasks', () => {
  assert.equal(getWeeklyPlan('2026-09-14'), null)
  assert.deepEqual(buildWeeklyTasks('2026-09-14'), [])
  assert.deepEqual(buildWeeklyTasks('2026-10-26'), [])
  assert.equal(getPlanProgressLabel('2026-09-14'), '计划开始前')
  assert.equal(getPlanProgressLabel('2026-10-26'), '等待月度更新')
  assert.equal(getPhase('2026-09-20').id, 'common-foundation')
  assert.equal(getPhase('2026-10-25').id, 'common-foundation')
  assert.equal(getPhase('2026-12-01').id, 'database-foundation')
})

test('a fresh week begins uncompleted with the current revision', () => {
  const week = reconcileWeeklyPlan('2026-09-28')
  assert.equal(week.planRevision, planWindow.revision)
  assert.equal(week.tasks.length, 6)
  assert.ok(week.tasks.every((item) => item.generated && !item.completed))
})

test('old generated work is archived while custom work and records survive', () => {
  const oldTask = { id: 'game-flow', generated: true, completed: true, title: '旧游戏任务' }
  const custom = { id: 'my-task', completed: true, title: '自定义作业', generated: false }
  const saved = { tasks: [oldTask, custom], note: '保留额外字段' }
  const before = JSON.stringify(saved)
  const week = reconcileWeeklyPlan('2026-09-21', saved)

  assert.equal(JSON.stringify(saved), before)
  assert.equal(week.tasks[0].id, 'dual-route-switch')
  assert.equal(week.tasks.length, 6)
  assert.ok(week.tasks.filter((item) => item.generated).every((item) => !item.completed))
  assert.equal(week.tasks.at(-1), custom)
  assert.equal(week.note, saved.note)
  assert.deepEqual(week.planHistory, [{ revision: 'legacy', tasks: [oldTask] }])
})

test('matching task IDs retain completion but receive refreshed instructions', () => {
  const saved = { tasks: [{ id: 'math-limits', title: '旧说明', completed: true, generated: true }] }
  const week = reconcileWeeklyPlan('2026-09-28', saved)
  assert.equal(week.tasks[0].completed, true)
  assert.notEqual(week.tasks[0].title, '旧说明')
  assert.ok(week.tasks[0].resources.length > 0)
  assert.deepEqual(week.planHistory, [])
})

test('reloads are idempotent and do not duplicate archived history', () => {
  const oldTask = { id: 'game-flow', generated: true, completed: false }
  const first = reconcileWeeklyPlan('2026-09-21', { tasks: [oldTask] })
  first.tasks[0].completed = true
  assert.equal(reconcileWeeklyPlan('2026-09-21', first), first)
  assert.equal(first.planHistory.length, 1)
})

test('all cached weeks migrate without moving unrelated historic records', () => {
  const history = { tasks: [{ id: 'setup-repo', generated: true, completed: true }] }
  const weeks = {
    '2026-09-14': history,
    '2026-09-21': { tasks: [{ id: 'game-flow', generated: true, completed: false }] },
    '2026-09-28': { tasks: [{ id: 'game-feel', generated: true, completed: true }] },
    '2026-10-19': { tasks: [] },
  }
  const before = JSON.stringify(weeks)
  const updated = reconcileStoredWeeks(weeks)
  assert.equal(JSON.stringify(weeks), before)
  assert.equal(updated['2026-09-14'], history)
  assert.equal(updated['2026-09-21'].tasks[0].id, 'dual-route-switch')
  assert.equal(updated['2026-09-28'].tasks[0].id, 'math-limits')
  assert.equal(updated['2026-10-19'].tasks[0].id, 'math-app-review')
  assert.equal(reconcileStoredWeeks(updated), updated)
  assert.deepEqual(reconcileStoredWeeks(), {})
})

test('previous site revision refreshes content without losing custom work', () => {
  const history = [{ revision: 'legacy', tasks: [{ id: 'archived', completed: true }] }]
  const saved = {
    planRevision: 'unity-first-ai-context-2026-08-31',
    tasks: [
      { id: 'game-flow', title: '旧游戏任务', completed: true, generated: true },
      { id: 'custom', title: '自己的任务', completed: true, generated: false },
    ],
    planHistory: history,
  }
  const updated = reconcileWeeklyPlan('2026-09-21', saved)
  assert.notEqual(planWindow.revision, saved.planRevision)
  assert.match(updated.tasks[0].title, /考研与就业双目标/)
  assert.match(updated.tasks[0].resources[0].url, /fudan/)
  assert.equal(updated.tasks.at(-1), saved.tasks.at(-1))
  assert.equal(updated.planHistory.length, 2)
  assert.equal(updated.planHistory[0], history[0])
  assert.equal(updated.planHistory[1].tasks[0].id, 'game-flow')
  assert.equal(reconcileWeeklyPlan('2026-09-21', updated), updated)
})
