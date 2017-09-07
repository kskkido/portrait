import React from 'react'
import { Input, PlaceholderContainer, PreviewContainer } from '../../shared/Styles'
import { initialValue } from './utils'
import styled from 'styled-components'
import forwardProps from './Input'

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
  color: #CFD8DC;
  transition: color 0.3s;
  &:hover {
    color: #EEEEEE;
  }
`

const Name = ({ _isValid, value, onChangeHandler, onEnterHandler, inputRef }) => {
  const isInitial = value === initialValue
      , inputValue = isInitial ? '' : value
      , isValid = isInitial ? true : _isValid

  return (
    <PreviewContainer>
      <p>Interested in getting in touch with me? Enter your name below and press enter to navigate to the next section. Once you fill out each section, go to the 'submit' section to send out your message! Or send me a message at
        <EmailContainer><Email href="mailto:kskkido@gmail.com?Subject=Hello%20nice%20to%20meet%20you" target="_top"> kskkido@gmail.com</Email></EmailContainer>
      </p>
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

