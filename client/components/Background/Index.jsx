import React, { Component } from 'react'
import styled from 'styled-components'

const cyan = '#66D7D1'
    , orange = '#FC7753'
    , blue = '#42CAFD'
    , skyBlue = '#2EC4B6'
    , rouge = '#FDF5BF'
    , green = '#C2EFB3'
    , yellow = '#F7F052'
    , purple = '#9DACFF'
    , lightGreen = '#94E8B4'
    , slimeGreen = '#7DDF64'
    , red = '#E3170A'
    , cyanLight = '#A9E5BB'
    , skin = '#FCF6B1'
    , yellowLight = '#F7B32B'
    , cloud = '#ecf0f1'

const BgWrapper = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: -1000;
`

const BgOne = styled.div`
  background: ${cloud};
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -99;
`

const BgTwo = styled.div`
  background: ${skin};
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -100;
`

const Background = (props) => {

  return (
    <BgWrapper>
      <BgOne id="bgOne" />
      <BgTwo id="bgTwo" />
    </BgWrapper>
  )
}

class LocalContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      top: 0
    }
  }

  render () {

    return (
      <Background />
    )
  }
}

export default LocalContainer
