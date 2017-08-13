import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'
import { TimelineMax } from 'gsap'
import SubList from './SubList'

import { viewData } from '../Shared/Data'
import { Collapse } from '../Shared/Transition'

import { rotationRestart, viewRestart } from '../../reducers/events'
// Collapsible button that extends into a navigation, or moves to a new navigation page

const Container = styled.div`
  flex: 1.5;
  position: relative;
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
  height: 100%;
  width: 285px;
  z-index: 99;
  background-color: #D3D3D3;
  opacity: 0.4;
`

const List = styled.ul`
  position: fixed;
  margin-left: 30px;
  list-style: none;
  margin-top: 100px;
  padding: 0;
  width: 285px;
  height: 80%;
  z-index: 100;
}
`

const ListRow = styled.li`
`

const ListRowContainer = styled.div.attrs({
  style: props => ({
    borderLeft: `2px solid`
  })
})`
  height: 100%;
  width: 100%;
  padding-left: 1em;
  color: #F2F7EF;
    & > a {
    display: block;
    height: 80px;
    text-decoration: none;
    color: inherit;
  }
}
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
    color: '#ecf0f1',
    subTextList: []
  },
  row2: {
    text: ['About'],
    path: '/about',
    color: '#65AFFF',
    subTextList: viewData.about.navigationList,
  },
  row3: {
    text: ['Projects'],
    path: '/projects',
    color: '#DD614A',
    subTextList: viewData.projects.navigationList,
  },
  row4: {
    text: ['Contact'],
    path: '/contact',
    color: '#ecf0f1',
    subTextList: [],
  }
}

const SideNav = ({ children }) => (
  <Container id="sideNav">
    <List>
      {children}
    </List>
       {/* <Overlay /> */}
  </Container>
)


class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }

  static createHoverAnimation(target) {
    return new TimelineMax({paused: true})
      .to(target, 0.3, {
        paddingLeft: '3em',
        color: 'black'
      })
  }

  componentWillMount() {
    this.listRows = []
  }

  componentDidMount() {
    this.hoverAnimations = this.listRows.map(LocalContainer.createHoverAnimation)
    this.hoverAnimations[this.state.activeIndex].play()
  }

  shouldComponentUpdate(_, { activeIndex }) {
    return activeIndex !== this.state.activeIndex
  }

  componentWillUpdate() {
    this.hoverAnimations[this.state.activeIndex].reverse()
  }

  createListItem ({color, text, path, subTextList}, index) {
    const isActive = index === this.state.activeIndex

    return (
      <ListRow key={text[0]}>
        <ListRowContainer
          active={isActive}
          onMouseOver={this.handleOnHover(index)}
          onMouseOut={this.handleOnHoverOff(index)}
          innerRef={div => this.listRows.push(div)}
          color={color}
        >
          <Link
            to={path}
            onClick={ isActive ? e => e.preventDefault() : this.handleClick(index) }
          >
            {text.map(el => <ListText key={el}>{el}</ListText>)}
          </Link>

          {isActive && subTextList.length > 0 && <SubList textList={subTextList} path={path} />}
        </ListRowContainer>
      </ListRow>
    )
  }

  createList (data) {
    return Object.keys(data).map((row, index) => this.createListItem(data[row], index))
  }

  handleClick(index) {
    return () => {
      // this.props.rotationRestart(); this.props.viewRestart()
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

