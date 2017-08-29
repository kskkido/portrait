import React, { Component } from 'react'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import Button from './Button'
import { TimelineLite, Back } from 'gsap'

const ReturnContainer = styled.div`
  position: ${props => props.isBody ? 'relative' : 'absolute'};
  left: 50%;
  transform: translateX(-50%);
`

const ButtonContainer = styled.div`
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  height: 110px;
`

const HomeTextContainer = styled.div`
  text-align: center;
  opacity: 0;
  scale: 0;
`

const Return = ({ isBody, text, onClick, onHover, onHoverOff, inputButton, inputText }) => (

  <ReturnContainer
    isBody={isBody}
  >
    <ButtonContainer
      onClick={onClick}
      onMouseOver={onHover}
      onMouseOut={onHoverOff}
      innerRef={inputButton}
    >
      <Button pointUp={true} clearTop={true} />
    </ButtonContainer>
    <HomeTextContainer innerRef={inputText}>
      <p>{text ? text : 'Back to home'}</p>
    </HomeTextContainer>
  </ReturnContainer>
)

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false
    }

    this.onClick = this.onClick.bind(this)
    this.onHover = this.onHover.bind(this)
    this.onHoverOff = this.onHoverOff.bind(this)
  }

  static createHoverAnimation(target) {
    return new TimelineLite({paused: true})
      .to(target, 0.4, {
        autoAlpha: 1,
        scale: 1,
        y: '-=20px',
        ease: Back.easeOut
      })
  }

  componentDidMount() {
    this.hoverAnimation = LocalContainer.createHoverAnimation(this.text)
  }

  onHover() {
    this.hoverAnimation.play()
  }

  onHoverOff() {
   this.hoverAnimation.reverse()
  }

  onClick() {
    this.props.toggleBody ? this.props.toggleBody() : this.props.history.push('/')
  }

  render() {

    return (
      <Return
        isBody={!!this.props.toggleBody}
        text={this.props.text}
        onClick={this.onClick}
        onHover={this.onHover}
        onHoverOff={this.onHoverOff}
        inputButton={div => this.button = div}
        inputText={div => this.text = div}
      />
    )
  }
}

export default withRouter(LocalContainer)
