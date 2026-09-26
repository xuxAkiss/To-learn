import { useEffect, useRef, useState } from 'react'
import { Check, Copy, X } from 'lucide-react'
import { buildWeeklyAiContext, copyText } from '../utils/weeklyAiContext'

export default function WeeklyAiExport({ dateKey, store }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="ai-export-entry">
        <button className="quiet-button small" aria-haspopup="dialog" onClick={() => setOpen(true)}><Copy size={16} />复制本周任务给 AI</button>
        <span>先预览，再复制 · 默认不含个人笔记</span>
      </div>
      {open && <AiContextDialog dateKey={dateKey} store={store} close={() => setOpen(false)} />}
    </>
  )
}

function AiContextDialog({ dateKey, store, close }) {
  const dialogRef = useRef(null)
  const previewRef = useRef(null)
  const [includeNotes, setIncludeNotes] = useState(false)
  const [copying, setCopying] = useState(false)
  const [status, setStatus] = useState(null)
  const text = buildWeeklyAiContext({ dateKey, store, includeNotes })
  const currentStatus = status?.text === text ? status.kind : null

  useEffect(() => {
    const dialog = dialogRef.current
    const previousFocus = document.activeElement
    dialog.showModal()
    return () => {
      dialog.close()
      previousFocus?.focus()
    }
  }, [])

  function selectPreview() {
    previewRef.current.focus()
    previewRef.current.select()
  }

  async function handleCopy() {
    setCopying(true)
    const success = await copyText(text)
    setStatus({ text, kind: success ? 'copied' : 'manual' })
    setCopying(false)
    if (!success && previewRef.current) selectPreview()
  }

  return (
    <dialog
      ref={dialogRef}
      className="ai-context-dialog"
      aria-labelledby="ai-context-title"
      aria-describedby="ai-context-description"
      onClose={close}
      onCancel={(event) => { event.preventDefault(); close() }}
      onKeyDown={(event) => { if (event.key === 'Escape') { event.preventDefault(); close() } }}
    >
      <div className="dialog-heading">
        <div><small>WEEKLY CONTEXT</small><h2 id="ai-context-title">把这一周交给 AI 读懂</h2></div>
        <button className="icon-button" onClick={close} aria-label="关闭 AI 任务预览"><X size={20} /></button>
      </div>
      <p id="ai-context-description" className="ai-context-description">包含所选周的目标、步骤、学习链接、验收标准、完成状态及自定义任务。只在本机生成；复制后由你自行粘贴给 AI，不会自动发送。</p>
      <label className="ai-notes-toggle">
        <input type="checkbox" checked={includeNotes} disabled={copying} onChange={(event) => setIncludeNotes(event.target.checked)} />
        <span>包含本周每日笔记与已保存的周复盘<small>默认关闭；开启前请检查是否含个人信息。</small></span>
      </label>
      <label className="ai-preview-label" htmlFor="ai-context-preview">将复制的完整内容 <span>{text.length.toLocaleString('zh-CN')} 字符</span></label>
      <textarea id="ai-context-preview" ref={previewRef} className="ai-context-preview" value={text} readOnly spellCheck={false} />
      <p className={`ai-copy-status ${currentStatus === 'manual' ? 'is-warning' : ''}`} role="status" aria-live="polite">
        {currentStatus === 'copied' ? '已复制！粘贴到你常用的 AI 对话中，再补充今天的卡点和可用时间。' : currentStatus === 'manual' ? '浏览器未允许自动复制。已选中内容，请按 Ctrl+C / ⌘C，或在手机上长按复制。' : '仅导出这一周；不包含其他周、科目诊断笔记或完整备份。'}
      </p>
      <div className="ai-context-actions">
        <button className="quiet-button" onClick={selectPreview}>全选文本</button>
        <button className="primary-button" onClick={handleCopy} disabled={copying}>{currentStatus === 'copied' ? <Check size={17} /> : <Copy size={17} />}{copying ? '正在复制…' : '复制到剪贴板'}</button>
      </div>
    </dialog>
  )
}
