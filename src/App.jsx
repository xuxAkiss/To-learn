import { useEffect, useMemo, useRef, useState } from 'react'
import {
  BarChart3, BookOpen, BriefcaseBusiness, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight,
  CircleHelp, Clock3, Download, ExternalLink, FlaskConical, Home, Map, Menu,
  Pause, Play, Plus, RotateCcw, Save, Settings2, Sparkles, Target, Trash2, Upload, X,
} from 'lucide-react'
import { usePersistentState } from './hooks/usePersistentState'
import { getPhase, getPlanProgressLabel, getWeeklyPlan, planWindow, reconcileStoredWeeks, reconcileWeeklyPlan } from './data/weeklyPlan'
import { decisions, experiments, lanes, learningStrategy, milestones } from './data/roadmap'
import WeeklyAiExport from './components/WeeklyAiExport'
import { formatChineseDate, fromDateKey, shiftDateKey, toDateKey, weekRange } from './utils/date'

const STORAGE_KEY = 'kixu-learn-data-v1'
const todayKey = toDateKey()

const initialStore = {
  version: 4,
  days: {},
  weeks: {},
  experimentData: {},
  reviews: [],
  preferences: { weeklyHours: 24 },
}

const navItems = [
  { id: 'today', label: '今日', Icon: Home },
  { id: 'roadmap', label: '路线', Icon: Map },
  { id: 'experiments', label: '学习诊断', shortLabel: '诊断', Icon: FlaskConical },
  { id: 'review', label: '周复盘', shortLabel: '复盘', Icon: BarChart3 },
]

export default function App() {
  const [activeView, setActiveView] = useState('today')
  const [selectedDate, setSelectedDate] = useState(todayKey)
  const [store, setStore] = usePersistentState(STORAGE_KEY, initialStore)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const selectedWeekId = weekRange(selectedDate)[0]

  useEffect(() => {
    setStore((current) => {
      const isLegacyStore = !current.version || current.version < 4
      const normalized = {
        ...initialStore,
        ...current,
        version: 4,
        days: current.days || {},
        weeks: reconcileStoredWeeks(current.weeks || {}),
        experimentData: current.experimentData || {},
        reviews: current.reviews || [],
        preferences: {
          ...initialStore.preferences,
          ...(current.preferences || {}),
          weeklyHours: isLegacyStore && [18, 22].includes(current.preferences?.weeklyHours)
            ? 24
            : (current.preferences?.weeklyHours ?? 24),
        },
      }
      const hasDay = Boolean(normalized.days[selectedDate])
      const hasWeek = Boolean(normalized.weeks[selectedWeekId])
      if (hasDay && hasWeek && current.version === 4 && normalized.weeks === current.weeks && normalized.preferences.weeklyHours === current.preferences?.weeklyHours) return current
      return {
        ...normalized,
        days: {
          ...normalized.days,
          [selectedDate]: hasDay ? normalized.days[selectedDate] : { note: '', focusMinutes: 0, checkedIn: false },
        },
        weeks: {
          ...normalized.weeks,
          [selectedWeekId]: reconcileWeeklyPlan(selectedWeekId, normalized.weeks[selectedWeekId]),
        },
      }
    })
  }, [selectedDate, selectedWeekId, setStore])

  const day = store.days?.[selectedDate] || { note: '', focusMinutes: 0, checkedIn: false }
  const week = reconcileWeeklyPlan(selectedWeekId, store.weeks?.[selectedWeekId])

  function updateDay(updater) {
    setStore((current) => {
      const currentDay = current.days?.[selectedDate] || { note: '', focusMinutes: 0, checkedIn: false }
      const nextDay = typeof updater === 'function' ? updater(currentDay) : updater
      return { ...current, days: { ...current.days, [selectedDate]: nextDay } }
    })
  }

  function updateWeek(updater) {
    setStore((current) => {
      const currentWeek = reconcileWeeklyPlan(selectedWeekId, current.weeks?.[selectedWeekId])
      const nextWeek = typeof updater === 'function' ? updater(currentWeek) : updater
      return { ...current, weeks: { ...(current.weeks || {}), [selectedWeekId]: nextWeek } }
    })
  }

  function navigate(view) {
    setActiveView(view)
    setMobileMenuOpen(false)
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeView={activeView}
        navigate={navigate}
        open={mobileMenuOpen}
        close={() => setMobileMenuOpen(false)}
        openHelp={() => { setHelpOpen(true); setMobileMenuOpen(false) }}
      />
      <main className="app-main">
        <header className="mobile-header">
          <button className="icon-button" onClick={() => setMobileMenuOpen(true)} aria-label="打开菜单"><Menu size={21} /></button>
          <Wordmark />
          <button className="icon-button" onClick={() => navigate('roadmap')} aria-label="查看路线"><Target size={20} /></button>
        </header>
        {activeView === 'today' && (
          <TodayView
            dateKey={selectedDate}
            setDateKey={setSelectedDate}
            day={day}
            week={week}
            updateDay={updateDay}
            updateWeek={updateWeek}
            store={store}
            navigate={navigate}
          />
        )}
        {activeView === 'roadmap' && <RoadmapView />}
        {activeView === 'experiments' && <ExperimentsView store={store} setStore={setStore} />}
        {activeView === 'review' && <ReviewView store={store} setStore={setStore} />}
      </main>
      <MobileNav activeView={activeView} navigate={navigate} />
      {helpOpen && <HelpDialog close={() => setHelpOpen(false)} />}
    </div>
  )
}

function Wordmark() {
  return <div className="wordmark"><span className="wordmark-mark">K</span><strong>KIXU LEARN</strong></div>
}

function Sidebar({ activeView, navigate, open, close, openHelp }) {
  return (
    <>
      {open && <button className="sidebar-backdrop" aria-label="关闭菜单" onClick={close} />}
      <aside className={`sidebar ${open ? 'is-open' : ''}`}>
        <div className="sidebar-top">
          <Wordmark />
          <button className="mobile-close icon-button" onClick={close} aria-label="关闭菜单"><X size={20} /></button>
        </div>
        <nav className="sidebar-nav" aria-label="主要导航">
          {navItems.map(({ id, label, Icon }) => (
            <button key={id} className={activeView === id ? 'active' : ''} onClick={() => navigate(id)}>
              <Icon size={20} strokeWidth={1.8} /><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-spacer" />
        <div className="profile-card">
          <span className="avatar">K</span>
          <span><strong>Kixu</strong><small>2028考研 · Java后端</small></span>
        </div>
        <button className="sidebar-utility" onClick={() => navigate('review')}><Settings2 size={18} /><span>设置与数据</span></button>
        <button className="sidebar-utility" onClick={openHelp}><CircleHelp size={18} /><span>使用说明</span></button>
      </aside>
    </>
  )
}

function HelpDialog({ close }) {
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={close}>
      <section className="help-dialog" role="dialog" aria-modal="true" aria-labelledby="help-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="dialog-heading"><div><small>KIXU LEARN</small><h2 id="help-title">怎么用这个系统</h2></div><button className="icon-button" onClick={close} aria-label="关闭说明"><X size={20} /></button></div>
        <ol className="help-steps">
          <li><strong>先看本周任务</strong><span>展开任务卡，按步骤学习和实现；完成标准满足后再勾选，不按自然日硬拆进度。</span></li>
          <li><strong>每天保留学习打卡</strong><span>用专注计时记录真实投入，写一句当天产出或卡点，结束时点击完成今日打卡。</span></li>
          <li><strong>与 AI 一起推进任务</strong><span>点击“复制本周任务给 AI”，预览后复制到对话；会附上步骤、链接和进度，个人笔记默认不包含。</span></li>
          <li><strong>每月更新一次计划</strong><span>当前维护近期四周的详细任务，根据真实投入、错题重做和小测结果更新；没完成先缩量补漏。</span></li>
          <li><strong>用诊断校准进度</strong><span>数学、408、Java算法、后端项目、英语和双线负荷都有检查卡，完成课程不等于真正掌握。</span></li>
        </ol>
        <button className="primary-button full" onClick={close}>开始今天的计划</button>
      </section>
    </div>
  )
}

function MobileNav({ activeView, navigate }) {
  return (
    <nav className="mobile-nav" aria-label="移动端导航">
      {navItems.map(({ id, label, shortLabel, Icon }) => (
        <button key={id} className={activeView === id ? 'active' : ''} onClick={() => navigate(id)}>
          <Icon size={21} strokeWidth={1.8} /><span>{shortLabel || label}</span>
        </button>
      ))}
    </nav>
  )
}

function TodayView({ dateKey, setDateKey, day, week, updateDay, updateWeek, store, navigate }) {
  const [adding, setAdding] = useState(false)
  const [newTask, setNewTask] = useState('')
  const [expandedTaskId, setExpandedTaskId] = useState(null)
  const phase = getPhase(dateKey)
  const weekId = weekRange(dateKey)[0]
  const weekEnd = weekRange(dateKey).at(-1)
  const weeklyPlan = getWeeklyPlan(weekId)
  const requiredTasks = week.tasks.filter((task) => task.priority !== 'optional')
  const completed = requiredTasks.filter((task) => task.completed).length
  const progress = requiredTasks.length ? Math.round((completed / requiredTasks.length) * 100) : 0
  const nextDecision = decisions.find((decision) => decision.date >= dateKey) || decisions.at(-1)

  function toggleTask(id) {
    updateWeek((current) => ({
      ...current,
      tasks: current.tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task),
    }))
  }

  function deleteTask(id) {
    updateWeek((current) => ({ ...current, tasks: current.tasks.filter((task) => task.id !== id) }))
  }

  function addTask(event) {
    event.preventDefault()
    const title = newTask.trim()
    if (!title) return
    updateWeek((current) => ({
      ...current,
      tasks: [...current.tasks, {
        id: crypto.randomUUID(), title, category: 'custom', priority: 'custom', minutes: 60, completed: false,
        outcome: '完成你为本周补充的具体事项。',
        steps: ['写清任务的最小范围', '开始前确定可验证的交付物', '完成后在今日笔记记录结果'],
        deliverable: '一个可以展示、运行、提交或复述的明确结果。', resources: [], generated: false,
      }],
    }))
    setNewTask('')
    setAdding(false)
  }

  return (
    <div className="view today-view">
      <section className="today-primary">
        <div className="page-heading today-heading">
          <div>
            <div className="date-switcher">
              <button className="icon-button" onClick={() => setDateKey(shiftDateKey(dateKey, -1))} aria-label="前一天"><ChevronLeft size={19} /></button>
              <button className="date-button" onClick={() => setDateKey(todayKey)}>{formatChineseDate(dateKey)}</button>
              <button className="icon-button" onClick={() => setDateKey(shiftDateKey(dateKey, 1))} aria-label="后一天"><ChevronRight size={19} /></button>
            </div>
            <h1>{weeklyPlan?.theme || '本周详细计划尚未更新'}</h1>
            <p className="week-result">{weeklyPlan?.result || '不要继续使用自动生成的泛化任务。请带着上月完成情况来更新下一阶段计划。'}</p>
          </div>
          <div className="today-progress" aria-label={`本周完成 ${completed} / ${requiredTasks.length}`}>
            <span>本周任务 <strong>{completed} / {requiredTasks.length}</strong></span>
            <div className="progress-track"><i style={{ width: `${progress}%` }} /></div>
          </div>
        </div>

        <div className="task-surface">
          <div className="weekly-plan-meta">
            <span><CalendarDays size={16} />{formatShortDate(weekId)}—{formatShortDate(weekEnd)}</span>
            <strong>{getPlanProgressLabel(weekId)}</strong>
          </div>
          <WeeklyAiExport key={weekId} dateKey={dateKey} store={store} />
          <div className="task-list">
            {week.tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                expanded={expandedTaskId === task.id}
                toggleExpanded={() => setExpandedTaskId((current) => current === task.id ? null : task.id)}
                toggle={() => toggleTask(task.id)}
                remove={() => deleteTask(task.id)}
              />
            ))}
            {!week.tasks.length && <EmptyTasks />}
          </div>
          {adding ? (
            <form className="add-task-form" onSubmit={addTask}>
              <input autoFocus value={newTask} onChange={(event) => setNewTask(event.target.value)} placeholder="补充一个本周要交付的具体任务" />
              <button className="primary-button small" type="submit">添加</button>
              <button className="quiet-button small" type="button" onClick={() => setAdding(false)}>取消</button>
            </form>
          ) : (
            <button className="add-task-button" onClick={() => setAdding(true)}><Plus size={18} />添加本周任务</button>
          )}

          <section className={`daily-checkin ${day.checkedIn ? 'is-complete' : ''}`}>
            <div className="daily-checkin-heading">
              <div><small>DAILY CHECK-IN</small><h2>今日学习打卡</h2></div>
              <span>{formatChineseDate(dateKey, true)}</span>
            </div>
            <FocusTimer onComplete={(minutes) => updateDay((current) => ({ ...current, focusMinutes: (current.focusMinutes || 0) + minutes }))} />
            <label className="daily-note">
              <BookOpen size={18} />
              <textarea
                value={day.note || ''}
                onChange={(event) => updateDay((current) => ({ ...current, note: event.target.value }))}
                placeholder="今天具体完成了什么？卡在哪里？明天从哪一步继续？"
                maxLength={500}
              />
              <span>{(day.note || '').length} / 500</span>
            </label>
            <button className="checkin-button" onClick={() => updateDay((current) => ({ ...current, checkedIn: !current.checkedIn }))}>
              <Check size={17} />{day.checkedIn ? '今日已打卡 · 点击撤销' : '完成今日学习打卡'}
            </button>
          </section>
          <div className="plan-update-note">
            <CalendarDays size={17} />
            <span><strong>任务包覆盖至 {formatShortDate(planWindow.end)}</strong>建议在 {formatShortDate(planWindow.nextUpdate)} 前后，带着完成度和复盘找我更新下一月。</span>
          </div>
        </div>
      </section>

      <ProgressRail phase={phase} nextDecision={nextDecision} navigate={navigate} />
      <WeeklyOverview store={store} dateKey={dateKey} navigate={navigate} />
    </div>
  )
}

function TaskRow({ task, expanded, toggleExpanded, toggle, remove }) {
  const categoryLabels = {
    engineering: '数学', portfolio: '408', algorithm: 'Java算法', backend: 'Java后端', direction: '英语', choice: '复盘与目标', custom: '自定义',
  }
  const priorityLabels = { core: '核心', support: '基础', optional: '选做', custom: '自定义' }
  return (
    <article className={`task-row ${task.completed ? 'completed' : ''} ${expanded ? 'is-expanded' : ''}`}>
      <div className="task-row-main">
        <button className="check-button" onClick={toggle} aria-label={`${task.completed ? '取消完成' : '完成任务'}：${task.title}`}>
          {task.completed && <Check size={17} strokeWidth={2.5} />}
        </button>
        <button className="task-copy" onClick={toggleExpanded} aria-expanded={expanded}>
          <span>{task.title}</span>
          <small>{priorityLabels[task.priority] || '任务'} · 预计 {formatMinutes(task.minutes)}</small>
        </button>
        <span className={`category-label ${task.category}`}>{categoryLabels[task.category] || '任务'}</span>
        {!task.generated && <button className="row-menu" onClick={remove} aria-label={`删除任务：${task.title}`}><Trash2 size={17} /></button>}
        <button className="task-expand" onClick={toggleExpanded} aria-expanded={expanded} aria-label={`${expanded ? '收起' : '展开'}任务详情：${task.title}`}><ChevronDown size={18} /></button>
      </div>
      {expanded && (
        <div className="task-detail">
          <p className="task-outcome"><strong>这项为什么做</strong>{task.outcome}</p>
          <div className="task-steps"><strong>照着做</strong><ol>{task.steps.map((step) => <li key={step}>{step}</li>)}</ol></div>
          <p className="task-deliverable"><Check size={16} /><span><strong>完成标准</strong>{task.deliverable}</span></p>
          {task.resources.length > 0 && (
            <div className="task-resources">
              <strong>学习入口</strong>
              <div>{task.resources.map((resource) => <a key={resource.url} href={resource.url} target="_blank" rel="noreferrer">{resource.title}<ExternalLink size={14} /></a>)}</div>
            </div>
          )}
        </div>
      )}
    </article>
  )
}

function EmptyTasks() {
  return (
    <div className="empty-tasks">
      <Check size={24} />
      <strong>本周没有已审核的详细任务</strong>
      <span>请带着最近的完成记录来更新下一月计划，不再用泛化任务填充。</span>
    </div>
  )
}

function FocusTimer({ onComplete }) {
  const [duration, setDuration] = useState(25)
  const [seconds, setSeconds] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const completedRef = useRef(false)

  useEffect(() => {
    if (!running) return undefined
    const timer = window.setInterval(() => {
      setSeconds((current) => Math.max(0, current - 1))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [running])

  useEffect(() => {
    if (seconds !== 0 || completedRef.current) return
    completedRef.current = true
    setRunning(false)
    onComplete(duration)
  }, [seconds, duration, onComplete])

  function chooseDuration(value) {
    const next = Number(value)
    setDuration(next)
    setSeconds(next * 60)
    setRunning(false)
    completedRef.current = false
  }

  function reset() {
    setRunning(false)
    setSeconds(duration * 60)
    completedRef.current = false
  }

  const mins = String(Math.floor(seconds / 60)).padStart(2, '0')
  const secs = String(seconds % 60).padStart(2, '0')

  return (
    <div className={`focus-control ${running ? 'running' : ''}`}>
      <button className="focus-main" onClick={() => setRunning((value) => !value)}>
        {running ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}
        <span>{running ? `${mins}:${secs}` : `开始专注 · ${duration}分钟`}</span>
      </button>
      <select value={duration} onChange={(event) => chooseDuration(event.target.value)} aria-label="专注时长">
        <option value="15">15分钟</option><option value="25">25分钟</option><option value="45">45分钟</option><option value="60">60分钟</option>
      </select>
      <button className="timer-reset" onClick={reset} aria-label="重置计时"><RotateCcw size={18} /></button>
    </div>
  )
}

function ProgressRail({ phase, nextDecision, navigate }) {
  return (
    <aside className="progress-rail">
      <section>
        <h2>当前阶段</h2>
        <div className="phase-summary">
          <span className="rail-icon blue"><Target size={23} /></span>
          <div><strong>{phase.title}</strong><span>{phase.target}</span></div>
        </div>
      </section>
      <section className="decision-summary">
        <h2>下一决策点</h2>
        <button onClick={() => navigate('roadmap')}>
          <span className="decision-diamond" />
          <span><strong>{formatShortDate(nextDecision.date)} · {nextDecision.title}</strong><small>{nextDecision.why}</small></span>
          <ChevronRight size={18} />
        </button>
      </section>
      <section>
        <h2>里程碑进度</h2>
        <div className="milestone-list">
          {milestones.map((milestone) => (
            <div className={`milestone ${milestone.state}`} key={milestone.date}>
              <span className="milestone-dot">{milestone.state === 'done' && <Check size={12} />}</span>
              <div><strong>{milestone.title}</strong><small>{milestone.date}</small></div>
            </div>
          ))}
        </div>
      </section>
    </aside>
  )
}

function WeeklyOverview({ store, dateKey, navigate }) {
  const week = weekRange(dateKey)
  const hours = week.reduce((total, key) => total + (store.days[key]?.focusMinutes || 0), 0) / 60
  const goal = store.preferences.weeklyHours || 24
  const heatDays = Array.from({ length: 28 }, (_, index) => shiftDateKey(dateKey, index - 27))
  return (
    <section className="weekly-overview">
      <div className="week-hours">
        <div className="section-heading"><h2>本周投入</h2><span>{hours.toFixed(1)} / {goal} 小时</span></div>
        <div className="progress-track"><i style={{ width: `${Math.min(100, hours / goal * 100)}%` }} /></div>
        <div className="week-bars">
          {week.map((key, index) => {
            const minutes = store.days[key]?.focusMinutes || 0
            return <div key={key}><i style={{ height: `${Math.max(5, Math.min(100, minutes / 120 * 100))}%` }} /><span>{'一二三四五六日'[index]}</span></div>
          })}
        </div>
      </div>
      <div className="checkin-heatmap">
        <div className="section-heading"><h2>打卡记录</h2><span>最近 4 周</span></div>
        <div className="heat-grid">
          {heatDays.map((key) => {
            const record = store.days[key]
            const minutes = record?.focusMinutes || 0
            const intensity = record?.checkedIn ? (minutes >= 120 ? 3 : minutes >= 45 ? 2 : 1) : 0
            return <span key={key} className={`heat-${intensity}`} title={`${key} · ${record?.checkedIn ? `已打卡，专注 ${minutes} 分钟` : '未打卡'}`} />
          })}
        </div>
        <div className="heat-legend"><span>少</span><i /><i className="heat-1" /><i className="heat-2" /><i className="heat-3" /><span>多</span></div>
      </div>
      <div className="route-preview">
        <div className="section-heading"><h2>考研＋就业双主线</h2><button onClick={() => navigate('roadmap')}>查看完整路线 <ChevronRight size={16} /></button></div>
        <div className="route-line">
          <div className="route-node active"><i /><strong>现在</strong><span>四科＋Java基础</span></div>
          <div className="route-node decision"><i /><strong>2027春</strong><span>后端项目成型</span></div>
          <div className="route-node"><i /><strong>2027六月</strong><span>首轮＋简历投递</span></div>
          <div className="route-node"><i /><strong>2027暑假</strong><span>强化＋就业保温</span></div>
          <div className="route-node"><i /><strong>九月起</strong><span>冲刺与秋招取舍</span></div>
        </div>
      </div>
    </section>
  )
}

function RoadmapView() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(decisions[0])
  const visibleLanes = filter === 'all' ? lanes : lanes.filter((lane) => lane.id === filter)
  const months = useMemo(() => buildMonths('2026-09', '2027-12'), [])

  return (
    <div className="view roadmap-view">
      <div className="page-heading roadmap-heading">
        <div><h1>从现在，到初试与 Java 后端求职</h1><p>2027 年 6 月前并行建设考试基础和后端项目，之后按阶段调整重心。</p></div>
        <span className="framework-badge"><Target size={16} />六次进度校准</span>
      </div>
      <section className="learning-strategy" aria-label="当前学习策略">
        <strong>考研与就业双主线，按证据推进</strong>
        <p>{learningStrategy.summary}</p>
        <details><summary>考试科目、每周负荷和阶段节点</summary><p>{learningStrategy.examRule}</p><p>{learningStrategy.timeRule}</p><p>{learningStrategy.scopeRule}</p><ul>{learningStrategy.checkpoints.map((item) => <li key={item}>{item}</li>)}</ul></details>
      </section>
      <div className="roadmap-toolbar" role="group" aria-label="路线筛选">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>全部</button>
        {lanes.map((lane) => <button key={lane.id} className={filter === lane.id ? 'active' : ''} onClick={() => setFilter(lane.id)}>{lane.name}</button>)}
      </div>
      <div className="roadmap-layout">
        <section className="timeline-panel">
          <div className="timeline-scroll">
            <div className="month-header roadmap-grid">
              {months.map((month) => <span key={month}>{month.slice(2).replace('-', '.')}</span>)}
            </div>
            {visibleLanes.map((lane) => (
              <div className={`lane-group ${lane.color}`} key={lane.id}>
                <div className="lane-label"><LaneIcon lane={lane.id} /><strong>{lane.name}</strong></div>
                <div className="lane-tracks" style={{ '--rows': lane.items.length }}>
                  {lane.items.map((item, index) => {
                    const start = months.indexOf(item.start)
                    const end = months.indexOf(item.end)
                    const span = Math.max(1, end - start + 1)
                    return (
                      <button
                        key={item.id}
                        className={`timeline-item ${selected?.id === item.id ? 'selected' : ''}`}
                        style={{ gridColumn: `${start + 1} / span ${span}`, gridRow: index + 1 }}
                        onClick={() => setSelected(item)}
                      >
                        <strong>{item.title}</strong><span>{item.start}—{item.end}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
            <div className="decision-row">
              <div className="lane-label"><Target size={19} /><strong>决策节点</strong></div>
              <div className="decision-track roadmap-grid">
                {decisions.map((decision) => {
                  const month = decision.date.slice(0, 7)
                  const start = months.indexOf(month)
                  return (
                    <button key={decision.id} className={selected?.id === decision.id ? 'selected' : ''} style={{ gridColumn: start + 1 }} onClick={() => setSelected(decision)}>
                      <i /><strong>{formatShortDate(decision.date)}</strong><span>{decision.title}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
        <RoadmapInspector selected={selected} />
      </div>
    </div>
  )
}

function LaneIcon({ lane }) {
  const icons = { engineering: Sparkles, portfolio: BookOpen, backend: BriefcaseBusiness, experiments: FlaskConical, choices: Target }
  const Icon = icons[lane] || Target
  return <span className="lane-icon"><Icon size={20} /></span>
}

function RoadmapInspector({ selected }) {
  const isDecision = Boolean(selected?.why)
  return (
    <aside className="roadmap-inspector">
      <div className="inspector-title"><span className={isDecision ? 'decision-diamond' : 'inspector-node'} /><div><small>{isDecision ? '决策节点' : '路线事项'}</small><h2>{selected?.title}</h2></div></div>
      {isDecision ? (
        <>
          <section><h3>为什么是这个节点</h3><p>{selected.why}</p></section>
          <section><h3>完成标准</h3><ul>{selected.standards.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><h3>调整条件</h3><ul>{selected.adjust.map((item) => <li key={item}>{item}</li>)}</ul></section>
        </>
      ) : (
        <>
          <section><h3>时间窗口</h3><p>{selected?.start}—{selected?.end}</p></section>
          <section><h3>路线意义</h3><p>{selected?.note}</p></section>
          {selected?.resources?.length > 0 && <section><h3>推荐学习入口</h3><div className="resource-links">{selected.resources.map((resource) => <a key={resource.url} href={resource.url} target="_blank" rel="noreferrer">{resource.title}<ExternalLink size={13} /></a>)}</div></section>}
          <section><h3>完成后要留下什么</h3><ul><li>一个可验证的成果</li><li>一份过程记录或复盘</li><li>对下一步选择更清晰的证据</li></ul></section>
        </>
      )}
    </aside>
  )
}

function ExperimentsView({ store, setStore }) {
  const [selectedId, setSelectedId] = useState('math')
  const selected = experiments.find((item) => item.id === selectedId)
  const data = store.experimentData[selectedId] || defaultExperimentData(selected)

  function updateExperiment(updater) {
    setStore((current) => {
      const currentData = current.experimentData[selectedId] || defaultExperimentData(selected)
      return { ...current, experimentData: { ...current.experimentData, [selectedId]: updater(currentData) } }
    })
  }

  const score = Math.round(Object.values(data.ratings).reduce((a, b) => a + Number(b), 0) / 4 * 20)
  const completedChecks = data.checks.filter(Boolean).length

  return (
    <div className="view experiments-view">
      <div className="page-heading">
        <div><h1>学习诊断</h1><p>用闭卷小测、延迟重做、可运行代码和项目证据校准进度。</p></div>
        <div className="evidence-count"><strong>{experiments.filter((item) => (store.experimentData[item.id]?.checks || []).some(Boolean)).length}</strong><span>项诊断已有记录</span></div>
      </div>
      <div className="experiments-layout">
        <section className="experiment-list">
          {experiments.map((experiment) => {
            const experimentData = store.experimentData[experiment.id] || defaultExperimentData(experiment)
            const done = experimentData.checks.filter(Boolean).length
            return (
              <button key={experiment.id} className={selectedId === experiment.id ? 'active' : ''} onClick={() => setSelectedId(experiment.id)}>
                <span className={`experiment-status ${experiment.status}`} />
                <span className="experiment-row-copy"><strong>{experiment.title}</strong><small>{experiment.question}</small></span>
                <span className="experiment-meta"><small>{experiment.window}</small><strong>{done} / {experiment.checks.length}</strong></span>
                <ChevronRight size={18} />
              </button>
            )
          })}
        </section>
        <section className="experiment-detail">
          <div className="experiment-detail-heading">
            <div><small>{selected.window}</small><h2>{selected.title}</h2></div>
            <div className={`score-ring ${score >= 70 ? 'high' : ''}`} style={{ '--score': score }}><strong>{score}</strong><small>掌握度</small></div>
          </div>
          <blockquote>{selected.question}</blockquote>
          <div className="deliverable"><Target size={18} /><span><small>最小交付物</small><strong>{selected.deliverable}</strong></span></div>
          <div className="experiment-checks">
            <h3>诊断动作</h3>
            {selected.checks.map((check, index) => (
              <label key={check}><input type="checkbox" checked={Boolean(data.checks[index])} onChange={() => updateExperiment((current) => ({ ...current, checks: current.checks.map((value, i) => i === index ? !value : value) }))} /><span className="fake-checkbox"><Check size={14} /></span><span>{check}</span></label>
            ))}
          </div>
          <div className="rating-grid">
            {[
              ['interest', '知识掌握'], ['aptitude', '独立完成'], ['portfolio', '限时或运行'], ['market', '复盘修复'],
            ].map(([key, label]) => (
              <label key={key}><span>{label}<strong>{data.ratings[key]} / 5</strong></span><input type="range" min="1" max="5" value={data.ratings[key]} onInput={(event) => updateExperiment((current) => ({ ...current, ratings: { ...current.ratings, [key]: Number(event.currentTarget.value) } }))} /></label>
            ))}
          </div>
          <label className="experiment-notes"><span>诊断笔记</span><textarea value={data.notes} onChange={(event) => updateExperiment((current) => ({ ...current, notes: event.target.value }))} placeholder="记录正确率、耗时、反复错误和下一步补救动作……" /></label>
          <div className="experiment-footer"><span>{completedChecks === selected.checks.length ? '本轮诊断动作已完成' : `还需完成 ${selected.checks.length - completedChecks} 个诊断动作`}</span><span className="autosave-status"><Check size={15} />已自动保存</span></div>
        </section>
      </div>
    </div>
  )
}

function defaultExperimentData(experiment) {
  return { checks: experiment.checks.map(() => false), ratings: { interest: 3, aptitude: 3, portfolio: 3, market: 3 }, notes: '' }
}

function ReviewView({ store, setStore }) {
  const currentWeek = weekRange(todayKey)
  const weekId = currentWeek[0]
  const existing = store.reviews.find((review) => review.weekId === weekId)
  const [form, setForm] = useState(existing || { weekId, wins: '', blockers: '', learning: '', nextFocus: '', energy: 3, routeChange: '保持计划' })
  const fileInput = useRef(null)
  const weekDays = currentWeek.map((key) => store.days[key]).filter(Boolean)
  const completedTasks = reconcileWeeklyPlan(weekId, store.weeks?.[weekId]).tasks.filter((task) => task.completed).length
  const focusHours = weekDays.reduce((sum, day) => sum + day.focusMinutes, 0) / 60

  function saveReview(event) {
    event.preventDefault()
    setStore((current) => ({ ...current, reviews: [...current.reviews.filter((review) => review.weekId !== weekId), { ...form, savedAt: new Date().toISOString() }] }))
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(store, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `kixu-learn-${todayKey}.json`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  function importData(event) {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result)
        if (!parsed.days || !parsed.experimentData) throw new Error('数据格式不正确')
        setStore({
          ...initialStore,
          ...parsed,
          version: 4,
          days: parsed.days || {},
          weeks: reconcileStoredWeeks(parsed.weeks || {}),
          experimentData: parsed.experimentData || {},
          reviews: parsed.reviews || [],
          preferences: {
            ...initialStore.preferences,
            ...(parsed.preferences || {}),
            weeklyHours: [18, 22].includes(parsed.preferences?.weeklyHours)
              ? 24
              : (parsed.preferences?.weeklyHours ?? 24),
          },
        })
      } catch (error) {
        window.alert(`导入失败：${error.message}`)
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  function resetData() {
    if (window.confirm('确认清空所有打卡、诊断与复盘数据吗？请先导出备份。')) setStore(initialStore)
  }

  return (
    <div className="view review-view">
      <div className="page-heading">
        <div><h1>周复盘</h1><p>用投入、正确率和错误类型调整下一周，不用完成率安慰自己。</p></div>
        <div className="data-actions">
          <button className="quiet-button" onClick={exportData}><Download size={17} />导出数据</button>
          <button className="quiet-button" onClick={() => fileInput.current?.click()}><Upload size={17} />导入</button>
          <input ref={fileInput} type="file" accept="application/json" onChange={importData} hidden />
        </div>
      </div>
      <section className="review-summary">
        <div><span>本周完成</span><strong>{completedTasks}</strong><small>项任务</small></div>
        <div><span>专注投入</span><strong>{focusHours.toFixed(1)}</strong><small>小时</small></div>
        <div><span>打卡天数</span><strong>{weekDays.filter((day) => day.checkedIn).length}</strong><small>/ 7 天</small></div>
        <div><span>当前阶段</span><strong className="summary-text">{getPhase(todayKey).title}</strong><small>{getPhase(todayKey).target}</small></div>
      </section>
      <div className="review-layout">
        <form className="review-form" onSubmit={saveReview}>
          <ReviewField label="这周真正完成了什么？" value={form.wins} onChange={(value) => setForm({ ...form, wins: value })} placeholder="写成果，不写“学了很多”……" />
          <ReviewField label="最大的阻碍是什么？" value={form.blockers} onChange={(value) => setForm({ ...form, blockers: value })} placeholder="时间、范围、知识、情绪还是环境？" />
          <ReviewField label="本周暴露了什么知识漏洞？" value={form.learning} onChange={(value) => setForm({ ...form, learning: value })} placeholder="写重复错误、正确率变化和仍不会的知识点……" />
          <ReviewField label="下周最需要修复什么？" value={form.nextFocus} onChange={(value) => setForm({ ...form, nextFocus: value })} placeholder="只写一个最重要的补救动作……" />
          <div className="review-controls">
            <label><span>本周能量</span><input type="range" min="1" max="5" value={form.energy} onChange={(event) => setForm({ ...form, energy: Number(event.target.value) })} /><strong>{form.energy} / 5</strong></label>
            <label><span>下周调整</span><select value={form.routeChange} onChange={(event) => setForm({ ...form, routeChange: event.target.value })}><option>保持计划</option><option>减少题量并补漏</option><option>增加数学时间</option><option>增加408时间</option><option>减少项目功能</option><option>补 Java／算法</option><option>期末周临时降载</option></select></label>
          </div>
          <button className="primary-button" type="submit"><Save size={17} />保存本周复盘</button>
        </form>
        <aside className="review-history">
          <div className="section-heading"><h2>复盘记录</h2><span>{store.reviews.length} 周</span></div>
          {store.reviews.length ? [...store.reviews].reverse().map((review) => (
            <article key={review.weekId}><span>{review.weekId} 当周</span><strong>{review.nextFocus || '未填写下周重点'}</strong><p>{review.learning || review.wins || '暂无详细记录'}</p><small>能量 {review.energy}/5 · {review.routeChange}</small></article>
          )) : <div className="empty-history"><Clock3 size={22} /><strong>还没有保存过周复盘</strong><span>第一次记录会成为以后调整路线的基线。</span></div>}
          <div className="data-safety"><h3>数据安全</h3><p>第一版数据保存在当前浏览器。建议每周导出一次 JSON 备份。</p><button className="danger-button" onClick={resetData}><Trash2 size={15} />清空本地数据</button></div>
        </aside>
      </div>
    </div>
  )
}

function ReviewField({ label, value, onChange, placeholder }) {
  return <label className="review-field"><span>{label}</span><textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /></label>
}

function formatShortDate(date) {
  const value = fromDateKey(date)
  return `${value.getMonth() + 1}月${value.getDate()}日`
}

function formatMinutes(minutes) {
  if (minutes < 60) return `${minutes} 分钟`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest ? `${hours} 小时 ${rest} 分钟` : `${hours} 小时`
}

function buildMonths(start, end) {
  const [startYear, startMonth] = start.split('-').map(Number)
  const [endYear, endMonth] = end.split('-').map(Number)
  const result = []
  let year = startYear
  let month = startMonth
  while (year < endYear || (year === endYear && month <= endMonth)) {
    result.push(`${year}-${String(month).padStart(2, '0')}`)
    month += 1
    if (month === 13) { year += 1; month = 1 }
  }
  return result
}
