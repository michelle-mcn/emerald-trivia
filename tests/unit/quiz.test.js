import { assert, describe, expect, it } from 'vitest'
import data from '~~/data/quiz-data.json'

import { createQuiz, currentTopicData, randomQuestionOptions, correctAnswer, shuffleArray } from '~~/src/assets/js/quiz/quiz.js'

describe('create new quiz', () => {
  it('should have correct chosen topic', () => {
    createQuiz('culture')
    assert.equal(currentTopicData.topic, 'culture')
  })

  it('should contain a question from chosen topic questions', () => {
    createQuiz('culture')
    expect(data['culture'].questions.some(item => item.question === currentTopicData.question)).toBe(true)
  })

  it('should contain correct from chosen topic question options', () => {
    createQuiz('general_knowledge')
    expect(randomQuestionOptions.some(item => item === correctAnswer)).toBe(true)
  })
  
})

describe('shuffle array', () => {
  it('should shuffle array', () => {
    const array = [1, 2, 3, 4, 5]
    const shuffledArray = shuffleArray([...array])
    expect(array).not.toEqual(shuffledArray)
  })
})

