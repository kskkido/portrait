import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { restartRotation } from '../../../reducers/events'

const NavigationDiv = styled.div`
  position: absolute;
  top: -225px;
  height: 300px;
  width: 300px;
  border: 2px solid;
  border-radius: 50%;
  z-index: 1;
`

export const NavigationText = styled.span`
  font-weight: bold;
  line-height: 40em;
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
    this.props.restartRotation()
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.navDivs)
     this.navDivs = this.navDivs.splice()
  }

  _createNavigationDiv(rotation) {
    return (text, index, {length}) => (
      <InnerNavigationDiv
        rotation={LocalContainer.calculateRotation(index, length, rotation)}
        key={text}
        title={`view_${index}`}
        ref={div => this.navDivs = this.navDivs ? this.navDivs.concat(div) : [div]}
      >
        <NavigationText>{text}</NavigationText>
      </InnerNavigationDiv>
    )
  }

  _createNavigation(navigationList, rotation) {
    return navigationList.map(this._createNavigationDiv(rotation))
  }

  render() {
    const navigationDivs = this._createNavigation(this.state.navigationList, this.props.rotation)
    return (
      <NavigationDiv>
        {navigationDivs}
      </NavigationDiv>
    )
  }
}

// bottle neck -> everytime rotation updates new divs are created

const mapStateToProps = (state) => ({
  rotation: state.events.rotation
})

const mapDispatchToProps = (dispatch) => ({
  restartRotation: () => dispatch(restartRotation())
})

export default connect(mapStateToProps, mapDispatchToProps)(LocalContainer)
