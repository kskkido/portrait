import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import store from '../../store'
import styled from 'styled-components'

import Home from './Home'
import Kido from './Kido'
import Project from './Project'

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
  store.dispatch(rotationChange(nativeEvent.wheelDelta))
}

/* ====== COMPONENTS ====== */

const BodyRoutes = () => (
  <Switch>
    <Route path="/kido" component={Kido} />
    <Route exact path="/" component={Home} />
    <Route path="/projects" component={Project} />
  </Switch>
)

const Main = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container onWheel={_onWheelHandler}>
        <BodyRoutes  />
      </Container>
    </ThemeProvider>
  )
}


export default Main
