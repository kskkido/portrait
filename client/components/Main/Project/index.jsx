import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProjectView from './ProjectView'
import Navigation from '../Shared/Navigation'
import { MainContainer, BodyContainer } from '../Shared/Styles'

const Project = ({ language, navigationList }) => (
  <MainContainer>
    <Navigation
      navigationList={navigationList}
    />
    <BodyContainer>
      <ProjectView
        language={language}
      />
    </BodyContainer>
  </MainContainer>
)

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentView: 'view_0',
      navigationList: ['Index', 'Audiosphere', 'Stackquest', 'Portfolio']
    }
  }

  render() {
    return (
      <Project
        language={this.props.language}
        navigationList={this.state.navigationList}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.language.language
})

export default connect(mapStateToProps)(LocalContainer)
