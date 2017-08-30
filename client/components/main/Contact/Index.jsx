import React, { Component } from 'react'
import { connect } from 'react-redux'
import { viewData } from '../../shared/Data'
import { pathChange, viewChange, rotationChange } from '../../../reducers/events'
import { asyncFormRestart, formUpdate } from '../../../reducers/form'
import { asyncFormPut, tap } from './utils'
import BodyComponent from '../Body'
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

const Body = ({ getProps, viewIndex, onSubmitHandler, createInputHandler, createOnEnterHandler, setRotation}) => {
  const { text, component } = list[viewIndex]

  return (
    React.cloneElement(component, {
      value: text !== 'social' && getProps(text),
      updateText: createInputHandler(text),
      onEnterHandler: text === 'submit' ? onSubmitHandler : createOnEnterHandler((viewIndex + 1) % list.length),
      setRotation: setRotation
    })
  )
}

const Contact = ({ getProps, backgroundColor, navigationList, onSubmitHandler, createInputHandler, createOnEnterHandler, setRotation }) => {
  return (
  <div>
    <Return />

    <BodyComponent
      backgroundColor={backgroundColor}
      navigationList={navigationList}
      isCenter={true}
    >
      <Body
        getProps={getProps}
        onSubmitHandler={onSubmitHandler}
        createInputHandler={createInputHandler}
        createOnEnterHandler={createOnEnterHandler}
        setRotation={setRotation}
      />
    </BodyComponent>
  </div>
  )
}


class LocalContainer extends Component {
  constructor(props) {
    super(props)
    // need to pass those values down to corresponding
    this.createInputHandler = this.createInputHandler.bind(this)
    this.createOnEnterHandler = this.createOnEnterHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
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
    this.setRotation = LocalContainer.setRotation(list.length)
  }

  changeView(index) {
    return (this.props.rotationChange(this.setRotation(index)), this.props.viewChange(index))
  }

  createInputHandler(props) {
    return (value, isValid) => (
      this.props.formUpdate(props, {value, isValid})
    )
  }

  createOnEnterHandler(index) {
    return ({ nativeEvent: {keyCode}}) => (
      keyCode === 13 || keyCode === 9 ?
        this.changeView(index) :
        null
    )
  }

  onSubmitHandler() {
    return (this.changeView(LocalContainer.navigationList.length - 1), this.props.formRestart())
  }

  getProps(props) {
    return props === 'submit' ? this.props.form : this.props.form[props]
  }

  render() {

    return (
      <Contact
        getProps={this.getProps}
        backgroundColor={LocalContainer.backgroundColor}
        navigationList={LocalContainer.navigationList}
        createInputHandler={this.createInputHandler}
        createOnEnterHandler={this.createOnEnterHandler}
        onSubmitHandler={this.onSubmitHandler}
        setRotation={this.setRotation}
      />
    )
  }
}

const mapStateToProps = ({ form }) => ({ form })

const mapDispatchToProps = (dispatch) => ({
  pathChange: (index) => dispatch(pathChange(index)),
  viewChange: (index) => dispatch(viewChange(index)),
  rotationChange: (rotation) => dispatch(rotationChange(rotation)),
  formRestart: () => dispatch(asyncFormRestart()),
  formUpdate: (props, payload) => dispatch(formUpdate(...tap(asyncFormPut, props, payload)))
})

export default connect(mapStateToProps, mapDispatchToProps)(LocalContainer)
