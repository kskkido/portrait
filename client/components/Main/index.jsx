import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { TransitionGroup } from 'react-transition-group'
import styled, { ThemeProvider } from 'styled-components'
import store from '../../store'

import About from './About'
import Kido from './Kido'
import Project from './Project'

import { Show } from '../Shared/Transition'
import { rotationChange } from '../../reducers/events'

const theme = {
  bg: '#E1F4CB',
  fg: '#fff'
}

const Container = styled.div`
  flex: 6;
`

/* ====== utils ====== */

const getRotation = (wheelDelta) => {
  const currentRotation = store.getState().events.rotation
  return wheelDelta < 0 ? currentRotation + 0.005 : currentRotation - 0.005
}

const _preventScroll = (event) => {
  event.preventDefault()
  event.stopPropagation()
}

const _onWheelHandler = ({nativeEvent}) => {
  _preventScroll(nativeEvent)
  store.dispatch(rotationChange(getRotation(nativeEvent.wheelDelta || (-1 * nativeEvent.deltaY))))
}

/* ====== COMPONENTS ====== */

//WITH TRANSITION GROUP
// const BodyRoutes = () => (
//   <Route render={({ location }) => {
//     return (
//      <TransitionGroup>
//       <Show key={location.key} timeout={500} exit={false} pathname={location.pathname}>
//         <Switch location={location}>
//           <Route path="/about/:index?" component={About} />
//           <Route path="/projects/:index?" component={Project} />
//           <Route exact path="/" component={Kido} />
//         </Switch>
//        </Show>
//     </TransitionGroup>
//     )
//   }}
//   />
// )

//WITHOUT TRANSITION
const BodyRoutes = () => (
  <Route render={({ location }) => {
    return (
      <Switch location={location}>
        <Route path="/about/:index?" component={About} />
        <Route path="/projects/:index?" component={Project} />
        <Route exact path="/" component={Kido} />
      </Switch>
    )
  }}
  />
)

const Main = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container onWheel={_onWheelHandler} id="bodyContainer">
        <BodyRoutes  />
      </Container>
    </ThemeProvider>
  )
}


export default Main
