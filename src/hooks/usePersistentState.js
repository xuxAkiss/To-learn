import { useCallback, useRef, useState } from 'react'

export function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : typeof initialValue === 'function' ? initialValue() : initialValue
    } catch {
      return typeof initialValue === 'function' ? initialValue() : initialValue
    }
  })

  const current = useRef(value)
  const [saveError, setSaveError] = useState('')
  const persist = useCallback((updater) => {
    const next = typeof updater === 'function' ? updater(current.current) : updater
    current.current = next
    try {
      localStorage.setItem(key, JSON.stringify(next))
      setSaveError('')
    } catch {
      setSaveError('保存失败，请先导出备份，暂勿关闭页面。')
    }
    setValue(next)
  }, [key])

  return [value, persist, saveError]
}
