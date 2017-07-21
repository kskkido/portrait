import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// Collapsible button that extends into a navigation, or moves to a new navigation page

const Container = styled.div`
  flex: 1.5;
  border: 1px solid;
  display: flex;
  justify-content: center;
`

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 85%;
  height: 60%;
  display: table;
  border-collapse: collapse;
`

const ListRow = styled.li.attrs({
  style: props => ({
    'padding-left': `${props.active ? '3em' : '1em'}`,
    'color': `${props.active ? 'grey' : 'black'}`
  })
})`
  border-bottom: 1px solid;
  display: table-row;
  & a {
    display: table-cell;
    vertical-align: middle;
    text-decoration: none;
    color: inherit;
    padding-left: inherit;
    transition: padding-left 0.2s;
  }
  & a:hover {
    padding-left: 3em;
    color: grey;
    transition:
      padding-left 0.5s,
      color 0.6s;
  }
`

const ListText = styled.h2`
  margin: 0;
  padding: 0;
  font-weight: normal;
  font-size: 1.25em;
  text-transform: uppercase;
`

const listData = {
  row1: {
    text: ['Keisuke Kido', 'Fullstack Developer'],
    path: '/'
  },
  row2: {
    text: ['Home'],
    path: '/'
  },
  row3: {
    text: ['Projects'],
    path: '/projects'
  },
  row4: {
    text: ['Contact'],
    path: '/'
  }
}

const createListItem = ({text, path}, isActive, clickHandler) => {
  return (
    <ListRow key={text[0]} active={isActive}>
      <Link to={path} onClick={clickHandler}>
        {text.map(el => <ListText key={el}>{el}</ListText>)}
      </Link>
    </ListRow>
  )
}

const createList = (data, activeIndex, clickHandler) => (
  Object.keys(data).map((row, index) => createListItem(data[row], activeIndex === index, clickHandler(index)))
)

const SideNav = ({ activeIndex, handleClick }) => (
  <Container>
    <List>
      {createList(listData, activeIndex, handleClick)}
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

  _handleClick(index) {
    return () => this.setState({activeIndex: index})
  }

  render() {
    return (
      <SideNav
        activeIndex={this.state.activeIndex}
        handleClick={this._handleClick.bind(this)}
      />
    )
  }
}

export default LocalContainer

