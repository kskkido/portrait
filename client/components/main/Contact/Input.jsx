import React, { Component } from 'react'
import { TimelineLite } from 'gsap'

const forwardProps = (Comp) => (
  class LocalContainer extends Component {
    constructor(props) {
      super(props)
      this.state = {
        localValue: '',
        isValid: false
      }

      this.onChangeHandler = this.onChangeHandler.bind(this)
    }

    componentWillMount() {
    const { value, isValid } = this.props.value

    this.isTouch = window.screen.width <= 768
    this.trim = this.props.shouldTrim ? (val) => val.trim() : (val) => val
    this.setState(Object.assign({}, {localValue: value, isValid: isValid}))
    }

    componentDidMount() {
      console.log(this.isTouch, window.screen.width <= 768)
      !this.isTouch && this.input.focus()
    }

    componentDidUpdate() {
      !this.isTouch && this.input.focus()
    }

    componentWillUnmount() {
      const { localValue, isValid } = this.state
      this.props.updateText(localValue, isValid)
    }

    onChangeHandler(value, isValid) {
      this.setState(Object.assign({}, {localValue: this.trim(value), isValid}))
    }

    render() {

      return (
        <Comp
          _isValid={this.state.isValid}
          value={this.state.localValue}
          onChangeHandler={this.onChangeHandler}
          onEnterHandler={this.props.onEnterHandler}
          inputRef={div => this.input = div}
        />
      )
    }
  }
)

export default forwardProps
