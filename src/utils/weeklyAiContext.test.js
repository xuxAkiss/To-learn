import assert from 'node:assert/strict'
import test from 'node:test'
import { buildWeeklyAiContext, copyText } from './weeklyAiContext.js'

const store = {
  days: {
    '2026-08-31': { note: 'PRIVATE_TODAY_NOTE', checkedIn: true, focusMinutes: 25 },
    '2026-09-06': { note: 'PRIVATE_SUNDAY_NOTE', checkedIn: false, focusMinutes: 45 },
    '2026-09-07': { note: 'OTHER_WEEK_NOTE', checkedIn: true, focusMinutes: 999 },
  },
  weeks: {
    '2026-08-31': {
      planRevision: 'restart-2026-08-31',
      tasks: [
        { id: 'setup-repo', generated: true, title: 'STALE_TASK', completed: true },
        { id: 'custom', generated: false, title: 'CUSTOM_CURRENT_WEEK', completed: true, priority: 'custom' },
      ],
      planHistory: [{ tasks: [{ title: 'PRIVATE_OLD_HISTORY' }] }],
    },
    '2026-09-07': { tasks: [{ id: 'other', title: 'OTHER_WEEK_TASK', generated: false }] },
  },
  reviews: [
    { weekId: '2026-08-31', wins: 'PRIVATE_REVIEW_WIN', blockers: 'PRIVATE_REVIEW_BLOCKER', learning: 'PRIVATE_REVIEW_LEARNING', nextFocus: 'PRIVATE_REVIEW_NEXT', routeChange: 'PRIVATE_REVIEW_ROUTE', other: 'UNKNOWN_PRIVATE_FIELD' },
    { weekId: '2026-09-07', wins: 'OTHER_WEEK_REVIEW' },
  ],
  experimentData: { game: { notes: 'PRIVATE_EXPERIMENT' } },
}

test('default export contains current instructions, links, completion and only selected-week counts', () => {
  const text = buildWeeklyAiContext({ dateKey: '2026-09-02', store })
  assert.match(text, /所选周：2026-08-31 — 2026-09-06/)
  assert.match(text, /当前查看日期：2026-09-02/)
  assert.match(text, /\[x\] 安装 Unity 并建立独立游戏仓库/)
  assert.match(text, /CUSTOM_CURRENT_WEEK/)
  assert.match(text, /非选做任务（含基础\/自定义）：2\/5/)
  assert.match(text, /本周打卡：1\/7 天；已记录专注：70 分钟/)
  assert.match(text, /执行步骤：/)
  assert.match(text, /验收标准：/)
  assert.match(text, /https:\/\/learn.unity.com\/pathway\/unity-essentials/)
  assert.doesNotMatch(text, /PRIVATE_|OTHER_WEEK|STALE_TASK|UNKNOWN_PRIVATE_FIELD/)
})

test('notes are explicitly opt-in and scoped to the whole selected week including Sunday', () => {
  const text = buildWeeklyAiContext({ dateKey: '2026-09-06', store, includeNotes: true })
  for (const marker of ['PRIVATE_TODAY_NOTE', 'PRIVATE_SUNDAY_NOTE', 'PRIVATE_REVIEW_WIN', 'PRIVATE_REVIEW_BLOCKER', 'PRIVATE_REVIEW_LEARNING', 'PRIVATE_REVIEW_NEXT', 'PRIVATE_REVIEW_ROUTE']) assert.ok(text.includes(marker))
  assert.doesNotMatch(text, /OTHER_WEEK|PRIVATE_EXPERIMENT|PRIVATE_OLD_HISTORY|UNKNOWN_PRIVATE_FIELD/)
})

test('another selected week never exports the previous week data', () => {
  const text = buildWeeklyAiContext({ dateKey: '2026-09-07', store, includeNotes: true })
  assert.match(text, /所选周：2026-09-07 — 2026-09-13/)
  assert.match(text, /OTHER_WEEK_NOTE/)
  assert.match(text, /OTHER_WEEK_TASK/)
  assert.match(text, /OTHER_WEEK_REVIEW/)
  assert.doesNotMatch(text, /PRIVATE_|CUSTOM_CURRENT_WEEK|安装 Unity 并建立独立游戏仓库/)
})

test('optional tasks are clearly separated from required work', () => {
  const text = buildWeeklyAiContext({ dateKey: '2026-09-14' })
  assert.match(text, /非选做任务（含基础\/自定义）：0\/3；选做：0\/1/)
  assert.match(text, /类型：选做；预计 120 分钟/)
})

test('out-of-window dates stay empty instead of inventing a plan', () => {
  for (const dateKey of ['2026-08-24', '2026-10-12']) {
    const text = buildWeeklyAiContext({ dateKey })
    assert.match(text, /本周没有任务/)
    assert.match(text, /本周详细计划尚未更新/)
    assert.doesNotMatch(text, /### 1\./)
  }
})

test('out-of-window custom tasks remain available without generating new planned work', () => {
  const text = buildWeeklyAiContext({ dateKey: '2026-10-12', store: { weeks: { '2026-10-12': { tasks: [{ title: 'CUSTOM_ONLY', priority: 'custom' }] } } } })
  assert.match(text, /CUSTOM_ONLY/)
  assert.match(text, /本周详细计划尚未更新/)
  assert.match(text, /0\/1；选做：0\/0/)
})

test('export includes overall career options and conditional engine progression', () => {
  const text = buildWeeklyAiContext({ dateKey: '2026-08-31' })
  for (const keyword of ['实习', 'GPA', '英语', '算法', '计算机系统', '后端/AI 应用', '科研', '考公', 'Unity 不是 UE 的必修前置', '比赛选做', '独立修改', '30–60 分钟']) assert.ok(text.includes(keyword), keyword)
})

test('empty notes are explicit and generation never mutates stored data', () => {
  const before = JSON.stringify(store)
  buildWeeklyAiContext({ dateKey: '2026-08-31', store, includeNotes: true })
  assert.equal(JSON.stringify(store), before)
  const text = buildWeeklyAiContext({ dateKey: '2026-09-21', includeNotes: true })
  assert.match(text, /本周没有已保存的每日笔记/)
  assert.match(text, /本周没有已保存的周复盘/)
})

test('copy succeeds only after the exact preview text was written', async () => {
  const text = buildWeeklyAiContext({ dateKey: '2026-08-31', store })
  const writes = []
  assert.equal(await copyText(text, { async writeText(value) { writes.push(value) } }), true)
  assert.deepEqual(writes, [text])
})

test('unavailable or rejected clipboard requests safely request manual copying', async () => {
  assert.equal(await copyText('preview', null), false)
  assert.equal(await copyText('preview', {}), false)
  assert.equal(await copyText('preview', { async writeText() { throw new Error('NotAllowedError') } }), false)
})
