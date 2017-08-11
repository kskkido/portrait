import React, { Component } from 'react'
import { connect } from 'react-redux'

import BodyComponent from '../Body'
import AboutView1 from './AboutView1'
import AboutView2 from './AboutView2'
import AboutView3 from './AboutView3'
import AboutView4 from './AboutView4'

import { viewRestart, rotationRestart } from '../../../reducers/events'
import { viewData } from '../../Shared/Data'

const renderCurrentView = (viewIndex, language) => {
  if (viewIndex === 0) {
    return <AboutView1 key="one" language={language} />
  } else if (viewIndex === 1) {
    return <AboutView2 key="two" language={language} />
  } else if (viewIndex === 2) {
    return <AboutView3 key="three" language={language} />
  } else if (viewIndex === 3) {
    return <AboutView4 key="four" language={language} />
  }
}

const About = ({ backgroundColor, navigationList, viewIndex }) => {
  return (
    <BodyComponent
      backgroundColor={backgroundColor}
      navigationList={navigationList}
    >
      {renderCurrentView(viewIndex)}
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
    console.log('MOUNTINIINIING')
    this.props.rotationRestart(); this.props.viewRestart();
  }

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

export default connect(({events: {viewIndex, language}}) => ({viewIndex, language}), mapDispatchToProps)(LocalContainer)
