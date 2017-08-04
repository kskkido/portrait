import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

import store from '../../store'

import About from './About'
import Kido from './Kido'
import Project from './Project'

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
  return wheelDelta < 0 ? currentRotation + 1 : currentRotation - 1
}

const _preventScroll = (event) => {
  event.preventDefault()
  event.stopPropagation()
}

const _onWheelHandler = ({nativeEvent}) => {
  _preventScroll(nativeEvent)
  store.dispatch(rotationChange(getRotation(nativeEvent.wheelDelta || (-1 * nativeEvent.deltaY))))
}
// modified onwheel

// const rotate = (target, wheelDelta) => {
//   const targetRotation = wheelDelta < 0 ? 5 : -5
//   return TweenMax.to(target, 0.1, {rotation: targetRotation, onComplete})
// }

// const getDirection = (wheelDelta) => {
//   return wheelDelta < 0 ? 'up' : 'down'
// }

// const onWheel = ({nativeEvent}, target) => {
//   const direction = getDirection(nativeEvent.wheelDelta || (-1 * nativeEvent.deltaY))
//   if (direction === 'up') {
//     TweenMax
//   } else {

//   }
// }

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

// WITHOUT TRANSITION
const BodyRoutes = () => (
  <Route render={({ location }) => {
    return (
      <Switch location={location}>
        <Route path="/about/" component={About} />
        <Route path="/projects" component={Project} />
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
