import React, { Component } from 'react'
import styled from 'styled-components'
import { TimelineLite, Back } from 'gsap'
import { Arrow } from '../shared/Assets'
import { Link } from 'react-router-dom'
import { createSVG } from '../Shared/Factory'



const createSVGHoverAnimation = (target) => {
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
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
  `
    , HOCButton = createSVG(Arrow, Container, createSVGHoverAnimation)

 const ArrowComponent = ({ path, scale }) => (
  <Link to={path}>
    <HOCButton
      scale={scale || 0.15}
    />
  </Link>
)

export default ArrowComponent
