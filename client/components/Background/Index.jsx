import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'

const BgWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: -1000;
`

const BgOne = styled.div.attrs({
  style: props => ({
    height: props.theme.height,
    width: props.theme.width
  })
})`
  background-color: #e8e5e6;
  position: absolute;
  top: 0;
  z-index: -99;
`

const BgTwo = BgOne.extend`
  background-color: #FCF6B1;
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

const Background = () => {

  return (
    <BgWrapper id="bgWrapper">
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

  static getDimensions ({height, width}) {
    return {height, width}
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
      <ThemeProvider theme={LocalContainer.getDimensions(this.state)}>
        <Background
        />
      </ThemeProvider>
    )
  }
}

export default LocalContainer
