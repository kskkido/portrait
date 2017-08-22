// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
// import styled from 'styled-components'
// import { TimelineLite, TweenLite, Back } from 'gsap'
// import Draggable from 'gsap/Draggable'
// import { Arrow } from './Assets'
// import { pathChange } from '../../reducers/events'
// import { withRouter } from 'react-router-dom'

// const Container = styled.div`
//   position: absolute;
//   width: inherit;
//   height: 120px;
//   top: 100px;
// `
// const SVGContainer = styled.div`
//   position: absolute;
//   left: 50%;
//   transform: translateX(-50%);
//   top: 0;
// `

// const Hitbox = styled.div`
//   position: absolute;
//   width: inherit;
//   bottom: 1px;
//   height: 1px;
//   border: 2px solid;
// `

// class LocalContainer extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       active: false
//     }

//     this.onClickWrapper = this.onClickWrapper.bind(this)
//   }

//   static createDraggable(target, container, onDragCb) {
//     Draggable.create(target, {
//       type: 'y',
//       bounds: container,
//       onDrag: onDragCb,
//       onDragEnd: LocalContainer.onDragEndCallback,
//       onDragEndParams: [target]
//     })
//   }

//   static onDragEndCallback(target) {
//     return TweenLite
//       .to(target, 0.3, {
//         y: 0,
//         ease: Back.easeOut
//     })
//   }

//   static createSVGHoverAnimation(target) {
//     return new TimelineLite({paused: true})
//       .to(target, 0.4, {
//         rotationY: 180,
//         ease: Back.easeOut
//       })
//   }

//   static onDragCallback(callback, hitBox) {
//     return function () {
//       console.log(hitBox, 'hittthing')
//       if (this.hitTest(hitBox)) {
//         callback()
//       }
//     }
//   }

//   switchRoutes() {
//     this.props.callback && this.props.callback(this.props.path)
//     this.props.history.push(this.props.path)
//   }

//   componentDidMount() {
//     LocalContainer.createDraggable(this.svg, this.container, LocalContainer.onDragCallback(this.switchRoutes.bind(this), this.hitBox))
//     this.svgHoverAnimation = LocalContainer.createSVGHoverAnimation(this.svg)
//   }

//   onClickWrapper(fn) {
//     return (fn(this.state.active), this.setState({active: !this.state.active}))
//   }

//   onHoverHandler() {
//     return this.svgHoverAnimation.play()
//   }

//   onHoverOffHandler() {
//     return this.svgHoverAnimation.reverse()
//   }

//   render() {

//     return (
//       <Container
//         innerRef={div => this.container = div}
//         onMouseOver={this.onHoverHandler.bind(this)}
//         onMouseOut={this.onHoverOffHandler.bind(this)}
//       >
//         <SVGContainer
//           innerRef={div =>this.svg = div}
//         >
//           <Arrow
//             scale={0.15}
//           />
//         </SVGContainer>
//         <Hitbox
//           innerRef={div => this.hitBox = div}
//         />
//       </Container>
//     )
//   }
// }

// const mapDispatchToProps= (dispatch) => ({
//   pathChange: (index) => dispatch(pathChange(index))
// })

// export default withRouter(connect(null, mapDispatchToProps)(LocalContainer))

/* ===== NON HOC ====== */

// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
// import styled from 'styled-components'
// import { TimelineLite, TweenLite, Back } from 'gsap'
// import Draggable from 'gsap/Draggable'
// import { Arrow } from './Assets'
// import { pathChange } from '../../reducers/events'
// import { withRouter } from 'react-router-dom'

// const Container = styled.div`
//   position: absolute;
//   top: 100px;
//   width: 100%;
//   left: 50%;
//   transform: translateX(-50%);
// `

// class LocalContainer extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       active: false
//     }

//     this.onClickWrapper = this.onClickWrapper.bind(this)
//   }

//   static createSVGHoverAnimation(target) {
//     return new TimelineLite({paused: true})
//       .to(target, 0.4, {
//         y: '+=20px',
//         scaleY: 1.5,
//         rotationY: 180,
//         ease: Back.easeOut
//       })
//   }

//   componentDidMount() {
//     this.svgHoverAnimation = LocalContainer.createSVGHoverAnimation(this.svg)
//   }

//   onClickWrapper(fn) {
//     return (fn(this.state.active), this.setState({active: !this.state.active}))
//   }

//   onHoverHandler() {
//     return this.svgHoverAnimation.play()
//   }

//   onHoverOffHandler() {
//     return this.svgHoverAnimation.reverse()
//   }

//   render() {

//     return (
//       <Link
//         to={this.props.path}
//       >
//         <Container
//           innerRef={div => this.container = div}
//           onMouseOver={this.onHoverHandler.bind(this)}
//           onMouseOut={this.onHoverOffHandler.bind(this)}
//         >
//             <Arrow
//               scale={0.15}
//               innerRef={div => this.svg = div}
//             />

//         </Container>
//       </Link>
//     )
//   }
// }

// const mapDispatchToProps= (dispatch) => ({
//   pathChange: (index) => dispatch(pathChange(index))
// })

// export default withRouter(connect(null, mapDispatchToProps)(LocalContainer))
