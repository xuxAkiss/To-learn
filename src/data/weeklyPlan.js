import { daysBetween } from '../utils/date.js'

const HIGH_MATH = 'https://www.icourse163.org/search.htm?search=%E9%AB%98%E7%AD%89%E6%95%B0%E5%AD%A6'
const HELLO_ALGO = 'https://www.hello-algo.com/'
const LEETCODE = 'https://leetcode.cn/problemset/'
const MICROSOFT_CPP = 'https://learn.microsoft.com/zh-cn/cpp/get-started/?view=msvc-170'
const ENGLISH_READING = 'https://kaoyan.icourse163.org/course/terms/1464342459.htm?outVendor=zw_mooc_pclszykctj_'
const FUDAN_ADMISSION = 'https://gsao.fudan.edu.cn/ssyjszszcwzszymlwfslqbf/list.htm'

export const phases = [
  {
    id: 'transition', start: '2026-09-21', end: '2026-10-25', title: '切换到考研主线', target: '建立每周约 22 小时的稳定节奏，启动高数、数据结构和英语阅读',
  },
  {
    id: 'autumn-foundation', start: '2026-10-26', end: '2026-12-31', title: '秋季基础期', target: '完成高数首轮和数据结构首轮，开始计算机组成原理',
  },
  {
    id: 'winter-foundation', start: '2027-01-01', end: '2027-02-28', title: '寒假基础期', target: '完成线代、概率基础并推进计组与操作系统',
  },
  {
    id: 'first-round', start: '2027-03-01', end: '2027-05-31', title: '首轮收口', target: '数学和 408 四科全部完成首轮，形成可重做的错题清单',
  },
  {
    id: 'intensive', start: '2027-06-01', end: '2027-08-31', title: '强化与综合题', target: '数学、408 从章节题转向综合题和限时训练，7 月开始政治',
  },
  {
    id: 'papers', start: '2027-09-01', end: '2027-10-31', title: '真题与择校确认', target: '完成成套真题并根据官方目录、模考表现确定最终报考专业',
  },
  {
    id: 'sprint', start: '2027-11-01', end: '2027-12-31', title: '初试冲刺', target: '稳定完成整卷，集中修复高频失分并完成政治与英语输出训练',
  },
  {
    id: 'retest', start: '2028-01-01', end: '2028-06-30', title: '复试与毕业衔接', target: '根据初试结果准备机考、专业面试、英语口语和毕业事项',
  },
]

export const planWindow = {
  revision: 'fudan-exam-foundation-2026-09-26',
  start: '2026-09-21',
  end: '2026-10-25',
  nextUpdate: '2026-10-25',
  label: '考研基础期 · 高数与数据结构',
}

const weeklyPlans = {
  '2026-09-21': {
    theme: '切换：建立考研基线与学习系统',
    result: '利用周末完成路线切换，不补赶旧游戏任务；确认资料、做小测并排好下一周学习时段，预计 4 小时。',
    tasks: [
      task('exam-route-switch', '暂停旧项目并写清考研主线', 'choice', 'support', 45,
        '把注意力从多方向尝试切到 2027 年底初试，避免旧任务继续消耗时间。',
        ['将 Unity、UE、CANN 和新增竞赛标记为暂停，不删除已有成果', '写下暂定目标：复旦计算与智能创新学院相关专硕，数学一、英语一、408、政治', '记录最终科目和专业仍须以 2027 年秋发布的 2028 招生目录为准', '在本站周复盘写下选择考研的原因和本学期不可牺牲的学校课程'],
        '一页路线说明：目标、暂定科目、每周可投入时间，以及本学期保留和暂停的事项。',
        [{ title: '复旦大学 · 招生章程与专业目录', url: FUDAN_ADMISSION }]),
      task('baseline-check', '完成高数与数据结构基线小测', 'engineering', 'core', 90,
        '先知道自己真正会什么，再决定课程速度和做题量。',
        ['高数限时 45 分钟：函数、极限、连续各选 3—4 道基础题，不查资料', '数据结构限时 30 分钟：复杂度、顺序表、链表各做若干选择题', '按概念不清、方法不会、计算错误、粗心四类记录失分', '只复盘错因，不在本周末临时补完整章课程'],
        '得到两份小测结果和失分分类；能指出接下来最需要补的两个知识点。',
        [{ title: '中国大学 MOOC · 高等数学课程检索', url: HIGH_MATH }, { title: 'Hello 算法 · 数据结构与算法', url: HELLO_ALGO }]),
      task('study-setup', '固定资料与每周 22 小时时段', 'choice', 'support', 60,
        '减少换老师、找资料和临时决定学什么造成的损耗。',
        ['数学固定一套基础课程或讲义与《660题》，不同时跟多位老师', '408 固定王道四本；当前只打开数据结构，不提前铺开四科', '英语固定一个词汇工具和一套英语一真题解析', '在课表外排出数学 9 小时、408 8 小时、英语 4 小时、复盘 1 小时，并保留半天休息'],
        '下周学习时段已经进入日历；资料清单只有当前阶段真正会使用的内容。',
        []),
      task('english-baseline', '完成一篇英语一阅读基线', 'direction', 'support', 45,
        '六级成绩不能直接代表考研阅读表现，需要用真题建立独立基线。',
        ['选择 2010 年左右的一篇英语一阅读', '不查词完成首次作答并记录耗时', '逐题定位原文依据，说明每个错误选项错在哪里', '只整理影响理解和复现的生词、长句与选项陷阱'],
        '留下首次正确率、耗时、错因和一段长难句分析。',
        [{ title: '中国大学 MOOC · 考研英语阅读课程', url: ENGLISH_READING }]),
    ],
  },
  '2026-09-28': {
    theme: '第1周：极限、线性表与英语阅读起步',
    result: '完成约 22 小时：高数建立极限框架，数据结构完成复杂度与线性表，英语形成固定精读流程。',
    tasks: [
      task('math-limits', '高数：函数、数列极限与函数极限', 'engineering', 'core', 540,
        '高数是当前最需要转化为独立解题能力的科目，本周先打牢极限语言和常见方法。',
        ['分 6 个 90 分钟学习块：概念与例题约 3 块，独立做题约 3 块', '覆盖函数性质、数列极限、函数极限、无穷小比较和常见求极限方法', '完成讲义例题复做和约 25—30 道对应练习；每题先独立尝试再看解析', '将错题按概念、方法、计算、粗心分类，并安排 7 天后重做'],
        '能不看资料解释极限的基本定义与等价无穷小使用条件；本周题目有完整过程和错因记录。',
        [{ title: '中国大学 MOOC · 高等数学课程检索', url: HIGH_MATH }]),
      task('ds-linear-list', '408：复杂度、顺序表与链表', 'portfolio', 'core', 480,
        '数据结构同时服务 408 初试和后续复试机考，必须把知识点与代码联系起来。',
        ['阅读王道对应章节并完成约 40—60 道选择题、至少 2 道综合题', '独立写出顺序表查找、插入、删除，以及单链表建立、插入、删除', '用 C++ 完成力扣 704、27、203；先补 vector、引用和指针的必要用法', '为每道错题写出考点与错误原因，不抄整段解析'],
        '能比较顺序表与链表的时间、空间特点；三道代码题通过并能脱离答案重写核心操作。',
        [{ title: 'Hello 算法 · 数组与链表', url: HELLO_ALGO }, { title: 'Microsoft Learn · C++ 入门', url: MICROSOFT_CPP }, { title: 'LeetCode · 题库', url: LEETCODE }]),
      task('english-reading-1', '英语：词汇6天与真题精读2篇', 'direction', 'support', 240,
        '通过少量真题建立“作答—定位—分析—复盘”的稳定流程。',
        ['每天复习词汇 20—30 分钟，共 6 天', '选择 2010 年左右两篇英语一阅读，首次作答每篇控制在 25 分钟内', '对答案后逐题定位原文证据，解释正确项与错误项', '每篇只整理真正阻碍理解的长句和高频词，不全文翻译'],
        '完成两篇精读，记录正确率、首次耗时、错因和原文依据。',
        [{ title: '中国大学 MOOC · 考研英语阅读课程', url: ENGLISH_READING }]),
      task('review-week-1', '周测与复盘：确认节奏是否可持续', 'choice', 'support', 60,
        '第一周重点是建立真实基线，不用计划完成率掩盖理解问题。',
        ['重做本周 5 道数学错题和 5 道数据结构错题', '统计真实投入，不把看手机、下载等待算作学习', '写下两个反复错误和下周最需要修复的一项', '若总完成度低于 70%，下周先缩题量，不通过熬夜补齐'],
        '本站保存周复盘；能给出真实投入、错题重做正确率和下周调整。',
        []),
    ],
  },
  '2026-10-05': {
    theme: '第2周：连续与导数、栈队列与串',
    result: '继续约 22 小时：建立连续和导数的计算基础，掌握栈、队列与串的典型考法及实现。',
    tasks: [
      task('math-continuity-derivative', '高数：连续、间断点、导数与微分', 'engineering', 'core', 540,
        '把极限用于连续与导数，形成从定义到计算的连贯框架。',
        ['复习上周极限错题，再学习连续、间断点分类、导数定义、求导法则和微分', '完成讲义例题复做和约 30 道对应练习', '至少保留 5 道使用定义或分段讨论的题，不能只练套公式', '7 天后重做本周代表性错题'],
        '能独立判断间断点类型，解释导数定义并完成复合函数、隐函数等基础求导。',
        [{ title: '中国大学 MOOC · 高等数学课程检索', url: HIGH_MATH }]),
      task('ds-stack-queue-string', '408：栈、队列与串', 'portfolio', 'core', 480,
        '这些结构是树、图和算法题的直接基础，需要会画状态并能实现。',
        ['完成王道对应选择题约 40—60 道和至少 2 道综合题', '独立实现顺序栈、链栈、循环队列，画图解释队空与队满条件', '完成力扣 20、232，再写一道含完整输入输出的程序题', '整理括号匹配、表达式求值、循环队列和字符串匹配的易错点'],
        '能画出连续入队出队后的数组状态；两道力扣和一道完整程序通过，核心代码可脱离模板复写。',
        [{ title: 'Hello 算法 · 栈与队列', url: HELLO_ALGO }, { title: 'LeetCode · 题库', url: LEETCODE }]),
      task('english-reading-2', '英语：继续词汇与真题精读2篇', 'direction', 'support', 240,
        '保持连续性，并开始识别题型与错误选项规律。',
        ['词汇复习 6 天，每天 20—30 分钟', '精读两篇较早年份英语一阅读，首次作答继续记录耗时', '将错题归为定位错误、长句误读、词义误判或选项比较失误', '挑一段长难句做结构拆分，第二天不看解析重新翻译'],
        '完成两篇精读；每道错题都有原文依据和明确错误类型。',
        [{ title: '中国大学 MOOC · 考研英语阅读课程', url: ENGLISH_READING }]),
      task('review-week-2', '周测与复盘：检查基础是否真正连上', 'choice', 'support', 60,
        '通过闭卷小测判断掌握程度，而不是用视频进度判断。',
        ['闭卷完成 45 分钟数学小测和 30 分钟数据结构小测', '计算正确率并区分首次错误与重复错误', '复查英语两篇阅读的错误项是否还能说清理由', '在本站记录下周唯一最重要的修复点'],
        '形成两科小测结果；重复错误有具体补救动作和截止时间。',
        []),
    ],
  },
  '2026-10-12': {
    theme: '第3周：中值定理、二叉树与遍历',
    result: '完成约 22 小时：掌握微分中值定理和洛必达，建立二叉树知识与代码框架。',
    tasks: [
      task('math-mvt', '高数：微分中值定理与洛必达法则', 'engineering', 'core', 540,
        '中值定理连接证明题和导数应用，是后续高数的重要枢纽。',
        ['学习罗尔、拉格朗日、柯西中值定理及适用条件', '学习洛必达法则并区分可以使用与不可以直接使用的情形', '完成约 30—35 道对应题，包含计算题和基础证明题', '将不会开始的证明题记录为“缺少哪个构造或定理条件”'],
        '能先核对条件再选择定理；能独立完成基础证明题并解释洛必达的使用边界。',
        [{ title: '中国大学 MOOC · 高等数学课程检索', url: HIGH_MATH }]),
      task('ds-tree', '408：树、二叉树与遍历', 'portfolio', 'core', 480,
        '树是数据结构首轮的核心章节，也是机考常见题型。',
        ['完成树与二叉树、存储结构、遍历、线索二叉树的王道章节题', '独立写递归前中后序遍历，并理解至少一种非递归遍历', '完成力扣 94、102、104；每题写时间与空间复杂度', '用纸画一棵树，手工完成遍历序列和基本性质计算'],
        '三种递归遍历可脱离模板写出；三道题通过，能解释队列在层序遍历中的作用。',
        [{ title: 'Hello 算法 · 二叉树', url: HELLO_ALGO }, { title: 'LeetCode · 题库', url: LEETCODE }]),
      task('english-reading-3', '英语：两篇阅读与错因统计', 'direction', 'support', 240,
        '开始观察连续三周的错误模式，为后续专项补弱提供依据。',
        ['继续词汇复习 6 天', '精读两篇英语一阅读，每篇首次作答控制在 22—25 分钟', '更新阅读错因统计，找出出现最多的两类错误', '若连续两周卡在长句结构，再安排一次专项长难句学习；否则不新增课程'],
        '完成两篇精读和一份三周错误类型汇总，能指出首要薄弱环节。',
        [{ title: '中国大学 MOOC · 考研英语阅读课程', url: ENGLISH_READING }]),
      task('review-week-3', '周测与复盘：隔周重做检验遗忘', 'choice', 'support', 60,
        '把“当周会做”变成隔一两周仍能独立完成。',
        ['重做第1周的代表性数学题和链表代码', '记录独立完成、提示后完成、仍不会三种状态', '检查本周实际投入是否接近计划，并注明被学校课程占用的时间', '根据遗忘结果决定下周是否进入导数应用和图'],
        '第1周内容有延迟复测结果；若低于 80%，下周任务明确缩量补漏。',
        []),
    ],
  },
  '2026-10-19': {
    theme: '第4周：导数应用、图与月度验收',
    result: '完成约 22 小时：用导数分析函数，掌握图的存储与遍历，并产出第一份月度学习证据。',
    tasks: [
      task('math-derivative-applications', '高数：单调性、极值、凹凸性与渐近线', 'engineering', 'core', 540,
        '把导数计算转化为完整的函数分析能力，为积分阶段做好准备。',
        ['学习单调区间、极值与最值、凹凸性、拐点和渐近线', '完成约 30—35 道对应题，要求写出定义域、关键点和完整讨论过程', '选 3 道综合题限时完成，复盘步骤缺失和计算错误', '本周不为赶进度强行进入积分；月测通过后再开始下一章'],
        '能独立完成一题完整函数性态分析；数学月测中前四周内容达到既定正确率并完成错因分类。',
        [{ title: '中国大学 MOOC · 高等数学课程检索', url: HIGH_MATH }]),
      task('ds-graph', '408：图的存储、BFS 与 DFS', 'portfolio', 'core', 480,
        '图遍历连接 408 理论与算法机考，需要同时会画过程、分析复杂度和写代码。',
        ['学习邻接矩阵、邻接表、BFS、DFS 和基本连通性问题', '完成王道对应选择题约 40—60 道和至少 2 道综合题', '完成力扣 200，并写一道含完整输入输出的 BFS 或 DFS 程序', '用纸手工模拟一次 BFS 和 DFS，注明访问顺序与辅助结构'],
        '能根据图的稠密程度选择存储方式；两道代码题通过并能解释遍历复杂度。',
        [{ title: 'Hello 算法 · 图', url: HELLO_ALGO }, { title: 'LeetCode · 题库', url: LEETCODE }]),
      task('english-reading-4', '英语：2—3篇阅读与月度总结', 'direction', 'support', 240,
        '用四周数据判断词汇、长句、定位和选项判断中谁是主要瓶颈。',
        ['继续词汇复习 6 天', '精读 2—3 篇较早年份英语一阅读', '统计四周正确率、平均首次耗时和错误类型', '只针对第一薄弱项制定下月改进动作，不新增完整语法或阅读课程'],
        '完成月度阅读统计表，并能用证据说明下月英语最需要补什么。',
        [{ title: '中国大学 MOOC · 考研英语阅读课程', url: ENGLISH_READING }]),
      task('monthly-checkpoint', '月度验收：决定继续、缩量或补漏', 'choice', 'support', 60,
        '用实际投入和延迟测试调整下一月任务，而不是照原计划机械前进。',
        ['完成 90 分钟数学章节测验和 60 分钟数据结构闭卷测验', '记录实际周均投入、数学错题重做正确率、数据结构测验结果和英语阅读错误数', '若周均投入低于 16 小时或重复错误过多，先缩量补漏；否则进入积分、图后半与查找排序', '在本站完成周复盘，并把四项数据带到计划更新会话'],
        '得到四项可比较的数据，并明确下一月是正常推进还是安排一周补漏。',
        []),
    ],
  },
}

export function getPhase(dateKey) {
  if (dateKey < phases[0].start) return phases[0]
  return phases.find((phase) => dateKey >= phase.start && dateKey <= phase.end) || phases.at(-1)
}

export function buildWeeklyTasks(weekId) {
  const plan = weeklyPlans[weekId]
  return plan ? plan.tasks.map((item) => ({ ...item, completed: false, generated: true })) : []
}

export function getWeeklyPlan(weekId) {
  return weeklyPlans[weekId] || null
}

// Refresh authored tasks without losing custom tasks, matching completions or history.
export function reconcileWeeklyPlan(weekId, savedWeek) {
  if (!getWeeklyPlan(weekId)) return savedWeek || { tasks: [] }
  if (savedWeek?.planRevision === planWindow.revision) return savedWeek

  const savedTasks = savedWeek?.tasks || []
  const generated = new Map(savedTasks.filter((item) => item.generated === true).map((item) => [item.id, item]))
  const plannedTasks = buildWeeklyTasks(weekId).map((item) => ({
    ...item,
    completed: Boolean(generated.get(item.id)?.completed),
  }))
  const plannedIds = new Set(plannedTasks.map((item) => item.id))
  const displaced = [...generated.values()].filter((item) => !plannedIds.has(item.id))
  const planHistory = savedWeek?.planHistory || []

  return {
    ...savedWeek,
    planRevision: planWindow.revision,
    tasks: [...plannedTasks, ...savedTasks.filter((item) => item.generated !== true)],
    planHistory: displaced.length
      ? [...planHistory, { revision: savedWeek?.planRevision || 'legacy', tasks: displaced }]
      : planHistory,
  }
}

export function reconcileStoredWeeks(weeks = {}) {
  let updated = weeks
  for (const [weekId, savedWeek] of Object.entries(weeks)) {
    const nextWeek = reconcileWeeklyPlan(weekId, savedWeek)
    if (nextWeek !== savedWeek) {
      if (updated === weeks) updated = { ...weeks }
      updated[weekId] = nextWeek
    }
  }
  return updated
}

export function getPlanProgressLabel(weekId) {
  if (weekId < planWindow.start) return '计划开始前'
  if (weekId > planWindow.end) return '等待月度更新'
  const weekNumber = Math.floor(daysBetween(planWindow.start, weekId) / 7) + 1
  const totalWeeks = Math.floor(daysBetween(planWindow.start, planWindow.end) / 7) + 1
  return `第 ${weekNumber} / ${totalWeeks} 周`
}

function task(id, title, category, priority, minutes, outcome, steps, deliverable, resources) {
  return { id, title, category, priority, minutes, outcome, steps, deliverable, resources }
}
