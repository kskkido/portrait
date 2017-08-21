import React, { Component } from 'react'
import { connect } from 'react-redux'
import BodyComponent from '../Body'
import AboutView from './AboutView'
import { viewRestart, rotationRestart } from '../../../reducers/events'
import { viewData } from '../../Shared/Data'

const About = ({ backgroundColor, navigationList, viewIndex }) => {
  return (
    <BodyComponent
      backgroundColor={backgroundColor}
      navigationList={navigationList}
    >
          <AboutView navigationList={navigationList}/>
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
    this.props.viewRestart(); this.props.rotationRestart()
    console.log('MOUNTING ABOUT', this.props.viewIndex)
  }

  render () {

    return (
      <About
        backgroundColor={LocalContainer.backgroundColor}
        navigationList={LocalContainer.navigationList}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  viewRestart: () => dispatch(viewRestart()),
  rotationRestart: () => dispatch(rotationRestart())
})

export default connect(null, mapDispatchToProps)(LocalContainer)
