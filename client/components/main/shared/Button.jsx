import React from 'react'
import styled from 'styled-components'
import { TimelineLite, Back } from 'gsap'
import { Arrow } from '../../shared/SvgAssets'
import { createSVG } from '../../shared/Factory'

const createSVGHoverAnimation = (isUp = false) => (target) => {
  return new TimelineLite({paused: true})
    .to(target, 0.4, {
        y: '+=20px',
        scaleY: 1.5,
        rotationY: 180,
        ease: Back.easeOut
    })
}
const Container = styled.div`
    position: absolute;
    top: 100px;
    width: inherit;
    left: 50%;
    transform: translateX(-50%) ${props => props.pointUp && 'rotate(180deg)'};
    transform-origin: center;
    cursor: pointer;
  `
    , HOCButton = createSVG(Arrow, Container)

 const ArrowComponent = ({ clearTop, onClick, scale, pointUp }) => (
    <HOCButton
      hoverAnimation={createSVGHoverAnimation(pointUp)}
      scale={scale || 0.15}
      onClick={onClick}
      clearTop={clearTop}
      pointUp={pointUp}
    />

)

export default ArrowComponent
