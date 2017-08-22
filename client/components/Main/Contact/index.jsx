import React, { Component } from 'react'
import { connect } from 'react-redux'
import { viewData } from '../../Shared/Data'
import { pathChange, viewRestart, rotationRestart } from '../../../reducers/events'
import BodyComponent from '../Body'

import Name from './Name'
import Email from './Email'
import Message from './Message'
import Submit from './Submit'

const list = [
  <Name />,
  <Email />,
  <Message />,
  <Submit />,
]

const Body = ({ viewIndex }) => list[viewIndex]

const Contact = ({ backgroundColor, navigationList }) => {

  return (
    <BodyComponent
      backgroundColor={backgroundColor}
      navigationList={navigationList}
      isCenter={true}
    >
      <Body />
    </BodyComponent>
  )
}


class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      message: '',
    }
  }

  static get navigationList() {
    return viewData.contact.navigationList
  }

  static get backgroundColor() {
    return viewData.contact.backgroundColor
  }

  componentWillMount() {
    this.props.pathChange(3)
    this.props.viewRestart(); this.props.rotationRestart()
  }

  onSubmitHandler() {

  }

  onNameEnter() {

  }

  onEmailEntry() {

  }

  render() {

    return (
      <Contact
        backgroundColor={LocalContainer.backgroundColor}
        navigationList={LocalContainer.navigationList}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  pathChange: (index) => dispatch(pathChange(index)),
  viewRestart: () => dispatch(viewRestart()),
  rotationRestart: () => dispatch(rotationRestart())
})

export default connect(null, mapDispatchToProps)(LocalContainer)
