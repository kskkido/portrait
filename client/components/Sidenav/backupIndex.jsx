import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { TransitionGroup } from 'react-transition-group'

import { activeBlock } from '../Shared/Keyframes'
import { Show } from '../Shared/Transition'
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
  height: 40%;
  display: table;
  border-collapse: collapse;
  align-self: flex-end;
`

const ListRow = styled.li`
  border-bottom: 1px solid;
  display: table-row;
  height: 30px;
  & a {
    display: table-cell;
    vertical-align: middle;
    text-decoration: none;
    color: inherit;
    padding-left: inherit;
  }
  & a:hover ${props => props.active ? 'null' : `{
    padding-left: 3em;
    color: black;
    transition:
      padding-left 0.4s,
      color 0.6s;
  }`}
`

const ListRowContainer = styled.div`
  height: 100%;
  width: 100%;
`

const ListText = styled.h3.attrs({
  style: props => props.active ?
    {paddingLeft: '3em', color: 'black'} :
    {paddingLeft: '1em', color: 'grey'}
})`
  margin: 0;
  padding: 0;
  font-weight: normal;
  font-size: 0.95em;
  text-transform: uppercase;
  white-space: nowrap;
  vertical-align: middle;
  transition: padding-left 0.3s;
`

const listData = {
  row1: {
    text: ['Keisuke Kido', 'Developer'],
    path: '/'
  },
  row2: {
    text: ['About'],
    path: '/about',
    subPath: ''
  },
  row3: {
    text: ['Projects'],
    path: '/projects',
    subPath: ''
  },
  row4: {
    text: ['Contact'],
    path: '/'
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

  createListItem ({text, path}, index) {
    const isActive = index === this.state.activeIndex

    return (
      <ListRow key={text[0]} active={isActive}>
        <ListRowContainer>
        <Link to={path} onClick={this.handleClick(index)}>
          {text.map(el => <ListText key={el} active={isActive}>{el}</ListText>)}
        </Link>
        <TransitionGroup>
          <Show key={index}>
            <div>
              {isActive && (index === 1 || index === 2) && <SubList row={index} />}
            </div>
          </Show>
        </TransitionGroup>
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

