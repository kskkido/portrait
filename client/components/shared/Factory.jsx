import React, { Component } from 'react'
import styled from 'styled-components'
import { media } from './Styles'

export const createSVG = function(SVG, Container, createHoverAnimation) {

    const ContainerComponent = ((styledContainer) => styledContainer.extend`
        top: ${props => props.clearTop && '50%'};
        ${({ mediaQuery }) =>
          mediaQuery && media[mediaQuery.device]`${mediaQuery.style}`}
        ;
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
      console.log(this.props.mediaQuery, 'OMGS')
      return (
        <ContainerComponent
          clearTop={this.props.clearTop}
          pointUp={this.props.pointUp}
          mediaQuery={this.props.mediaQuery}
          onClick={this.onClickHandler.bind(this)}
          onMouseOver={this.onHoverHandler.bind(this)}
          onMouseOut={this.onHoverOffHandler.bind(this)}
          innerRef={div => this.container = div}
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
