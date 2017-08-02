import React, { Component } from 'react'
import { TweenMax, Power2 } from 'gsap'
import { MainContainer } from '../../Shared/Styles'
import Navigation from '../Navigation'

const Kido = ({ inputRef, navigationList }) => (
  <MainContainer>
      <Navigation
        navigationList={navigationList}
        isCenter={true}
        getDom={(component) => inputRef(component)}
      />
      <div></div>
  </MainContainer>
)


// const logProps = (target, props) => {
//   const propsVal = target._gsTransform[props]
// }

const createAnimation = (target) => {
  TweenMax.fromTo(target, 3, {
    rotationX: 90,
    borderRadius: 0,
  }, {
    rotationX: 0,
    rotation: 360,
    borderRadius: '50%',
    ease: Power2.easeInOut
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
    this.tl = createAnimation(this.nav)
  }

  render() {
    return (
      <Kido
        onClick={() => this.tl.reverse()}
        inProp={this.state.in}
        navigationList={this.state.navigationList}
        inputRef={ref => this.nav=ref}
      />
    )
  }
}

export default LocalContainer
