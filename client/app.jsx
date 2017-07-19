import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styled, { injectGlobal } from 'styled-components'

import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'
import Preload from './components/Preload'

injectGlobal`
  body {
    background: #F1F4F3
  }
`

const Container = styled.main`
  display: flex;
  flex-direction: column;
`

// const MainRoutes = () => (
//   <Switch>
//     <Route exact path="/" component={Main} />
//     <Route path="/:type" component={Main} />
//   </Switch>
// )

const Loaded = () => (
    <div>
        <Header />
        <Main />
        <Footer />
    </div>
)

const App = ({selected}) => (
  <BrowserRouter>
    <Container>
      {selected ?
        <Loaded /> :
        <Preload />
      }
    </Container>
  </BrowserRouter>
)

const mapStateToProps = (state) => ({
  selected: state.language.selected
})

export default connect(mapStateToProps)(App)

// const MainRoutes = ({ props }) => (
//   <Switch>
//     <Route path="/" component={Home} />
//     <Route />
//   </Switch>
// )

// const Projects = () => (
//   <Route />
// )

/* ==== DEFINE ROUTES ====
  PATH: /
   +-- Language Query Component
   +-- Loading Component  <-- SVG animation that completes with name
   +-- Home Component  <-- circular nav with links to projects
    +-- Circular nav component
  PATH: /projects/:name
   +-- Project Components <-- Image or preview of project. Project metadata
    +-- Audiosphere
    +-- StackQuest
    +-- Portfolio
  PATH: /bio
   +-- Bio Component <-- Incorporate three js? Aframe? As interactive timeline of my life
    +--
  PATH: /contact
   +-- link card <-- github, linkedin, anything else?
  PATH: /share
   +-- oauth
*/

/* ==== KEY FUNCTIONALITY/TECHNOLOGY TO DEMONSTRATE
  ANIMATIONS: Transitions, Static, loading animations, on hover animations, prompts
    +-- Anime JS
    +-- GSAP
    +-- CSS3
  LAYOUT DESIGN:
    +-- CSS3
    +-- FLEXBOX
    +-- React Components

*/

