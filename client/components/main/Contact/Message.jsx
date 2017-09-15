import React from 'react'
import { Input, PlaceholderContainer, PreviewContainer } from '../../shared/Styles'
import { initialValue } from './utils'
import forwardProps from './Input'

const Message = ({ _isValid, value, onChangeHandler, onEnterHandler, inputRef }) => {
    const isInitial = value === initialValue
        , inputValue = isInitial ? '' : value
        , isValid = isInitial ? true : _isValid

  return (
    <PreviewContainer>
      <p>Fill out the box below with any message you want to send me  </p>
      <PlaceholderContainer
        empty={inputValue.length === 0}
        valid={isValid}
      >
        Enter your lovely message
      </PlaceholderContainer>
      <Input
        valid={isValid}
        type="text"
        value={inputValue}
        onChange={({target: { value }}) => onChangeHandler(value, value.length > 1)}
        onKeyPress={onEnterHandler}
        innerRef={inputRef}
      />
    </PreviewContainer>
  )
}

export default forwardProps(Message)
