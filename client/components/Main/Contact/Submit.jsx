import React, { Component } from 'react'
import styled from 'styled-components'
import { PreviewContainer } from '../../Shared/Styles'

const ListContainer = styled.div`
`

const List = styled.ul`
  list-style: none;
`

const ListBlock =styled.li`
`

const Submit = ({ children }) => {

  return (
    <PreviewContainer>
      <p>Looks like you haven't filled out each section!</p>
      <ListContainer>
        <List>
          {children}
        </List>
      </ListContainer>
    </PreviewContainer>
  )
}

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entered: false
    }
  }

  createItems(prop, data) {

    return (
      <ListBlock>
        {`${prop}: ${data || 'fill it out!'}`}
      </ListBlock>
    )
  }

  createList(state) {
    return Object.keys(state).map((prop) => this.createItems(prop, state[prop]))
  }

  componentWillMount() {
    console.log('STATE', this.props.value)
  }

  render() {

    return (
      <Submit>
        {this.createList(this.props.value)}
      </Submit>
    )
  }
}


export default LocalContainer
