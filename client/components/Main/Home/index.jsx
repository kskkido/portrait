import React, { Component } from 'react'
import { connect } from 'react-redux'

import HomeView from './HomeView'
import Navigation from '../Shared/Navigation'
import { MainContainer, BodyContainer } from '../Shared/Styles'

const Home = ({ _setCurrentView, currentView, language, navigationList }) => (
  <MainContainer>
    <Navigation
      navigationList={navigationList}
      setCurrentView={_setCurrentView}
    />
    <BodyContainer>
      <HomeView
        language={language}
        currentView={navigationList[currentView]}
      />
    </BodyContainer>
  </MainContainer>
)

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentView: 0,
      navigationList: ['Home', 'Bio', 'Bio2', 'Bio3'],
    }
    this._setCurrentView = this._setCurrentView.bind(this)
  }

  _setCurrentView(index) {
    console.log(index, 'SETTING VIEW')
    if(index !== this.currentView) this.setState(Object.assign({}, ...this.state, {currentView: index}))
  }

  render() {
    const { currentView, navigationList } = this.state

    return (
      <Home
        currentView={currentView}
        navigationList={navigationList}
        language={this.props.language}
        _setCurrentView={this._setCurrentView}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.language.language
})

export default connect(mapStateToProps)(LocalContainer)
