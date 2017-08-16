import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { TimelineLite } from 'gsap'
import SubList from './SubList'

import { viewData } from '../Shared/Data'
import { UncollapseList } from '../Shared/Transition'

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
  height: 100%;
  width: 285px;
  position: fixed;
  top: 0;
  left: 40px;
  z-index: -2;
  background-color: #D3D3D3;
  opacity: 0.2;
  box-shadow: 4px 4px 1px 0 rgba(0,0,0,0.14)
`

const List = styled.ul`
  height: 80%;
  width: 265px;
  position: absolute;
  list-style: none;
  left: 60px;
  top: 80px;
  padding: 0;
  z-index: 100;
}
`


const ListRow = styled.li`
  width: 100%;
  color: #F3F2F2;
}
`

const ListLink = styled(Link)`
  display: block;
  height: 100px;
  text-decoration: none;
  color: inherit;
`

const LinkBlock = styled.div.attrs({
  style: props => ({
    borderLeft: `6px solid ${props.themeColor}`
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
  height: 100%;
  width: 95%;
  position: absolute;
  left: 0;
  top: 0;
  content: '';
  box-size; inherit;
  z-index: -1;
  transform-origin: left;
  transform: scaleX(0);
  box-shadow: 4px 4px 2px 0 rgba(0,0,0,0.14)
`

// shadow... box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);

const ListText = styled.h3`
  top: 0;
  bottom: 0;
  padding-left: 1em;
  padding-top: 10px;
  font-weight: normal;
  font-size: 0.95em;
  text-transform: uppercase;
  opacity: 0.6;
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
      .staggerFrom(list, 0.6, {
        autoAlpha: 0,
        rotationX: 40,
        rotationY: 40,
        marginTop: '-=50px',
        scale: 0,
      }, 0.1)
  }

  static createHoverAnimation({ childNodes: [background, ...text] }) {
    return new TimelineLite({paused: true})
        .to(background, 0.4, {
          scaleX: 1,
        })
        .to(text, 0.4, {
          paddingLeft: '3em',
          color: 'black',
          opacity: 1,
        }, '-=0.4')
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
        >
          <ListLink
            to={path}
            onClick={ isActive ? e => e.preventDefault() : this.handleClick(index) }
          >
            <LinkBlock
              innerRef={div => this.listRows.push(div)}
              themeColor={color}
            >
              <LinkBackground themeColor={color} />
              {text.map(el => <ListText key={el}>{el}</ListText>)}
            </LinkBlock>
          </ListLink>
          {subTextList.length > 0 &&
            <UncollapseList
              key={text[0]}
              in={isActive}
              timeout={600}
              mountOnEnter={true}
              unmountOnExit={true}
            >
              <SubList
                textList={subTextList}
                colors={colors}
                path={path}
              />
            </UncollapseList>
          }
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

