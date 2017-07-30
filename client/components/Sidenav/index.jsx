import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { TransitionGroup } from 'react-transition-group'

import { activeBlock } from '../Shared/Keyframes'
import { Hide } from '../Shared/Transition'
import SubList from './SubList'

// Collapsible button that extends into a navigation, or moves to a new navigation page

const Container = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
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
  border-bottom: 1px solid;
`

const ListRowContainer = styled.div`
  height: 100%;
  width: 100%;
    & > a {
    display: block;
    height: 80px;
    text-decoration: none;
    color: ${props => props.active ? 'black' : 'grey'};
    padding-left: ${props => props.active ? '3em' : '1em'};
    transition: padding-left 0.3s;
  }
  & > a:hover ${props => props.active ? 'null' : `{
    padding-left: 3em;
    color: black;
    transition:
      padding-left 0.3s,
      color 0.6s;
  }`}
`

const ListText = styled.h3`
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
    subTextList: ['Who', 'What', 'Where', 'Why'],
  },
  row3: {
    text: ['Projects'],
    path: '/projects',
    subTextList: ['Audiosphere', 'StackQuest', 'Portfolio'],
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

  createListItem ({text, path, subTextList}, index) {
    const isActive = index === this.state.activeIndex

    return (
      <ListRow key={text[0]}>
        <ListRowContainer active={isActive}>
        <Link to={path} onClick={this.handleClick(index)}>
          {text.map(el => <ListText key={el} active={isActive}>{el}</ListText>)}
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
    if (index === this.state.activeIndex) return
    return () => this.setState({activeIndex: index})
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

