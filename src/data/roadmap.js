const FUDAN_ADMISSION = 'https://gsao.fudan.edu.cn/ssyjszszcwzszymlwfslqbf/list.htm'
const FUDAN_RETEST = 'https://cs.fudan.edu.cn/cb/e2/c23787a773090/page.htm'
const HELLO_ALGO = 'https://www.hello-algo.com/'
const LEETCODE = 'https://leetcode.cn/problemset/'
const MICROSOFT_CPP = 'https://learn.microsoft.com/zh-cn/cpp/get-started/?view=msvc-170'

export const learningStrategy = {
  summary: '目标是参加 2027 年底初试，冲刺复旦计算与智能创新学院相关专硕。当前把数学、408 和英语作为唯一学习主线，学校课程正常完成，游戏开发、CANN、竞赛和新增项目暂停扩张。',
  examRule: '目前按数学一、英语一、408、政治准备；你参加的是 2028 年招生，最终专业、科目、统考名额和学费必须以 2027 年秋发布的官方目录为准。',
  timeRule: '学期内先执行每周约 22 小时：数学 9 小时、408 8 小时（含约 2 小时 C++）、英语 4 小时、复盘 1 小时；期末周允许降载，不靠熬夜补进度。',
  scopeRule: '政治从 2027 年 7 月左右系统开始。近期只学高数、数据结构和英语阅读；不同时铺开线代、概率、计组、操作系统和计网。',
  checkpoints: ['2026 年底：高数与数据结构首轮完成，计组已启动', '2027 年 5 月底：数学和 408 四科首轮结束', '2027 年 8 月底：主要强化结束，能够进行限时整卷训练', '2027 年 9—10 月：依据官方目录和连续模考确定最终报考专业'],
}

export const lanes = [
  {
    id: 'engineering',
    name: '数学',
    color: 'blue',
    items: [
      { id: 'calculus-foundation', title: '高数基础首轮', start: '2026-09', end: '2026-12', note: '从极限、导数、积分推进到多元微积分和级数。每学一节立即做题，做题时间长期多于听课时间。' },
      { id: 'linear-probability', title: '线代与概率基础', start: '2027-01', end: '2027-03', note: '已有课程基础，可以适当加快听课，但必须通过独立解题和延迟重做决定进度。' },
      { id: 'math-intensive', title: '数学强化与综合题', start: '2027-04', end: '2027-08', note: '重做基础错题并训练跨章节综合题、计算完整性和限时稳定性。' },
      { id: 'math-papers', title: '数学真题与模拟', start: '2027-09', end: '2027-12', note: '较早真题用于训练，近年真题留作完整限时模拟；模拟卷只做少量并完整复盘。' },
    ],
  },
  {
    id: 'portfolio',
    name: '408',
    color: 'mint',
    items: [
      { id: 'data-structure', title: '数据结构首轮', start: '2026-09', end: '2026-11', note: '王道章节题与 C++ 实现同步推进，核心结构要能解释、画过程并写出代码。', resources: [{ title: 'Hello 算法', url: HELLO_ALGO }] },
      { id: 'computer-organization', title: '计算机组成原理', start: '2026-11', end: '2027-02', note: '重点掌握数据表示、存储系统、指令系统、CPU、总线和 I/O，计算题必须动手完成。' },
      { id: 'os-network', title: '操作系统与计网', start: '2027-03', end: '2027-05', note: '操作系统重点训练同步互斥、死锁、内存和文件系统；计网已有基础，以维护和查漏为主。' },
      { id: '408-intensive', title: '408 强化与真题', start: '2027-06', end: '2027-12', note: '先按专题重做错题和大题，再进入成套真题；近期真题保留用于后期完整模拟。' },
    ],
  },
  {
    id: 'experiments',
    name: '英语 / 政治',
    color: 'amber',
    items: [
      { id: 'english-reading', title: '词汇与真题阅读', start: '2026-09', end: '2027-05', note: '每天复习词汇，每周精读 2—3 篇较早年份英语一阅读；逐题定位原文并分析错误项。' },
      { id: 'english-all-types', title: '英语全题型', start: '2027-06', end: '2027-08', note: '在阅读持续训练的基础上加入新题型、翻译和完形，不提前消耗近年整套真题。' },
      { id: 'politics', title: '政治系统复习', start: '2027-07', end: '2027-12', note: '暑假开始基础与选择题，冲刺阶段再集中使用当年时政和背诵材料。' },
      { id: 'english-writing', title: '英语套卷与作文', start: '2027-09', end: '2027-12', note: '进行限时套卷并形成自己的作文表达框架，避免只背模板却不能针对题目输出。' },
    ],
  },
  {
    id: 'choices',
    name: '复试 / 报考',
    color: 'violet',
    items: [
      { id: 'cpp-retest', title: 'C++ 与机考保温', start: '2026-09', end: '2027-12', note: '每周约 2 小时，与数据结构章节同步刷题；初试前不单独扩张成竞赛算法路线。', resources: [{ title: 'Microsoft Learn · C++ 入门', url: MICROSOFT_CPP }, { title: 'LeetCode 题库', url: LEETCODE }, { title: '复旦 2026 复试细则（仅作参考）', url: FUDAN_RETEST }] },
      { id: 'catalog-watch', title: '招生信息核对', start: '2027-05', end: '2027-10', note: '关注宣讲、专业目录、推免与统考计划变化；最终只以报考年度官方文件为准。', resources: [{ title: '复旦大学 · 招生章程与专业目录', url: FUDAN_ADMISSION }] },
      { id: 'target-confirm', title: '确定最终报考目标', start: '2027-09', end: '2027-10', note: '结合官方目录、连续模考、风险承受能力和备选院校确定最终专业，不只看单次分数。' },
      { id: 'retest-prep', title: '复试准备', start: '2027-12', end: '2027-12', note: '初试结束后根据结果启动机考、专业面试、英语口语和项目材料整理。' },
    ],
  },
]

export const decisions = [
  {
    id: 'rhythm', date: '2026-10-25', title: '四周节奏是否可持续',
    why: '先验证能否在学校课程之外稳定完成约 22 小时，而不是用一两天突击制造虚假进度。',
    standards: ['记录四周真实周均投入', '数学错题有 7 天后重做结果', '数据结构完成至少一次闭卷小测', '英语阅读有正确率、耗时和错因统计'],
    adjust: ['完成度低于 70%：下月减少题量，保留科目结构', '重复错误明显：安排一周补漏再进入新章', '节奏稳定：进入积分、图后半、查找排序'],
  },
  {
    id: 'year-end', date: '2026-12-31', title: '秋季基础验收',
    why: '高数和数据结构是否真正完成首轮，将决定寒假能否顺利进入线代、概率和计组。',
    standards: ['高数主要章节完成学习和对应练习', '数据结构核心章节完成并可实现常用结构', '计组已经启动而不是继续拖延', '英语保持稳定词汇和阅读记录'],
    adjust: ['高数缺口大：寒假优先补高数，线代适当顺延', '数据结构代码薄弱：增加每周一次完整输入输出题', '学校期末占用过多：以真实完成情况重排，不补赶日历'],
  },
  {
    id: 'first-round-end', date: '2027-05-31', title: '数学与408首轮收口',
    why: '强化阶段必须建立在全科至少完整学过一遍且做过章节题的基础上。',
    standards: ['数学一全部考点完成首轮', '408 四科全部完成首轮', '每科都有可重做的错题与薄弱章节清单', '英语阅读已形成稳定方法'],
    adjust: ['一门明显落后：优先补齐，不同时启动过多综合卷', '基础题仍不稳：延长章节训练', '首轮达标：六月进入综合题与限时训练'],
  },
  {
    id: 'intensive-end', date: '2027-08-31', title: '强化与模考评估',
    why: '连续模考比分散印象更能判断复旦目标的风险与下一阶段策略。',
    standards: ['数学与408主要强化内容完成', '开始按考试时长完成整卷', '至少三次模考有分数和失分结构', '政治已经开始且英语全题型已覆盖'],
    adjust: ['分数波动大：优先修复时间分配和高频失分', '目标差距明显：同步研究备选院校', '表现稳定：进入真题与报名确认阶段'],
  },
  {
    id: 'catalog', date: '2027-09-30', title: '按官方目录确认报考',
    why: '你参加的是 2028 年招生，当前任何科目、名额和培养安排都只能作为准备假设。',
    standards: ['核对专业代码、研究方向、初试科目、统考计划和学费', '结合连续模考而非单次最好成绩', '确定一个主目标和合理备选', '记录报名与考试重要日期'],
    adjust: ['科目变化：立即按官方大纲补差异', '名额或培养方式不符合预期：评估备选院校', '信息稳定且成绩匹配：锁定目标，停止反复择校'],
  },
]

export const experiments = [
  {
    id: 'math', title: '数学掌握度', window: '每周日', status: 'active',
    question: '本周内容在一周后还能独立做出来吗？',
    deliverable: '一次闭卷小测、错题分类和 7 天后重做结果',
    checks: ['课程后独立完成对应练习', '错题按概念、方法、计算、粗心分类', '一周后不看答案重做代表题'],
  },
  {
    id: '408', title: '408掌握度', window: '每周日', status: 'active',
    question: '我能否解释知识点、画出过程，并完成对应计算或代码？',
    deliverable: '章节小测、两道综合题和一项可运行的代码实现',
    checks: ['完成王道章节选择题与综合题', '脱离资料解释本周核心概念', '用 C++ 实现对应数据结构或算法'],
  },
  {
    id: 'english', title: '英语阅读诊断', window: '每两周', status: 'active',
    question: '主要失分来自词汇、长句、定位，还是选项比较？',
    deliverable: '正确率、首次耗时、原文依据和错误类型统计',
    checks: ['不查词完成首次作答并记录时间', '逐题定位原文依据', '解释每个错误选项为什么错'],
  },
  {
    id: 'cpp', title: 'C++机考保温', window: '每两周', status: 'planned',
    question: '学过的数据结构能否在完整输入输出环境中独立实现？',
    deliverable: '一道力扣题和一道完整输入输出程序',
    checks: ['先独立思考再看提示', '代码通过边界用例', '隔周脱离模板重写核心部分'],
  },
  {
    id: 'workload', title: '时间负荷诊断', window: '每月末', status: 'planned',
    question: '当前 22 小时计划是否可持续，是否挤压睡眠与学校课程？',
    deliverable: '四周真实投入统计和下一月负荷调整',
    checks: ['统计各科真实投入而非计划时长', '记录未完成原因与睡眠情况', '决定保持、缩量或重新分配'],
  },
]

export const milestones = [
  { date: '2026-09-26', title: '切换到考研主线', state: 'done' },
  { date: '2026-10-25', title: '完成四周节奏验证', state: 'current' },
  { date: '2026-12-31', title: '完成秋季基础阶段', state: 'planned' },
  { date: '2027-05-31', title: '数学与408首轮结束', state: 'planned' },
  { date: '2027-08-31', title: '完成主要强化训练', state: 'planned' },
  { date: '2027-09-30', title: '确认最终报考专业', state: 'planned' },
  { date: '2027-12-31', title: '完成初试与复盘', state: 'planned' },
]
