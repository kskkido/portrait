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

const BgWrapper = styled.div.attrs({
  style: props => ({
    height: props.height || '100%',
    width: props.width || '100%'
  })
})`
  overflow: hidden;
  position: absolute;
  top: 0;
  z-index: -1000;
`

const BgOne = styled.div`
  background-color: ${cloud};
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -99;
`

const BgTwo = styled.div`
  background-color: ${skin};
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -100;
`

const BgDiv = styled.div`
  background-color: inherit;
  float: left;
  top: 0;
  width: 25%;
  height: 100%;
  z-index: inherit;
`

const Background = (props) => {

  return (
    <BgWrapper {...props}>
      <BgOne id="bgOne">
        {/* <BgDiv />
        <BgDiv />
        <BgDiv />
        <BgDiv /> */}
      </BgOne>
      <BgTwo id="bgTwo">
        {/* <BgDiv />
        <BgDiv />
        <BgDiv />
        <BgDiv /> */}
      </BgTwo>
    </BgWrapper>
  )
}

class LocalContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      height: '100%',
      width: '100%'
    }

    this.onResize = this.onResize.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.onResize(window.innerHeight, window.innerWidth)
    })
  }

  onResize(height, width) {
    this.setState(Object.assign({}, {height, width}))
  }

  render () {

    return (
      <Background
        {...this.state}
      />
    )
  }
}

export default LocalContainer
