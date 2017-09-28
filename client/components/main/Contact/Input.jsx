import React, { Component } from 'react'

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
    this.setState({localValue: value, isValid: isValid})
    }

    componentDidMount() {
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
      this.setState({localValue: this.trim(value), isValid})
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
