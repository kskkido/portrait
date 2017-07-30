import styled from 'styled-components'
import { fadeIn } from './Keyframes'

export const MainContainer = styled.div`
  display: flex;
  min-height: 98vh;
  flex-direction: column;
  animation: ${fadeIn} 0.7s;
`

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const BodyContent = styled.div`
  flex: 4;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const BodyText = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 70%;
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

export const Title = styled.h1`
  font-weight: normal;
  text-transform: uppercase;
  font-size: 1.4em;
  min-height: 60px;
`

export const Title3 = styled.h3`
  font-weight: normal;
  text-transform: uppercase;
  font-size: 1.2em;
`
