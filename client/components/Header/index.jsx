import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// Collapsible button that extends into a navigation, or moves to a new navigation page

const Container = styled.div`
  flex: 1;
  border: 2px solid;
  align-item: flex-end;
`

const List = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: flex-end;
  & li {
    display: inline;
    margin-right: 30px
  };
  & a {
    color: red;
    text-decoration: none;
  }
`

const LinkStyle = {
  textDecoration: 'none',
  color: 'black'
}

const Header = () => (
  <Container>
    <List>
      <li><Link style={LinkStyle} to="/">Home</Link></li>
      <li><Link style={LinkStyle} to="/projects">Projects</Link></li>
    </List>
  </Container>
)

export default Header

