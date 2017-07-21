import React, { Component } from 'react'
import { connect } from 'react-redux'
import syled from 'styled-components'



const Load = () => (
  <div>
    Loading
  </div>
)

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      load: 0
    }
  }

  render() {
    return Load
  }
}

export default LocalContainer
