import React from 'react'
import styled from 'styled-components'
import { TimelineLite, Back } from 'gsap'
import { Cross } from '../shared/Assets'
import { createSVG } from '../Shared/Factory'


const createSVGHoverAnimation = (target) => {
  return new TimelineLite({paused: true})
    .to(target, 0.4, {
      scale: 1.2,
      rotation: 90,
      ease: Back.easeOut
    })
}

const Container = styled.div`
  position: fixed;
  left: 60px;
  top: 20px;
  z-index: 1001;
  cursor: pointer;
`
    , HOCButton = createSVG(Cross, Container, createSVGHoverAnimation)

const CrossComponent = (props) => <HOCButton {...props} />

export default CrossComponent
