import { daysBetween, fromDateKey } from '../utils/date'

const phases = [
  {
    id: 'explore', start: '2026-08-27', end: '2026-09-06', title: '启动与验证', target: '完成第一个可运行的游戏战斗原型',
    focus: ['完成 Git 入门并创建项目仓库', '学习 C# 必要语法并写进项目', '在团结引擎中实现移动与碰撞', '实现攻击、血量与敌人追击', '打包第一个 Windows 版本'],
  },
  {
    id: 'unity', start: '2026-09-07', end: '2026-10-31', title: '完成一个作品', target: '提交 Unity 中国开发挑战赛作品',
    focus: ['推进本周核心玩法', '实现并测试回声记录与回放', '完善敌人、升级与关卡内容', '使用 Profiler 修复性能问题', '打包试玩并收集玩家反馈'],
  },
  {
    id: 'bridge', start: '2026-11-01', end: '2026-12-15', title: '从 Unity 迁移到 UE', target: '用 UE5+C++ 重构最有价值的系统',
    focus: ['学习 UE Gameplay Framework', '用 C++ 实现 Actor / Component', '完成 Enhanced Input 与角色控制', '学习动画状态机与 Montage', '移植回声记录与回放系统'],
  },
  {
    id: 'ue-demo', start: '2026-12-16', end: '2027-02-28', title: '构建目标岗位作品', target: '完成 UE5+C++ 动作战斗 Demo',
    focus: ['实现动作战斗核心功能', '完善锁定、闪避和输入缓冲', '实现敌人状态机与 Boss', '打磨动画、镜头与打击反馈', '性能分析、打包与作品集整理'],
  },
  {
    id: 'internship', start: '2027-03-01', end: '2027-08-31', title: '获得真实开发经历', target: '拿到并完成第一段开发实习',
    focus: ['投递并跟踪本周岗位', '复习算法与计算机基础', '准备项目深挖与模拟面试', '根据面试反馈修正短板', '完成真实开发或开源贡献'],
  },
  {
    id: 'recruiting', start: '2027-09-01', end: '2027-12-31', title: '用真实机会做选择', target: '秋招与考公双轨，比较真实 Offer',
    focus: ['完成秋招投递与面试', '针对目标岗位复习项目与算法', '核对公务员和选调真实岗位', '记录并比较每个真实机会', '保持项目与技术能力输出'],
  },
  {
    id: 'graduation', start: '2028-01-01', end: '2028-06-30', title: '毕业去向落地', target: '完成毕业、入职或升学衔接',
    focus: ['完成毕业相关任务', '巩固入职前核心能力', '继续维护作品和技术记录', '比较并确认最终去向', '建立毕业后第一年成长计划'],
  },
]

const skillTasks = [
  'C++：完成 1 个语言知识点和 1 道练习',
  '算法：独立完成 1 道典型题并记录复杂度',
  '计算机基础：阅读 30 分钟并写 3 条笔记',
  '项目表达：整理一个技术问题及解决过程',
]

const dayActions = [
  '拆解本周目标，建立可验证的任务',
  '实现主功能，先保证可以运行',
  '继续实现并为关键路径补测试',
  '集中调试，记录原因而不只记录答案',
  '打包本周版本并更新 README',
  '安排一次 3 小时以上深度开发',
  '完成周复盘并规划下周',
]

export function getPhase(dateKey) {
  return phases.find((phase) => dateKey >= phase.start && dateKey <= phase.end) || phases.at(-1)
}

export function buildDailyTasks(dateKey) {
  if (dateKey === '2026-08-27') {
    return [
      task('报名 Unity 中国开发挑战赛', 'direction', 20),
      task('完成 Git 入门并创建项目仓库', 'engineering', 45),
      task('团结引擎中让角色移动起来', 'portfolio', 90),
      task('C++：引用与指针练习', 'engineering', 45),
    ]
  }

  const phase = getPhase(dateKey)
  const date = fromDateKey(dateKey)
  const weekday = (date.getDay() + 6) % 7
  const phaseDay = Math.max(0, daysBetween(phase.start, dateKey))
  const focus = phase.focus[Math.floor(phaseDay / 7) % phase.focus.length]
  const tasks = [
    task(`${focus}：${dayActions[weekday]}`, 'portfolio', weekday === 5 ? 180 : 90),
    task(skillTasks[phaseDay % skillTasks.length], 'engineering', 45),
  ]

  if (weekday === 6) tasks.push(task('填写周复盘：成果、阻碍、能量和下周重点', 'choice', 30))
  if (dateKey === '2026-09-12') tasks.push(task('完成 CANN 6—8 小时限时体验并写结论', 'direction', 120))
  if (dateKey === '2026-10-10') tasks.push(task('筛选能报公务员岗位并完成一次限时模拟', 'choice', 120))
  return tasks
}

function task(title, category, minutes) {
  return { id: crypto.randomUUID(), title, category, minutes, completed: false, generated: true }
}
