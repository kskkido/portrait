import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { TweenLite, TimelineLite, Back } from 'gsap'

import { rotationChange, rotationRestart, viewChange, viewRestart } from '../../reducers/events'

const Container = styled.div`
  width: 100%;
`

const NavigationDiv = styled.div`
  position: relative;
  top: 0px;
  margin-left: auto;
  margin-right: auto;
  right: 0;
  height: 300px;
  width: 300px;
  border: 2px solid;
  border-radius: 50%;
  box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
  perspective: 500px;
`

const InnerNavigationDiv = styled.div.attrs({
  style: props => ({
    transform: `rotate(${props.spacing}turn)`,
  })
})`
  position: absolute;
  height: 300px;
  width: 300px;
  text-align: center;
  border-radius: 50%;
  transform-style: preserve-3d;
`

const NavigationText = styled.span`
  line-height: 40em;
  padding: 5px;
  text-transform: uppercase;
`

class LocalContainer extends Component {
  static calculateRotation (index, length) {
    // console.log((Math.abs(rotation) * 360 % 360) / 360, 'ITS THE ROTATION')
    return -((1 / length) * index + 1)
  }

  static createNavigationDiv(text, index, { length }) {
    return (
      <InnerNavigationDiv
        spacing={LocalContainer.calculateRotation(index, length)}
        key={text}
        index={index}
      >
        <NavigationText>{text}</NavigationText>
      </InnerNavigationDiv>
    )
  }

  componentWillMount() {
    this.navDivs = []
  }

  componentDidMount() {
    console.log(this.props.rotation)
    TweenLite.to(this.mainNav, 0, {
      rotation: this.props.rotation,
    ease: Back.easeOut})
  }

  componentWillReceiveProps({ rotation }) {
    TweenLite.to(this.mainNav, 0.7, {rotation, ease: Back.easeOut})
  }

  render() {
    const navigationDivs = this.props.navigationList.map(LocalContainer.createNavigationDiv)

    return (
      <Container>
        <NavigationDiv
          id="nav"
          innerRef={(div) => {
            this.mainNav = div
            this.props.getDom && this.props.getDom(div)
          }}
        >
          {navigationDivs}
        </NavigationDiv>
      </Container>

    )
  }
}

// bottle neck -> everytime rotation updates new divs are created

const mapStateToProps = (state) => ({
  rotation: state.events.rotation,
  viewIndex: state.events.viewIndex
})

const mapDispatchToProps = (dispatch) => ({
  rotationRestart: () => dispatch(rotationRestart()),
  viewChange: (index) => dispatch(viewChange(index)),
  viewRestart: () => dispatch(viewRestart())
})

export default connect(mapStateToProps, mapDispatchToProps)(LocalContainer)
