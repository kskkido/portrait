import styled, {keyframes} from 'styled-components'

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  60% {
    padding-left: 2000px;
  }

  100% {
    opacity: 0;
  }
`

export const MainContainer = styled.div`
  display: flex;
  min-height: 98vh;
  flex-direction: column;
  animation: ${fadeIn} 0.3s ease-in;
`

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const BodyContent = styled.div`
  margin-top: 10px;
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
