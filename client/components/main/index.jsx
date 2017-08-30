import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { TransitionGroup } from 'react-transition-group'
import { Show } from '../shared/Transition'

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
`

/* ====== utils ====== */

const BodyRoutes = ({ viewIndex }) => (
  <Route render={({ location }) => {

    return (
      <TransitionGroup
        appear={true}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <Show
          key={location.key}
          pathname={location.pathname}
          viewIndex={viewIndex}
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

const Main = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Container id="bodyContainer">
        <BodyRoutes  {...props} />
      </Container>
    </ThemeProvider>
  )
}

const mapStateToProps = ({ events }) => ({
  viewIndex: events.viewIndex
})


export default withRouter(connect(mapStateToProps)(Main))
