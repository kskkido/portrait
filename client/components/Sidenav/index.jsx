import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { TimelineMax } from 'gsap'

import SubList from './SubList'
import { viewData } from '../Shared/Data'

// Collapsible button that extends into a navigation, or moves to a new navigation page

const Container = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  border: 2px solid;
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

const List = styled.ul`
  list-style: none;
  margin-top: 100px;
  padding: 0;
  width: 85%;
  height: 100%;
  align-self: flex-end;
`

const ListRow = styled.li`
`

const ListRowContainer = styled.div`
  height: 100%;
  width: 100%;
  border-left: 3px solid;
  padding-left: 1em;
  color: #D3D3D3;
    & > a {
    display: block;
    height: 80px;
    text-decoration: none;
    color: inherit;
  }
}
`

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
    subTextList: []
  },
  row2: {
    text: ['About'],
    path: '/about',
    subTextList: viewData.about.navigationList,
  },
  row3: {
    text: ['Projects'],
    path: '/projects',
    subTextList: viewData.projects.navigationList,
  },
  row4: {
    text: ['Contact'],
    path: '/',
    subTextList: [],
  }
}

const SideNav = ({ children }) => (
  <Container>
    <List>
      {children}
    </List>
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

  createListItem ({text, path, subTextList}, index) {
    const isActive = index === this.state.activeIndex

    return (
      <ListRow key={text[0]}>
        <ListRowContainer
          active={isActive}
          onMouseOver={this.handleOnHover(index)}
          onMouseOut={this.handleOnHoverOff(index)}
          innerRef={div => this.listRows.push(div)}
        >
          <Link
            to={path}
            onClick={ isActive ? e => e.preventDefault() : this.handleClick(index)}
          >
            {text.map(el => <ListText key={el}>{el}</ListText>)}
          </Link>

          <div>
            {isActive && subTextList.length > 0 && <SubList textList={subTextList} path={path} />}
          </div>
        </ListRowContainer>
      </ListRow>
    )
  }

  createList (data) {
    return Object.keys(data).map((row, index) => this.createListItem(data[row], index))
  }

  handleClick(index) {
    return () => this.setState({activeIndex: index})
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

export default LocalContainer

