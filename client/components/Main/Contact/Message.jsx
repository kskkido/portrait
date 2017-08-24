import React, { Component } from 'react'
import { Input, PlaceholderContainer, PreviewContainer } from '../../Shared/Styles'
import { initialValue } from './utils'
import styled from 'styled-components'

const TextArea = styled.textarea`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  padding: 6px 14px 5px 33px;
  border-width: 0 0 1px 0;
  border-style: solid;
  background-color: transparent;
  text-align: center;
  letter-spacing: 1px;
  font-size: 1em;
  resize: none;
  overflow-x: scroll;

  &:focus {
    outline-color: 0;
    outline-style: none;
    outline-width: 0;
  }
`

const Message = ({ value, onChangeHandler, onEnterHandler, inputRef }) => {
  const inputValue = value === initialValue ? '' : value

  return (
    <PreviewContainer>
      <p>Fill out the box below to send me a sweet message</p>
      <PlaceholderContainer empty={inputValue.length === 0}>
        GIVE ME YOUR MESSAGE
      </PlaceholderContainer>
      <Input
        type="text"
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

  componentDidUpdate() {
    this.input.focus()
  }

  componentWillReceiveProps(_, { value }) {
    console.log(value, 'state')
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
      <Message
        value={this.props.value}
        onChangeHandler={this.props.updateText}
        onEnterHandler={this.props.onEnterHandler}
        inputRef={div => this.input = div}
      />
    )
  }
}

export default LocalContainer
