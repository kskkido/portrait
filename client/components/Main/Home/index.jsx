import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import HomeView from './HomeView'
import Navigation from '../Navigation'
import { BodyContainer } from '../../Shared/Styles'

const Home = ({language, navigationList}) => (
  <BodyContainer>
    <Navigation
      navigationList={navigationList}
    />
    <HomeView langauge={language}/>
  </BodyContainer>
)

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      langauge: props.language,
      navigationList: ['Home', 'Bio', 'Bio2'],
    }
  }

  render() {
    const { language, navigationList } = this.state

    return (
      <Home
        language={language}
        navigationList={navigationList}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.language.language
})

export default connect(mapStateToProps)(LocalContainer)
