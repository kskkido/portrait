import React, { Component } from 'react'
import { TweenMax, Power2 } from 'gsap'
import { MainContainer } from '../../Shared/Styles'
import Navigation from '../Navigation'

import BodyComponent from '../Body'

const createAnimation = (target) => {
  TweenMax.from(target, 2, {
    rotationX: 90,
    rotationY: 90,
  }, {
    rotationX: 0,
    rotationY: 0,
    rotation: 360,
    ease: Power2.easeIn
  })
}


class LocalContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      navigationList: ['Welcome', 'To', 'My', 'Website'],
    }
  }

  componentDidMount() {
    console.log(this.bodyDiv)
    createAnimation(this.bodyDiv)
  }

  render() {
    return (
      <BodyComponent
        navigationList={this.state.navigationList}
        isCenter={true}
        getNav={div => this.bodyDiv = div}
      />
    )
  }
}

export default LocalContainer
