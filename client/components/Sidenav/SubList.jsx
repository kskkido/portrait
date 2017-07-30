import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { uncollapse } from '../Shared/Keyframes'

// Collapsible button that extends into a navigation, or moves to a new navigation page

const Container = styled.div`
  width: inherit;
`

const List = styled.ul`
  list-style: none;
  padding-right: 0;
  width: 100%;
  opacity: 0.8;
  animation: ${uncollapse} 0.6s ease-in-out 0s;
`

const ListRow = styled.li`
  border-top: 1px solid;
  & a {
    display: block;
    height: 30px;
    text-decoration: none;
    color: ${props => props.active ? 'black' : 'grey'};
    padding-left: ${props => props.active ? '3em' : '1em'};
    transition: padding-left 0.3s;
  }
  & a:hover ${props => props.active ? 'null' : `{
    padding-left: 3em;
    color: black;
    transition:
      padding-left 0.3s,
      color 0.6s;
  }`}
`

const ListText = styled.h3`
  vertical-align: middle;
  padding-top: 5px;
  font-weight: normal;
  font-size: 0.7em;
  text-transform: uppercase;
`

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

  createListItem (path) {
    return (text, index) => (
      <ListRow key={text} active={this.state.activeIndex === index}>
        <Link to={`${path}/${index}`} onClick={this.handleClick(index)}>
          <ListText>{text}</ListText>
        </Link>
      </ListRow>
    )
  }

  createList (textList, path) {
    return textList.map(this.createListItem(path))
  }

  handleClick(index) {
    if (index === this.state.activeIndex) return
    return () => this.setState({activeIndex: index})
  }

  render() {
    const { textList, path } = this.props

    return (
      <SideNav>
        {this.createList(textList, path)}
      </SideNav>
    )
  }
}

export default LocalContainer

