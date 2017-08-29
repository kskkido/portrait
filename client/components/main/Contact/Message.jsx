import React, { Component } from 'react'
import { Input, PlaceholderContainer, PreviewContainer } from '../../shared/Styles'
import { initialValue } from './utils'

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

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      localValue: '',
      isValid: false
    }

    this.onChangeHandler = this.onChangeHandler.bind(this)
  }

  componentWillMount() {
    const { value, isValid } = this.props.value

    this.setState(Object.assign({}, ...this.state, {localValue: value, isValid}))
  }

  componentDidMount() {
    this.input.focus()
  }

  componentWillUnmount() {
    const { localValue, isValid } = this.state
    this.props.updateText(localValue, isValid)
  }

  componentDidUpdate() {
    this.input.focus()
  }

  onChangeHandler(value, isValid) {
    this.setState(Object.assign({}, ...this.state, {localValue: value, isValid}))
  }

  render() {
    const { isValid, localValue } = this.state

    return (
      <Message
        _isValid={isValid}
        value={localValue}
        onChangeHandler={this.onChangeHandler}
        onEnterHandler={this.props.onEnterHandler}
        inputRef={div => this.input = div}
      />
    )
  }
}

export default LocalContainer
