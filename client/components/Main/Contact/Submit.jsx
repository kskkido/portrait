import React, { Component } from 'react'
import { PreviewContainer } from '../../Shared/Styles'

const Submit = () => {

  return (
    <PreviewContainer>
      <p>Looks like you haven't filled out each section!</p>
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
    this.onChangeHandler = this.props.createInputHandler('name')
  }

  componentDidMount() {

  }

  onEnterHandler(letter) {

  }

  render() {

    return (
      <Name />
    )
  }
}


export default Submit
