import React, { Component } from 'react'
import { Input, PlaceholderContainer, PreviewContainer } from '../../Shared/Styles'
import { initialValue } from './utils'

const Email = ({ value, onChangeHandler, onEnterHandler, inputRef }) => {
  const inputValue = value === initialValue ? '' : value

  return (
    <PreviewContainer>
      <p>Enter your email!</p>
      <PlaceholderContainer empty={inputValue.length === 0}>
        ITS YOUR EMAIL
      </PlaceholderContainer>
      <Input
        value={inputValue}
        onChange={({target: { value }}) => onChangeHandler(value)}
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
      entered: false
    }

    this.onChangeHandler = this.onChangeHandler.bind(this)
  }

  componentWillMount() {
    this.setState(Object.assign({}, ...this.state, {localValue: this.props.value}))
  }

  componentDidMount() {
    this.input.focus()
  }

  componentWillUnmount() {
    this.props.updateText(this.state.localValue)
  }

  componentDidUpdate() {
    this.input.focus()
  }

  onChangeHandler(value) {
    this.setState(Object.assign({}, ...this.state, {localValue: value}))
  }

  render() {

    return (
      <Email
        value={this.state.localValue}
        onChangeHandler={this.onChangeHandler}
        onEnterHandler={this.props.onEnterHandler}
        inputRef={div => this.input = div}
      />
    )
  }
}


export default LocalContainer
