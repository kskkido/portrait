import React, { Component } from 'react'
import { connect } from 'react-redux'

import { MainContainer, BodyContainer, Flex1 } from '../../Shared/Styles'
import Navigation from '../Navigation'
import AboutView1 from './AboutView1'
import AboutView2 from './AboutView2'
import AboutView3 from './AboutView3'
import AboutView4 from './AboutView4'

const renderCurrentView = (currentView, language) => {
  if (currentView === 'Who') {
    return <AboutView1 language={language} />
  } else if (currentView === 'What') {
    return <AboutView2 language={language} />
  } else if (currentView === 'Where') {
    return <AboutView3 language={language} />
  } else if (currentView === 'Why') {
    return <AboutView4 language={language} />
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
      navigationList: ['Who', 'What', 'Where', 'Why'],
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
