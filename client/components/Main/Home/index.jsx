import React, { Component } from 'react'
import { connect } from 'react-redux'

import { MainContainer, BodyContainer, Flex1 } from '../../Shared/Styles'
import Navigation from '../Navigation'
import HomeView1 from './HomeView1'
import HomeView2 from './HomeView2'
import HomeView3 from './HomeView3'
import HomeView4 from './HomeView4'

const renderCurrentView = (currentView, language) => {
  if (currentView === 'Home') {
    return <HomeView1 language={language} />
  } else if (currentView === 'Who') {
    return <HomeView2 language={language} />
  } else if (currentView === 'What') {
    return <HomeView3 language={language} />
  } else if (currentView === 'Where') {
    return <HomeView4 language={language} />
  }
}


const Home = ({ currentView, language, navigationList }) => (
  <MainContainer>
    <div style={{maxHeight: '100px'}}>
      <Navigation
        navigationList={navigationList}
      />
    </div>
     {renderCurrentView(currentView, language)}
  </MainContainer>
)

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigationList: ['Home', 'Who', 'What', 'Where'],
    }
  }

  componentWillUnmount() {
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
