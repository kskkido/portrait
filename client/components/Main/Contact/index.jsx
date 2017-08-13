import React, { Component } from 'react'
import styled from 'styled-components'
import Draggable from 'gsap/Draggable'
import { TweenLite } from 'gsap'

import { BodyContainer, BodyContent, MainContainer } from '../../Shared/Styles'

const ColumnContainer = styled.div`
  flex: 1;
  overflow: hidden;
`

const Column = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid;
  position: relative;
`

const ColumnHeader = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
`

const ContactView = ({ inputRef }) => {

  return (
    <MainContainer row={true}>
      <ColumnContainer>
        <Column innerRef={inputRef}>
          <ColumnHeader>HOME</ColumnHeader>
        </Column>
      </ColumnContainer>

      <ColumnContainer>
        <Column innerRef={inputRef}>
          <ColumnHeader>ABOUT</ColumnHeader>
        </Column>
      </ColumnContainer>

      <ColumnContainer>
        <Column innerRef={inputRef}>
          <ColumnHeader>PROJECT</ColumnHeader>
        </Column>
      </ColumnContainer>

      <ColumnContainer>
        <Column innerRef={inputRef}>
          <ColumnHeader>CONTACT</ColumnHeader>
        </Column>
      </ColumnContainer>
    </MainContainer>
  )
}

class LocalContainer extends Component {
  static createDraggable (div, index) {
    return Draggable.create(div, {
      type: 'y',
      trigger: div
    })
  }

  componentWillMount() {
    this.columnDiv = []
  }

  componentDidMount() {
    this.draggables = this.columnDiv.map(LocalContainer.createDraggable)
    console.log(this.draggables, 'DRAGG IT')
  }

  render () {

    return (
      <ContactView
        inputRef={div => this.columnDiv.push(div)}
      />
    )
  }
}

export default LocalContainer
