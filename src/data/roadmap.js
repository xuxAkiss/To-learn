export const learningStrategy = {
  summary: '整体主线仍是开发能力 → 作品 → 实习 → 毕业选择；先用 Unity 完成一个小作品，再评估 UE，不同时开两套引擎课程。',
  engineRule: 'Unity 不是 UE 的必修前置。11 月只是预计评估窗口：作品验收后，如仍以 UE 岗位为目标，再学蓝图并结合 C++；独立游戏可以继续用 Unity。',
  foundationRule: '持续保留 Git、算法、计算机系统、GPA 与英语。后端/AI 应用、AI Infra、科研和考公是限时验证的备选，不要求同时推进。',
  competitionRule: '比赛选做，当前不绑定团结引擎或获奖；若以后参赛，再单独核对赛事规则和引擎要求。',
  releaseGate: ['发布可独立运行的小作品，并留下 README、视频和试玩反馈', '脱离教程解释核心逻辑，独立修改一个小需求、定位一个问题', '一次只选一条项目主线；未完成先缩小范围，不因日期到了强制换引擎'],
}

export const lanes = [
  {
    id: 'engineering',
    name: '工程能力',
    color: 'blue',
    items: [
      { id: 'tuanjie', title: 'C# / Unity 小作品', start: '2026-08', end: '2026-10', note: '先做 Essentials 编辑器入门，再按需学 C#，完成从编码到发布的闭环；不要求学完全部课程。', resources: [{ title: 'Unity Learn · Essentials', url: 'https://learn.unity.com/pathway/unity-essentials' }, { title: 'Unity Learn · Junior Programmer', url: 'https://learn.unity.com/pathway/junior-programmer' }] },
      { id: 'cpp', title: '算法保温 / C++ 渐进', start: '2026-09', end: '2027-03', note: '初期用熟悉的语言维持算法练习；Unity 小作品收尾后逐步增加 C++，不同时从零重学两门语言。', resources: [{ title: 'Microsoft Learn · C++ 入门', url: 'https://learn.microsoft.com/zh-cn/cpp/get-started/?view=msvc-170' }, { title: 'LeetCode 中文站', url: 'https://leetcode.cn/' }] },
      { id: 'ue', title: 'UE 蓝图 + C++（待验收）', start: '2026-11', end: '2027-02', note: '预计窗口，不是强制切换日期。小作品验收且仍选择 UE 求职后，先用蓝图搭玩法，再把一个机制落到 C++；控制为小型动作 Demo。', resources: [{ title: 'Epic · 蓝图与 C++ 如何结合', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/coding-in-unreal-engine-blueprint-vs-cplusplus' }, { title: 'Epic · UE C++ 官方文档', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/programming-with-cplusplus-in-unreal-engine' }] },
      { id: 'systems', title: '计算机系统基础', start: '2027-01', end: '2027-06', note: '操作系统、网络、数据库和性能分析。', resources: [{ title: 'MIT · The Missing Semester', url: 'https://missing.csail.mit.edu/' }, { title: 'CMU 15-213 · Computer Systems', url: 'https://www.cs.cmu.edu/~213/' }] },
      { id: 'interview-core', title: '面试能力常态化', start: '2027-03', end: '2028-06', note: '算法复习、项目表达、系统基础和模拟面试。', resources: [{ title: 'LeetCode · Hot 100', url: 'https://leetcode.cn/studyplan/top-100-liked/' }] },
    ],
  },
  {
    id: 'portfolio',
    name: '作品与实习',
    color: 'green',
    items: [
      { id: 'unity-work', title: '发布首个 Unity 小作品', start: '2026-08', end: '2026-10', note: '发布一个完整、可试玩且能独立解释和修改的作品；比赛或 Game Jam 均为选做。' },
      { id: 'portfolio-pack', title: '整理作品集与简历', start: '2026-11', end: '2026-12', note: '演示视频、README、架构图、复盘和可下载版本。', resources: [{ title: 'GitHub Docs · README', url: 'https://docs.github.com/zh/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes' }] },
      { id: 'intern-apply', title: '投递日常 / 暑期实习', start: '2027-01', end: '2027-04', note: '大厂、中厂、游戏公司和技术型国企同时覆盖。' },
      { id: 'first-intern', title: '完成第一段开发实习', start: '2027-03', end: '2027-08', note: '第一段实习优先获得真实协作和交付经验。' },
      { id: 'autumn', title: '大厂秋招准备', start: '2027-08', end: '2027-11', note: '以真实实习和作品为基础冲刺，不押注单一公司。' },
      { id: 'offer', title: 'Offer 比较与毕业去向', start: '2027-10', end: '2028-06', note: '比较岗位内容、成长、城市、收入、稳定性与个人偏好。' },
    ],
  },
  {
    id: 'experiments',
    name: '方向试探',
    color: 'violet',
    items: [
      { id: 'cann-test', title: '选做：CANN 限时体验', start: '2026-09', end: '2026-09', note: '先体验 2 小时，确有兴趣且主线不受影响再追加至 6—8 小时，判断是否喜欢算子与性能分析。', resources: [{ title: 'CANN Learning Hub', url: 'https://gitcode.com/cann/cann-learning-hub' }] },
      { id: 'game-test', title: '游戏开发与引擎选择', start: '2026-08', end: '2027-02', note: '先用一个真实作品验证；后续求职主引擎按目标岗位选择，个人独立游戏工具按项目需求选择。' },
      { id: 'backend-test', title: '后端 / AI 应用小项目', start: '2026-11', end: '2027-01', note: '验证是否更喜欢系统、服务和 AI 工程化。', resources: [{ title: 'FastAPI · 官方教程', url: 'https://fastapi.tiangolo.com/tutorial/' }, { title: 'Hugging Face · Agents Course', url: 'https://huggingface.co/learn/agents-course/en/unit0/introduction' }] },
      { id: 'research-test', title: '实验室科研体验', start: '2026-11', end: '2027-01', note: '读论文、复现实验，用真实感受决定是否读研冲算法。', resources: [{ title: 'arXiv · CS 论文检索', url: 'https://arxiv.org/archive/cs' }] },
      { id: 'civil-test', title: '公务员岗位现实调查', start: '2026-10', end: '2026-10', note: '筛选能报岗位、限时做题、访谈真实从业者。', resources: [{ title: '国家公务员局', url: 'https://www.scs.gov.cn/' }] },
    ],
  },
  {
    id: 'choices',
    name: '学业与选择',
    color: 'amber',
    items: [
      { id: 'gpa', title: '守住 GPA 与英语', start: '2026-08', end: '2028-06', note: '不因短期项目主动关闭保研、考研和选调选项。' },
      { id: 'postgrad-option', title: '保留保研 / 考研资格', start: '2026-08', end: '2027-06', note: '读研必须服务于明确目标，而不是逃避就业。' },
      { id: 'main-choice', title: '主方向决策', start: '2027-01', end: '2027-01', note: '依据作品体验、反馈和招聘匹配度选择游戏、后端或 AI Infra。' },
      { id: 'dual-track', title: '秋招 + 考公双轨', start: '2027-08', end: '2027-12', note: '以真实岗位和 Offer 比较，不提前用想象替代选择。' },
      { id: 'graduation-choice', title: '毕业去向决策', start: '2028-03', end: '2028-06', note: '就业、升学与体制内在真实选项之间比较。' },
    ],
  },
]

export const decisions = [
  {
    id: 'ship', date: '2026-10-31', title: '是否真正完成作品',
    why: '用一次完整交付验证执行力和游戏开发兴趣，避免继续停留在课程消费。',
    standards: ['独立构建可运行并可完整演示核心玩法', '有 README、演示视频、开发复盘和至少 3 条有效试玩反馈', '脱离教程解释核心逻辑，独立改一个小需求、定位一个问题'],
    adjust: ['未完成：缩小范围，2—4 周后复评；不要到日期就切换引擎', '完成且仍向往 UE 岗位：蓝图入门，再结合 C++ 重做一个机制', '完成且偏独立游戏：可以继续 Unity，不必为学第二引擎硬切换', '开发兴趣一般：限时验证后端或 AI 应用，保留通用基础'],
  },
  {
    id: 'direction', date: '2027-01-15', title: '选择主方向',
    why: '结合主线作品和必要的限时备选实验决定下一阶段，不要求同时完成所有方向。',
    standards: ['有主线作品与至少一个必要备选方向的证据', '记录兴趣、能力、作品和岗位匹配四项评分', '确定一条主线和一条备选线'],
    adjust: ['游戏得分最高：按目标岗位选 UE 或 Unity 为主引擎', '工程系统得分最高：主攻后端/AI应用', '性能方向得分最高：主攻 C++/AI Infra'],
  },
  {
    id: 'intern-feedback', date: '2027-04-30', title: '根据实习反馈调整',
    why: '简历、笔试和面试结果是比网络观点更可靠的市场反馈。',
    standards: ['完成至少 40 次有效投递', '记录简历通过率和面试薄弱点', '完成至少 3 次模拟或真实面试'],
    adjust: ['无面试：重做简历与项目表达', '笔试弱：提高算法训练比例', '项目面挂：补系统设计与工程深度'],
  },
  {
    id: 'offer-compare', date: '2027-10-31', title: '比较真实 Offer',
    why: '技术岗、公务员、国企和升学都应在真实机会之间比较。',
    standards: ['按工作内容、成长、城市、收入和稳定性打分', '与至少 2 名真实从业者交流', '避免只根据公司名气和家人焦虑决策'],
    adjust: ['没有满意技术Offer：扩大公司与岗位范围', '体制岗位匹配度高：继续完成对应考试', '算法目标明确且科研匹配：再决定读研'],
  },
]

export const experiments = [
  {
    id: 'game', title: '游戏客户端', window: '2026.08—2027.02', status: 'active',
    question: '我喜欢的是玩游戏，还是长时间实现、调试和打磨游戏？',
    deliverable: '首个 Unity 小作品；验收后，按求职或独立游戏目标确定下一件作品',
    checks: ['发布可试玩作品，能独立解释、修改和调试核心逻辑', '确定下一阶段主引擎，并实现一个小机制（UE 可用蓝图 + C++）', '获得至少 5 名玩家反馈'],
  },
  {
    id: 'backend', title: '后端 / AI应用', window: '2026.11—2027.01', status: 'planned',
    question: '我是否更享受接口、数据、服务稳定性与 AI 工程化？',
    deliverable: '一个可部署、有评测与日志的服务型小项目',
    checks: ['完成 API、数据库与容器化', '接入 RAG/Agent 或游戏服务场景', '记录延迟、错误和测试结果'],
  },
  {
    id: 'infra', title: 'AI Infra / CANN', window: '2026.09', status: 'planned',
    question: '我是否喜欢内存搬运、并行、算子和性能分析？',
    deliverable: '完成一个 Ascend C 入门算子并提交评测',
    checks: ['解释 Host、Kernel、Tiling', '修改 Add 算子并通过评测', '写一页体验结论'],
  },
  {
    id: 'research', title: '科研 / 算法读研', window: '2026.11—2027.01', status: 'planned',
    question: '我是否愿意长期读论文、复现实验并面对不确定结果？',
    deliverable: '4—6 周实验室体验或一次小型论文复现',
    checks: ['阅读 3 篇相关论文', '复现一个小实验', '与实验室学长或老师交流'],
  },
  {
    id: 'civil', title: '公务员现实调查', window: '2026.10', status: 'planned',
    question: '我喜欢的是稳定感，还是实际公共岗位的工作内容？',
    deliverable: '岗位清单 + 一次限时行测/申论 + 两次从业者访谈',
    checks: ['筛选近两年真正能报的岗位', '完成一次限时模拟', '访谈两名真实从业者'],
  },
]

export const milestones = [
  { date: '2026-07-15', title: '确定工程主线', state: 'done' },
  { date: '2026-08-20', title: '完成职业方向梳理', state: 'done' },
  { date: '2026-10-31', title: '提交一个完整作品', state: 'current' },
  { date: '2027-04-30', title: '获得有效实习反馈', state: 'planned' },
  { date: '2027-08-31', title: '完成第一段开发实习', state: 'planned' },
  { date: '2028-06-30', title: '毕业去向落地', state: 'planned' },
]
