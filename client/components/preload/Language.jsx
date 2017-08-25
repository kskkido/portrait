import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { TimelineLite, Back } from 'gsap'
import { languageSelect } from '../../reducers/language'
import { Fade } from '../Shared/Transition'

const Container = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 30%;
`

const ButtonContainer = styled.div`
  margin: auto;
  display: flex;
  justify-content: space-around;
  width: 60%;
  perspective: 800px;
  font-size: 1.3em;
  letter-spacing: 4px;
`

const Button = styled.button`
  padding: 2em;
  margin: 50px;
  height: 150px;
  width: 250px;
  color: #D3D3D3;
  opacity: 0.8;
  border: 0;
  background: none;
  position: relative;
  text-transform: uppercase;
  box-shadow: 4px 4px 1px 0 rgba(0,0,0,0.14);
  transform-style: preserve-3d;
  cursor: pointer;
  &:hover {
    cursor: pointer;
  }
  &::before,
  &::after {
    box-sizing: inherit;
    content: '';
    position: absolute;
    border: 2px solid transparent;
    width: 0;
    height: 0;
  }
  transition: color 0.2s;

  &::before {
    top: 0;
    right: 0;
  }

  &::after {
    bottom: 0;
    left: 0;
  }

  &:hover {
    color: black;
    opacity: 1;
    transition: opacity 0.3s ease-out, color: 0.3s ease-out;
  }

  &:hover::before,
  &:hover::after {
    width: 100%;
    height: 100%;
  }

  &:hover::before {
    border-top-color: black;
    border-right-color: black;
    transition:
      width 0.2s ease-out,
      height 0.2s ease-out 0.2s;
  }

  &:hover::after {
    border-bottom-color: black;
    border-left-color: black;
    transition:
      width 0.2s ease-out,
      height 0.2s ease-out 0.2s;
  }
`

// add national flag to button

const LanguageQuery = ({ language, onClick, onMouseMove, onMouseOut }) => (
  <Container>
    <Fade
      in={!language}
      key={'language'}
      appear={true}
    >
      <ButtonContainer>
        <Button
          value="ENGLISH"
          onClick={onClick}
          onMouseMove={onMouseMove}
          onMouseOut={onMouseOut}
        >
          English
        </Button>
        <Button
          value="JAPANESE"
          onClick={onClick}
          onMouseMove={onMouseMove}
          onMouseOut={onMouseOut}
        >
          日本語
        </Button>
      </ButtonContainer>
    </Fade>
  </Container>
)

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      language: null
    }
  }

  static hoverAnimation({ nativeEvent: { layerX, layerY, target } }) {
      const ax = (layerY - (target.offsetHeight / 2)) / -5
          , ay = (layerX - (target.offsetWidth / 2)) / 5
      new TimelineLite()
        .to(target, 0.3, {
          rotationX: ax,
          rotationY: ay,
        })
        .to(target, 0.2, {
          scale: 1.075,
          ease: Back.eastOut
        }, '-=0.3')
  }

  static hoverOffAnimation({ nativeEvent: { target } }) {
      new TimelineLite()
        .to(target, 0.4, {
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          ease: Back.easeOut
        })
  }

  componentWillUpdate(_, { language }) {
    return language ?
      setTimeout(this.props.onLanguageSelect, 400, language) :
      undefined
  }

  onClickHandler({ nativeEvent: { target: { value }} }) {
    this.setState(() => ({language: value}))
  }

  render () {

    return (
      <LanguageQuery
        language={this.state.language}
        onClick={this.onClickHandler.bind(this)}
        onMouseMove={LocalContainer.hoverAnimation}
        onMouseOut={LocalContainer.hoverOffAnimation}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onLanguageSelect: (language) => dispatch(languageSelect(language))
})

export default connect(null, mapDispatchToProps)(LocalContainer)
