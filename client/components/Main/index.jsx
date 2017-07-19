import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import store from '../../store'

import Home from './Home'
import Project from './Project'

import { restartRotation, wheelRotation } from '../../reducers/events'

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

// ====== utils ====== //

const _preventScroll = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

const _onWheelHandler = ({nativeEvent}) => {
  _preventScroll(nativeEvent)
  store.dispatch(wheelRotation(nativeEvent.wheelDelta))
}

const BodyRoutes = () => (
  <Switch>
    <Route exact path ="/" component={Home} />
    <Route path="/projects" component={Project} />
  </Switch>
)

const Main = () => {
  return (
    <ThemeProvider theme={theme}>
      <Content onWheel={_onWheelHandler}>
        <BodyRoutes  />
      </Content>
    </ThemeProvider>
  )
}


export default Main
