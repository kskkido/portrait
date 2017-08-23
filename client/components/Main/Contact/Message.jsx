import React, { Component } from 'react'
import { Input, PreviewContainer } from '../../Shared/Styles'

const Message = ({ onChangeHandler, onEnterHandler }) => {

  return (
    <PreviewContainer>
      <p>Fill out the box below to send me a sweet message</p>
      <Input
        onChange={({target: { value }}) => onChangeHandler(value)}
        onKeyPress={onEnterHandler}
      />
    </PreviewContainer>
  )
}

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'message',
      entered: false
    }
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  onEnterHandler(letter) {

  }

  render() {

    return (
      <Message
        onChangeHandler={this.props.onChangeHandler}
        onEnterHandler={this.props.onEnterHandler}
      />
    )
  }
}


export default LocalContainer
