import React from 'react'
import { Input, PlaceholderContainer, PreviewContainer } from '../../shared/Styles'
import { initialValue } from './utils'
import forwardProps from './Input'

const EmailInput = Input.extend.attrs({
  style: props => props.valid ?
    {} :
    {color: 'red', borderColor: 'red'}
})``

const validateEmail = (email) => {
  return /^\w[a-zA-Z0-9_.-]*@{1}[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/i.test(email)
}

const Email = ({ _isValid, value, onChangeHandler, onEnterHandler, inputRef }) => {
  const isInitial = value === initialValue
      , inputValue = isInitial ? '' : value
      , isValid = isInitial ? true : _isValid

  return (
    <PreviewContainer>
      <p>Enter your email!</p>
      <PlaceholderContainer
        empty={inputValue.length === 0}
        valid={isValid}
      >
        Enter your cool email
      </PlaceholderContainer>
      <EmailInput
        valid={isValid}
        value={inputValue}
        onChange={({target: { value }}) => onChangeHandler(value, validateEmail(value))}
        onKeyPress={onEnterHandler}
        innerRef={inputRef}
      />
    </PreviewContainer>
  )
}

export default forwardProps(Email)
