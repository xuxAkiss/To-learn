import test from 'node:test'
import assert from 'node:assert/strict'
import { dueWords, gradeWord, initialVocabulary, matchesWord } from './vocabulary.js'

test('grading preserves position and draft through serialized navigation state', () => {
  const now = 1800000000000
  const learned = gradeWord(initialVocabulary, 0, true, 4559, now)
  const restored = JSON.parse(JSON.stringify({ ...learned, draft: 'partial' }))
  assert.equal(restored.cursor, 1)
  assert.equal(restored.draft, 'partial')
  assert.equal(restored.records[0].attempts, 1)
  assert.deepEqual(dueWords(restored, now), [])
  assert.deepEqual(dueWords(restored, now + 86400000), [0])
})
test('forgotten words retry after ten minutes and reviewing never moves new-word cursor', () => {
  const now = 1800000000000
  const forgotten = gradeWord(initialVocabulary, 0, false, 3, now)
  assert.deepEqual(dueWords(forgotten, now + 599999), [])
  assert.deepEqual(dueWords(forgotten, now + 600000), [0])
  const reviewed = gradeWord({ ...forgotten, mode: 'review' }, 0, true, 3, now + 600000)
  assert.equal(reviewed.cursor, 1)
  assert.equal(reviewed.records[0].streak, 1)
  assert.deepEqual(dueWords(reviewed, now + 600000), [])
})
test('last word ends new-word learning and spelling accepts case and extra spaces', () => {
  assert.equal(gradeWord(initialVocabulary, 2, true, 3).cursor, 3)
  assert.equal(matchesWord('  Ability  to ', 'ability to'), true)
  assert.equal(matchesWord('abilty', 'ability'), false)
})
