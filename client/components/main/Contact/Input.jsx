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
      this.setState(Object.assign({}, {localValue: value, isValid: isValid}))
    }

    componentDidMount() {
      this.input.focus()
    }

    componentWillUnmount() {
      const { localValue, isValid } = this.state
      this.props.updateText(localValue, isValid)
    }

    componentDidUpdate() {
      this.input.focus()
    }

    onChangeHandler(value, isValid) {
      this.setState(Object.assign({}, {localValue: value.trim(), isValid}))
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
