import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import ProjectView from './ProjectView'
import Navigation from '../Navigation'
import { BodyContainer } from '../../Shared/Styles'

const Project = ({ navigationList }) => (
  <BodyContainer>
    <Navigation
      navigationList={navigationList}
    />
    <ProjectView />
  </BodyContainer>
)

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigationList: ['Audiosphere', 'Stackquest', 'Portfolio']
    }
  }

  render() {
    return (
      <Project
        navigationList={this.state.navigationList}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.language.language
})

export default connect(mapStateToProps)(LocalContainer)
