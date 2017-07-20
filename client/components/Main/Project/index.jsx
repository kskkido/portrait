import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProjectView from './ProjectView'
import Navigation from '../Shared/Navigation'
import { MainContainer, BodyContainer } from '../Shared/Styles'

const Project = ({ currentView, language, navigationList }) => (
  <MainContainer>
    <Navigation
      navigationList={navigationList}
    />
    <BodyContainer>
      <ProjectView
        language={language}
        currentView={currentView}
      />
    </BodyContainer>
  </MainContainer>
)

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentView: 0,
      navigationList: ['Index', 'Audiosphere', 'Stackquest', 'Portfolio']
    }
  }

  render() {
    const { navigationList } = this.state

    return (
      <Project
        currentView={navigationList[this.props.viewIndex]}
        language={this.props.language}
        navigationList={navigationList}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.language.language,
  viewIndex: state.events.viewIndex
})

export default connect(mapStateToProps)(LocalContainer)
