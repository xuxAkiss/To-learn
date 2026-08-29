import { daysBetween } from '../utils/date'

const UNITY_PATHWAY = 'https://learn.unity.com/pathway/junior-programmer?version=6.0'
const UNITY_CREATE_WITH_CODE = 'https://learn.unity.com/mission/programming-basics?language=en'
const CSHARP_TOUR = 'https://learn.microsoft.com/zh-cn/dotnet/csharp/tour-of-csharp/'
const PRO_GIT = 'https://git-scm.com/book/zh/v2.html'
const GITHUB_README = 'https://docs.github.com/zh/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes'
const CANN_INTRO = 'https://gitcode.com/cann/cann-learning-hub/tree/master/tutorials/ascendc_operator_development'
const UNITY_PROFILER = 'https://docs.unity3d.com/cn/current/Manual/ProfilerWindow.html'
const LEETCODE_75 = 'https://leetcode.cn/studyplan/leetcode-75/'

export const phases = [
  {
    id: 'explore', start: '2026-08-24', end: '2026-09-06', title: '启动与验证', target: '完成第一个可运行的游戏战斗原型',
  },
  {
    id: 'unity', start: '2026-09-07', end: '2026-10-31', title: '完成一个作品', target: '提交 Unity 中国开发挑战赛作品',
  },
  {
    id: 'bridge', start: '2026-11-01', end: '2026-12-15', title: '从 Unity 迁移到 UE', target: '用 UE5+C++ 重构最有价值的系统',
  },
  {
    id: 'ue-demo', start: '2026-12-16', end: '2027-02-28', title: '构建目标岗位作品', target: '完成 UE5+C++ 动作战斗 Demo',
  },
  {
    id: 'internship', start: '2027-03-01', end: '2027-08-31', title: '获得真实开发经历', target: '拿到并完成第一段开发实习',
  },
  {
    id: 'recruiting', start: '2027-09-01', end: '2027-12-31', title: '用真实机会做选择', target: '秋招与考公双轨，比较真实 Offer',
  },
  {
    id: 'graduation', start: '2028-01-01', end: '2028-06-30', title: '毕业去向落地', target: '完成毕业、入职或升学衔接',
  },
]

export const planWindow = {
  start: '2026-08-24',
  end: '2026-10-04',
  nextUpdate: '2026-09-25',
  label: '第一阶段 · Unity 原型启动',
}

const weeklyPlans = {
  '2026-08-24': {
    theme: '启动：让项目真正跑起来',
    result: '建立独立游戏仓库，并在 Unity 中运行一个由 C# 控制的角色。',
    tasks: [
      task('setup-repo', '创建独立游戏仓库与项目说明', 'engineering', 'core', 90,
        '新建一个不与学习站混用的游戏仓库，确保项目能提交、回退和向别人说明。',
        ['创建 Unity 3D 项目，项目名暂定 EchoPrototype', '初始化 Git，提交 Unity 官方 .gitignore', '在 README 写清游戏一句话设想、操作方式和本周目标', '完成首次 commit，并推送到 GitHub 或 GitCode'],
        '仓库可以从远端重新克隆；README 至少包含项目目标、运行版本和操作说明。',
        [{ title: 'Pro Git 中文版 · 第 1–2 章', url: PRO_GIT }, { title: 'GitHub · README 说明', url: GITHUB_README }]),
      task('unity-basics', '完成 Unity 编辑器与场景基础练习', 'portfolio', 'core', 120,
        '熟悉 Hierarchy、Scene、Game、Inspector、Prefab 和 Play Mode，不追求把整门课看完。',
        ['打开 Unity Learn 的 Junior Programmer 路线', '完成入门说明与 Player Control 前置内容', '建立地面、玩家和主相机三个对象', '把玩家做成 Prefab，并成功进入 Play Mode'],
        '场景运行无红色报错；玩家 Prefab 可删除后重新拖入场景。',
        [{ title: 'Unity Learn · Junior Programmer', url: UNITY_PATHWAY }]),
      task('first-script', '写出第一个可调参数的 PlayerMover', 'engineering', 'core', 180,
        '用 C# 脚本读取输入并驱动物体移动，理解变量、方法、组件引用和每帧更新。',
        ['学习 C# 变量、条件、方法、类的对应章节', '创建 PlayerMover.cs，并暴露 speed 字段', '读取水平与垂直输入，形成归一化移动向量', '用不同 speed 值测试，并记录一次报错及解决方法'],
        '键盘可控制玩家移动；Inspector 能调速度；控制台无红色报错。',
        [{ title: 'Microsoft Learn · C# 入门', url: CSHARP_TOUR }, { title: 'Unity Learn · Create with Code 1', url: UNITY_CREATE_WITH_CODE }]),
      task('week-review', '留下第一份开发证据', 'portfolio', 'support', 45,
        '把“学过”变成以后简历和复盘能看懂的证据。',
        ['截取一张运行画面', '在 README 增加“本周完成”小节', '写下一个卡点、原因和解决办法', '在本站周复盘填写下周唯一重点'],
        '仓库中有截图和本周记录；本站保存一份周复盘。',
        [{ title: 'GitHub · README 说明', url: GITHUB_README }]),
    ],
  },
  '2026-08-31': {
    theme: '控制：移动、镜头与碰撞',
    result: '做出手感可控、不会穿墙、相机能稳定跟随的灰盒场景。',
    tasks: [
      task('input-movement', '重写可维护的角色移动与输入', 'portfolio', 'core', 240,
        '把输入、移动和参数拆清楚，为后面的攻击和状态系统留出空间。',
        ['用 Input System 建立 Move Action', '把输入读取与移动执行拆成两个方法', '限制斜向移动速度，并在 Inspector 暴露速度参数', '测试键盘至少 10 次启停与转向'],
        '角色八方向移动稳定；斜向不加速；代码中输入与移动逻辑可分别解释。',
        [{ title: 'Unity Learn · Player Control', url: UNITY_PATHWAY }, { title: 'Unity Input System 手册', url: 'https://docs.unity3d.com/Packages/com.unity.inputsystem@1.11/manual/index.html' }]),
      task('camera-collision', '完成相机跟随与基础碰撞场景', 'portfolio', 'core', 180,
        '建立一个能判断移动是否正确的测试场，而不是在空场景里继续加代码。',
        ['用平面和方块搭建一间灰盒房间', '为玩家、墙体配置 Collider 与 Rigidbody/CharacterController', '实现相机平滑跟随，避免在 Update 中直接硬绑定', '测试贴墙、拐角和快速换向，不允许穿模'],
        '录制 20 秒视频：移动、转向、撞墙和相机跟随均正常。',
        [{ title: 'Unity Learn · Junior Programmer', url: UNITY_PATHWAY }, { title: 'Unity 手册 · Rigidbody', url: 'https://docs.unity3d.com/cn/current/Manual/class-Rigidbody.html' }]),
      task('git-loop', '建立每次开发都能使用的 Git 工作流', 'engineering', 'support', 75,
        '停止“做完一大坨才提交”，练习小步提交和安全回退。',
        ['为移动与相机分别建立分支或独立提交', '查看 git diff 后再提交', '故意修改一个参数，再用历史版本恢复', '在 README 记录本周控制方案'],
        '本周至少 4 个含义清楚的 commit；你能口头解释 add、commit、push、revert 的区别。',
        [{ title: 'Pro Git 中文版 · Git 基础', url: PRO_GIT }]),
      task('array-hash', '算法保温：数组与哈希表各 1 题', 'engineering', 'support', 90,
        '开始建立开发岗通用笔试能力，但不挤占作品主线。',
        ['从 LeetCode 75 选择 1 道数组题和 1 道哈希题', '先独立思考 20 分钟再看提示', '写出时间与空间复杂度', '把错因记录在仓库 notes/algorithms.md'],
        '两题均通过；每题有思路、复杂度和一次错误记录。',
        [{ title: 'LeetCode 75 学习计划', url: LEETCODE_75 }]),
    ],
  },
  '2026-09-07': {
    theme: '战斗：攻击、血量与敌人',
    result: '完成最小战斗闭环：玩家能攻击，敌人会追击，双方会受伤和死亡。',
    tasks: [
      task('health-damage', '实现通用 Health 与 Damage 系统', 'portfolio', 'core', 240,
        '用组件化方式实现生命值，避免把敌人与玩家逻辑全部塞进一个脚本。',
        ['创建 Health 组件并定义最大/当前生命值', '实现 TakeDamage、死亡事件和重复受伤保护', '为玩家与敌人复用同一组件', '写 3 个手工测试：正常伤害、过量伤害、死亡后再次受伤'],
        '玩家和敌人都能扣血并死亡；Health 不依赖具体角色脚本。',
        [{ title: 'Unity Learn · Gameplay Mechanics', url: UNITY_PATHWAY }, { title: 'Microsoft Learn · C# 类与对象', url: CSHARP_TOUR }]),
      task('attack-enemy', '实现攻击判定与最小敌人追击', 'portfolio', 'core', 270,
        '先得到能玩的闭环，再考虑动画、美术和复杂 AI。',
        ['为攻击建立独立 Input Action', '用 Overlap、Trigger 或射线完成一次攻击判定', '实现敌人发现、靠近和攻击三个状态', '加入攻击冷却，避免每帧连续结算伤害'],
        '进入场景后，玩家可击杀敌人，也可能被敌人击杀；过程无异常刷屏。',
        [{ title: 'Unity Learn · Junior Programmer', url: UNITY_PATHWAY }]),
      task('refactor-combat', '整理战斗代码并画一张结构图', 'engineering', 'support', 90,
        '验证你是否真的理解组件之间的调用关系。',
        ['把魔法数字改成可配置字段', '删除重复代码和未使用变量', '画出 Input→Attack→Health→Death 调用关系', '在 README 写出当前方案的一个缺点'],
        '结构图能对应到实际类名；新建第二个敌人不需要复制脚本。',
        [{ title: 'Unity Learn · 编程理论路线', url: UNITY_PATHWAY }]),
      task('cann-trial', '选做：用 2 小时判断 CANN 是否值得继续', 'direction', 'optional', 120,
        '只做限时体验，不让比赛挤掉当前作品主线。',
        ['阅读 1.2 人工智能与算子基础', '阅读 1.3 CANN 架构与昇腾 NPU 原理', '浏览 1.4 Ascend C 基本概念并尝试在线 Notebook', '写 150 字：喜欢/不喜欢什么，是否愿意继续 6 小时'],
        '留下可运行截图和一段结论；两小时到点立即停止或明确追加时间。',
        [{ title: 'CANN Learning Hub · Ascend C 入门', url: CANN_INTRO }]),
    ],
  },
  '2026-09-14': {
    theme: '闭环：胜负、UI 与重新开始',
    result: '让陌生人不看你的代码，也能进入、游玩、胜利或失败并重新开始。',
    tasks: [
      task('game-flow', '实现开始、游戏中、胜利、失败四个状态', 'portfolio', 'core', 240,
        '把零散机制组织成一次完整体验。',
        ['定义 GameState 或 GameManager 的最小职责', '进入场景时显示开始提示', '敌人全部死亡触发胜利，玩家死亡触发失败', '胜负后暂停输入，并支持重新开始'],
        '从启动到胜/负再到重开可连续完成 3 次，无需手动重启编辑器。',
        [{ title: 'Unity Learn · Manage Scene Flow and Data', url: UNITY_PATHWAY }]),
      task('combat-ui', '补齐血条、提示和最小操作说明', 'portfolio', 'core', 180,
        'UI 只解决玩家不知道发生了什么的问题，不花时间追求复杂美术。',
        ['显示玩家血量', '为敌人增加可辨认的受伤或死亡反馈', '显示操作键位和当前目标', '制作胜利、失败与重开界面'],
        '找一名没看过项目的人试玩，他能在 30 秒内开始操作并说出目标。',
        [{ title: 'Unity Learn · User Interface', url: UNITY_PATHWAY }]),
      task('test-list', '建立第一份手工测试清单并修复 3 个问题', 'engineering', 'support', 120,
        '培养游戏客户端真正需要的调试和交付意识。',
        ['列出启动、移动、战斗、死亡、胜利、重开测试项', '每项记录预期结果和实际结果', '按“阻塞体验优先”排序问题', '至少修复 3 个并写清根因'],
        '仓库中有 test-checklist.md；修复项能对应到 commit。',
        [{ title: 'Unity Learn · Debugging', url: UNITY_PATHWAY }]),
      task('stack-queue', '算法保温：栈/队列 2 题', 'engineering', 'support', 90,
        '维持通用开发岗笔试基础，并练习把数据结构说清楚。',
        ['完成 1 道栈题和 1 道队列题', '为每题写 3 句话解法说明', '标出边界条件', '第二天不看答案复写其中 1 题'],
        '两题通过；至少一题完成隔日复写。',
        [{ title: 'LeetCode 75 学习计划', url: LEETCODE_75 }]),
    ],
  },
  '2026-09-21': {
    theme: '反馈：打击感、内容与真实试玩',
    result: '在不扩张核心机制的前提下，把原型打磨到别人愿意玩 5 分钟。',
    tasks: [
      task('game-feel', '增加三类打击反馈', 'portfolio', 'core', 210,
        '用声音、视觉和镜头反馈让攻击结果清楚，不以购买素材代替实现。',
        ['攻击命中时加入音效', '加入粒子或闪白反馈', '加入轻量镜头震动或停顿', '提供设置开关，逐项比较有无反馈的差异'],
        '录制有/无反馈对比视频；试玩者能明确判断是否命中。',
        [{ title: 'Unity Learn · Sound and Effects', url: UNITY_PATHWAY }]),
      task('content-pass', '制作一个 3–5 分钟的小关卡', 'portfolio', 'core', 240,
        '复用现有机制组织节奏，不再添加新的大型系统。',
        ['设计进入、教学、压力、决战四个小段落', '只用灰盒或现成免费资源搭建', '配置至少两种敌人参数组合', '确保失败后 10 秒内可重新挑战'],
        '首次试玩时长 3–5 分钟；玩家经历明确的开始、升级压力和结束。',
        [{ title: 'Unity Learn · Design process', url: UNITY_PATHWAY }]),
      task('playtest', '完成 3 人试玩并整理问题优先级', 'portfolio', 'core', 150,
        '观察真实行为，不边看边教玩家怎么操作。',
        ['准备 5 个固定问题', '让 3 名同学分别试玩并录屏或记时', '区分“没看懂、不会操作、程序错误、个人偏好”', '选出下周必须修复的前 5 项'],
        '一份包含 3 名玩家证据和 Top 5 问题的 playtest.md。',
        [{ title: 'Unity Learn · Design and iteration', url: UNITY_PATHWAY }]),
      task('weekly-review', '完成阶段复盘：继续缩小还是进入发布', 'choice', 'support', 45,
        '依据可运行版本和试玩反馈调整范围，不根据当天情绪重选方向。',
        ['填写本站周复盘', '记录本周实际投入小时数', '列出保留、删除、延期各一项', '确定发布周唯一结果'],
        '复盘已保存；下周范围不超过 5 个必须修复项。',
        []),
    ],
  },
  '2026-09-28': {
    theme: '发布：性能、打包与作品证据',
    result: '发布第一个可下载版本，并形成能放进简历的作品材料。',
    tasks: [
      task('fix-top5', '只修复试玩 Top 5 问题', 'portfolio', 'core', 240,
        '冻结新功能，把最影响完成体验的问题逐个关闭。',
        ['为 Top 5 问题分别建立记录', '每次只修一个问题并验证回归', '完成后重新跑完整测试清单', '仍未修复的问题写明原因与风险'],
        'Top 5 全部关闭或有明确延期说明；完整流程无阻塞错误。',
        [{ title: 'Unity Learn · Debugging', url: UNITY_PATHWAY }]),
      task('profile-build', '用 Profiler 检查并打包 Windows 版本', 'engineering', 'core', 180,
        '第一次建立“测量—定位—修复—再测量”的性能意识。',
        ['在 Development Build 下运行 Profiler', '记录 CPU、内存和一段关键战斗帧', '定位并修复至少 1 个可解释问题', '打包 Windows 版本，并在项目目录外启动测试'],
        '保存优化前后截图；独立构建可启动、游玩和退出。',
        [{ title: 'Unity 手册 · Profiler 窗口', url: UNITY_PROFILER }, { title: 'Unity Learn · Publishing', url: UNITY_PATHWAY }]),
      task('portfolio-package', '完成 README、演示视频和下载入口', 'portfolio', 'core', 210,
        '让不了解项目的人在两分钟内看懂你做了什么、难点是什么。',
        ['README 补齐玩法、操作、技术结构、运行方法', '录制 60–90 秒演示视频', '写 3 个技术难点及解决过程', '上传可下载压缩包或 Release，并找一台不同电脑验证'],
        '仓库首页能看到视频/动图、技术说明和下载链接；下载版本已异机验证。',
        [{ title: 'GitHub · README 说明', url: GITHUB_README }, { title: 'Unity Learn · Job preparation', url: 'https://learn.unity.com/pathway/junior-programmer/unit/apply-object-oriented-principles/tutorial/job-preparation-junior-programmer-2?version=6.3' }]),
      task('direction-note', '写一页方向判断：是否继续游戏客户端', 'choice', 'support', 60,
        '用这六周的真实过程回答“我是否喜欢做游戏开发”，不是回答是否喜欢玩游戏。',
        ['给兴趣、能力、作品潜力、岗位匹配各打 1–5 分', '写出最享受和最抗拒的各 3 件事', '记录试玩反馈与最终完成度', '给出继续 Unity、转 UE/C++ 或增加其他实验的暂定结论'],
        '一页可在下次职业规划讨论中直接使用的 evidence.md。',
        []),
    ],
  },
}

export function getPhase(dateKey) {
  return phases.find((phase) => dateKey >= phase.start && dateKey <= phase.end) || phases.at(-1)
}

export function buildWeeklyTasks(weekId) {
  const plan = weeklyPlans[weekId]
  return plan ? plan.tasks.map((item) => ({ ...item, completed: false, generated: true })) : []
}

export function getWeeklyPlan(weekId) {
  return weeklyPlans[weekId] || null
}

export function getPlanProgressLabel(weekId) {
  if (weekId < planWindow.start) return '计划开始前'
  if (weekId > planWindow.end) return '等待月度更新'
  const weekNumber = Math.floor(daysBetween(planWindow.start, weekId) / 7) + 1
  return `第 ${weekNumber} / 6 周`
}

function task(id, title, category, priority, minutes, outcome, steps, deliverable, resources) {
  return { id, title, category, priority, minutes, outcome, steps, deliverable, resources }
}
