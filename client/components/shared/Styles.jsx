import React from 'react'
import styled, { css } from 'styled-components'

// media query
const mediaSizes = {
  giant: 1170,
  desktop: 992,
  tablet: 768,
  phone: 376
}

export const media = Object.keys(mediaSizes).reduce((acc, label) => {
  const emSize = mediaSizes[label] / 16

  acc[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)}
    }
  `

  return css
}, {})

// styles

export const BodyContainer = styled.div`
  position: absolute;
  width: 700px;
  ${media.tablet`width: 100%`}
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: ${props => props.row ? 'row' : 'column'};
  justify-content: center;
`

export const BodyContent = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: ${props => props.row ? 'row' : 'column'};
  align-items: center;
  justify-content: center;
`

export const BodyText = styled.div`
  width: 100%;
  padding: 0 20px;
  margin: 20px 0px;
`

export const Text = styled.p`
  margin: 0;
`

export const Flex1 = styled.div`
  flex: 1;
  align-self: center;
`

export const Flex2 = styled.div`
  flex: 2;
`

export const Flex3 = styled.div`
  flex: 3;
`

export const Flex4 = styled.div`
  flex: 4;
`

export const Flex5 = styled.div`
  flex: 5;
`

export const PreviewContainer = styled.div`
  position: absolute;
  text-align: center;
  width: 700px;
  ${media.tablet`width: 100%`}
  min-height: 200px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 10px;
`

export const Title = styled.h1`
  font-weight: normal;
  text-transform: uppercase;
  font-size: 1.2em;
  height: 25px;
  margin-top: ${props => props.bottom ? '50px' : '10px'};
  margin-bottom: 20px;
`

export const Title3 = styled.h3`
  font-weight: normal;
  text-transform: uppercase;
  font-size: 1.2em;
`

export const TitleDiv = styled.div`
  min-height: 60px;
`

export const Letter = styled.span`
  display: inline-block;
  text-transform: uppercase;
  font-size: 1.4em;
`

export const Input = styled.input.attrs({
  style: props => props.valid ?
    {} :
    {color: 'red', borderColor: 'red'}
})`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  padding: 6px 14px 5px 33px;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: black;
  background-color: transparent;
  text-align: center;
  letter-spacing: 1px;
  font-size: 1em;
  transition: color 0.2s, background-color 0.2s;

  &:focus {
    outline-color: 0;
    outline-style: none;
    outline-width: 0;
  }
`

export const PlaceholderContainer = styled.div.attrs({
  style: props => ({
    bottom: props.empty ? '20px' : '40px',
    fontSize: props.empty ? '1.2em' : '1em',
    color: props.valid ? '' : 'red',
  })
})`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 14px 5px 33px;
  white-space: nowrap;
  letter-spacing: 1px;
  color: #424242;
  opacity: 0.8;
  transition: bottom 0.2s, font-size 0.2s, color 0.2s;
`

export const Keyword = styled.div`
  position: relative;
  color: ${props => props.color};
  display: inline-block;
  white-space:nowrap;
`

export const KeywordOverlay = styled.div`
  position: absolute;
  display: inline-block;
  left: -2.5%;
  bottom: 0;
  height: 0%;
  width: 105%;
  background-color: white;
  opacity: 0.9;
`

export const Keylink = styled.div`
  position: relative;
  white-space:nowrap;
  display: inline-block;

  &:hover::before {
    height: 100%;
  }

  &::before {
    content: '';
    position: absolute;
    left: -2.5%;
    bottom: 0;
    height: 0;
    width: 105%;
    background-color: white;
    opacity: 0.4;
    transition: height 0.3s;
    z-index: -1;
  }
`

export const KeylinkOverlay = styled.div`
  position: absolute;
  display: inline-block;
  left: -2.5%;
  bottom: 0;
  height: 0;
  width: 105%;
  background-color: white;
  opacity: 0.8;

`

export const KeylinkText = styled.a`
  color: ${props => props.color || '#DCE775'};
  transition: color 0.3s;
  &:hover {
    color: #F0F4C3;
  }
`
