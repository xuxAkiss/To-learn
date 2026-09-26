const FUDAN_ADMISSION = 'https://gsao.fudan.edu.cn/ssyjszszcwzszymlwfslqbf/list.htm'
const SPRING_REST = 'https://spring.io/guides/gs/rest-service/'
const SPRING_MYSQL = 'https://spring.io/guides/gs/accessing-data-mysql/'
const SPRING_TESTING = 'https://spring.io/guides/gs/testing-web/'
const JAVA_LEARN = 'https://dev.java/learn/'
const MYSQL_TUTORIAL = 'https://dev.mysql.com/doc/refman/8.4/en/tutorial.html'
const LEETCODE = 'https://leetcode.cn/problemset/'

export const learningStrategy = {
  summary: '双目标：参加 2027 年底初试，冲刺复旦计算机类专硕；同时形成 Java 后端实习、就业的基本竞争力。2027 年 6 月底前完成数学与 408 首轮，并做出一个能独立讲清的后端项目。',
  examRule: '目前按数学一、英语一、408、政治准备；你参加的是 2028 年招生，最终专业、科目、统考名额和学费必须以 2027 年秋发布的官方目录为准。',
  timeRule: '学期内先执行每周 24 小时：数学 8 小时、408 笔试 5 小时、Java 算法 2 小时、英语 4 小时、Java／后端项目 4 小时、周复盘 1 小时。三类编程与笔试时间分别记录，不重复计时。',
  scopeRule: '近期只推进高数、数据结构、Java 和英语。先做小程序与命令行设备管理，再进入 MySQL、JDBC 和 Spring Boot；不同时扩张多套框架、桌面 GUI、复杂小游戏或无关项目。',
  checkpoints: [
    '2026 年 11 月底：高数与数据结构推进，Java 集合与文件读写完成，命令行设备管理程序可独立重写',
    '2027 年 2 月底：数据结构首轮结束，计组主要章节完成，Java 程序能够读写 MySQL',
    '2027 年 4 月底：Spring Boot 项目主要接口可运行、可测试、可讲清请求到数据库的过程',
    '2027 年 6 月底：数学与 408 首轮结束，项目可写进简历，并开始实习投递与面试复盘',
    '2027 年 7—8 月：考研强化为主，就业仅保留算法、项目复盘与定向投递',
    '2027 年 9 月起：主要精力转向初试；秋招与项目维护放进固定时间窗口',
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
    name: 'Java后端 / 项目',
    color: 'violet',
    items: [
      { id: 'java-foundation', title: 'Java 基础与命令行程序', start: '2026-09', end: '2026-11', note: '语法、类与接口、异常、泛型、集合、文件读写；完成命令行设备管理程序，不做桌面 GUI。', resources: [{ title: 'Java 官方学习文档', url: JAVA_LEARN }] },
      { id: 'mysql-jdbc', title: 'MySQL、JDBC 与 Git', start: '2026-12', end: '2027-02', note: '学习 SQL、表设计、事务、索引与参数化查询；用用户、设备、固定可预约时段、预约记录四张核心表，将命令行程序迁移到 MySQL。', resources: [{ title: 'MySQL 官方入门', url: MYSQL_TUTORIAL }] },
      { id: 'spring-backend', title: 'Spring Boot 可运行后端', start: '2027-03', end: '2027-04', note: '按 HTTP、Maven、接口、校验、业务、数据库、异常与测试推进；实现设备与时段查询、创建和取消预约、个人预约查询、管理员维护设备。', resources: [{ title: 'Spring REST', url: SPRING_REST }, { title: 'Spring 连接 MySQL', url: SPRING_MYSQL }, { title: 'Spring Web 测试', url: SPRING_TESTING }] },
      { id: 'resume-project', title: '并发、幂等、性能与简历', start: '2027-05', end: '2027-06', note: '解决同时预约、重复请求和慢查询；补 Linux 运行与日志操作，留下测试、性能说明、README、一页简历与 5 分钟项目讲解。算法累计目标约 60—80 道认真做过且能复做的题。' },
      { id: 'project-maintenance', title: '项目维护与面试复盘', start: '2027-07', end: '2027-12', note: '停止堆功能，只保留每周少量算法、项目复述、面试问题整理与必要修复。' },
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
      { id: 'internship-watch', title: '实习岗位与定向投递', start: '2027-04', end: '2027-06', note: '4—6 月开始关注 Java 后端实习并尝试投递，不等项目完美；按面试反馈定向补课。' },
      { id: 'summer-tradeoff', title: '实习与强化取舍', start: '2027-07', end: '2027-08', note: '无实习可执行每周 35—40 小时强化；全职实习必须单独重排，不能与强化量直接叠加。' },
      { id: 'catalog-and-autumn', title: '目录核对与秋招备选', start: '2027-09', end: '2027-10', note: '核对 2028 招生目录，同时整理岗位清单；投递、笔试和面试集中在固定时间内。', resources: [{ title: '复旦大学 · 招生章程与专业目录', url: FUDAN_ADMISSION }] },
      { id: 'post-exam', title: '复试、实习与春招', start: '2027-12', end: '2027-12', note: '初试后增加 Java 机考，整理项目与本科课程，并根据考试表现继续实习或春招申请。' },
    ],
  },
]

export const decisions = [
  {
    id: 'rhythm', date: '2026-10-25', title: '四周双线节奏是否可持续',
    why: '验证每周 24 小时是否能同时维持考研基础与 Java 后端起步，而不挤压学校课程和睡眠。',
    standards: ['数学与数据结构有实际做题记录', 'Java 能独立写出当周小程序', '英语完成每周 2 篇精读', '六类时间分别记录且没有重复计时'],
    adjust: ['连续两周超负荷：先减项目功能与额外视频', '数学或 408 落后两周以上：暂停增加新技术', '节奏稳定：继续推进命令行设备管理程序'],
  },
  {
    id: 'foundation', date: '2026-11-30', title: '共同基础验收',
    why: '阶段一必须同时留下解题证据和可运行程序，避免只学考试或只看 Java 课程。',
    standards: ['能独立写二分、链表反转并解释复杂度', '能比较数组、链表、哈希表场景', '命令行设备管理程序可脱离视频重写', '高数常规题有错因记录'],
    adjust: ['Java 基础薄弱：寒假前补集合与文件读写', '数学或数据结构薄弱：减少项目范围继续打基础', '达标：进入数据库、JDBC 与计组'],
  },
  {
    id: 'backend-entry', date: '2027-02-28', title: '数据库与计组验收',
    why: '进入 Spring Boot 前，必须会 SQL、Java 数据库读写，并完成数据结构首轮与计组主要章节。',
    standards: ['能独立写多表查询与分组统计', 'Java 程序能使用参数化查询读写 MySQL', '能用 Git 提交、查看差异并回退自己的改动', '数据结构首轮结束且计组主要章节完成'],
    adjust: ['SQL 不熟：延后框架，先补查询与表设计', '计组落后：压缩项目附加功能', '达标：3 月进入 Spring Boot 与操作系统'],
  },
  {
    id: 'resume-ready', date: '2027-06-30', title: '首轮与简历项目验收',
    why: '6 月底是考研首轮、项目完成度和暑期实习选择共同收口的节点。',
    standards: ['数学与 408 首轮完成并有做题记录', '项目可按 README 启动并有核心接口测试', '能讲清并发预约、幂等或性能优化中的至少两个问题', '完成一页简历和一次 5 分钟项目讲解', '4—6 月已有岗位关注或投递记录'],
    adjust: ['考研首轮落后：暑假优先补齐首轮', '项目仍不稳定：停止加功能，只修可演示主链路', '获得全职实习：按真实工时重排强化计划'],
  },
  {
    id: 'intensive-end', date: '2027-08-31', title: '强化与就业负荷评估',
    why: '暑假结束后主要精力将转向真题和冲刺，需要确认强化质量与就业维护成本。',
    standards: ['数学与 408 完成完整限时试卷', '能统计知识、方法、计算和时间类失分', '就业准备控制在固定时段', '政治已启动且英语全题型开始覆盖'],
    adjust: ['强化明显不足：9 月暂停非必要投递', '实习占用过高：降低套卷数量并重排', '状态稳定：进入真题、目录核对与报名'],
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
    id: 'backend', title: '后端项目证据', window: '每两周', status: 'planned',
    question: '项目是否留下了可以运行、测试、讲解和写进简历的证据？',
    deliverable: '可运行版本、测试、README 与问题解决记录',
    checks: ['按 README 可重新启动', '核心功能有正常与失败测试', '能说明一个真实解决的问题而不虚构规模'],
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
  { date: '2026-11-30', title: '完成命令行设备管理程序', state: 'planned' },
  { date: '2027-02-28', title: '进入数据库与后端开发', state: 'planned' },
  { date: '2027-04-30', title: '完成可运行 Spring Boot 后端', state: 'planned' },
  { date: '2027-06-30', title: '首轮结束、项目进入简历', state: 'planned' },
  { date: '2027-08-31', title: '完成强化并评估就业负荷', state: 'planned' },
  { date: '2027-09-30', title: '确认报考与秋招取舍', state: 'planned' },
  { date: '2027-12-31', title: '完成初试并转复试／春招', state: 'planned' },
]
