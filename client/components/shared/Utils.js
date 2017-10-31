import React from 'react'
import reactStringReplace from 'react-string-replace'
import { Letter, Keyword, KeywordOverlay, Keylink, KeylinkText } from './Styles'

// decorators

export const tap = (fn, value) => {
  const curried = (val) => (fn(val), val)

  return value === undefined ?
    curried :
    curried(value)
}

export const once = (fn) => {
  let done = false

  return function (...args) {
    return done ? null : (done = true, fn.apply(this, args))
  }
}

export const memoize = (fn, context) => {
  const hash = {}

  return function (...args) {
    const key = JSON.stringify(args)

    return hash[key] || (hash[key] = fn.apply(context || this, args))
  }
}

// specific uses

export const getPrimaryAndSecondary = ({ backgroundColor, secondaryColor }, index = 0) => [backgroundColor[index], secondaryColor]

export const convertToAsci = (string, runningValue = []) => (
	string ?
    convertToAsci(string.slice(1), [...runningValue, string[0].charCodeAt(0)]) :
    runningValue
)

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

const isEven = n => n % 2 === 0

export const getPair = (n, [front, back]) => isEven(n) ? [front, back] : [back, front]

const matchKeyword = /\*(.*?)\*/

export const markup = (full, keyword) => 'open' + keyword + 'close'

const keyMarkup = (text, color) => {
  const match = /\*(.*?)\*/g

  return reactStringReplace(text, match, (target, i) => (
    <Keyword
      key={'keyword' + i}
      className="keyword"
      color={color}
    >
      {target}
      <KeywordOverlay className="overlay"/>
    </Keyword>
  ))
}

const linkMarkup = (text, color) => {
  const match = /@@(.*?)@@/
  const hrefMatch = /:(.*):#(.*)#(.*)/

  return reactStringReplace(text, match, (target) => {
    let props
    target.replace(hrefMatch, (full, _href, _target, _text) => { props = [_href, _target, _text] })

    return (
      <Keylink>
        <KeylinkText target={props[1]} href={props[0]} color={color}>
          {props[2]}
        </KeylinkText>
      </Keylink>
    )
  })
}

export const keywordMarkup = (text, color = '#9E9E9E', withLink = false) => {
  let linkMatch = withLink ? linkMarkup : (i) => i

  return linkMatch(keyMarkup(text, color), color)
}
