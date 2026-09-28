import { daysBetween } from '../utils/date.js'

const WU_CALCULUS = 'https://www.bilibili.com/video/BV1mr4y1K7Lb/'
const WANGDAO_DS = 'https://www.bilibili.com/video/BV1b7411N798/'
const JAVA_UPPER = 'https://www.bilibili.com/video/BV17F411T7Ao/'
const JAVA_LOWER = 'https://www.bilibili.com/video/BV1yW4y1Y7Ms/'
const JAVA_LEARN = 'https://dev.java/learn/'
const PYTHON_JSON = 'https://docs.python.org/zh-cn/3/library/json.html'
const GIT_BOOK = 'https://git-scm.com/book/zh/v2'
const LEETCODE = 'https://leetcode.cn/'
const LUOGU = 'https://www.luogu.com.cn/'
const FUDAN_ADMISSION = 'https://gsao.fudan.edu.cn/ssyjszszcwzszymlwfslqbf/list.htm'

export const phases = [
  {
    id: 'common-foundation', start: '2026-09-21', end: '2026-11-30', title: '共同基础', target: '推进高数、数据结构、Java 和英语；隔周完成模型 API 小练习，并开始用 AI 辅助测试与排错',
  },
  {
    id: 'database-foundation', start: '2026-12-01', end: '2027-02-28', title: '计组与基础后端', target: '学习 SQL、HTTP、数据库和基础后端，让项目接入一个简单模型功能',
  },
  {
    id: 'spring-and-os', start: '2027-03-01', end: '2027-04-30', title: '业务后端、RAG与操作系统', target: '完成基础预约业务，实现带引用的文档问答并理解 Embedding 与 RAG',
  },
  {
    id: 'first-round-and-resume', start: '2027-05-01', end: '2027-06-30', title: '首轮收口与求职', target: '数学、408 首轮结束；项目加入查询／预约工具调用与评测集，达到演示和简历标准',
  },
  {
    id: 'intensive', start: '2027-07-01', end: '2027-08-31', title: '考研强化', target: '数学、408 进入强化与整卷训练；项目只做修错、回归评测和必要维护',
  },
  {
    id: 'papers-and-autumn', start: '2027-09-01', end: '2027-10-31', title: '真题、报考与秋招取舍', target: '核对官方目录、完成真题套卷，并将求职活动集中在固定时段',
  },
  {
    id: 'sprint', start: '2027-11-01', end: '2027-12-31', title: '初试冲刺', target: '以整卷和高频失分修复为主，项目停止扩张，只做必要维护',
  },
  {
    id: 'retest-and-recruiting', start: '2028-01-01', end: '2028-06-30', title: '复试、实习与春招', target: '增加 Java 机考与专业面试训练，并根据初试结果继续实习或春招',
  },
]

export const planWindow = {
  revision: 'exam-ai-backend-dual-track-2026-09-28',
  start: '2026-09-21',
  end: '2026-10-25',
  nextUpdate: '2026-10-25',
  label: '考研基础＋后端／AI应用就业 · 首月',
}

const weeklyPlans = {
  '2026-09-21': {
    theme: '切换：建立考研与 Java 就业双主线',
    result: '利用周末确认双目标、固定资料、完成基线并排好下周 24 小时时段，预计 4 小时。',
    tasks: [
      task('dual-route-switch', '写清考研与就业双目标', 'choice', 'support', 30,
        '之后所有任务都要同时接受“是否服务初试或后端／AI 应用就业”的范围检查。',
        ['写下目标：2027 年底参加初试，复旦计算机类专硕为冲刺方向', '写下就业目标：2027 年 6 月底前完成可讲清、可评测的后端／AI 应用项目，并尝试实习投递', '将大模型训练、微调、论文研究、游戏开发和无关新项目标记为暂停', '记录 2028 招生目录仍需在 2027 年秋核对'],
        '一页双目标说明，包含时间节点、保留事项、暂停事项与官方信息校准时间。',
        [{ title: '复旦大学 · 招生章程与专业目录', url: FUDAN_ADMISSION }]),
      task('baseline-check', '完成高数与数据结构基线小测', 'engineering', 'core', 60,
        '先确认真正掌握程度，再决定课程速度和练习量。',
        ['高数限时 30 分钟，覆盖函数、极限与连续基础题', '数据结构限时 20 分钟，覆盖复杂度、数组与链表基础题', '按概念不清、方法不会、计算错误、粗心分类失分', '本周只记录结果，不临时补完整章节'],
        '两份小测结果和失分分类，能指出首月最需要修复的两个知识点。',
        [{ title: '武忠祥高数基础课程', url: WU_CALCULUS }, { title: '王道数据结构课程', url: WANGDAO_DS }]),
      task('java-git-setup', '配置 Java、IDE 与 Git 环境', 'backend', 'core', 60,
        '下周开始必须能直接写、运行和提交 Java 代码，不能把环境问题拖进学习时段。',
        ['安装或确认 JDK、IDE 与 Git 可用', '新建仓库并运行一个 Java 程序', '完成一次 add、commit 和 diff 查看', '创建算法练习与设备管理两个目录，不提前搭复杂框架'],
        'Java 程序可运行，仓库已有首个提交，能够说明源码、编译结果和 Git 状态。',
        [{ title: 'Java 官方学习文档', url: JAVA_LEARN }, { title: 'Git 中文教程', url: GIT_BOOK }]),
      task('study-setup', '固定资料与每周 24 小时时段', 'choice', 'support', 60,
        '减少换路线和重复计时，把双主线落实到日历。',
        ['固定高数、王道数据结构、英语一真题与一套词汇工具', 'Java 以黑马基础课程选章和官方文档为主，不跟完整就业路线无限延伸', '排出数学 8 小时、408 5 小时、Java 算法 2 小时、英语 4 小时、Java／AI 应用项目 4 小时、复盘 1 小时', '模型 API、RAG 与评测从项目 4 小时内分配，不新增总时长'],
        '下周 24 小时已经进入日历，资料清单只保留首月会实际使用的入口。',
        [{ title: '黑马 Java 基础上部', url: JAVA_UPPER }, { title: '黑马 Java 基础下部', url: JAVA_LOWER }]),
      task('english-baseline', '完成一篇英语一阅读基线', 'direction', 'support', 30,
        '六级表现不能直接替代考研阅读基线。',
        ['选择一篇较早年份英语一阅读', '不查词完成首次作答并记录耗时', '定位每题原文依据并标记主要错因'],
        '留下首次正确率、耗时、错因和至少一个影响理解的长句。',
        []),
    ],
  },
  '2026-09-28': {
    theme: '第1周：极限、数组与 Java 起步',
    result: '完成 24 小时：极限、复杂度与数组、Java 语法方法与类、首次 Python 模型 API 结构化结果练习，以及两篇英语阅读。',
    tasks: [
      task('math-limits', '数学 8h：极限概念与运算', 'engineering', 'core', 480,
        '建立高数首章的独立解题框架，避免只跟视频。',
        ['学习函数、数列极限、函数极限和常见极限运算', '先做讲义例题，卡住再听对应讲解', '完成 660 对应章节与讲义大题，记录首次独立完成情况', '将代表性错题安排到 7 天后重做'],
        '能解释基本极限概念并独立完成常规计算；错题有具体原因和重做日期。',
        [{ title: '武忠祥高数基础课程', url: WU_CALCULUS }]),
      task('ds-array', '408 5h：复杂度与数组', 'portfolio', 'core', 300,
        '把数据结构理论、题目与代码联系起来。',
        ['学习时间复杂度、空间复杂度和数组／顺序表', '完成王道对应选择题与基础综合题', '独立写顺序表查找、插入和删除', '能说明数组随机访问和插入删除的复杂度'],
        '完成章节题与顺序表代码，能脱离资料解释复杂度并重写核心操作。',
        [{ title: '王道数据结构课程', url: WANGDAO_DS }]),
      task('java-algo-1', 'Java 算法 2h：二分查找与移除元素', 'algorithm', 'core', 120,
        '用 Java 同时训练就业笔试与数据结构实现。',
        ['完成力扣 704 二分查找', '完成力扣 27 移除元素', '每题先独立写，再查看提示或题解', '隔两天脱离原代码重写其中一题并说明复杂度'],
        '两题通过边界用例，至少一题完成延迟重写并能解释时间、空间复杂度。',
        [{ title: '力扣', url: LEETCODE }, { title: '洛谷', url: LUOGU }]),
      task('java-foundation-1', '后端／AI项目 4h：Java 类与首次模型 API 练习', 'backend', 'core', 240,
        '建立命令行项目所需的 Java 基础，并用熟悉的 Python 完成第一次轻量模型接口练习。',
        ['约 3 小时：复习方法、学习类、对象、构造方法和封装，写 Device 类并完成基本操作', '约 1 小时：用熟悉的 Python 调用一个已有权限的模型 API，API Key 只放环境变量且不得提交', '要求模型返回约定的 JSON 字段；解析结果并对缺字段、类型错误或无效 JSON 给出明确失败', '用 Git 提交可运行代码；核心 Java 代码先独立写，完成后再让 AI 审查边界情况'],
        'Java Device 类可独立重写；Python 脚本能解析结构化结果并处理至少一种异常响应，仓库不含密钥。',
        [{ title: '黑马 Java 基础上部', url: JAVA_UPPER }, { title: 'Java 官方学习文档', url: JAVA_LEARN }, { title: 'Python JSON 文档', url: PYTHON_JSON }]),
      task('english-reading-1', '英语 4h：词汇与 2 篇阅读', 'direction', 'support', 240,
        '建立词汇复习与真题精读的固定流程。',
        ['词汇复习 6 天，每天约 20—30 分钟', '完成两篇较早年份英语一阅读，首次作答记录耗时', '逐题定位原文并解释错误选项', '只整理真正影响理解的词汇和长句'],
        '两篇阅读都有正确率、耗时、原文依据与错因记录。',
        []),
      task('review-week-1', '周复盘 1h：核对六类真实投入', 'choice', 'support', 60,
        '第一周先验证 24 小时结构能否落地。',
        ['分别统计数学、408、Java 算法、英语、项目和复盘时长', '确认模型 API 练习计入项目 4 小时，没有额外叠加时间', '记录仍不能独立完成的一道题和一段代码', '检查密钥未入库，并写下结构化结果解析最容易失败的地方'],
        '本站保存六类投入、未完成原因和下周两个重点。',
        []),
    ],
  },
  '2026-10-05': {
    theme: '第2周：连续、链表与面向对象',
    result: '完成 24 小时：极限方法与连续、顺序表和链表、类与接口、内存设备列表，并用 AI 辅助补测试和排错。',
    tasks: [
      task('math-continuity', '数学 8h：极限方法与连续', 'engineering', 'core', 480,
        '巩固极限方法并进入函数连续与间断点。',
        ['重做上周代表性错题', '学习等价无穷小、洛必达前置条件之外的常见极限方法、连续与间断点', '完成讲义例题、660 对应练习与至少 3 道完整大题', '安排一周后重做本周代表题'],
        '能判断连续性与间断点类型，常见极限题有完整过程而非只写答案。',
        [{ title: '武忠祥高数基础课程', url: WU_CALCULUS }]),
      task('ds-linked-list', '408 5h：顺序表与链表', 'portfolio', 'core', 300,
        '链表是数据结构首轮和 Java 集合理解的共同基础。',
        ['完成王道线性表章节题', '独立实现单链表建立、查找、插入和删除', '画图解释头结点、指针变化和边界情况', '比较顺序表与链表在时间、空间和缓存局部性上的差异'],
        '章节题完成；单链表核心操作可脱离模板重写并通过空表、首尾节点用例。',
        [{ title: '王道数据结构课程', url: WANGDAO_DS }]),
      task('java-algo-2', 'Java 算法 2h：反转链表与合并链表', 'algorithm', 'core', 120,
        '用题目检验链表指针操作是否真正掌握。',
        ['完成力扣 206 反转链表', '完成力扣 21 合并两个有序链表', '为每题画出至少一次指针变化', '隔几天重新独立写一题'],
        '两题通过并完成一次延迟重写，能解释迭代过程与复杂度。',
        [{ title: '力扣', url: LEETCODE }]),
      task('java-foundation-2', '后端／AI项目 4h：设备列表与 AI 辅助测试', 'backend', 'core', 240,
        '把面向对象内容落到命令行程序，并建立“AI 建议—自行检查—运行验证”的编程习惯。',
        ['学习接口和基本集合，用 List 保存设备并实现新增与列表查询', '先自己列出空列表、重复编号和非法输入等边界，再让 AI 补充测试场景', '只采纳能解释的测试或修复建议，逐项运行并记录实际结果', '将输入、业务处理和输出拆成清楚的方法并提交 Git'],
        '新增和查询可运行；至少一组 AI 辅助测试已自行检查和执行，能解释采纳或拒绝建议的原因。',
        [{ title: '黑马 Java 基础上部', url: JAVA_UPPER }, { title: 'Java 官方学习文档', url: JAVA_LEARN }]),
      task('english-reading-2', '英语 4h：词汇与 2 篇阅读', 'direction', 'support', 240,
        '继续稳定流程并开始归类错误。',
        ['词汇复习 6 天', '完成两篇较早年份英语一阅读并记录首次耗时', '将错题归为词汇、长句、定位或选项比较', '选择一个长句，第二天不看解析重新翻译'],
        '两篇阅读都有原文依据和错误类型；完成一次长句延迟复现。',
        []),
      task('review-week-2', '周复盘 1h：检查解题与代码独立性', 'choice', 'support', 60,
        '视频和题解进度不能代替独立完成。',
        ['闭卷完成一次数学与数据结构小测', '脱离课程重写设备新增和查询主流程', '统计六类真实投入和睡眠影响', '若数学或 408 落后两周趋势明显，下周暂停增加项目功能'],
        '留下小测结果、代码复写结果和明确的负荷调整。',
        []),
    ],
  },
  '2026-10-12': {
    theme: '第3周：导数、栈队列与集合',
    result: '完成 24 小时：导数与微分、链表和栈队列、Java 异常集合与 CRUD，以及第二次模型 API 结构化结果练习。',
    tasks: [
      task('math-derivative', '数学 8h：导数与微分', 'engineering', 'core', 480,
        '把极限过渡到导数定义和基础计算。',
        ['学习导数定义、求导法则、复合函数、隐函数和微分', '完成讲义例题、660 对应练习与讲义大题', '保留使用定义或分段讨论的题，不能只练套公式', '重做第 1 周极限代表错题'],
        '能从定义解释导数并独立完成常规求导；延迟重做结果有记录。',
        [{ title: '武忠祥高数基础课程', url: WU_CALCULUS }]),
      task('ds-stack-queue', '408 5h：链表练习、栈与队列', 'portfolio', 'core', 300,
        '继续巩固链表，并建立后续树和图需要的辅助结构。',
        ['完成链表旧题复做', '学习栈、队列与循环队列', '完成王道对应选择题和基础综合题', '独立实现顺序栈与循环队列并覆盖队空、队满边界'],
        '链表旧题可独立完成；能画出入队出队过程并重写栈、队列核心操作。',
        [{ title: '王道数据结构课程', url: WANGDAO_DS }]),
      task('java-algo-3', 'Java 算法 2h：有效括号与用栈实现队列', 'algorithm', 'core', 120,
        '把栈和队列知识转化为 Java 代码。',
        ['完成力扣 20 有效的括号', '完成力扣 232 用栈实现队列', '补齐空结构、连续操作等边界用例', '隔日重新完成其中一题'],
        '两题通过，至少一题可脱离题解重写并解释辅助结构的作用。',
        [{ title: '力扣', url: LEETCODE }]),
      task('java-foundation-3', '后端／AI项目 4h：CRUD 与第二次模型 API 练习', 'backend', 'core', 240,
        '完成内存版 CRUD，并把模型调用练习扩展到更严格的结构校验和失败处理。',
        ['约 3 小时：学习异常、泛型与集合，完成设备新增、查询、修改、删除及非法输入处理', '约 1 小时：用 Python 再调用一次模型 API，要求返回包含列表或嵌套字段的结构化结果', '模拟缺字段、错误类型、超时或拒答中的至少一种情况，确保程序不会静默接受错误数据', '可让 AI 协助生成测试与定位错误，但每个改动都要自行运行、检查并解释后再提交'],
        '内存版 CRUD 可运行；第二次 API 练习包含结构校验和失败用例，仓库无密钥且改动可解释。',
        [{ title: '黑马 Java 基础下部', url: JAVA_LOWER }, { title: 'Java 官方学习文档', url: JAVA_LEARN }, { title: 'Python JSON 文档', url: PYTHON_JSON }]),
      task('english-reading-3', '英语 4h：词汇与 2 篇阅读', 'direction', 'support', 240,
        '通过连续三周数据找出主要错误模式。',
        ['词汇复习 6 天', '精读两篇英语一阅读并记录首次耗时', '更新词汇、长句、定位和选项比较的错误次数', '只针对出现最多的一类错误安排下周动作'],
        '完成两篇精读和三周错因统计，能指出当前第一薄弱项。',
        []),
      task('review-week-3', '周复盘 1h：隔周重做与负荷检查', 'choice', 'support', 60,
        '检验第一周内容是否形成长期记忆。',
        ['重做第 1 周代表性数学题和二分查找', '记录独立完成、提示后完成、仍不会三种状态', '核对六类实际时长是否接近 24 小时', '连续两周超负荷时先减项目功能和额外视频'],
        '得到延迟复测结果，并明确保持、缩量或补漏。',
        []),
    ],
  },
  '2026-10-19': {
    theme: '第4周：导数应用、栈队列应用与命令行版本',
    result: '完成 24 小时：导数应用和前三周错题小测、栈队列应用、命令行设备管理程序与 Git 版本。',
    tasks: [
      task('math-app-review', '数学 8h：导数应用与前三周错题小测', 'engineering', 'core', 480,
        '把计算转化为函数分析，并用月测检验首月内容。',
        ['学习单调性、极值、最值和基础函数性态分析', '重做前三周代表错题', '完成一次覆盖极限、连续、导数的限时小测', '按知识、方法、计算与粗心分类失分'],
        '能独立完成常规函数分析；月测和错因分类可用于决定下月进度。',
        [{ title: '武忠祥高数基础课程', url: WU_CALCULUS }]),
      task('ds-stack-queue-app', '408 5h：栈队列应用与旧题复做', 'portfolio', 'core', 300,
        '巩固首月数据结构，避免只追新章节。',
        ['复做数组、链表的代表题', '学习括号匹配、表达式处理和队列典型应用', '完成王道对应章节题', '闭卷画出至少一道栈或循环队列过程'],
        '旧题复做结果有记录；栈队列应用题能说明过程、边界与复杂度。',
        [{ title: '王道数据结构课程', url: WANGDAO_DS }]),
      task('java-algo-4', 'Java 算法 2h：首月旧题复做', 'algorithm', 'core', 120,
        '用复做判断算法题是否真正掌握。',
        ['从前 3 周题目中随机选 3 题', '限时独立完成，不看旧代码', '未完成的题只记录卡点，次日再尝试', '整理一个可复用但能解释的输入输出模板'],
        '至少 3 题完成限时复做，能说明仍不稳定的题型。',
        [{ title: '力扣', url: LEETCODE }, { title: '洛谷', url: LUOGU }]),
      task('java-cli-v1', '后端／AI项目 4h：命令行版本、测试与 Git', 'backend', 'core', 240,
        '形成首月可展示的小成果，并留下 AI 辅助过程可审查、可解释的证据。',
        ['整合设备新增、查询、修改与删除，加入菜单循环和基本输入校验', '补充文件读写；时间不足时先完成一种格式的写入和读取', '让 AI 审查测试遗漏或一个真实报错；自行复现、验证建议并记录最终采用的修改', '整理 README：运行方式、功能、模型 API 小练习、测试证据、已知限制，并打 Git 标签'],
        '命令行程序可重新运行；主要功能可独立解释，AI 建议经过测试验证，README 与 Git 历史清楚。',
        [{ title: 'Git 中文教程', url: GIT_BOOK }, { title: 'Java 官方学习文档', url: JAVA_LEARN }]),
      task('english-reading-4', '英语 4h：阅读复盘与长句整理', 'direction', 'support', 240,
        '完成首月阅读闭环并确定下一月薄弱项。',
        ['继续词汇复习 6 天', '完成两篇较早年份英语一阅读', '统计四周正确率、平均首次耗时和错误类型', '整理最有代表性的长句，并制定下月唯一改进动作'],
        '完成四周阅读统计，能用数据说明下一月重点。',
        []),
      task('monthly-checkpoint', '周复盘 1h：双主线月度验收', 'choice', 'support', 60,
        '用解题、代码和真实投入决定下一月计划。',
        ['记录数学小测、数据结构复做、算法复做和命令行项目结果', '检查两次模型 API 练习、AI 辅助测试和密钥安全记录', '统计六类四周平均投入，不重复计时；如果数学或 408 落后两周以上，暂停增加 AI 功能', '把完成证据、卡点和下一月两个重点带到计划更新会话'],
        '得到首月验收表，并明确下一月正常推进、缩量或补漏。',
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
  return '第 ' + weekNumber + ' / ' + totalWeeks + ' 周'
}

function task(id, title, category, priority, minutes, outcome, steps, deliverable, resources) {
  return { id, title, category, priority, minutes, outcome, steps, deliverable, resources }
}
