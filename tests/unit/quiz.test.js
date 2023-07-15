import { assert, describe, expect, it } from 'vitest'
import data from '~~/data/quiz-data.json'

import { createQuiz, currentTopicData, randomQuestionOptions, correctAnswer, shuffleArray } from '~~/src/assets/js/quiz/quiz.js'

describe('create new quiz', () => {
  it('should have correct chosen topic', () => {
    createQuiz('culture')
    assert.equal(currentTopicData.topic, 'culture')
  })
