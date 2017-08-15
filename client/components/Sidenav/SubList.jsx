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
  width: 95%;
  opacity: 0.8;
  padding-left: 6em;
`

const ListRow = styled.li`
  color: #F3F2F2;
`

const ListLink = styled.a`
  display: block;
  height: 30px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`

const LinkBlock = styled.div.attrs({
  style: props => ({
    borderLeft: `4px solid ${props.themeColor}`
  })
})`
  height: inherit;
  position: relative;
`

const LinkBackground = styled.div.attrs({
  style: props => ({
    backgroundColor: props.themeColor
  })
})`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  content: '';
  box-size; inherit;
  z-index: -1;
  transform-origin: left;
  transform: scaleX(0);
  box-shadow: 4px 4px 2px 0 rgba(0,0,0,0.14)
`

const ListTextContainer = styled.div`
  margin-top: 10px;
  opacity: 0.6;
`

const ListText = styled.span`
  padding-top: 4px;
  padding-left: 1em;
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

  static createHoverAnimation({ childNodes: [background, ...text]}) {
    return new TimelineLite({paused: true})
        .to(background, 0.4, {
          scaleX: 1,
        })
        .to(text, 0.4, {
          opacity: 1,
          paddingLeft: '3em',
          color: 'black',
        }, '-=0.4')
  }

  static enterAnimation(main, list) {
    return new TimelineLite()
      .from(main, 0.6, {
        height: '0px',
      })
      .staggerFrom(list, 0.5, {
        autoAlpha: 0,
        scale: 0,
        rotationX: '45',
        rotationY: '45'
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
          id="listRow"
          key={text}
          active={isActive}
          onMouseOver={this.handleOnHover(index)}
          onMouseOut={this.handleOnHoverOff(index)}
        >
          <ListLink
            onClick={ isActive ? e => e.preventDefault() : this.handleClick(index, length)}
          >
            <LinkBlock
              id="sublist"
              themeColor={colors[index]}
              innerRef={div => this.listRows.push(div)}
            >
              <LinkBackground themeColor={colors[index]} />
              <ListTextContainer>
                <ListText>{text}</ListText>
              </ListTextContainer>
            </LinkBlock>
          </ListLink>
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

