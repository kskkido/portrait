import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

import About from './About/_proto'
import Project from './Project/_proto'
import Kido from './Kido'

const theme = {
  bg: '#E1F4CB',
  fg: '#fff'
}

const Container = styled.div`
  flex: 6;
`

/* ====== utils ====== */

const BodyRoutes = () => (
  <Route render={({ location }) => {
    return (
      <Switch location={location}>
        <Route path="/about" component={About} />
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
      <Container id="bodyContainer">
        <BodyRoutes  />
      </Container>
    </ThemeProvider>
  )
}


export default Main
