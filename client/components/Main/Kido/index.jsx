import React, { Component } from 'react'
import { TweenMax, Power2 } from 'gsap'
import { MainContainer } from '../../Shared/Styles'
import Navigation from '../Navigation'
import styled from 'styled-components'

const Kido = ({ inputRef, navigationList, onHover }) => (
  <MainContainer>
    <Navigation
      navigationList={navigationList}
      isCenter={true}
      getDom={(component) => inputRef(component)}
      onMouseOver={onHover}
    />
  </MainContainer>
)

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

  handleOnHover(e) {
    console.log(e)
  }

  componentDidMount() {
    createAnimation(this.nav)
  }

  render() {
    return (
      <Kido
        onHover={this.handleOnHover.bind(this)}
        inProp={this.state.in}
        navigationList={this.state.navigationList}
        inputRef={ref => this.nav=ref}
      />
    )
  }
}

export default LocalContainer
