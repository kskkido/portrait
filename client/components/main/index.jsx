import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { TransitionGroup } from 'react-transition-group'
import styled, { ThemeProvider } from 'styled-components'
import { sending } from '../../reducers/form'
import { Show } from '../shared/Transition'

import About from './About'
import Contact from './Contact'
import Project from './Project'
import Kido from './Kido'
import Overlay from './Overlay'

const theme = {
  bg: '#E1F4CB',
  fg: '#fff'
}

const Container = styled.div`
  position: relative;
  width: inherit;
  height: inherit;
`

const RouteContainer = styled.div`
  position: relative;
`

/* ====== utils ====== */

const BodyRoutes = ({ viewIndex }) => (
  <RouteContainer id="bodyContainer">
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
  </RouteContainer>
)

const Main = (props) => {
  console.log('dude', props.toggle)
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Overlay status={props.sending} />
        <BodyRoutes  {...props} />
      </Container>
    </ThemeProvider>
  )
}

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: false
    }

    this.onClickHandler = this.onClickHandler.bind(this)
  }

  onClickHandler() {
    this.setState({toggle: !this.state.toggle})
  }

  render() {
    return (
      <Main
        {...this.props}
        {...this.state}
        onClickHandler={this.onClickHandler}
      />
    )
  }
}

const mapStateToProps = ({ events, form }) => ({
  sending: form[sending],
  viewIndex: events.viewIndex
})


export default withRouter(connect(mapStateToProps)(LocalContainer))
