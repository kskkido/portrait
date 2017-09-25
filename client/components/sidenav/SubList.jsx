import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { TimelineLite, Back } from 'gsap'
import { media } from '../shared/Styles'
import { rotationChange, viewChange } from '../../reducers/events'

// Collapsible button that extends into a navigation, or moves to a new navigation page

const Container = styled.div`
  ${media.phone`display: none`}
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
  height: 35px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`

const LinkBlock = styled.div.attrs({
  style: props => ({
    borderLeft: `4px solid ${props.themeColor}`
  })
})`
  margin-top: 10px;
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
  padding-top: 4px;
  opacity: 0.6;
`

const ListText = styled.span`
  padding-left: 1em;
  font-weight: normal;
  font-size: 0.55em;
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
  static setRotation (length) {
    return (index) => (360 / length) * index
  }

  static createHoverAnimation({ childNodes: [background, ...text]}) {
    return new TimelineLite({paused: true})
        .to(background, 0.4, {
          scaleX: 1,
        })
        .to(text, 0.4, {
          opacity: 1,
          paddingLeft: '1.5em',
          color: 'black',
          ease: Back.easeOut,
        }, '-=0.4')
  }

  componentWillMount() {
    this.listRows = []
    this.setRotation = LocalContainer.setRotation(this.props.textList.length)
  }

  componentDidMount() {
    this.hoverAnimations = this.listRows.map(LocalContainer.createHoverAnimation)

    if (this.props.viewIndex === 0 ) { // a little hacky
     this.hoverAnimations[this.props.viewIndex].play()
    }
  }

  componentWillReceiveProps({viewIndex}) {
    this.hoverAnimations[this.props.viewIndex] && this.hoverAnimations[this.props.viewIndex].reverse()
    this.hoverAnimations[viewIndex] && this.hoverAnimations[viewIndex].play()
  }

  createListItem (colors) {
    return (text, index) => {
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
            onClick={ isActive ? e => e.preventDefault() : this.handleClick(index)}
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


  createList ({colors, textList}) {
    return textList.map(this.createListItem(colors))
  }

  handleClick(index) {
    return () => {
      this.props.viewChange(index)
      this.props.rotationChange(this.setRotation(index))
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

    return (
      <SideNav inputRef={div => this.mainDiv = div}>
        {this.createList(this.props)}
      </SideNav>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  viewChange: (index) => dispatch(viewChange(index)),
  rotationChange: (rotation) => dispatch(rotationChange(rotation))
})

export default connect(({events: { viewIndex }}) => ({viewIndex}), mapDispatchToProps)(LocalContainer)

