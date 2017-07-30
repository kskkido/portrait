import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Draggable from 'gsap/Draggable'

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
  z-index: -1001;
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

  constructor(props) {
    super(props)
    this.state = {
      navigationList: props.navigationList,
      isCenter: props.isCenter || false
    }
  }

  static calculateRotation (index, length, rotation) {
    // console.log(rotation * 360, 'ITS THE ROTATION')
    return rotation - ((1 / length) * index + 1)
  }

  componentWillMount() {
    this.navDivs = []
    this.props.rotationRestart()
    this.props.viewRestart()
    // this.props.getDom && this.props.getDom(this)
  }

  componentWillUnmount() {
    this.props.rotationRestart()
    this.props.viewRestart()
  }

  componentWillReceiveProps() {
    // bottleneck
    this.navDivs.forEach(({props}) => this.willSetView(props), this)
  }

  willSetView({rotation, index}) {
    rotation = rotation % 1
    if (rotation + 1 > -0.01 && rotation + 1 < 0.01 && this.props.viewIndex !== index) this.props.viewChange(index)
  }

  _createNavigationDiv(rotation) {
    return (text, index, {length}) => (
      <InnerNavigationDiv
        rotation={LocalContainer.calculateRotation(index, length, rotation)}
        key={text}
        index={index}
        id="test"
        ref={div => this.navDivs[index] = div}
      >
        <NavigationText>{text}</NavigationText>
      </InnerNavigationDiv>
    )
  }

  render() {
    const navigationDivs = this.state.navigationList.map(this._createNavigationDiv(this.props.rotation))
    return (
      <NavigationDiv isCenter={this.state.isCenter}>
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
