import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildWeeklyTasks, getPhase, getPlanProgressLabel, getWeeklyPlan,
  planWindow, reconcileStoredWeeks, reconcileWeeklyPlan,
} from './weeklyPlan.js'
import { learningStrategy } from './roadmap.js'

test('the restarted task window begins next Monday with four full 24-hour weeks', () => {
  const dates = ['2026-10-19', '2026-10-26', '2026-11-02', '2026-11-09']
  const firstTasks = ['math-limits', 'math-continuity', 'math-derivative', 'math-app-review']
  dates.forEach((date, index) => {
    assert.equal(getPlanProgressLabel(date), `第 ${index + 1} / 4 周`)
    assert.equal(buildWeeklyTasks(date)[0].id, firstTasks[index])
    assert.equal(buildWeeklyTasks(date).length, 6)
    assert.equal(buildWeeklyTasks(date).reduce((sum, item) => sum + item.minutes, 0), 1440)
  })
  assert.equal(planWindow.start, dates[0])
  assert.equal(planWindow.end, '2026-11-15')
  assert.equal(planWindow.nextUpdate, '2026-11-15')
  assert.deepEqual(buildWeeklyTasks('2026-10-19').map((item) => item.minutes), [480, 300, 120, 240, 240, 60])
  assert.deepEqual(buildWeeklyTasks('2026-10-12'), [])
})

test('AI application work is folded into existing project hours on alternating weeks', () => {
  const firstWeek = buildWeeklyTasks('2026-10-19')
  const secondWeek = buildWeeklyTasks('2026-10-26')
  const thirdWeek = buildWeeklyTasks('2026-11-02')
  for (const tasks of [firstWeek, secondWeek, thirdWeek]) {
    assert.equal(tasks.reduce((sum, item) => sum + item.minutes, 0), 1440)
    assert.equal(tasks.filter((item) => item.category === 'backend').length, 1)
    assert.equal(tasks.find((item) => item.category === 'backend').minutes, 240)
  }
  assert.match(firstWeek.find((item) => item.category === 'backend').title, /首次模型 API/)
  assert.match(secondWeek.find((item) => item.category === 'backend').title, /AI 辅助测试/)
  assert.match(thirdWeek.find((item) => item.category === 'backend').title, /第二次模型 API/)
  assert.match(firstWeek.find((item) => item.category === 'backend').deliverable, /仓库不含密钥/)
})

test('every English task links directly to the selected postgraduate vocabulary trainer', () => {
  for (const weekId of ['2026-10-19', '2026-10-26', '2026-11-02', '2026-11-09']) {
    const englishTask = buildWeeklyTasks(weekId).find((item) => item.id.startsWith('english-reading-'))
    assert.equal(englishTask.resources.length, 1)
    assert.equal(englishTask.resources[0].url, 'https://qwerty.kaiyi.cool/gallery')
    assert.match(englishTask.resources[0].title, /英语二单词书/)
  }
})

test('the current plan uses the 22408 exam baseline', () => {
  const text = [learningStrategy.examRule, planWindow.label].join('\n')
  for (const keyword of ['204 英语二', '302 数学二', '408', '22408']) assert.match(text, new RegExp(keyword))
  assert.doesNotMatch(text, /数学一|英语一/)
})

test('dates outside the task window do not invent catch-up tasks', () => {
  assert.equal(getWeeklyPlan('2026-10-12'), null)
  assert.deepEqual(buildWeeklyTasks('2026-10-12'), [])
  assert.deepEqual(buildWeeklyTasks('2026-11-16'), [])
  assert.equal(getPlanProgressLabel('2026-10-12'), '计划开始前')
  assert.equal(getPlanProgressLabel('2026-11-16'), '等待月度更新')
  assert.equal(getPhase('2026-10-18').id, 'common-foundation')
  assert.equal(getPhase('2026-10-19').id, 'common-foundation')
  assert.equal(getPhase('2026-12-01').id, 'database-foundation')
})

test('a fresh week begins uncompleted with the current revision', () => {
  const week = reconcileWeeklyPlan('2026-10-19')
  assert.equal(week.planRevision, planWindow.revision)
  assert.equal(week.tasks.length, 6)
  assert.ok(week.tasks.every((item) => item.generated && !item.completed))
})

test('old generated work is archived while custom work and records survive', () => {
  const oldTask = { id: 'game-flow', generated: true, completed: true, title: '旧游戏任务' }
  const custom = { id: 'my-task', completed: true, title: '自定义作业', generated: false }
  const saved = { tasks: [oldTask, custom], note: '保留额外字段' }
  const before = JSON.stringify(saved)
  const week = reconcileWeeklyPlan('2026-10-19', saved)

  assert.equal(JSON.stringify(saved), before)
  assert.equal(week.tasks[0].id, 'math-limits')
  assert.equal(week.tasks.length, 7)
  assert.ok(week.tasks.filter((item) => item.generated).every((item) => !item.completed))
  assert.equal(week.tasks.at(-1), custom)
  assert.equal(week.note, saved.note)
  assert.deepEqual(week.planHistory, [{ revision: 'legacy', tasks: [oldTask] }])
})

test('matching task IDs retain completion but receive refreshed instructions', () => {
  const saved = { tasks: [{ id: 'math-limits', title: '旧说明', completed: true, generated: true }] }
  const week = reconcileWeeklyPlan('2026-10-19', saved)
  assert.equal(week.tasks[0].completed, true)
  assert.notEqual(week.tasks[0].title, '旧说明')
  assert.ok(week.tasks[0].resources.length > 0)
  assert.deepEqual(week.planHistory, [])
})

test('reloads are idempotent and do not duplicate archived history', () => {
  const oldTask = { id: 'game-flow', generated: true, completed: false }
  const first = reconcileWeeklyPlan('2026-10-19', { tasks: [oldTask] })
  first.tasks[0].completed = true
  assert.equal(reconcileWeeklyPlan('2026-10-19', first), first)
  assert.equal(first.planHistory.length, 1)
})

test('retired plan weeks leave no catch-up work while preserving custom tasks and history', () => {
  const generated = { id: 'old-week-3', generated: true, completed: false }
  const custom = { id: 'personal', generated: false, completed: true }
  const saved = { planRevision: 'previous-plan', tasks: [generated, custom], note: 'keep me' }
  const updated = reconcileWeeklyPlan('2026-10-12', saved)
  assert.deepEqual(updated.tasks, [custom])
  assert.equal(updated.note, 'keep me')
  assert.equal(updated.planHistory.at(-1).tasks[0], generated)
  assert.equal(reconcileWeeklyPlan('2026-10-12', updated), updated)
})

test('all cached weeks migrate without moving unrelated historic records', () => {
  const history = { tasks: [{ id: 'setup-repo', generated: true, completed: true }] }
  const weeks = {
    '2026-10-12': history,
    '2026-10-19': { tasks: [{ id: 'game-flow', generated: true, completed: false }] },
    '2026-10-26': { tasks: [{ id: 'game-feel', generated: true, completed: true }] },
    '2026-11-09': { tasks: [] },
  }
  const before = JSON.stringify(weeks)
  const updated = reconcileStoredWeeks(weeks)
  assert.equal(JSON.stringify(weeks), before)
  assert.notEqual(updated['2026-10-12'], history)
  assert.deepEqual(updated['2026-10-12'].tasks, [])
  assert.equal(updated['2026-10-12'].planHistory[0].tasks[0].id, 'setup-repo')
  assert.equal(updated['2026-10-19'].tasks[0].id, 'math-limits')
  assert.equal(updated['2026-10-26'].tasks[0].id, 'math-continuity')
  assert.equal(updated['2026-11-09'].tasks[0].id, 'math-app-review')
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
  const updated = reconcileWeeklyPlan('2026-10-19', saved)
  assert.notEqual(planWindow.revision, saved.planRevision)
  assert.match(updated.tasks[0].title, /极限概念与运算/)
  assert.match(updated.tasks[0].resources[0].url, /bilibili/)
  assert.equal(updated.tasks.at(-1), saved.tasks.at(-1))
  assert.equal(updated.planHistory.length, 2)
  assert.equal(updated.planHistory[0], history[0])
  assert.equal(updated.planHistory[1].tasks[0].id, 'game-flow')
  assert.equal(reconcileWeeklyPlan('2026-10-19', updated), updated)
})
