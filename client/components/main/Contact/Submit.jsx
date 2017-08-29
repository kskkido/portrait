import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { PreviewContainer } from '../../shared/Styles'
import { viewChange, rotationChange } from '../../../reducers/events'
import { asyncFormRestart } from '../../../reducers/form'
import { TimelineLite } from 'gsap'

const ListContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0;
`

const List = styled.ul`
  list-style: none;
  cursor: pointer;
  text-align: center;
  align-self: center;
`

const ListBlock = styled.li`
  margin-top: 10px;
  text-align: left;
  color: ${props => props.valid ? '' : 'red'};
`

const ButtonContainer = styled.div`
  margin-top: 5px;
  text-align: center;
  padding-top: .5rem;
  padding-bottom: .5rem;
  width: 150px;
  border: 2px solid;
  align-self: center;
  cursor: ${props => props.isValid && 'pointer'};
`

const ButtonText = styled.span`
  text-transform: uppercase;
`

const Submit = ({ children, isValid, onSubmit, onMouseOver, onMouseOut, inputRef }) => {

  return (
    <PreviewContainer>
      <p style={{marginBottom: '0px'}}>
        {isValid ?
          'Your message is ready to be sent!' :
          "Looks like you haven't filled out each section!"
        }
      </p>
      <ListContainer>
        <List>
          {children}
        </List>
      <ButtonContainer
        isValid={isValid}
        onClick={isValid && onSubmit}
        onMouseOver={isValid && onMouseOver}
        onMouseOut={isValid && onMouseOut}
        innerRef={inputRef}
      >
        <ButtonText >
          {isValid ? 'Submit' : <s>Submit</s>}
        </ButtonText>
      </ButtonContainer>
      </ListContainer>
    </PreviewContainer>
  )
}

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allValid: false
    }

    this.onButtonHoverHandler = this.onButtonHoverHandler.bind(this)
    this.onButtonHoverOffHandler = this.onButtonHoverOffHandler.bind(this)
  }

  static tap (value, fn) {
    return (fn(value), value)
  }

  static truncate (string) {
    return string.length > 15 ?
    `${string.slice(0, 15)}...` :
    string
  }

  static isEveryPropValid(state) {
    return Object.keys(state).every((prop) => state[prop].isValid)
  }

  static createHoverAnimation(target) {
    return new TimelineLite({paused: true})
      .to(target, 0.2, {
        scale: 1.2,
      })
  }

 createItems(prop, { value, isValid }, index) {
    return (
      <ListBlock
        key={prop}
        valid={isValid}
        onClick={this.onClickHandler(index)}
        onMouseOver={this.onHoverHandler(index)}
        onMouseOut={this.onHoverOffHandler(index)}
        innerRef={div => this.listRef.push(div)}
      >
        {`${prop.toUpperCase()}: ${isValid ? LocalContainer.truncate(value) : 'Needs some work!'}`}
      </ListBlock>
    )
  }

  createList() {
    const state = this.props.value

    return Object.keys(state).map((prop, index) => this.createItems(prop, state[prop], index))
  }

  componentWillMount() {
    this.listRef = []
  }

  componentDidMount() {
    this.hoverAnimations = this.listRef.map(LocalContainer.createHoverAnimation)
    this.buttonHoverAnimation = LocalContainer.createHoverAnimation(this.button)
  }

  onClickHandler(index) {
    return () => this.props.viewChange(LocalContainer.tap(index, (i) => this.props.rotationChange(this.props.setRotation(i))))
  }

  onHoverHandler(index) {
    return () => this.hoverAnimations[index].play()
  }

  onHoverOffHandler(index) {
    return () => this.hoverAnimations[index].reverse()
  }

  onButtonHoverHandler() {
    this.buttonHoverAnimation.play()
  }

  onButtonHoverOffHandler() {
    this.buttonHoverAnimation.reverse()
  }

  render() {

    return (
      <Submit
        isValid={LocalContainer.isEveryPropValid(this.props.value)}
        onSubmit={this.props.onEnterHandler}
        onMouseOver={this.onButtonHoverHandler}
        onMouseOut={this.onButtonHoverOffHandler}
        inputRef={div => this.button = div}
      >
        {this.createList()}
      </Submit>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  rotationChange: (rotation) => dispatch(rotationChange(rotation)),
  viewChange: (index) => dispatch(viewChange(index))
})


export default connect(null, mapDispatchToProps)(LocalContainer)
