import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { TimelineLite, Back } from 'gsap'
import { loadComplete } from '../../reducers/events'
import { asyncFormFetch } from '../../reducers/form'
import { viewData } from  '../shared/Data'
import { Title3 } from '../shared/Styles'
import { createTitle } from '../shared/Utils'
import { Fade, Scramble } from '../shared/Transition'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const ProgressBar = styled.div.attrs({
  style: props => ({
    width: `${props.loadProgress}%`,
  })
})`
  height: 50vh;
  position: absolute;
  bottom: 0;
  background-color: ${viewData.home.backgroundColor[0]};
  left: 0;
  border-top: 2px solid;
  z-index: 1;
`

const LoadingText = Title3.extend`
  position: absolute;
  left: 30px;
  top: -40px;
  width: 300px;
  letter-spacing: 12px;
  font-size: 13px;
`

const LetterContainer = styled.div`
  position: absolute;
  margin: auto;
  left: 50%;
  bottom: 33vh;
  height: 100px;
  transform: translateX(-50%);
`

const Letter = styled.span`
  margin-right: 20px;
  display: inline-block;
  text-transform: uppercase;
  font-size: 5em;
  opacity: 0;
`

const Load = ({ inputRef, loaded, loadProgress }) => (
    <Fade in={!loaded} key={'loadBar'} appear={true} slideOut={true} onExitDelay={0.4}>
        <Container>
          <ProgressBar loadProgress={loadProgress}>
            <LoadingText>Loading: {`${loadProgress}%`}</LoadingText>
          </ProgressBar>
          <Scramble in={loadProgress === 100} key={'message'} text={'Hello'} delay={0.4}>
            <LetterContainer
              innerRef={inputRef}
            >
              {createTitle('Hello', Letter)}
            </LetterContainer>
          </Scramble>
        </Container>
    </Fade>
)

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadProgress: 0,
      loaded: false,
    }
  }

  static letterAnimation(target, cb) {
    return new TimelineLite()
      .staggerTo(target.childNodes, 0.5, {
        y: '-=140px',
        autoAlpha: 1,
        ease: Back.easeOut,
        onComplete: cb,
      }, '0.05')
      .delay(0.3)
  }

  updateProgressBar() {
    const loadProgress = this.state.loadProgress + Math.floor(Math.random() * 2)
    this.setState({loadProgress}, () => (
      loadProgress === 100 ?
        this.clearIntervalAndToggle(this.progressInterval) :
        undefined
    ))
  }

  clearIntervalAndToggle(interval) {
    return (clearInterval(interval), LocalContainer.letterAnimation(this.letters, () => this.setState(Object.assign({}, ...this.state, {loaded: true}))))
  }

  componentWillMount() {
    this.props.formFetch()
      .then(console.log.bind(null, 'fetched'))
  }

  componentDidMount() {
    setTimeout((self) => {
      self.progressInterval = setInterval(self.updateProgressBar.bind(this), 5)
    }, 570, this)
  }

  componentWillUpdate(_, { loaded }) {
    return loaded ? setTimeout(this.props.loaded, 900) : undefined
  }

  render() {
    return (
      <Load
        {...this.state}
        inputRef={div => this.letters = div}
      />
    )
  }
}

const mapStateToDispatch = (dispatch) => ({
  loaded: () => dispatch(loadComplete()),
  formFetch: () => dispatch(asyncFormFetch())
})

export default connect(null, mapStateToDispatch)(LocalContainer)
