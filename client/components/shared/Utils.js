import React from 'react'
import { Letter } from './Styles'

export const once = (fn) => {
  let done = false
  return (...args) => (
    done ? null : (done = true, fn.apply(this, args))
  )
}

export const getPrimaryAndSecondary = ({ backgroundColor: [first], secondaryColor }) => [first, secondaryColor]

export const convertToAsci = (string, runningValue = []) => (
	string ?
    convertToAsci(string.slice(1), [...runningValue, string[0].charCodeAt(0)]) :
    runningValue
)

// arr -> string
export const convertToString = (arr) => (
  arr.reduce((acc, el) => acc + `${String.fromCharCode(el)}`, '')
)

export const createTitle = (string, LetterComponent = Letter) => {
  const title = []
  for (let i = 0; i < string.length; i++) {
    title.push(
      <LetterComponent key={`${string}_${i}`}>{string[i]}</LetterComponent>
    )
  }
  return title
}

export const createSpans = (length, LetterComponent = Letter) => {
  const spanList = []
  for (let i = 0; i < length; i++) {
    spanList.push(
      <LetterComponent key={`index_${i}`}></LetterComponent>
    )
  }
  return spanList
}
