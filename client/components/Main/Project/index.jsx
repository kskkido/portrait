import React, { Component } from 'react'
import { connect } from 'react-redux'

import { MainContainer, BodyContainer } from '../../Shared/Styles'
import Navigation from '../Navigation'
import ProjectView1 from './ProjectView1'
import ProjectView2 from './ProjectView2'
import ProjectView3 from './ProjectView3'

const renderCurrentView = (currentView, language) => {
  if (currentView === 'Audiosphere') {
    return <ProjectView1 language={language} />
  } else if (currentView === 'StackQuest') {
    return <ProjectView2 language={language} />
  } else if (currentView === 'Portfolio') {
    return <ProjectView3 language={language} />
  }
}

const Project = ({ currentView, language, navigationList }) => (
  <MainContainer>
    <div style={{maxHeight: '100px'}}>
    <Navigation
      navigationList={navigationList}
    />
    </div>
    <BodyContainer>
      {renderCurrentView(currentView, language)}
    </BodyContainer>
  </MainContainer>
)

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentView: 0,
      navigationList: ['Audiosphere', 'StackQuest', 'Portfolio']
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
