import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { PreviewContainer } from '../../shared/Styles'
import { viewChange, rotationChange } from '../../../reducers/events'
import { TimelineLite } from 'gsap'

const ListContainer = styled.div`
  position: relative;
  padding: 0;
`

const List = styled.ul`
  position: absolute;
  list-style: none;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`

const ListBlock = styled.li`
  margin-top: 15px;
  text-align: left;
  color: ${props => props.valid ? '' : 'red'};
`

const Submit = ({ children, isValid }) => {

  return (
    <PreviewContainer>
      <p style={{marginBottom: '5px'}}>
        {isValid ?
          'Your message is ready to be sent!' :
          "Looks like you haven't filled out each section!"
        }
      </p>
      <ListContainer>
        <List>
          {children}
        </List>
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
  }

  static tap (value, fn) {
    return (fn(value), value)
  }

  static setRotation (length) {
    return (index) => (360 / length) * index
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
        scale: 1.1,
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
    this.setRotation = LocalContainer.setRotation(5) // fix this
  }

  componentDidMount() {
    this.hoverAnimations = this.listRef.map(LocalContainer.createHoverAnimation)
  }

  onClickHandler(index) {
    return () => this.props.viewChange(LocalContainer.tap(index, (i) =>  this.props.rotationChange(this.setRotation(i))))
  }

  onHoverHandler(index) {
    return () => this.hoverAnimations[index].play()
  }

  onHoverOffHandler(index) {
    return () => this.hoverAnimations[index].reverse()
  }

  render() {

    return (
      <Submit
        isValid={LocalContainer.isEveryPropValid(this.props.value)}
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
