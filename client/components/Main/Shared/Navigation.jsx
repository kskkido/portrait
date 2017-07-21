import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { rotationRestart, viewChange, viewRestart } from '../../../reducers/events'

const NavigationDiv = styled.div`
  position: absolute;
  top: -240px;
  height: 300px;
  width: 300px;
  border: 2px solid;
  border-radius: 50%;
  z-index: 1;
`

export const NavigationText = styled.span`
  font-size: 1.5em;
  font-weight: normal;
  line-height: 27em;
  border: 1px solid;
  padding: 5px;
`

export const InnerNavigationDiv = styled.div.attrs({
  style: props => ({
    transform: `rotate(${props.rotation}turn)`
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
    }
  }

  static calculateRotation (index, length, rotation) {
    return rotation - ((1 / length) * index + 1)
  }

  componentWillMount() {
    this.navDivs = []
    this.props.rotationRestart()
    this.props.viewRestart()
  }

  componentWillReceiveProps(nextProps) {
    // bottleneck
    this.navDivs.forEach(({props}) => this.willSetView(props), this)
  }

  _createNavigationDiv(rotation) {
    return (text, index, {length}) => (
      <InnerNavigationDiv
        rotation={LocalContainer.calculateRotation(index, length, rotation)}
        key={text}
        index={index}
        ref={div => this.navDivs[index] = div}
      >
        <NavigationText>{text}</NavigationText>
      </InnerNavigationDiv>
    )
  }

  willSetView({rotation, index}) {
    if (rotation + 1 > -0.01 && rotation + 1 < 0.01 && this.props.viewIndex !== index) this.props.viewChange(index)
  }

  render() {
    const navigationDivs = this.state.navigationList.map(this._createNavigationDiv(this.props.rotation))

    return (
      <NavigationDiv>
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
