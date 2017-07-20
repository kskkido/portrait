import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import store from '../../store'

import Home from './Home'
import Project from './Project'

import { rotationChange } from '../../reducers/events'

const theme = {
  bg: 'palevioletred',
  fg: '#fff'
}


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
    <Route exact path ="/" component={Home} />
    <Route path="/projects" component={Project} />
  </Switch>
)

const Main = () => {
  return (
    <ThemeProvider theme={theme}>
      <div onWheel={_onWheelHandler}>
        <BodyRoutes  />
      </div>
    </ThemeProvider>
  )
}


export default Main
