import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { TimelineLite } from 'gsap'
import { rotationChange, viewChange } from '../../reducers/events'

// Collapsible button that extends into a navigation, or moves to a new navigation page

const Container = styled.div`
`

const List = styled.ul`
  list-style: none;
  width: 70%;
  opacity: 0.8;
`

const ListRow = styled.li.attrs({
  style: props => ({
    borderLeft: `4px solid ${props.themeColor || ''}`
  })
})`
  padding-left: 1em;
  color: #F3F2F2;
  & a {
    display: block;
    height: 30px;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
`

const ListText = styled.h3`
  vertical-align: middle;
  padding-top: 5px;
  font-weight: normal;
  font-size: 0.7em;
  text-transform: uppercase;
`

const SideNav = ({ children, inputRef }) => (
  <Container>
    <List innerRef={inputRef}>
      {children}
    </List>
  </Container>
)


class LocalContainer extends Component {
  static setRotation (index, length) {
    return (360 / length) * index
  }

  static createHoverAnimation(target) {
    return new TimelineLite({paused: true})
      .to(target, 0.3, {
        paddingLeft: '3em',
        color: `black`,
      })
  }

  static enterAnimation(main, list) {
    return new TimelineLite()
      .from(main, 0.3, {
        height: '0px',
      })
      .staggerFrom(list, 0.3, {
        autoAlpha: 0,
        scale: 0,
        rotationX: '45',
      }, 0.1)
  }

  componentWillMount() {
    this.listRows = []
    // renders before viewIndex is resetted
  }

  componentDidMount() {
    // this.enterAnimation = LocalContainer.enterAnimation(this.mainDiv, this.listRows)
    this.hoverAnimations = this.listRows.map(LocalContainer.createHoverAnimation)

    if (this.props.viewIndex === 0 ) { // a little hacky
     this.hoverAnimations[this.props.viewIndex].play()
    }
  }

  componentWillReceiveProps({viewIndex}) {
    this.hoverAnimations[this.props.viewIndex] && this.hoverAnimations[this.props.viewIndex].reverse()
    this.hoverAnimations[viewIndex].play()
  }

  createListItem (colors, path) {
    return (text, index, { length }) => {
      const isActive = this.props.viewIndex === index

      return (
        <ListRow
          key={text}
          active={isActive}
          onMouseOver={this.handleOnHover(index)}
          onMouseOut={this.handleOnHoverOff(index)}
          themeColor={colors[index]}
          innerRef={div => this.listRows.push(div)}
        >
          <a onClick={ isActive ? e => e.preventDefault() : this.handleClick(index, length)}>
            <ListText>{text}</ListText>
          </a>
        </ListRow>
      )
    }
  }


  createList ({colors, textList}, path) {
    return textList.map(this.createListItem(colors, path))
  }

  handleClick(index, length) {
    return () => {
      this.props.viewChange(index)
      this.props.rotationChange(LocalContainer.setRotation(index, length))
    }
  }

  handleOnHover(index) {
    if (index === this.props.viewIndex) return
    return () => {
      return this.hoverAnimations[index].play()
    }
  }

  handleOnHoverOff(index) {
    if (index === this.props.viewIndex) return
    return () => this.hoverAnimations[index].reverse()
  }

  render() {
    const { colors, textList, path } = this.props

    return (
      <SideNav inputRef={div => this.mainDiv = div}>
        {this.createList({colors, textList}, path)}
      </SideNav>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  viewChange: (index) => dispatch(viewChange(index)),
  rotationChange: (rotation) => dispatch(rotationChange(rotation))
})

export default connect(({events: { viewIndex }}) => ({viewIndex}), mapDispatchToProps)(LocalContainer)

