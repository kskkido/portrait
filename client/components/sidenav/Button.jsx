import React from 'react'
import styled from 'styled-components'
import { TimelineLite, Back } from 'gsap'
import { Cross } from '../shared/SvgAssets'
import { createSVG } from '../shared/Factory'

const createSVGHoverAnimation = (target) => {
  return new TimelineLite({paused: true})
    .to(target, 0.1, {
      scale: 1.1
    })
}

const createSVGClickAnimation = ({ childNodes }) => {
  return new TimelineLite({paused: true})
    .to(childNodes[0], 0.15, {
      y: '+=13',
    })
    .to(childNodes[2], 0.15, {
      y: '-=13',
    }, '-=0.15')
    .to(childNodes[1], 0.15, {
      opacity: 0
    })
    .to(childNodes[0], 0.15, {
      rotation: 45,
      transformOrigin: 'center',
      ease: Back.easeOut
    })
    .to(childNodes[2], 0.15, {
      rotation: -45,
      transformOrigin: 'center',
      ease: Back.easeOut
    }, '-=0.15')
}

const Container = styled.div`
  position: fixed;
  left: 45px;
  top: 20px;
  z-index: 1001;
  cursor: pointer;
`
    , HOCButton = createSVG(Cross, Container)

const CrossComponent = (props) => (
  <HOCButton
    {...props}
    onClickTransform={createSVGClickAnimation}
    hoverAnimation={createSVGHoverAnimation}
  />
)

export default CrossComponent
