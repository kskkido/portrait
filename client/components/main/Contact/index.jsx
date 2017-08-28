import React, { Component } from 'react'
import { connect } from 'react-redux'
import { viewData } from '../../shared/Data'
import { pathChange, viewChange, viewRestart, rotationChange, rotationRestart } from '../../../reducers/events'
import BodyComponent from '../Body'
import { initialValue } from './utils'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Name from './Name'
import Email from './Email'
import Message from './Message'
import Submit from './Submit'
import Social from './SocialMedia'
import Return from '../Return'

const list = [
 {text: 'name', component: <Name />},
 {text: 'email', component: <Email />},
 {text: 'message', component: <Message />},
 {text: 'submit', component: <Submit />},
 {text: 'social', component: <Social />}
]

const Body = ({ createInputHandler, createOnEnterHandler, getProps, viewIndex }) => {
  const { text, component } = list[viewIndex]

  return (
    React.cloneElement(component, {
      value: text !== 'social' && getProps(text),
      updateText: createInputHandler(text),
      onEnterHandler: createOnEnterHandler((viewIndex + 1) % list.length)
    })
  )
}

const Contact = ({ backgroundColor, navigationList, createInputHandler, createOnEnterHandler, getProps }) => {

  return (
  <div>
    <Return />

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
  </div>
  )
}


class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: {
        value: initialValue,
        isValid: false,
      },
      email: {
        value: initialValue,
        isValid: false
      },
      message: {
        value: initialValue,
        isValid: false
      }
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
    // this.props.viewRestart(); this.props.rotationRestart()
    this.setRotation = LocalContainer.setRotation(list.length)
  }

  createInputHandler(props) {
    return (input, isValid) => {
      this.setState(() => ({
        [props]: {
          value: input,
          isValid
        }
      }))
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
    return props === 'submit' ? this.state : this.state[props].value
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
