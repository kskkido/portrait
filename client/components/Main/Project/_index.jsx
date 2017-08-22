import React, { Component } from 'react'
import { connect } from 'react-redux'
import { viewData } from '../../Shared/Data'
import { pathChange, viewRestart, rotationRestart } from '../../../reducers/events'
import BodyComponent from '../Body'

import AboutPreview from './About'
import ContactsPreview from './Contacts'
import ProjectsPreview from './Projects'
import WelcomePreview from './Welcome'


// const createAnimation = (target) => {
//   TweenMax.from(target, 2, {
//     rotationX: 90,
//     rotationY: 90,
//   }, {
//     rotationX: 0,
//     rotationY: 0,
//     rotation: 360,
//     ease: Power2.easeIn
//   })
// }

const list = [
  <WelcomePreview key="welcome" />,
  <AboutPreview key="about" />,
  <ProjectsPreview key="projects" />,
  <ContactsPreview key="contacts" />
]

const Body = ({ viewIndex = 0 }) => list[viewIndex]

const Welcome = ({ backgroundColor, navigationList }) => {

  return (
    <BodyComponent
      backgroundColor={backgroundColor}
      navigationList={navigationList}
      isCenter={true}
    >
      <Body />
    </BodyComponent>
  )
}


class LocalContainer extends Component {
  static get navigationList() {
    return viewData.projects.navigationList
  }

  static get backgroundColor() {
    return viewData.projects.backgroundColor
  }

  componentWillMount() {
    this.props.pathChange(2)
    this.props.viewRestart(); this.props.rotationRestart()
  }

  render() {

    return (
      <Welcome
        backgroundColor={LocalContainer.backgroundColor}
        navigationList={LocalContainer.navigationList}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  pathChange: (index) => dispatch(pathChange(index)),
  viewRestart: () => dispatch(viewRestart()),
  rotationRestart: () => dispatch(rotationRestart())
})

export default connect(null, mapDispatchToProps)(LocalContainer)
