import React, { Component } from 'react'
import { Input, PlaceholderContainer, PreviewContainer } from '../../shared/Styles'
import { initialValue } from './utils'

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

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      localValue: '',
      isValid: false,
    }

    this.onChangeHandler = this.onChangeHandler.bind(this)
  }

  componentWillMount() {
    const { value, isValid } = this.props.value

    this.setState(Object.assign({}, {localValue: value, isValid}))
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
    this.setState(Object.assign({}, {localValue: value, isValid}))
  }

  render() {
    const { isValid, localValue } = this.state

    return (
      <Email
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
