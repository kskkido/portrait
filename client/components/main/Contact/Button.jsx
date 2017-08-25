import React from 'react'
import styled from 'styled-components'
import { TimelineLite, Back } from 'gsap'
import { Facebook, Github, Linkedin } from '../../shared/SvgAssets'
import { createSVG } from '../../shared/Factory'

const createHoverAnimation = (target, container) => {
  return new TimelineLite({paused: true})
    .to(container, 0.2, {
      scale: 1.3,
    })
}

const Container = styled.div`
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
`

export const GithubIcon = createSVG(Github, Container, createHoverAnimation)
export const LinkedinIcon = createSVG(Linkedin, Container, createHoverAnimation)
export const FacebookIcon = createSVG(Facebook, Container, createHoverAnimation)
