import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { TweenLite } from 'gsap'

import { rotationRestart, viewChange, viewRestart } from '../../reducers/events'

const NavigationDiv = styled.div.attrs({
  style: props => ({
    top: props.isCenter ? '18vh' : '-250px'
  })
})`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  height: 300px;
  width: 300px;
  border: 2px solid;
  border-radius: 50%;
    box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
`

const NavigationText = styled.span`
  font-weight: normal;
  line-height: 50em;
  padding: 5px;
  text-transform: uppercase;
`

const InnerNavigationDiv = styled.div.attrs({
  style: props => ({
    transform: `rotate(${props.rotation}turn)`,
  })
})`
  position: absolute;
  height: 300px;
  width: 300px;
  text-align: center;
  border-radius: 50%;
`

class LocalContainer extends Component {
  static calculateRotation (index, length) {
    // console.log((Math.abs(rotation) * 360 % 360) / 360, 'ITS THE ROTATION')
    return -((1 / length) * index + 1)
  }

  static createNavigationDiv(text, index, { length }) {
    return (
      <InnerNavigationDiv
        rotation={LocalContainer.calculateRotation(index, length)}
        key={text}
        index={index}
      >
        <NavigationText>{text}</NavigationText>
      </InnerNavigationDiv>
    )
  }

  static round (rotation, length) {
    const rounded = (rotation % 360 / (360 / length))
    return rounded < 0 ? length + rounded : rounded
  }

  willSetView(rounded) {
    const ratio = rounded % 1
    if (ratio === 0 && rounded !== this.props.viewIndex) {
      this.props.viewChange(rounded)
    }
  }

  componentWillMount() {
    this.navDivs = []
  }

  componentWillReceiveProps({ rotation }) {
    const { length } = this.props.navigationList
    TweenLite.to(this.mainNav, 0.7, {rotation})
    this.willSetView(LocalContainer.round(rotation, length))
  }

  render() {
    const navigationDivs = this.props.navigationList.map(LocalContainer.createNavigationDiv)

    return (
      <NavigationDiv
        id="nav"
        isCenter={this.props.isCenter || false}
        innerRef={(div) => {
          this.mainNav = div
          this.props.getDom && this.props.getDom(div)
        }}
      >
        {navigationDivs}
      </NavigationDiv>
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
