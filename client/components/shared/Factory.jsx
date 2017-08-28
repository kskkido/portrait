import React, { Component } from 'react'
import styled from 'styled-components'

export const createSVG = function(SVG, Container) {

    const ContainerComponent = ((styledContainer) => styledContainer.extend`
        top: ${props => props.clearTop && '50%'};
      `
    )(Container ? Container : styled.div`
      position: absolute;
      width: 100%;
      height: 120px;
      top: 100px;
    `)

  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        active: false
      }
    }

    componentDidMount() {
      this.svgHoverAnimation = this.props.hoverAnimation && this.props.hoverAnimation(this.svg, this.container)
      this.onClickCallback = this.onClickWrapper(this.props.onClick, this.svg, this.container)
    }

    onClickWrapper(fn = () => {}, target, container) {
      return () => (fn(this.state.active, target, container), this.setState({active: !this.state.active}))
    }

    onClickHandler() {
      return this.onClickCallback()
    }

    onHoverHandler(e) {
      return (this.svgHoverAnimation && this.svgHoverAnimation.play())
    }

    onHoverOffHandler(e) {
      return (this.svgHoverAnimation && this.svgHoverAnimation.reverse())
    }

    render() {

      return (
        <ContainerComponent
          clearTop={this.props.clearTop}
          innerRef={div => this.container = div}
          onMouseOver={this.onHoverHandler.bind(this)}
          onMouseOut={this.onHoverOffHandler.bind(this)}
          onClick={this.onClickHandler.bind(this)}
        >
          <SVG
            scale={this.props.scale || 0.1}
            innerRef={div => this.svg = div}
            pointUp={this.props.pointUp}
          />
        </ContainerComponent>
      )
    }
  }
}
