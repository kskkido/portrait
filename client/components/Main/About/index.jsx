import React, { Component } from 'react'
import { connect } from 'react-redux'

import BodyComponent from '../Body'
import AboutView1 from './AboutView1'
import AboutView2 from './AboutView2'
import AboutView3 from './AboutView3'
import AboutView4 from './AboutView4'

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

const About = ({ navigationList, viewIndex }) => {
  return (
    <BodyComponent
      navigationList={navigationList}
      viewIndex={viewIndex}
    >
      {renderCurrentView(viewIndex)}
    </BodyComponent>
  )
}

class LocalContainer extends Component {
  static get navigationList () {
    return viewData.about.navigationList
  }

  render () {

    return (
      <About
        navigationList={LocalContainer.navigationList}
        viewIndex={this.props.viewIndex}
      />
    )
  }
}

export default connect(({events: {viewIndex, language}}) => ({viewIndex, language}))(LocalContainer)
