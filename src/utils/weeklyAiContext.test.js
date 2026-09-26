import assert from 'node:assert/strict'
import test from 'node:test'
import { buildWeeklyAiContext, copyText } from './weeklyAiContext.js'

const store = {
  days: {
    '2026-09-28': { note: 'PRIVATE_TODAY_NOTE', checkedIn: true, focusMinutes: 25 },
    '2026-10-04': { note: 'PRIVATE_SUNDAY_NOTE', checkedIn: false, focusMinutes: 45 },
    '2026-10-05': { note: 'OTHER_WEEK_NOTE', checkedIn: true, focusMinutes: 999 },
  },
  weeks: {
    '2026-09-28': {
      planRevision: 'older-plan',
      tasks: [
        { id: 'game-feel', generated: true, title: 'STALE_TASK', completed: true },
        { id: 'custom', generated: false, title: 'CUSTOM_CURRENT_WEEK', completed: true, priority: 'custom' },
      ],
      planHistory: [{ tasks: [{ title: 'PRIVATE_OLD_HISTORY' }] }],
    },
    '2026-10-05': { tasks: [{ id: 'other', title: 'OTHER_WEEK_TASK', generated: false }] },
  },
  reviews: [
    { weekId: '2026-09-28', wins: 'PRIVATE_REVIEW_WIN', blockers: 'PRIVATE_REVIEW_BLOCKER', learning: 'PRIVATE_REVIEW_LEARNING', nextFocus: 'PRIVATE_REVIEW_NEXT', routeChange: 'PRIVATE_REVIEW_ROUTE', other: 'UNKNOWN_PRIVATE_FIELD' },
    { weekId: '2026-10-05', wins: 'OTHER_WEEK_REVIEW' },
  ],
  experimentData: { math: { notes: 'PRIVATE_DIAGNOSTIC' } },
}

test('default export contains current exam instructions, links, completion and selected-week counts', () => {
  const text = buildWeeklyAiContext({ dateKey: '2026-09-30', store })
  assert.match(text, /所选周：2026-09-28 — 2026-10-04/)
  assert.match(text, /当前查看日期：2026-09-30/)
  assert.match(text, /\[ \] 数学 8h：极限概念与运算/)
  assert.match(text, /CUSTOM_CURRENT_WEEK/)
  assert.match(text, /非选做任务（含基础\/自定义）：1\/7/)
  assert.match(text, /本周打卡：1\/7 天；已记录专注：70 分钟/)
  assert.match(text, /执行步骤：/)
  assert.match(text, /验收标准：/)
  assert.match(text, /bilibili\.com\/video\/BV1mr4y1K7Lb/)
  assert.match(text, /dev\.java\/learn/)
  assert.doesNotMatch(text, /PRIVATE_|OTHER_WEEK|STALE_TASK|UNKNOWN_PRIVATE_FIELD/)
})

test('notes are opt-in and scoped to the selected week including Sunday', () => {
  const text = buildWeeklyAiContext({ dateKey: '2026-10-04', store, includeNotes: true })
  for (const marker of ['PRIVATE_TODAY_NOTE', 'PRIVATE_SUNDAY_NOTE', 'PRIVATE_REVIEW_WIN', 'PRIVATE_REVIEW_BLOCKER', 'PRIVATE_REVIEW_LEARNING', 'PRIVATE_REVIEW_NEXT', 'PRIVATE_REVIEW_ROUTE']) assert.ok(text.includes(marker))
  assert.doesNotMatch(text, /OTHER_WEEK|PRIVATE_DIAGNOSTIC|PRIVATE_OLD_HISTORY|UNKNOWN_PRIVATE_FIELD/)
})

test('another selected week never exports the previous week data', () => {
  const text = buildWeeklyAiContext({ dateKey: '2026-10-05', store, includeNotes: true })
  assert.match(text, /所选周：2026-10-05 — 2026-10-11/)
  assert.match(text, /OTHER_WEEK_NOTE/)
  assert.match(text, /OTHER_WEEK_TASK/)
  assert.match(text, /OTHER_WEEK_REVIEW/)
  assert.doesNotMatch(text, /PRIVATE_|CUSTOM_CURRENT_WEEK|函数、数列极限/)
})

test('the export carries both exam and Java employment constraints', () => {
  const text = buildWeeklyAiContext({ dateKey: '2026-09-28' })
  for (const keyword of ['2027 年底初试', '数学一', '英语一', '408', '政治', '24 小时', 'Java 后端', '项目', '闭卷小测', '延迟重做', '官方页面']) assert.ok(text.includes(keyword), keyword)
})

test('out-of-window dates stay empty instead of inventing a plan', () => {
  for (const dateKey of ['2026-09-14', '2026-10-26']) {
    const text = buildWeeklyAiContext({ dateKey })
    assert.match(text, /本周没有任务/)
    assert.match(text, /本周详细计划尚未更新/)
    assert.doesNotMatch(text, /### 1\./)
  }
})

test('out-of-window custom tasks remain available without planned work', () => {
  const text = buildWeeklyAiContext({ dateKey: '2026-10-26', store: { weeks: { '2026-10-26': { tasks: [{ title: 'CUSTOM_ONLY', priority: 'custom' }] } } } })
  assert.match(text, /CUSTOM_ONLY/)
  assert.match(text, /本周详细计划尚未更新/)
  assert.match(text, /0\/1；选做：0\/0/)
})

test('empty notes are explicit and generation never mutates stored data', () => {
  const before = JSON.stringify(store)
  buildWeeklyAiContext({ dateKey: '2026-09-28', store, includeNotes: true })
  assert.equal(JSON.stringify(store), before)
  const text = buildWeeklyAiContext({ dateKey: '2026-10-19', includeNotes: true })
  assert.match(text, /本周没有已保存的每日笔记/)
  assert.match(text, /本周没有已保存的周复盘/)
})

test('copy succeeds only after the exact preview text was written', async () => {
  const text = buildWeeklyAiContext({ dateKey: '2026-09-28', store })
  const writes = []
  assert.equal(await copyText(text, { async writeText(value) { writes.push(value) } }), true)
  assert.deepEqual(writes, [text])
})

test('unavailable or rejected clipboard requests safely request manual copying', async () => {
  assert.equal(await copyText('preview', null), false)
  assert.equal(await copyText('preview', {}), false)
  assert.equal(await copyText('preview', { async writeText() { throw new Error('NotAllowedError') } }), false)
})
