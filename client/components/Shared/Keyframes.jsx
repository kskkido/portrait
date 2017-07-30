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

export const fadeOutTop = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`

export const circlify = keyframes`
  height: 300px;
  width: 300px;
  border: 2px solid;
  border-radius: 50%;
`

export const uncollapse = keyframes`
  0% {
    max-height 0px;
    opacity: 0;
  }

  100% {
    max-height 500px;
    opacity: 1;
  }
`
