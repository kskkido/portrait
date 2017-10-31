import React from 'react'
import { Input, PlaceholderContainer, PreviewContainer } from '../../shared/Styles'
import { Keyword } from '../../shared/Transition'
import { keywordMarkup } from '../../shared/Utils'
import { initialValue } from './utils'
import styled from 'styled-components'
import forwardProps from './Input'
import data from './name.json'

const EmailContainer = styled.span`
  position: relative;
  &::before {
    position: absolute;
    left: 0;
    content: '';
    background-color: black;
    width: 0;
    height: 1.1em;
    opacity: 0.1;
    transition: width 0.3s;
    z-index: -1;
  }
  &:hover::before {
    width: 100%;
  }
`

const Email = styled.a`
  color: #DCE775;
  transition: color 0.3s;
  &:hover {
    color: #F0F4C3;
  }
`

const Name = ({ _isValid, value, onChangeHandler, onEnterHandler, inputRef }) => {
  const isInitial = value === initialValue
      , inputValue = isInitial ? '' : value
      , isValid = isInitial ? true : _isValid

      console.log(data.content, 'dude what')

  return (
    <PreviewContainer>
      <Keyword key={'contact'}>
        <p>{keywordMarkup(data.content, '#F5F5F5', true)}</p>
      </Keyword>
      <PlaceholderContainer
        empty={inputValue.length === 0}
        valid={isValid}
      >
        Enter your name
      </PlaceholderContainer>
      <Input
        valid={isValid}
        value={inputValue}
        onChange={({target: { value }}) => onChangeHandler(value, value.length > 1)}
        onKeyPress={onEnterHandler}
        innerRef={inputRef}
      />
    </PreviewContainer>
  )
}

export default forwardProps(Name)

