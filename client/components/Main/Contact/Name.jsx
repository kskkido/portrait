import React, { Component } from 'react'
import { Input, PlaceholderContainer, PreviewContainer } from '../../Shared/Styles'
import { initialValue } from './utils'

const Name = ({ value, onChangeHandler, onEnterHandler, inputRef, inputRef2 }) => {
  const inputValue = value === initialValue ? '' : value
  return (
    <PreviewContainer>
      <p>Interested in getting in touch with me? enter your name below and press enter to navigate to the next section. Once you fill out each section, go to the 'submit' section to send out your message!</p>
      <PlaceholderContainer empty={inputValue.length === 0}>
        ITS YOUR NAME
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
      <Name
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

