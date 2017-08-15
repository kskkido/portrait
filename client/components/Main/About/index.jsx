import React, { Component } from 'react'
import { connect } from 'react-redux'

import BodyComponent from '../Body'
import AboutView from './AboutView'

import { viewRestart, rotationRestart } from '../../../reducers/events'
import { viewData } from '../../Shared/Data'

const About = ({ backgroundColor, navigationList }) => {
  return (
    <BodyComponent
      backgroundColor={backgroundColor}
      navigationList={navigationList}
    >
      <AboutView />
    </BodyComponent>
  )
}

class LocalContainer extends Component {
  static get navigationList () {
    return viewData.about.navigationList
  }

  static get backgroundColor () {
    return viewData.about.backgroundColor
  }

  componentWillMount() {
    this.props.rotationRestart(); this.props.viewRestart();
  }

  // componentWillReceiveProps() {
  //   console.log(document.getElementById('title').childNodes, 'WEI')
  // }

  render () {

    return (
      <About
        backgroundColor={LocalContainer.backgroundColor}
        navigationList={LocalContainer.navigationList}
        viewIndex={this.props.viewIndex}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  viewRestart: () => dispatch(viewRestart()),
  rotationRestart: () => dispatch(rotationRestart())
})

export default connect(null, mapDispatchToProps)(LocalContainer)
