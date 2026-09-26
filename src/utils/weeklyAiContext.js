import { learningStrategy } from '../data/roadmap.js'
import { getWeeklyPlan, planWindow, reconcileWeeklyPlan } from '../data/weeklyPlan.js'
import { weekRange } from './date.js'

const priorityLabels = { core: '核心', support: '基础', optional: '选做', custom: '自定义' }

// Export only the selected week. Personal prose is opt-in, never a whole-store dump.
export function buildWeeklyAiContext({ dateKey, store = {}, includeNotes = false }) {
  const dates = weekRange(dateKey)
  const weekId = dates[0]
  const plan = getWeeklyPlan(weekId)
  const week = reconcileWeeklyPlan(weekId, store.weeks?.[weekId])
  const tasks = week.tasks || []
  const required = tasks.filter((task) => task.priority !== 'optional')
  const optional = tasks.filter((task) => task.priority === 'optional')
  const days = dates.map((date) => ({ date, ...(store.days?.[date] || {}) }))
  const focusMinutes = days.reduce((sum, day) => sum + (Number(day.focusMinutes) || 0), 0)
  const lines = [
    '# 我的本周学习任务 · 请作为学习教练协助我',
    '',
    `所选周：${weekId} — ${dates.at(-1)}；当前查看日期：${dateKey}`,
    `任务包版本：${plan ? planWindow.revision : '本周暂无已审核任务包'}`,
    '',
    '## 我的背景与路线约束',
    '华东师范大学数据科学与工程学院大三学生，计划参加 2027 年底初试，暂以复旦计算机类专硕为冲刺目标；同时准备 Java 后端实习与就业。',
    learningStrategy.summary,
    learningStrategy.examRule,
    learningStrategy.timeRule,
    learningStrategy.scopeRule,
    ...learningStrategy.checkpoints.map((item) => `- ${item}`),
    '',
    '## 本周目标与实际进度',
    `主题：${plan?.theme || '本周详细计划尚未更新'}`,
    `目标：${plan?.result || '先结合实际完成情况更新计划，不要把上一周或随机任务当成本周已确认目标。'}`,
    `非选做任务（含基础/自定义）：${required.filter((task) => task.completed).length}/${required.length}；选做：${optional.filter((task) => task.completed).length}/${optional.length}。`,
    `本周打卡：${days.filter((day) => day.checkedIn).length}/7 天；已记录专注：${focusMinutes} 分钟。未记录不等于未学习。`,
    '任务完成状态由我手动勾选，未经独立评估；请按验收标准检查理解，不能把勾选等同于掌握。',
    '',
    '## 任务明细（含我补充的自定义任务）',
  ]

  if (!tasks.length) lines.push('本周没有任务。请先询问实际进展和可投入时间，再协助制定下一周目标。')
  tasks.forEach((task, index) => {
    lines.push(
      '',
      `### ${index + 1}. [${task.completed ? 'x' : ' '}] ${task.title}`,
      `类型：${priorityLabels[task.priority] || '任务'}；预计 ${task.minutes || 0} 分钟；状态：${task.completed ? '已勾选完成' : '未完成'}。`,
      `为什么做：${task.outcome || '请一起明确本项任务的目的。'}`,
      '执行步骤：',
      ...(task.steps || []).map((step, stepIndex) => `${stepIndex + 1}. ${step}`),
      `验收标准：${task.deliverable || '请先补充可验证的交付物。'}`,
      '学习入口：',
      ...(task.resources?.length ? task.resources.map((resource) => `- ${resource.title}：${resource.url}`) : ['- 暂无指定链接。']),
    )
  })

  lines.push('', '## 本周笔记与复盘')
  if (includeNotes) {
    const notedDays = days.filter((day) => day.note?.trim())
    lines.push(...(notedDays.length ? notedDays.map((day) => `- ${day.date}：${day.note}`) : ['本周没有已保存的每日笔记。']))
    const review = store.reviews?.find((item) => item.weekId === weekId)
    const fields = [['wins', '完成与成果'], ['blockers', '卡点'], ['learning', '学到什么'], ['nextFocus', '下周唯一重点'], ['routeChange', '路线调整']]
    if (review) {
      for (const [key, label] of fields) if (review[key]) lines.push(`${label}：${review[key]}`)
    } else lines.push('本周没有已保存的周复盘。')
  } else {
    lines.push('未包含个人笔记与复盘；不能据此判断我没有卡点。需要时请向我询问。')
  }

  lines.push(
    '',
    '## 请这样帮助我',
    '1. 先核对我想开始或继续的任务、已有完成证据和今天可用时间；优先未完成的本周任务，不擅自增加新科目、新框架或更换整套资料。',
    '2. 从一个 30–90 分钟能完成的小步骤开始：指出要复习的概念、要做的题目范围，以及完成后如何自测。每次只推进一个学习块。',
    '3. 数学和 408 先给提示、考点与检查思路；Java 算法与项目先帮助我拆解、定位和设计测试。除非我明确要求，不要直接给出整题答案或可直接提交的完整代码。',
    '4. 按验收标准让我复述概念、独立解题、运行程序、补边界用例或隔日重写代码；勾选完成不能替代闭卷小测、可运行证据和延迟重做。',
    '5. 招生目录、初试科目和复试形式可能变化；涉及复旦报考信息时优先核对官方页面，并注明信息对应的招生年份。',
    '6. 项目、简历和面试表述必须基于真实实现、测试与数据，不虚构用户量、并发量、线上规模或实习经历。',
    '',
    '我这次想解决的任务/卡点：（粘贴后补充）',
    '今天可用时间、当前运行版本或报错：（粘贴后补充）',
  )
  return lines.join('\n')
}

export async function copyText(text, clipboard = globalThis.navigator?.clipboard) {
  try {
    if (!clipboard?.writeText) return false
    await clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
