import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { loadComplete } from '../../reducers/events'

import { Flex1, Title3 } from '../Main/Shared/Styles'

const Container = styled.div`
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

const LoadingBar = styled.div.attrs({
  style: props => ({
    width: `${props.loadProgress}%`
  })
})`
  border: 1px solid;
  background-color: black;
`

const LoadingText = Title3.extend`
  margin-left: 30px;
  letter-spacing: 12px;
`

const Load = ({loadProgress}) => (
  <Container>
    <LoadContainer>
      <LoadingText>Loading: {`${loadProgress}`}</LoadingText>
      <LoadingBar loadProgress={loadProgress} />
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

  updateLoadingBar() {
    const loadProgress = this.state.loadProgress + Math.floor(Math.random() * 3)
    loadProgress > 100 ? this.props.loaded() : this.setState({loadProgress})
  }

  componentWillMount() {
    // cheat it
    this.progressInterval = setInterval(this.updateLoadingBar.bind(this), 10)
  }

  componentWillUnmount() {
    clearInterval(this.progressInterval)
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
  loaded: () => dispatch(loadComplete())
})

export default connect(null, mapStateToDispatch)(LocalContainer)
