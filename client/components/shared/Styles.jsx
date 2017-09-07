import React from 'react'
import styled from 'styled-components'

export const BodyContainer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: ${props => props.row ? 'row' : 'column'};
  justify-content: flex-start;
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
  padding: 0 10px 0 10px;
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
  width: 100%;
  min-height: 200px;
  left: 50%;
  transform: translateX(-50%);
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
  letter-spacing: 1px;
  font-size: 1.2em;
  color: #424242;
  opacity: 0.8;
  transition: bottom 0.2s, font-size 0.2s, color 0.2s;
`
