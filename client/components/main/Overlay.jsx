import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import gsap from 'gsap'
import { sending } from '../../reducers/form'

import Textline from './shared/Textline'

const Overlay = styled.div.attrs({
  style: props => ({
    zIndex: props.status ? '2000' : '-1000',
    opacity: props.status ? 1 : 0,
  })
})`
  width: 100%;
  height: 100%;
  position: fixed;
  background:rgba(0, 0, 255,0.2);
  transition: opacity 0.4s, z-index 0.6s;
`

const MessageCard = styled.div`
  position: absolute;
  height: 125px;
  width: 250px;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: white;
  text-align: center;
  border-radius: 5%;
  z-index: 2001;
  box-shadow: 4px 4px 1px 0 rgba(0,0,0,0.14);
`

const Message = styled.p`
  padding-top: 40px;
  font-size: 1em;
`

const Sending = ({ status }) => {
  console.log(status, 'whahhahah')
  return (
    <Overlay status={status}>
      <MessageCard>
        <Message>
          Sending...<Textline height={'1.2em'} />
        </Message>
      </MessageCard>
    </Overlay>
  )
}

export default Sending
