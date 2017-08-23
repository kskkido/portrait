import React, { Component } from 'react'
import { Input, PreviewContainer } from '../../Shared/Styles'

const Name = ({ value, onChangeHandler, onEnterHandler }) => {

  return (
    <PreviewContainer>
      <p>If you are interested in getting in touch with me, enter your name below and navigate to the next section. Once you fill out each section, go to the 'submit' section to send out your message!</p>
      <Input
        value={value}
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
      text: 'Name',
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
      <Name
        value={this.props.value}
        onChangeHandler={this.props.onChangeHandler}
        onEnterHandler={this.props.onEnterHandler}
      />
    )
  }
}

export default LocalContainer

