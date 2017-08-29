import React, { Component } from 'react'
import styled from 'styled-components'

export const createSVG = function(SVG, Container, createHoverAnimation) {

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
      this.svgHoverAnimation = createHoverAnimation && createHoverAnimation(this.svg, this.container) || this.props.hoverAnimation(this.svg, this.container)
      this.onClickTransform = this.props.onClickTransform && this.props.onClickTransform(this.svg)
      this.onClickCallback = this.onClickWrapper(this.props.onClick, this.svg, this.container)
    }

    onClickWrapper(fn = () => {}, svg, container) {
      return () => (fn(this.state.active, svg, container), this.setState(({ active }) => {
        this.onClickTransform && (active ? this.onClickTransform.reverse() : this.onClickTransform.play())
        return {active: !active}
      }))
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
          pointUp={this.props.pointUp}
          clearTop={this.props.clearTop}
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
