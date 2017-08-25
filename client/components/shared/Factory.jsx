import React, { Component } from 'react'
import styled from 'styled-components'

export const createSVG = function(SVG, Container, hoverAnimation = () => ({play: () => {}, reverse: () => {}}), hoverOffAnimation = () => {}) {

    const ContainerComponent = Container ? Container : styled.div`
      position: absolute;
      width: 100%;
      height: 120px;
      top: 100px;
    `

  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        active: false
      }
    }

    componentDidMount() {
      this.svgHoverAnimation = hoverAnimation(this.svg, this.container)
      this.onClickCallback = this.onClickWrapper(this.props.onClick, this.svg, this.container)
    }

    onClickWrapper(fn = () => {}, target, container) {
      return () => (fn(this.state.active, target, container), this.setState({active: !this.state.active}))
    }

    onClickHandler() {
      return this.onClickCallback()
    }

    onHoverHandler(e) {
      return (this.svgHoverAnimation && this.svgHoverAnimation.play()) || hoverAnimation(e)
    }

    onHoverOffHandler(e) {
      return (this.svgHoverAnimation && this.svgHoverAnimation.reverse()) || hoverOffAnimation(e)
    }

    render() {

      return (
        <ContainerComponent
          innerRef={div => this.container = div}
          onMouseOver={this.onHoverHandler.bind(this)}
          onMouseOut={this.onHoverOffHandler.bind(this)}
          onClick={this.onClickHandler.bind(this)}
        >
          <SVG
            scale={this.props.scale || 0.1}
            innerRef={div => this.svg = div}
          />
        </ContainerComponent>
      )
    }
  }
}
