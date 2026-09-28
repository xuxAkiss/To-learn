const FUDAN_ADMISSION = 'https://gsao.fudan.edu.cn/ssyjszszcwzszymlwfslqbf/list.htm'
const SPRING_REST = 'https://spring.io/guides/gs/rest-service/'
const SPRING_MYSQL = 'https://spring.io/guides/gs/accessing-data-mysql/'
const SPRING_TESTING = 'https://spring.io/guides/gs/testing-web/'
const JAVA_LEARN = 'https://dev.java/learn/'
const MYSQL_TUTORIAL = 'https://dev.mysql.com/doc/refman/8.4/en/tutorial.html'
const LEETCODE = 'https://leetcode.cn/problemset/'

export const learningStrategy = {
  summary: '双目标：参加 2027 年底初试，冲刺复旦计算机类专硕；同时形成后端开发／AI 应用后端的实习与就业竞争力。2027 年 6 月底前完成数学与 408 首轮，并做出一个能独立讲清、可评测的 AI 应用后端项目。',
  examRule: '目前按数学一、英语一、408、政治准备；你参加的是 2028 年招生，最终专业、科目、统考名额和学费必须以 2027 年秋发布的官方目录为准。',
  timeRule: '学期内仍执行每周 24 小时：数学 8 小时、408 笔试 5 小时、Java 算法 2 小时、英语 4 小时、Java／AI 应用项目 4 小时、周复盘 1 小时。模型 API、RAG、工具调用和评测都从原项目时间内分配，不额外增加总时长。',
  scopeRule: '近期推进高数、数据结构、Java 和英语；每两周从项目时间中拿出一次小练习，用熟悉的 Python 调用模型 API 并解析结构化结果。只学应用所需的模型接口、Embedding、RAG、工具调用与评测，不同时铺开大模型训练、微调和论文研究。',
  checkpoints: [
    '2026 年 11 月底：Java 与算法继续推进，每两周完成一次 Python 模型 API／结构化结果小练习，并开始用 AI 辅助测试和排错',
    '2027 年 2 月底：完成 SQL、HTTP、数据库与基础后端，让项目接入一个简单模型功能',
    '2027 年 4 月底：基础预约业务完成，实现带引用的文档问答，并理解 Embedding 与 RAG 数据流',
    '2027 年 6 月底：加入查询与预约工具调用，建立小型评测集，项目可演示、可解释并可写进简历',
    '2027 年 7 月以后：考研强化为主，项目只通过修错和评测维护，不继续增加框架',
  ],
}

export const lanes = [
  {
    id: 'engineering',
    name: '数学',
    color: 'blue',
    items: [
      { id: 'calculus-foundation', title: '高数基础', start: '2026-09', end: '2027-01', note: '武忠祥基础课与讲义为主。先做例题与练习，卡住再看对应讲解；同步完成 660 对应章节。' },
      { id: 'linear-algebra', title: '线代基础', start: '2027-01', end: '2027-03', note: '按章节摸底决定听课量，使用李永乐课程与辅导讲义，不能用听完课程替代独立解题。' },
      { id: 'probability', title: '概率统计基础', start: '2027-03', end: '2027-06', note: '补齐概率与数理统计，完成讲义例题、660 与阶段混合测试。' },
      { id: 'math-intensive', title: '强化、真题与冲刺', start: '2027-07', end: '2027-12', note: '强化讲义、错题重做、综合题与真题逐步推进，近期真题留作后期完整模拟。' },
    ],
  },
  {
    id: 'portfolio',
    name: '408 / Java算法',
    color: 'mint',
    items: [
      { id: 'data-structure', title: '数据结构与 Java 实现', start: '2026-09', end: '2027-02', note: '王道章节学习、选择题、综合题与 Java 实现同步推进；每周约 3 道算法题，读过题解后必须隔日重写。', resources: [{ title: 'LeetCode 题库', url: LEETCODE }] },
      { id: 'computer-organization', title: '计算机组成原理', start: '2026-12', end: '2027-02', note: '覆盖数据表示、存储、指令、CPU 与 I/O，计算题必须动手完成。' },
      { id: 'operating-system', title: '操作系统', start: '2027-03', end: '2027-04', note: '重点掌握进程线程、调度、同步互斥、死锁、内存、文件与 I/O。' },
      { id: 'network-first-round', title: '计网与首轮收口', start: '2027-05', end: '2027-06', note: '先做题定位薄弱处，再回看对应章节；同时补齐前三科缺口，6 月底结束首轮。' },
      { id: '408-intensive', title: '强化、真题与冲刺', start: '2027-07', end: '2027-12', note: '四科第二轮、综合题、跨章节训练和真题套卷；就业算法只做保温，不挤占主线。' },
    ],
  },
  {
    id: 'backend',
    name: '后端 / AI应用',
    color: 'violet',
    items: [
      { id: 'java-foundation', title: 'Java 基础与模型 API 小练习', start: '2026-09', end: '2026-11', note: 'Java 语法、集合、文件读写和命令行程序继续；每两周从项目时间中安排一次 Python 模型 API 小练习，解析 JSON 等结构化结果。核心算法先独立写，再让 AI 审查；AI 生成的测试与修复必须自己运行、检查并解释。', resources: [{ title: 'Java 官方学习文档', url: JAVA_LEARN }] },
      { id: 'mysql-jdbc', title: 'SQL、HTTP、基础后端与模型功能', start: '2026-12', end: '2027-02', note: '学习 SQL、HTTP、表设计、事务、索引与数据库访问；完成基础后端，并接入一个范围明确的简单模型功能。模型失败、超时和无效结构必须有处理。', resources: [{ title: 'MySQL 官方入门', url: MYSQL_TUTORIAL }] },
      { id: 'spring-backend', title: '预约业务与带引用文档问答', start: '2027-03', end: '2027-04', note: '完成设备与时段查询、创建和取消预约、个人预约查询及管理员维护；学习 Embedding 与 RAG，实现回答中可追溯到原文片段的文档问答。', resources: [{ title: 'Spring REST', url: SPRING_REST }, { title: 'Spring 连接 MySQL', url: SPRING_MYSQL }, { title: 'Spring Web 测试', url: SPRING_TESTING }] },
      { id: 'resume-project', title: '工具调用、评测与简历', start: '2027-05', end: '2027-06', note: '让模型通过受控工具查询设备与执行预约；覆盖参数校验、权限、失败回退和幂等。建立包含正常、边界、无答案与恶意输入的小型评测集，留下结果、README、演示和简历表述。' },
      { id: 'project-maintenance', title: '修错与评测维护', start: '2027-07', end: '2027-12', note: '考研强化为主。项目停止增加框架，只根据真实错误修复代码、回归评测、更新文档与准备项目讲解。' },
    ],
  },
  {
    id: 'experiments',
    name: '英语 / 政治',
    color: 'amber',
    items: [
      { id: 'english-reading', title: '词汇与英语一阅读', start: '2026-09', end: '2027-05', note: '固定词汇工具，每周精读 2—3 篇较早年份阅读，记录首次耗时、正确率、原文依据与错因。' },
      { id: 'english-all-types', title: '英语全题型', start: '2027-06', end: '2027-08', note: '持续阅读，逐步加入翻译、新题型和作文入门。' },
      { id: 'politics', title: '政治系统复习', start: '2027-07', end: '2027-12', note: '暑假开始系统学习与章节选择题，后期使用对应年度背诵和冲刺材料。' },
      { id: 'english-papers', title: '英语套卷与作文', start: '2027-09', end: '2027-12', note: '进行完整套卷与限时作文，保留近 3—5 年真题用于后期模拟。' },
    ],
  },
  {
    id: 'choices',
    name: '求职 / 报考',
    color: 'green',
    items: [
      { id: 'internship-watch', title: '后端／AI应用岗位与投递', start: '2027-04', end: '2027-06', note: '4—6 月开始关注 Java 后端与 AI 应用后端实习，不等项目完美；按岗位描述和面试反馈定向补课。' },
      { id: 'summer-tradeoff', title: '实习与强化取舍', start: '2027-07', end: '2027-08', note: '无实习可执行每周 35—40 小时强化；全职实习必须单独重排，不能与强化量直接叠加。' },
      { id: 'catalog-and-autumn', title: '目录核对与秋招备选', start: '2027-09', end: '2027-10', note: '核对 2028 招生目录，同时整理岗位清单；投递、笔试和面试集中在固定时间内。', resources: [{ title: '复旦大学 · 招生章程与专业目录', url: FUDAN_ADMISSION }] },
      { id: 'post-exam', title: '复试、实习与春招', start: '2027-12', end: '2027-12', note: '初试后增加 Java 机考，整理项目与本科课程，并根据考试表现继续实习或春招申请。' },
    ],
  },
]

export const decisions = [
  {
    id: 'rhythm', date: '2026-10-25', title: '四周双线节奏是否可持续',
    why: '验证每周 24 小时是否能同时维持考研基础与后端／AI 应用起步，而不挤压学校课程和睡眠。',
    standards: ['数学与数据结构有实际做题记录', 'Java 能独立写出当周小程序', '至少完成一次 Python 模型 API 结构化结果练习', '英语完成每周 2 篇精读', '六类时间分别记录且没有重复计时'],
    adjust: ['连续两周超负荷：先减项目功能与额外视频', '数学或 408 落后两周以上：暂停增加新技术', '节奏稳定：继续推进命令行设备管理程序'],
  },
  {
    id: 'foundation', date: '2026-11-30', title: '共同基础验收',
    why: '阶段一必须同时留下解题证据和可运行程序，避免只学考试或只看 Java 课程。',
    standards: ['能独立写二分、链表反转并解释复杂度', '命令行设备管理程序可脱离视频重写', '模型 API 响应能校验并解析为结构化结果', 'AI 辅助生成的测试或修复已自行运行、检查和解释', '高数常规题有错因记录'],
    adjust: ['Java 基础薄弱：寒假前补集合与文件读写', '数学或数据结构薄弱：减少项目范围继续打基础', '达标：进入数据库、JDBC 与计组'],
  },
  {
    id: 'backend-entry', date: '2027-02-28', title: '数据库与计组验收',
    why: '进入 Spring Boot 前，必须会 SQL、Java 数据库读写，并完成数据结构首轮与计组主要章节。',
    standards: ['能独立写多表查询与分组统计', 'Java 程序能使用参数化查询读写 MySQL', '能说明一次 HTTP 请求和一次模型调用的失败处理', '项目已有一个简单、可测试的模型功能', '数据结构首轮结束且计组主要章节完成'],
    adjust: ['SQL 不熟：延后 AI 功能，先补查询与表设计', '计组落后：压缩模型功能范围', '达标：3 月进入基础业务、RAG 与操作系统'],
  },
  {
    id: 'resume-ready', date: '2027-06-30', title: '首轮与简历项目验收',
    why: '6 月底是考研首轮、项目完成度和暑期实习选择共同收口的节点。',
    standards: ['数学与 408 首轮完成并有做题记录', '项目可按 README 启动并有核心接口测试', '文档回答能展示引用，查询与预约工具调用受参数和权限约束', '评测集覆盖正常、边界、无答案与失败场景', '完成一页简历和一次 5 分钟项目讲解', '4—6 月已有岗位关注或投递记录'],
    adjust: ['考研首轮落后：暑假优先补齐首轮', '项目仍不稳定：停止加功能，只修可演示主链路', '获得全职实习：按真实工时重排强化计划'],
  },
  {
    id: 'intensive-end', date: '2027-08-31', title: '强化与就业负荷评估',
    why: '暑假结束后主要精力将转向真题和冲刺，需要确认强化质量与就业维护成本。',
    standards: ['数学与 408 完成完整限时试卷', '能统计知识、方法、计算和时间类失分', '就业准备控制在固定时段', '政治已启动且英语全题型开始覆盖'],
    adjust: ['强化明显不足：9 月暂停非必要投递', '实习占用过高：降低套卷数量并重排', '项目只修错和跑评测，不新增框架', '状态稳定：进入真题、目录核对与报名'],
  },
  {
    id: 'catalog', date: '2027-09-30', title: '报考与秋招取舍',
    why: '官方目录、连续模考和秋招机会需要放在同一时间窗口里做现实选择。',
    standards: ['核对专业代码、初试科目、统考计划和学费', '根据连续模考确定主目标与备选', '列出目标岗位和固定求职时段', '明确初试冲刺不可被打断的时间块'],
    adjust: ['科目变化：立即补官方大纲差异', '目标风险过高：评估备选院校与就业路径', '冲刺压力大：减少投递批次，项目仅维护'],
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
    deliverable: '章节小测、综合题和一项可运行的 Java 实现',
    checks: ['完成王道章节选择题与综合题', '脱离资料解释本周核心概念', '用 Java 实现对应数据结构或算法'],
  },
  {
    id: 'java', title: 'Java与算法独立性', window: '每周日', status: 'active',
    question: '我能否脱离课程和题解，独立写出本周 Java 代码？',
    deliverable: '一个可运行小程序、约 3 道算法题和隔日复写记录',
    checks: ['先独立实现再查看提示', '代码覆盖边界用例', '读过题解的题隔日重新完成'],
  },
  {
    id: 'backend', title: '后端／AI应用项目证据', window: '每两周', status: 'planned',
    question: '模型能力是否被后端约束、测试和评测，而不是只做一次成功演示？',
    deliverable: '可运行版本、引用或工具调用记录、测试、评测结果与 README',
    checks: ['按 README 可重新启动', '模型输出有结构校验、失败处理或引用', 'AI 生成代码已自行检查、运行并能解释', '能说明一个真实问题而不虚构效果或规模'],
  },
  {
    id: 'english', title: '英语阅读诊断', window: '每两周', status: 'active',
    question: '主要失分来自词汇、长句、定位，还是选项比较？',
    deliverable: '正确率、首次耗时、原文依据和错误类型统计',
    checks: ['不查词完成首次作答并记录时间', '逐题定位原文依据', '解释每个错误选项为什么错'],
  },
  {
    id: 'workload', title: '双线负荷诊断', window: '每月末', status: 'planned',
    question: '24 小时计划是否可持续，考研、算法和项目是否被重复计时？',
    deliverable: '六类真实投入、睡眠与学校课程影响，以及下月调整',
    checks: ['分别统计数学、408、算法、英语、项目与复盘', '记录未完成原因和睡眠情况', '连续超负荷时先减项目功能和额外视频'],
  },
]

export const milestones = [
  { date: '2026-09-26', title: '启动考研与就业双主线', state: 'done' },
  { date: '2026-10-25', title: '完成首个四周节奏验证', state: 'current' },
  { date: '2026-11-30', title: 'Java基础＋模型API小练习', state: 'planned' },
  { date: '2027-02-28', title: '基础后端接入模型功能', state: 'planned' },
  { date: '2027-04-30', title: '完成业务后端与引用问答', state: 'planned' },
  { date: '2027-06-30', title: '工具调用、评测与简历完成', state: 'planned' },
  { date: '2027-08-31', title: '完成强化并评估就业负荷', state: 'planned' },
  { date: '2027-09-30', title: '确认报考与秋招取舍', state: 'planned' },
  { date: '2027-12-31', title: '完成初试并转复试／春招', state: 'planned' },
]
