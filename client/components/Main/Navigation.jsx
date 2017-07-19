import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { restartRotation } from '../../reducers/events'

const NavigationDiv = styled.div`
  position: absolute;
  top: -200px;
  height: 300px;
  width: 300px;
  border: 2px solid;
  border-radius: 50%;
`

export const NavigationText = styled.span`
  font-weight: bold;
  line-height: 40em;
  border: 1px solid;
  padding: 5px;
`

// export const InnerNavigationDiv = styled.div`
//   position: absolute;
//   height: 300px;
//   width: 300px;
//   text-align: center;
//   border-radius: 50%;
//   transform: rotate(${props => props.rotation}turn)
// `

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

/* ====== utils ====== */

const calculateRotation = (index, length, rotation) => {
  return rotation - ((1 / length) * index + 1)
}

const _createNavigationDiv = (rotation) => (text, index, {length}) => {
    return (
      <InnerNavigationDiv
        rotation={calculateRotation(index, length, rotation)}
        key={text}
      >
        <NavigationText>{text}</NavigationText>
      </InnerNavigationDiv>
    )
  }

const _createNavigation = (navigationList, rotation) => {
  return navigationList.map(_createNavigationDiv(rotation))
}

/* ====================== */

const Navigation = ({ navigationList, rotation }) => {
  return (
    <NavigationDiv>
      {_createNavigation(navigationList, rotation)}
    </NavigationDiv>
  )
}

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigationList: props.navigationList,
    }
  }

  componentWillMount() {
    this.props.restartRotation()
  }

  render() {
    const { navigationList } = this.state
    return (
      <Navigation
        navigationList={navigationList}
        rotation={this.props.rotation}
      />
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
