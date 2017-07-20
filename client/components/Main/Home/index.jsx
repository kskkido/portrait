import React, { Component } from 'react'
import { connect } from 'react-redux'

import HomeView1 from './HomeView1'
import Navigation from '../Shared/Navigation'
import { MainContainer, BodyContainer } from '../Shared/Styles'

const Home = ({ currentView, language, navigationList }) => (
  <MainContainer>
    <Navigation
      navigationList={navigationList}
    />
    <BodyContainer>
      <HomeView1
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
      navigationList: ['Home', 'Who', 'What', 'Where'],
    }
  }

  render() {
    const { navigationList } = this.state

    return (
      <Home
        currentView={navigationList[this.props.viewIndex]}
        navigationList={navigationList}
        language={this.props.language}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.language.language,
  viewIndex: state.events.viewIndex
})

export default connect(mapStateToProps)(LocalContainer)
