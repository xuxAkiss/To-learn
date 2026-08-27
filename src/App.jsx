import { useEffect, useMemo, useRef, useState } from 'react'
import {
  BarChart3, BookOpen, BriefcaseBusiness, Check, ChevronLeft, ChevronRight,
  CircleHelp, Clock3, Download, ExternalLink, FlaskConical, Home, Map, Menu,
  Pause, Play, Plus, RotateCcw, Save, Settings2, Sparkles, Target, Trash2, Upload, X,
} from 'lucide-react'
import { usePersistentState } from './hooks/usePersistentState'
import { buildDailyTasks, getPhase } from './data/dailyPlan'
import { decisions, experiments, lanes, milestones } from './data/roadmap'
import { formatChineseDate, fromDateKey, shiftDateKey, toDateKey, weekRange } from './utils/date'

const STORAGE_KEY = 'kixu-learn-data-v1'
const todayKey = toDateKey()

const initialStore = {
  version: 1,
  days: {},
  experimentData: {},
  reviews: [],
  preferences: { weeklyHours: 18 },
}

const navItems = [
  { id: 'today', label: '今日', Icon: Home },
  { id: 'roadmap', label: '路线', Icon: Map },
  { id: 'experiments', label: '方向实验', shortLabel: '实验', Icon: FlaskConical },
  { id: 'review', label: '周复盘', shortLabel: '复盘', Icon: BarChart3 },
]

export default function App() {
  const [activeView, setActiveView] = useState('today')
  const [selectedDate, setSelectedDate] = useState(todayKey)
  const [store, setStore] = usePersistentState(STORAGE_KEY, initialStore)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)

  useEffect(() => {
    setStore((current) => {
      if (current.days[selectedDate]) return current
      return {
        ...current,
        days: {
          ...current.days,
          [selectedDate]: { tasks: buildDailyTasks(selectedDate), note: '', focusMinutes: 0 },
        },
      }
    })
  }, [selectedDate, setStore])

  const day = store.days[selectedDate] || { tasks: [], note: '', focusMinutes: 0 }

  function updateDay(updater) {
    setStore((current) => {
      const currentDay = current.days[selectedDate] || { tasks: buildDailyTasks(selectedDate), note: '', focusMinutes: 0 }
      const nextDay = typeof updater === 'function' ? updater(currentDay) : updater
      return { ...current, days: { ...current.days, [selectedDate]: nextDay } }
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
            updateDay={updateDay}
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
          <span><strong>Kixu</strong><small>ECNU · 2028</small></span>
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
          <li><strong>每天只看「今日」</strong><span>完成 2–4 个可验收任务，用专注计时记录真实投入。</span></li>
          <li><strong>每周做一次复盘</strong><span>记录产出、卡点和下周唯一重点，不用待办数量制造焦虑。</span></li>
          <li><strong>用实验代替猜测</strong><span>游戏、后端、AI Infra、科研和体制内都有限时试错卡，根据作品与真实体验打分。</span></li>
          <li><strong>到决策点再选路</strong><span>提交作品、选主攻方向、实习反馈和 offer 比较，每次都要用证据调整。</span></li>
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

function TodayView({ dateKey, setDateKey, day, updateDay, store, navigate }) {
  const [adding, setAdding] = useState(false)
  const [newTask, setNewTask] = useState('')
  const phase = getPhase(dateKey)
  const completed = day.tasks.filter((task) => task.completed).length
  const progress = day.tasks.length ? Math.round((completed / day.tasks.length) * 100) : 0
  const nextDecision = decisions.find((decision) => decision.date >= dateKey) || decisions.at(-1)

  function toggleTask(id) {
    updateDay((current) => ({
      ...current,
      tasks: current.tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task),
    }))
  }

  function deleteTask(id) {
    updateDay((current) => ({ ...current, tasks: current.tasks.filter((task) => task.id !== id) }))
  }

  function addTask(event) {
    event.preventDefault()
    const title = newTask.trim()
    if (!title) return
    updateDay((current) => ({
      ...current,
      tasks: [...current.tasks, { id: crypto.randomUUID(), title, category: 'custom', minutes: 30, completed: false }],
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
            <h1>今天，向前推进一点</h1>
          </div>
          <div className="today-progress" aria-label={`今日完成 ${completed} / ${day.tasks.length}`}>
            <span>今日 <strong>{completed} / {day.tasks.length}</strong></span>
            <div className="progress-track"><i style={{ width: `${progress}%` }} /></div>
          </div>
        </div>

        <div className="task-surface">
          <div className="task-list">
            {day.tasks.map((task) => (
              <TaskRow key={task.id} task={task} toggle={() => toggleTask(task.id)} remove={() => deleteTask(task.id)} />
            ))}
            {!day.tasks.length && <EmptyTasks />}
          </div>
          {adding ? (
            <form className="add-task-form" onSubmit={addTask}>
              <input autoFocus value={newTask} onChange={(event) => setNewTask(event.target.value)} placeholder="写下一个今天能完成的具体任务" />
              <button className="primary-button small" type="submit">添加</button>
              <button className="quiet-button small" type="button" onClick={() => setAdding(false)}>取消</button>
            </form>
          ) : (
            <button className="add-task-button" onClick={() => setAdding(true)}><Plus size={18} />添加任务</button>
          )}

          <FocusTimer onComplete={(minutes) => updateDay((current) => ({ ...current, focusMinutes: current.focusMinutes + minutes }))} />

          <label className="daily-note">
            <BookOpen size={18} />
            <textarea
              value={day.note}
              onChange={(event) => updateDay((current) => ({ ...current, note: event.target.value }))}
              placeholder="写下今天的计划、想法或遇到的问题……"
              maxLength={500}
            />
            <span>{day.note.length} / 500</span>
          </label>
        </div>
      </section>

      <ProgressRail phase={phase} nextDecision={nextDecision} navigate={navigate} />
      <WeeklyOverview store={store} dateKey={dateKey} navigate={navigate} />
    </div>
  )
}

function TaskRow({ task, toggle, remove }) {
  const categoryLabels = {
    engineering: '工程能力', portfolio: '作品与实习', direction: '方向实验', choice: '学业与选择', custom: '自定义',
  }
  return (
    <div className={`task-row ${task.completed ? 'completed' : ''}`}>
      <button className="check-button" onClick={toggle} aria-label={task.completed ? '标记为未完成' : '标记为已完成'}>
        {task.completed && <Check size={17} strokeWidth={2.5} />}
      </button>
      <div className="task-copy">
        <span>{task.title}</span>
        <small>{task.minutes} 分钟</small>
      </div>
      <span className={`category-label ${task.category}`}>{categoryLabels[task.category] || '任务'}</span>
      <button className="row-menu" onClick={remove} aria-label="删除任务"><Trash2 size={17} /></button>
    </div>
  )
}

function EmptyTasks() {
  return (
    <div className="empty-tasks">
      <Check size={24} />
      <strong>今天暂时没有任务</strong>
      <span>添加一个小而具体的动作。</span>
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
  const goal = store.preferences.weeklyHours || 18
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
            const complete = record?.tasks?.filter((task) => task.completed).length || 0
            const intensity = complete >= 3 ? 3 : complete
            return <span key={key} className={`heat-${intensity}`} title={`${key} · 完成 ${complete} 项`} />
          })}
        </div>
        <div className="heat-legend"><span>少</span><i /><i className="heat-1" /><i className="heat-2" /><i className="heat-3" /><span>多</span></div>
      </div>
      <div className="route-preview">
        <div className="section-heading"><h2>职业主线</h2><button onClick={() => navigate('roadmap')}>查看完整路线 <ChevronRight size={16} /></button></div>
        <div className="route-line">
          <div className="route-node active"><i /><strong>现在</strong><span>技术兴趣验证</span></div>
          <div className="route-node decision"><i /><strong>决策点</strong><span>提交作品</span></div>
          <div className="route-node"><i /><strong>实习准备</strong><span>投递与面试</span></div>
          <div className="route-node"><i /><strong>实习阶段</strong><span>积累经验</span></div>
          <div className="route-node"><i /><strong>毕业决策</strong><span>就业 / 深造 / 考公</span></div>
        </div>
      </div>
    </section>
  )
}

function RoadmapView() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(decisions[0])
  const visibleLanes = filter === 'all' ? lanes : lanes.filter((lane) => lane.id === filter)
  const months = useMemo(() => buildMonths('2026-08', '2028-06'), [])

  return (
    <div className="view roadmap-view">
      <div className="page-heading roadmap-heading">
        <div><h1>从现在，到毕业</h1><p>路线会根据实际作品、面试和体验结果调整。</p></div>
        <span className="framework-badge"><Target size={16} />四次证据决策</span>
      </div>
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
  const icons = { engineering: Sparkles, portfolio: BriefcaseBusiness, experiments: FlaskConical, choices: BookOpen }
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
  const [selectedId, setSelectedId] = useState('game')
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
        <div><h1>方向实验</h1><p>先做小而真实的验证，再决定要不要投入几年。</p></div>
        <div className="evidence-count"><strong>{experiments.filter((item) => (store.experimentData[item.id]?.checks || []).some(Boolean)).length}</strong><span>个实验已有证据</span></div>
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
            <div className={`score-ring ${score >= 70 ? 'high' : ''}`} style={{ '--score': score }}><strong>{score}</strong><small>证据分</small></div>
          </div>
          <blockquote>{selected.question}</blockquote>
          <div className="deliverable"><Target size={18} /><span><small>最小交付物</small><strong>{selected.deliverable}</strong></span></div>
          <div className="experiment-checks">
            <h3>验证动作</h3>
            {selected.checks.map((check, index) => (
              <label key={check}><input type="checkbox" checked={Boolean(data.checks[index])} onChange={() => updateExperiment((current) => ({ ...current, checks: current.checks.map((value, i) => i === index ? !value : value) }))} /><span className="fake-checkbox"><Check size={14} /></span><span>{check}</span></label>
            ))}
          </div>
          <div className="rating-grid">
            {[
              ['interest', '投入时的兴趣'], ['aptitude', '解决问题的能力'], ['portfolio', '能留下的作品'], ['market', '岗位与市场证据'],
            ].map(([key, label]) => (
              <label key={key}><span>{label}<strong>{data.ratings[key]} / 5</strong></span><input type="range" min="1" max="5" value={data.ratings[key]} onInput={(event) => updateExperiment((current) => ({ ...current, ratings: { ...current.ratings, [key]: Number(event.currentTarget.value) } }))} /></label>
            ))}
          </div>
          <label className="experiment-notes"><span>实验笔记</span><textarea value={data.notes} onChange={(event) => updateExperiment((current) => ({ ...current, notes: event.target.value }))} placeholder="记录让你兴奋、烦躁、擅长或意外的地方……" /></label>
          <div className="experiment-footer"><span>{completedChecks === selected.checks.length ? '已获得完整实验结果' : `还需完成 ${selected.checks.length - completedChecks} 个验证动作`}</span><span className="autosave-status"><Check size={15} />已自动保存</span></div>
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
  const [form, setForm] = useState(existing || { weekId, wins: '', blockers: '', learning: '', nextFocus: '', energy: 3, routeChange: '保持路线' })
  const fileInput = useRef(null)
  const weekDays = currentWeek.map((key) => store.days[key]).filter(Boolean)
  const completedTasks = weekDays.reduce((sum, day) => sum + day.tasks.filter((task) => task.completed).length, 0)
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
        setStore(parsed)
      } catch (error) {
        window.alert(`导入失败：${error.message}`)
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  function resetData() {
    if (window.confirm('确认清空所有打卡、实验与复盘数据吗？请先导出备份。')) setStore(initialStore)
  }

  return (
    <div className="view review-view">
      <div className="page-heading">
        <div><h1>周复盘</h1><p>不是评判自己，而是让路线跟随真实反馈调整。</p></div>
        <div className="data-actions">
          <button className="quiet-button" onClick={exportData}><Download size={17} />导出数据</button>
          <button className="quiet-button" onClick={() => fileInput.current?.click()}><Upload size={17} />导入</button>
          <input ref={fileInput} type="file" accept="application/json" onChange={importData} hidden />
        </div>
      </div>
      <section className="review-summary">
        <div><span>本周完成</span><strong>{completedTasks}</strong><small>项任务</small></div>
        <div><span>专注投入</span><strong>{focusHours.toFixed(1)}</strong><small>小时</small></div>
        <div><span>打卡天数</span><strong>{weekDays.filter((day) => day.tasks.some((task) => task.completed)).length}</strong><small>/ 7 天</small></div>
        <div><span>当前阶段</span><strong className="summary-text">{getPhase(todayKey).title}</strong><small>{getPhase(todayKey).target}</small></div>
      </section>
      <div className="review-layout">
        <form className="review-form" onSubmit={saveReview}>
          <ReviewField label="这周真正完成了什么？" value={form.wins} onChange={(value) => setForm({ ...form, wins: value })} placeholder="写成果，不写“学了很多”……" />
          <ReviewField label="最大的阻碍是什么？" value={form.blockers} onChange={(value) => setForm({ ...form, blockers: value })} placeholder="时间、范围、知识、情绪还是环境？" />
          <ReviewField label="获得了什么新证据？" value={form.learning} onChange={(value) => setForm({ ...form, learning: value })} placeholder="关于兴趣、能力、作品或岗位的信息……" />
          <ReviewField label="下周唯一最重要的推进是什么？" value={form.nextFocus} onChange={(value) => setForm({ ...form, nextFocus: value })} placeholder="只能选一个主结果……" />
          <div className="review-controls">
            <label><span>本周能量</span><input type="range" min="1" max="5" value={form.energy} onChange={(event) => setForm({ ...form, energy: Number(event.target.value) })} /><strong>{form.energy} / 5</strong></label>
            <label><span>路线调整</span><select value={form.routeChange} onChange={(event) => setForm({ ...form, routeChange: event.target.value })}><option>保持路线</option><option>缩小本周范围</option><option>增加工程基础时间</option><option>提前完成方向实验</option><option>需要重新评估主线</option></select></label>
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
