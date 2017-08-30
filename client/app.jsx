import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import styled, { injectGlobal } from 'styled-components'

import { fadeIn } from './components/Shared/Styles'
import Background from './components/background'
import Sidebar from './components/sidenav'
import Main from './components/main'
import Preload from './components/preload'

injectGlobal`
  body {
    background: #E1E5EE;
    letter-spacing: 4px;
    font-size: 1em;
    overflow-x: hidden;
  }
  a {
    text-decoration: none;
  }
  * {
    box-sizing: border-box;
  }
`

const Container = styled.main`
`

const Loaded = () => (
    <Container>
        <Sidebar />
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
