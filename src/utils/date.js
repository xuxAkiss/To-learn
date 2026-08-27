const SHANGHAI_OFFSET = 8 * 60 * 60 * 1000

export function toDateKey(date = new Date()) {
  return new Date(date.getTime() + SHANGHAI_OFFSET).toISOString().slice(0, 10)
}

export function fromDateKey(key) {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day, 12)
}

export function shiftDateKey(key, days) {
  const date = fromDateKey(key)
  date.setDate(date.getDate() + days)
  return toDateKey(date)
}

export function formatChineseDate(key, compact = false) {
  const date = fromDateKey(key)
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  if (compact) return `${date.getMonth() + 1}月${date.getDate()}日 周${weekdays[date.getDay()]}`
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 周${weekdays[date.getDay()]}`
}

export function weekRange(key) {
  const date = fromDateKey(key)
  const day = date.getDay() || 7
  const monday = new Date(date)
  monday.setDate(date.getDate() - day + 1)
  return Array.from({ length: 7 }, (_, index) => {
    const current = new Date(monday)
    current.setDate(monday.getDate() + index)
    return toDateKey(current)
  })
}

export function daysBetween(start, end) {
  return Math.round((fromDateKey(end) - fromDateKey(start)) / 86400000)
}
