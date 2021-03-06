import React, { Component } from 'react'
import { connect } from 'react-redux'
import { viewData } from '../../shared/Data'
import { pathChange, viewRestart, rotationRestart } from '../../../reducers/events'
import { BodyContainer } from '../../shared/Styles'

import BodyComponent from '../Body'
import Preview from './Preview'

const Welcome = ({ backgroundColor, navigationList }) => {

  return (
    <BodyComponent
      backgroundColor={backgroundColor}
      navigationList={navigationList}
      isCenter={true}
    >
      <Preview />
    </BodyComponent>
  )
}


class LocalContainer extends Component {
  static get navigationList() {
    return viewData.home.navigationList
  }

  static get backgroundColor() {
    return viewData.home.backgroundColor
  }

  componentWillMount() {
    this.props.pathChange(0)
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
