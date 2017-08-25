import React, { Component } from 'react'
import { Input, PlaceholderContainer, PreviewContainer } from '../../shared/Styles'
import { initialValue } from './utils'

const Name = ({ isValid, value, onChangeHandler, onEnterHandler, inputRef, inputRef2 }) => {
  const inputValue = value === initialValue ? '' : value

  return (
    <PreviewContainer>
      <p>Interested in getting in touch with me? enter your name below and press enter to navigate to the next section. Once you fill out each section, go to the 'submit' section to send out your message!</p>
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
  const { value } = this.props
      , isValid = value === initialValue || value.length > 1

    this.setState(Object.assign({}, ...this.state, {localValue: value, isValid: isValid}))
  }

  componentDidMount() {
    this.input.focus()
  }

  componentWillUnmount() {
    const { localValue, isValid } = this.state

    this.props.updateText(localValue, localValue !== initialValue && isValid)
  }

  componentDidUpdate() {
    this.input.focus()
  }

  onChangeHandler(value, isValid) {
    this.setState(Object.assign({}, ...this.state, {localValue: value.trim(), isValid}))
  }

  render() {

    return (
      <Name
        isValid={this.state.isValid}
        value={this.state.localValue}
        onChangeHandler={this.onChangeHandler}
        onEnterHandler={this.props.onEnterHandler}
        inputRef={div => this.input = div}
        inputRef2={div => this.placeholder = div}
      />
    )
  }
}

export default LocalContainer

