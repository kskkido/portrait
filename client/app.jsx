import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import styled, { injectGlobal } from 'styled-components'

import { fadeIn } from './components/Shared/Styles'
import Background from './components/Background'
import Sidenav from './components/Sidenav'
import Main from './components/Main'
import Preload from './components/Preload'

injectGlobal`
  body {
    background: #ecf0f1;
    letter-spacing: 4px;
    font-size: .8em;
  }
`

const Container = styled.main`
  display: flex;
  animation: ${fadeIn} 0.6s ease-in-out 0s;
`

const Loaded = () => (
    <Container>
        <Sidenav />
        <Main />
    </Container>
)

const App = ({ loaded }) => (
  <BrowserRouter>
    <div>
      <Background />
      {loaded ?
        <Loaded /> :
        <Preload />
      }
    </div>
  </BrowserRouter>
)

export default connect(({events}) => ({loaded: events.loaded}))(App)

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

/* ====== DEFINE CONTENT ======
  GENERAL LAYOUT:
    Color Theme:


    Content:
      Circular navigation at the top to navigate through components within current side nav option
      Side nav to navigate to different categories below

    Animation:
      Transition animation for loading screen after language is selected

  HOME:
    Content:
      Landing Component -> brief welcome, maybe instruction to scroll to activate circular nav
      Bio 1 -> Brief explanation of my developer background and my base location
        -> Pin my locations on a global map or animate my movement on a map
      Bio 2 ->

  PROJECT:

  CONTACT:

  PRELOAD:
  +-- Language Query
    Content: English or Japanese Button
    Animation:
*/

