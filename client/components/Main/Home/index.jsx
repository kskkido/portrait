import React, { Component } from 'react'
import { connect } from 'react-redux'

import HomeView from './HomeView'
import Navigation from '../Shared/Navigation'
import { MainContainer, BodyContainer } from '../Shared/Styles'

const Home = ({language, navigationList}) => (
  <MainContainer>
    <Navigation
      navigationList={navigationList}
    />
    <BodyContainer>
      <HomeView
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
      navigationList: ['Home', 'Bio', 'Bio2', 'Bio3'],
    }
  }

  render() {
    const { navigationList } = this.state

    return (
      <Home
        language={this.props.language}
        navigationList={navigationList}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.language.language
})

export default connect(mapStateToProps)(LocalContainer)
