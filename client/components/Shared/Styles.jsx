import styled, {keyframes} from 'styled-components'

// const cyan = '#66D7D1'
//     , orange = '#FC7753'
//     , blue = '#42CAFD'
//     , skyBlue = '#D7F5F5'
//     , rouge = '#FDF5BF'
//     , green = '#C2EFB3'
//     , yellow = '#F7F052'
//     , purple = '#9DACFF'
//     , lightGreen = '#94E8B4'
//     , slimeGreen = '#7DDF64'

const red = '#E3170A'
    , cyan = '#A9E5BB'
    , skin = '#FCF6B1'
    , yellow = '#F7B32B'


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
  overflow: hidden;
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
