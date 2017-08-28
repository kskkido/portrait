import React, { Component } from 'react'
import styled from 'styled-components'
import { TimelineLite, Back } from 'gsap'
import { Arrow } from '../shared/SvgAssets'
import { Link } from 'react-router-dom'
import { createSVG } from '../shared/Factory'

const createSVGHoverAnimation = (isUp = false) => (target) => {
  return new TimelineLite({paused: true})
    .to(target, 0.4, {
        y: isUp ? '-=20px' : '+=20px',
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
    transform: translateX(-50%);
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
