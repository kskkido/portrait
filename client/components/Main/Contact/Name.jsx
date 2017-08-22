import React, { Component } from 'react'
import { WelcomeContainer } from '../../Shared/Styles'

const Name = () => {

  return (
    <WelcomeContainer>
      <p>If you are interested in getting in touch with me, enter your name below and navigate to the next section. Once you fill out each section, go to the 'submit' section to send out your message!</p>
    </WelcomeContainer>
  )
}

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'Name',
      entered: false
    }
  }

  componentWillMount() {

  }

  componentDidMount() {

  }


}

export default Name

