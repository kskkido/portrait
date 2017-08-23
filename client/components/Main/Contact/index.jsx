import React, { Component } from 'react'
import { connect } from 'react-redux'
import { viewData } from '../../Shared/Data'
import { pathChange, viewChange, viewRestart, rotationChange, rotationRestart } from '../../../reducers/events'
import BodyComponent from '../Body'

import Name from './Name'
import Email from './Email'
import Message from './Message'
import Submit from './Submit'

const list = [
 {text: 'name', component: <Name />},
 {text: 'email', component: <Email />},
 {text: 'message', component: <Message />},
 {text: 'submit', component: <Submit />},
]

const Body = ({ createInputHandler, createOnEnterHandler, getProps, viewIndex }) => {
  const { text, component } = list[viewIndex]

  return (
    React.cloneElement(component, {
      value: getProps(text),
      onChangeHandler: createInputHandler(text),
      onEnterHandler: createOnEnterHandler((viewIndex + 1) % list.length)
    })
  )
}

const Contact = ({ backgroundColor, navigationList, createInputHandler, createOnEnterHandler, getProps }) => {

  return (
    <BodyComponent
      backgroundColor={backgroundColor}
      navigationList={navigationList}
      isCenter={true}
    >
      <Body
        createInputHandler={createInputHandler}
        createOnEnterHandler={createOnEnterHandler}
        getProps={getProps}
      />
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
    // need to pass those values down to corresponding
    this.createInputHandler = this.createInputHandler.bind(this)
    this.createOnEnterHandler = this.createOnEnterHandler.bind(this)
    this.getProps = this.getProps.bind(this)
  }

  static setRotation (length) {
    return (index) => (360 / length) * index
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
    this.setRotation = LocalContainer.setRotation(list.length)
  }

  createInputHandler(props) {
    console.log(props, 'createInput')
    return (input) => {
      this.setState(Object.assign({}, ...this.state, {[props]: input}))
    }
  }

  createOnEnterHandler(index) {
    return ({ nativeEvent: {keyCode}}) => (
      keyCode === 13 ?
        (this.props.rotationChange(this.setRotation(index)), this.props.viewChange(index)) :
        null
    )
  }

  getProps(props) {
    return this.state[props]
  }

  onSubmitHandler() {
    console.log('submit', this.state)
  }

  render() {

    return (
      <Contact
        createInputHandler={this.createInputHandler}
        createOnEnterHandler={this.createOnEnterHandler}
        getProps={this.getProps}
        backgroundColor={LocalContainer.backgroundColor}
        navigationList={LocalContainer.navigationList}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  pathChange: (index) => dispatch(pathChange(index)),
  viewChange: (index) => dispatch(viewChange(index)),
  viewRestart: () => dispatch(viewRestart()),
  rotationChange: (rotation) => dispatch(rotationChange(rotation)),
  rotationRestart: () => dispatch(rotationRestart())
})

export default connect(null, mapDispatchToProps)(LocalContainer)
