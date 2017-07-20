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

const ListRow = styled.li`
  border-bottom: 1px solid;
  display: table-row;
  & a {
    display: table-cell;
    vertical-align: middle;
    text-decoration: none;
    color: black;
    padding-left: 1em;
    transition: padding-left 0.3s;
  }
  & a:hover {
    padding-left: 3em;
    transition: padding-left 0.6s;
  }
`

const ListText = styled.h2`
  margin: 0;
  padding: 0;
  font-weight: normal;
  font-size: 1.25em;
  text-transform: uppercase;
`

const Header = () => (
  <Container>
    <List>
      <ListRow>
        <Link to="/">
          <ListText>Keisuke Kido</ListText>
          <ListText>Fullstack Developer</ListText>
        </Link>
      </ListRow>
      <ListRow>
        <Link to="/">
          <ListText>Home</ListText>
        </Link>
      </ListRow>
      <ListRow>
        <Link to="/projects">
          <ListText>Projects</ListText>
        </Link>
      </ListRow>
      <ListRow>
        <Link to="/projects">
          <ListText>Contact</ListText>
        </Link>
      </ListRow>
    </List>
  </Container>
)

export default Header

