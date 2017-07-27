import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { TransitionGroup } from 'react-transition-group'
import styled, { ThemeProvider } from 'styled-components'
import store from '../../store'

import About from './About'
import Kido from './Kido'
import Project from './Project'

import { FadeTransition } from '../Shared/Transition'
import { rotationChange } from '../../reducers/events'

const theme = {
  bg: 'palevioletred',
  fg: '#fff'
}

const Container = styled.div`
  flex: 6;
`

/* ====== utils ====== */

const _preventScroll = (event) => {
  event.preventDefault()
  event.stopPropagation()
}

const _onWheelHandler = ({nativeEvent}) => {
  _preventScroll(nativeEvent)
  store.dispatch(rotationChange(nativeEvent.wheelDelta || (-1 * nativeEvent.deltaY)))
}

/* ====== COMPONENTS ====== */

const BodyRoutes = () => (
  <Route render={({ location }) => {
    console.log(location)
    return (
    <TransitionGroup>
      <FadeTransition key={location.key} exit={false} pathname={location.pathname}>
        <Switch location={location}>
          <Route exact path="/" component={Kido} />
          <Route path="/about" component={About} />
          <Route path="/projects" component={Project} />
        </Switch>
      </FadeTransition>
    </TransitionGroup>
    )
  }}
  />
)

const Main = () => {
  console.log(TransitionGroup)
  return (
    <ThemeProvider theme={theme}>
      <Container onWheel={_onWheelHandler}>
        <BodyRoutes  />
      </Container>
    </ThemeProvider>
  )
}


export default Main
