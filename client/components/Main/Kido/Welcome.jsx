import React, { Component } from 'react'
import styled from 'styled-components'

import { WelcomeContainer } from '../../Shared/Styles'

const WelcomePreview = (props) => {

  return (
    <WelcomeContainer>
      <p>Welcome to my portfolio website. Drag anywhere on the page to rotate the circular navigation. Rotate the circle to the section of your interest to access it. Or you can just open up the side nav by clicking on the button around the top left corner of this page and use that instead... Enjoy!</p>
    </WelcomeContainer>
  )
}

class LocalContainer extends Component {

  render() {

    return (
      <WelcomePreview />
    )
  }
}

export default LocalContainer
