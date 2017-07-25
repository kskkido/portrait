import React, { Component } from 'react'
import { connect } from 'react-redux'

import { MainContainer, BodyContainer } from '../../Shared/Styles'
import Navigation from '../Navigation'
import ProjectView from './ProjectView'

const Project = ({ currentView, language, navigationList }) => (
  <MainContainer>
    <div style={{maxHeight: '100px'}}>
      <Navigation
        navigationList={navigationList}
      />
    </div>
    <ProjectView currentView={currentView} />
  </MainContainer>
)

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigationList: ['AUDIOSPHERE', 'STACKQUEST', 'PORTFOLIO']
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
