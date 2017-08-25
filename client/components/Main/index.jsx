import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { TransitionGroup } from 'react-transition-group'
import { Show } from '../Shared/Transition'

import Preload from '../Preload'
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

const BodyRoutes = ({ loaded }) => (
  <Route render={({ location }) => {
    if (!loaded) {
      return <Preload />
    }

    return (
      <TransitionGroup>
        <Show
          key={location.key}
          pathname={location.pathname}
          appear={true}
          mountOnEnter={true}
          unmountOnExit={true}
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

const Main = ({ loaded }) => {
  return (
    <ThemeProvider theme={theme}>
      <Container id="bodyContainer">
        <BodyRoutes  loaded={loaded} />
      </Container>
    </ThemeProvider>
  )
}

const mapStateToProps = ({ events }) => ({
  loaded: events.loaded
})


export default withRouter(connect(mapStateToProps)(Main))
