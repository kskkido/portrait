import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { TransitionGroup } from 'react-transition-group'
import { Show } from '../Shared/Transition'

import About from './About'
import Contact from './Contact'
import Project from './Project'
import Kido from './Kido'

const theme = {
  bg: '#E1F4CB',
  fg: '#fff'
}

const Container = styled.div`
  position: relative;
  margin-left: 325px;
`

/* ====== utils ====== */

const BodyRoutes = () => (
  <Route render={({ location }) => {
    !location.state && (location.state = {isBody: false})
    console.log(location, 'yolocation')
    return (
      <TransitionGroup>
        <Show
          key={location.key}
          pathname={location.pathname}
          appear={true}
          mountOnEnter={true}
          unmountOnExit={true}
          once={location.state}
        >
          <Switch location={location}>
            <Route path="/about" component={About} />
            <Route path="/projects" component={Project} />
            <Route path="/contact" component={Contact} />
            <Route exact path="/" component={Kido} />
          </Switch>
        </Show>
      </TransitionGroup>
    )
  }}
  />
)

// const BodyRoutes = () => (
//   <Route render={({ location }) => {
//     return (
//       <Switch location={location}>
//         <Route path="/about" component={About} />
//         <Route path="/projects" component={Project} />
//         <Route exact path="/" component={Kido} />
//       </Switch>
//     )
//   }}
//   />
// )

const Main = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container id="bodyContainer">
        <BodyRoutes  />
      </Container>
    </ThemeProvider>
  )
}


export default Main
