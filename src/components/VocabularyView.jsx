import { useEffect, useState } from 'react'
import { Check, Volume2 } from 'lucide-react'
import { dueWords, gradeWord, initialVocabulary, matchesWord } from '../utils/vocabulary'

export default function VocabularyView({ store, setStore, saveError }) {
  const [words, setWords] = useState(null)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)
  const [audioError, setAudioError] = useState('')
  const [now, setNow] = useState(Date.now)
  const state = { ...initialVocabulary, ...store.vocabulary }
  const due = dueWords(state, now)
  const index = state.mode === 'review' ? due[0] : state.cursor
  const word = words?.[index]
  const seen = Object.keys(state.records).length
  const today = new Date().toLocaleDateString('sv-SE')

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${import.meta.env.BASE_URL}english-ii.json`, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error('词库加载失败'); return response.json() })
      .then((data) => { setWords(data); setError('') })
      .catch((err) => { if (err.name !== 'AbortError') setError('词库暂时无法加载，请检查网络后重试。你的背词进度仍然保留。') })
    const timer = setInterval(() => setNow(Date.now()), 30000)
    return () => { controller.abort(); clearInterval(timer); window.speechSynthesis?.cancel() }
  }, [retry])

  function update(patch) {
    setStore((current) => ({ ...current, vocabulary: { ...initialVocabulary, ...current.vocabulary, ...patch } }))
  }

  function grade(known) {
    setStore((current) => ({ ...current, vocabulary: gradeWord({ ...initialVocabulary, ...current.vocabulary }, index, known, words.length) }))
    setNow(Date.now())
    setAudioError('')
  }

  function speak() {
    if (!window.speechSynthesis) { setAudioError('当前浏览器不支持朗读。'); return }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(word.name)
    utterance.lang = 'en-US'
    utterance.rate = 0.85
    utterance.onerror = () => setAudioError('朗读暂不可用，请检查设备的英语语音。')
    window.speechSynthesis.speak(utterance)
  }

  return <div className="view vocabulary-view">
    <div className="page-heading"><div><h1>词汇</h1><p>英语二单词书 · 每天一点，随时接着背。</p></div><span className="autosave-status" role="status">{saveError || <><Check size={15} />进度已保存到本机</>}</span></div>
    <section className="vocab-stats" aria-label="背词进度">
      <div><span>已经学过</span><strong>{seen}<small> / {words?.length || 4559}</small></strong></div>
      <div><span>到期复习</span><strong>{due.length}</strong></div>
      <div><span>今日练习</span><strong>{state.daily[today] || 0}<small> 次</small></strong></div>
    </section>
    <div className="vocab-layout"><section className="vocab-card">
      <div className="vocab-tabs" aria-label="学习模式">{[['learn', '学习新词'], ['review', `到期复习 (${due.length})`]].map(([mode, label]) => <button key={mode} className={state.mode === mode ? 'primary-button' : 'quiet-button'} aria-pressed={state.mode === mode} onClick={() => update({ mode, draft: '', revealed: false, feedback: '' })}>{label}</button>)}</div>
      {error ? <div role="alert"><p>{error}</p><button className="quiet-button" onClick={() => setRetry(retry + 1)}>重新加载词库</button></div> : !words ? <p role="status">正在加载英语二词库…</p> : !word ? <div className="vocab-empty"><Check size={36} /><h2>{state.mode === 'review' ? '当前到期词已复习完' : '这本词书已学完一轮'}</h2><p>{state.mode === 'review' ? '稍后再来复习，也可以继续学习新词。' : '继续通过到期复习巩固记忆。'}</p></div> : <>
        <div className="vocab-position">{state.mode === 'learn' ? `第 ${index + 1} / ${words.length} 词` : '回想释义，再检查拼写'}</div>
        <h2 className="vocab-word">{word.name}</h2>
        <button className="quiet-button small" onClick={speak}><Volume2 size={17} />朗读单词</button>
        {audioError && <p role="status">{audioError}</p>}
        <div className="vocab-meaning">{state.revealed ? word.trans.map((meaning, i) => <p key={i}>{meaning}</p>) : <button className="quiet-button" onClick={() => update({ revealed: true })}>回想后，查看释义</button>}</div>
        <form className="vocab-spelling" onSubmit={(event) => { event.preventDefault(); update({ feedback: matchesWord(state.draft, word.name) ? '拼写正确，再判断是否记住了释义。' : '还不一致，对照单词再试一次。' }) }}>
          <label htmlFor="word-spelling">拼写练习</label><div><input id="word-spelling" value={state.draft} autoComplete="off" autoCapitalize="none" spellCheck={false} onChange={(event) => update({ draft: event.target.value, feedback: '' })} placeholder="在这里输入单词或短语" /><button className="quiet-button" type="submit">检查</button></div>
          <p className="vocab-feedback" role="status">{state.feedback}</p>
        </form>
        <div className="vocab-grade"><button className="quiet-button" onClick={() => grade(false)}>还没记住 · 10 分钟后再练</button><button className="primary-button" onClick={() => grade(true)}>记住了 · 下一个</button></div>
      </>}
    </section><aside className="vocab-guide"><h2>按自己的节奏记</h2><p>先回想释义，再展开检查。输入单词练习拼写，最后如实选择是否记住。</p><p>记住的词会在 1、3、7、14、30 天后安排复习；没记住的词 10 分钟后再练。</p><h3>随时切换，回来继续</h3><p>当前位置、输入内容和每次作答都会自动保存。可在“设置与数据”中导出备份。</p><p>进度保存在当前浏览器，不会自动同步到其他设备。</p><small>词库来源：<a href="https://github.com/RealKai42/qwerty-learner/blob/master/public/dicts/English_II.json" target="_blank" rel="noreferrer">Qwerty Learner 英语二词书</a> · <a href={`${import.meta.env.BASE_URL}qwerty-license.txt`} target="_blank" rel="noreferrer">GPL-3.0 许可</a>。这是学习词表，不代表考试大纲的全部范围。</small></aside></div>
  </div>
}
