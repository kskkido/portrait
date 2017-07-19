import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'


import Home from './Home'
import Project from './Project'

import { wheelRotation } from '../../reducers/events'

const theme = {
  bg: 'palevioletred',
  fg: '#fff'
}

const Content = styled.div`
  flex: 2;
  display: flex;
  min-height: 93vh;
  border: 2px solid;
  justify-content: center;
`

const BodyRoutes = () => (
  <Switch>
    <Route exact path ="/" component={Home} />
    <Route path="/projects" component={Project} />
  </Switch>
)

const Main = ({ onWheelHandler }) => (
  <ThemeProvider theme={theme}>
    <Content onWheel={onWheelHandler}>
      <BodyRoutes  />
    </Content>
  </ThemeProvider>
)

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this._onWheelHandler = this._onWheelHandler.bind(this)
  }

  static _preventScroll(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  _onWheelHandler({nativeEvent}) {
    LocalContainer._preventScroll(nativeEvent)
    this.props.wheelRotation(nativeEvent.wheelDelta)
  }

  render() {
    const onWheelHandler = this._onWheelHandler

    return (
      <Main
        onWheelHandler={onWheelHandler}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  wheelRotation: (wheelDelta) => dispatch(wheelRotation(wheelDelta))
})

const Main = ({ store }) => (
  <ThemeProvider theme={theme}>
    <Content onWheel={_onWheelHandler}>
      <BodyRoutes  />
    </Content>
  </ThemeProvider>
)




export default connect(null, mapDispatchToProps)(LocalContainer)
