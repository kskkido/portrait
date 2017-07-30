import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { loadComplete } from '../../reducers/events'

import { Flex1, Title3 } from '../Shared/Styles'
import { fadeOut } from '../Shared/Keyframes'

const Container = styled.div.attrs({
  style: props => ({
    animation: props.loadProgress === 100 ? `${fadeOut} 1s ease-in-out 0s` : `null`
  })
})`
  flex: 1;
  align-self: center;
  position: relative;
`

const LoadContainer = styled.div`
  position: absolute;
  bottom: 50px;
  width: 100%;
  float: right;
`

const ProgressBar = styled.div.attrs({
  style: props => ({
    width: `${props.loadProgress}%`,
  })
})`
  height: 2px;
  background-color: black;
`

const LoadingText = Title3.extend`
  margin-left: 30px;
  letter-spacing: 12px;
  font-size: 11px;
`

const Load = ({loadProgress}) => (
  <Container key="load" loadProgress={loadProgress}>
    <LoadContainer>
      <LoadingText>Loading: {`${loadProgress}`}</LoadingText>
      <ProgressBar loadProgress={loadProgress} />
    </LoadContainer>
  </Container>
)

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadProgress: 0
    }
  }

  updateProgressBar() {
    const loadProgress = this.state.loadProgress + Math.floor(Math.random() * 2)
    loadProgress > 100 ? this.completeLoad() : this.setState({loadProgress})
  }

  completeLoad() {
    this.props.loaded()
    clearInterval(this.progressInterval)
  }

  componentWillMount() {
    // cheat it
    setTimeout((self) => {
      self.progressInterval = setInterval(self.updateProgressBar.bind(this), 5)
    }, 250, this)
  }

  render() {
    return (
      <Load
        loadProgress={this.state.loadProgress}
      />
    )
  }
}

const mapStateToDispatch = (dispatch) => ({
  loaded: () => setTimeout(dispatch, 650, loadComplete())
})

export default connect(null, mapStateToDispatch)(LocalContainer)
