import React from 'react'
import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  max-width: 800px;
  cursor: move;
  flex-direction: ${props => props.row ? 'row' : 'column'};
  position: absolute;
  opacity: 0;
  top: -100px;
  left: 0;
  right: 0;
  margin: 0 auto;
`

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

export const WelcomeContainer = styled.div`
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
  min-height: 50px;
  margin-top: 20px;
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
