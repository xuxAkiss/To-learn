export const initialVocabulary = { cursor: 0, mode: 'learn', draft: '', revealed: false, feedback: '', records: {}, daily: {} }

export function gradeWord(state, index, known, total, now = Date.now()) {
  const previous = state.records[index] || { attempts: 0, streak: 0 }
  const streak = known ? previous.streak + 1 : 0
  const days = known ? [1, 3, 7, 14, 30][Math.min(streak - 1, 4)] : 0
  const date = new Date(now).toLocaleDateString('sv-SE')
  return {
    ...state,
    cursor: state.mode === 'learn' ? Math.min(index + 1, total) : state.cursor,
    draft: '', revealed: false, feedback: '',
    records: { ...state.records, [index]: { attempts: previous.attempts + 1, streak, due: now + (days ? days * 86400000 : 600000), updatedAt: now } },
    daily: { ...state.daily, [date]: (state.daily[date] || 0) + 1 },
  }
}

export function dueWords(state, now = Date.now()) {
  return Object.entries(state.records).filter(([, value]) => value.due <= now).sort((a, b) => a[1].due - b[1].due).map(([id]) => Number(id))
}

export function matchesWord(answer, word) {
  const normalize = (value) => value.trim().toLowerCase().replace(/\s+/g, ' ')
  return normalize(answer) === normalize(word)
}
