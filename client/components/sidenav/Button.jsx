import React from 'react'
import styled from 'styled-components'
import { TimelineLite, Back } from 'gsap'
import { Cross } from '../shared/SvgAssets'
import { createSVG } from '../shared/Factory'


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
    , HOCButton = createSVG(Cross, Container)

const CrossComponent = (props) => (
  <HOCButton
    {...props}
    hoverAnimation={createSVGHoverAnimation}
  />
)

export default CrossComponent
