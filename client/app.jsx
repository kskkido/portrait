import React from 'react'
import { Router, Route, Switch, Link } from 'react-router-dom'

import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'

export const App = () => (
  <main>
    <Header />
    <Main />
    <Footer />
  </main>
)

const Main = ({ props }) => (
  <Switch>
    <Route path="/" component={Home} />
    <Route />
  </Switch>
)

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

