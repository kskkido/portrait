import React, { Component } from 'react'
import { Input, PreviewContainer } from '../../Shared/Styles'

const Email = ({ onChangeHandler, onEnterHandler }) => {

  return (
    <PreviewContainer>
      <p>Enter your email!</p>
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
      text: 'email@email.com',
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
      <Email
        onChangeHandler={this.props.onChangeHandler}
        onEnterHandler={this.props.onEnterHandler}
      />
    )
  }
}


export default LocalContainer
