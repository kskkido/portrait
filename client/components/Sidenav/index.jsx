import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'
import { TimelineLite } from 'gsap'
import SubList from './SubList'

import { viewData } from '../Shared/Data'
import { Collapse } from '../Shared/Transition'

import { rotationRestart, viewRestart } from '../../reducers/events'
// Collapsible button that extends into a navigation, or moves to a new navigation page

const Container = styled.div`
  min-width: 325px;
  position: relative;
  display: block;
  z-index: 100;
`

// const ColorBlock = styled.div.attrs({
//   style: props => ({
//     width: props.active ? `100%` : `0%`,
//     transition: props.active ? `width 0.3s ease-in` : 'null',
//     backgroundColor: `${props.color}`
//   })
// })`
//   height: 100%;
// `

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 40px;
  height: 100%;
  width: 285px;
  z-index: -2;
  background-color: #D3D3D3;
  opacity: 0.4;
  box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
`

const List = styled.ul`
  position: absolute;
  list-style: none;
  left: 60px;
  top: 80px;
  padding: 0;
  width: 265px;
  height: 80%;
  z-index: 100;
}
`


const ListRow = styled.li.attrs({
  style: props => ({
    borderLeft: `6px solid ${props.themeColor}`
  })
})`
  width: 100%;
  padding-left: 1em;
  color: #F3F2F2;
  position: relative;
  &::before {
    position: absolute;
    left: 0;
    top: 0;
    width: 90%;
    height: 100%;
    content: '';
    box-size; inherit;
    background-color: ${props => props.themeColor};
    z-index: -1;
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 0.6s;
  }
  &:hover::before {
    transform: scaleX(1);
  }
}
`

const ListLink = styled(Link)`
    display: block;
    height: 100px;
    text-decoration: none;
    color: inherit;
`

// shadow... box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);

const ListText = styled.h3`
  padding-top: 10px;
  font-weight: normal;
  font-size: 0.95em;
  text-transform: uppercase;
`

const listData = {
  row1: {
    text: ['Keisuke Kido', 'Developer'],
    path: '/',
    color: '#e8e5e6',
    subTextList: []
  },
  row2: {
    text: ['About'],
    path: '/about',
    color: '#65AFFF',
    subTextList: viewData.about.navigationList,
    colors: viewData.about.backgroundColor
  },
  row3: {
    text: ['Projects'],
    path: '/projects',
    color: '#DD614A',
    subTextList: viewData.projects.navigationList,
    colors: viewData.projects.backgroundColor
  },
  row4: {
    text: ['Contact'],
    path: '/contact',
    color: '#c1839f',
    subTextList: [],
  }
}

const SideNav = ({ children }) => (
  <Container>
    <List id="sideNav">
      {children}
    </List>
     <Overlay />
  </Container>
)


class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }

  static enterAnimation(list) {
    return new TimelineLite()
      .staggerFrom(list, 0.4, {
        autoAlpha: 0,
        transformOrigin: '0% 0% left',
        rotationY: 40,
        rotationX: 40,
        marginTop: '-=50px',
        scale: 0,
      }, 0.07)
  }

  static createHoverAnimation(target) {
    return new TimelineLite({paused: true})
        .to(target, 0.3, {
          paddingLeft: '3em',
        })
    }

  componentWillMount() {
    this.listRows = []
  }

  componentDidMount() {
    LocalContainer.enterAnimation(this.listRows)
    this.hoverAnimations = this.listRows.map(LocalContainer.createHoverAnimation)
    this.hoverAnimations[this.state.activeIndex].play()
  }

  shouldComponentUpdate(_, { activeIndex }) {
    return activeIndex !== this.state.activeIndex
  }

  componentWillUpdate() {
    this.hoverAnimations[this.state.activeIndex].reverse()
  }

  createListItem ({color, text, path, subTextList, colors}, index) {
    const isActive = index === this.state.activeIndex

    return (
        <ListRow
          key={text[0]}
          active={isActive}
          onMouseOver={this.handleOnHover(index)}
          onMouseOut={this.handleOnHoverOff(index)}
          innerRef={div => this.listRows.push(div)}
          themeColor={color}
        >
          <ListLink
            to={path}
            onClick={ isActive ? e => e.preventDefault() : this.handleClick(index) }
          >
            {text.map(el => <ListText key={el}>{el}</ListText>)}
          </ListLink>

          {isActive && subTextList.length > 0 && <SubList textList={subTextList} colors={colors} path={path} />}
        </ListRow>
    )
  }

  createList (data) {
    return Object.keys(data).map((row, index) => this.createListItem(data[row], index))
  }

  handleClick(index) {
    return () => {
      this.setState({activeIndex: index})
    }
  }

  handleOnHover(index) {
    if (index === this.state.activeIndex) return
    return () => {
      return this.hoverAnimations[index].play()
    }
  }

  handleOnHoverOff(index) {
    if (index === this.state.activeIndex) return
    return () => this.hoverAnimations[index].reverse()
  }

  render() {
    return (
      <SideNav>
        {this.createList(listData)}
      </SideNav>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  rotationRestart: () => dispatch(rotationRestart()),
  viewRestart: () => dispatch(viewRestart()),
})

export default connect(null, mapDispatchToProps)(LocalContainer)

