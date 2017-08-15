import React, { Component } from 'react'
import styled from 'styled-components'
import Draggable from 'gsap/Draggable'
import { TweenLite, Power2 } from 'gsap'

import { BodyContainer, BodyContent, MainContainer } from '../../Shared/Styles'

const ColumnContainer = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
`

const Column = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid;
  position: absolute;
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
      trigger: div,
      onDragEnd: function({target}) {
        console.log('dragend', target.style)
        TweenLite.to(div, 0.3, {y: 0, ease: Power2.easeIn})
      }
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
