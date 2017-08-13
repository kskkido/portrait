import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TweenMax, Power2 } from 'gsap'
import { viewData } from '../../Shared/Data'
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
  static get navigationList() {
    return viewData.home.navigationList
  }

  static get backgroundColor() {
    return viewData.home.backgroundColor
  }

  componentDidMount() {
    createAnimation(this.bodyDiv)
  }

  render() {
    return (
      <BodyComponent
        backgroundColor={LocalContainer.backgroundColor}
        navigationList={LocalContainer.navigationList}
        isCenter={true}
        getNav={div => this.bodyDiv = div}
      />
    )
  }
}

export default LocalContainer
