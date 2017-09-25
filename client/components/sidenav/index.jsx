import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { TimelineLite, Back, Power2 } from 'gsap'
import { pathChange, rotationRestart, viewRestart } from '../../reducers/events'
import { media, SIDENAV_WIDTH } from '../shared/Styles'
import { UncollapseList } from '../shared/Transition'
import { viewData } from '../shared/Data'

import SubList from './SubList'
import Button from './Button'
// Collapsible button that extends into a navigation, or moves to a new navigation page

const Container = styled.div`
  min-width: ${SIDENAV_WIDTH};
  height: 100vh;
  position: fixed;
  left: 0;
  z-index: 100;
  transform: translateX(-2000px);
  ${media.phone`width: 100%`};
`

const Overlay = styled.div`
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 99;
  background-color: #D3D3D3;
  opacity: 0.2;
  box-shadow: 4px 4px 1px 0 rgba(0,0,0,0.14);
`

const List = styled.ul`
  height: 80%;
  width: 93%;
  position: absolute;
  list-style: none;
  left: 6%;
  top: 80px;
  padding: 0;
  z-index: 100;
  overflow-y: scroll;
  overflow-x: hidden;
  ${media.phone`left: 0%`};
`

const ListRow = styled.li`
  width: 88%;
  color: #F3F2F2;
  margin-left: 35px;
  margin-bottom: 10px;
  ${media.phone`height: 17%`};
`

const ListLink = styled(Link)`
  display: block;
  height: 90px;
  text-decoration: none;
  color: inherit;
  ${media.phone`height: 100%`};
`

const LinkBlock = styled.div.attrs({
  style: props => ({
    borderLeft: `6px solid ${props.themeColor}`
  })
})`
  height: inherit;
  position: relative;
`

const LinkBackground = styled.div.attrs({
  style: props => ({
    backgroundColor: props.themeColor
  })
})`
  height: 100%;
  width: 95%;
  position: absolute;
  left: 0;
  top: 0;
  content: '';
  box-size; inherit;
  z-index: -1;
  transform-origin: left;
  transform: scaleX(0);
  box-shadow: 4px 4px 2px 0 rgba(0,0,0,0.14)
`

// shadow... box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);

const ListTitle = styled.div`
  padding-top: 10px;
  padding-left: 1em;
  opacity: 0.6;
`

const ListText = styled.h3`
  margin: 0 0 8px 0;
  font-weight: normal;
  font-size: 0.9em;
  text-transform: uppercase;
`

const SideNav = ({ children, onClickSVG, inputMain }) => (
  <div>
    <Button onClick={onClickSVG} />
    <Container id="sidenav" innerRef={inputMain}>
      <List >
        {children}
      </List>
      <Overlay />
      </Container>
  </div>
)


class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }

  static enterAnimation(list) {
    return new TimelineLite({paused: true})
      .staggerFrom(list, 0.7, {
        autoAlpha: 0,
        rotationX: 40,
        rotationY: 40,
        marginTop: '-=50px',
        scale: 0,
        ease: Back.easeOut
      }, 0.12)
      .delay(0.2)
  }

  static createHoverAnimation({ childNodes: [background, text] }) {
    return new TimelineLite({paused: true})
        .to(background, 0.4, {
          scaleX: 1,
        })
        .to(text, 0.4, {
          paddingLeft: '3em',
          color: 'black',
          opacity: 1,
          ease: Back.easeOut,
        }, '-=0.4')
  }

  // static createSVGCLickAnimation(sidenav) {
  //   console.log(window.getComputedStyle(sidenav).width)
  //   return new TimelineLite({paused: true})
  //     .to(sidenav, 0.4, {
  //       x: `+=${window.getComputedStyle(sidenav).width}`,
  //     })
  //     .to(document.getElementById('bodyContainer'), 0.3, {
  //       x: `+=${window.getComputedStyle(sidenav).width}`,
  //     }, '-=0.4')
  // }

  static createSVGHoverAnimation(target) {
    return new TimelineLite({paused: true})
      .to(target, 0.4, {
        scale: 1.2,
        rotation: 90,
        ease: Back.easeOut
      })
  }

  newClickSvg(toggle) {
    const body = document.getElementById('bodyContainer')
        , width = window.getComputedStyle(this.container).width

    return !toggle ?

      new TimelineLite()
      .to(this.container, 0.4, {
        x: `0px`,
        ease: Power2.easeOut,
      })
      .to(body, 0.3, {
        marginLeft: `+=${width === SIDENAV_WIDTH ? width : '900px'}`,
      }, '-=0.4') :

      new TimelineLite()
      .to(this.container, 0.6, {
        x: `-2000px`,
        ease: Power2.easeIn,
      })
      .to(body, 0.4, {
        marginLeft: `0px`,
      }, '-=0.42')
  }

  componentWillMount() {
    this.listRows = []
  }

  componentDidMount() {
    this.enterAnimation = LocalContainer.enterAnimation(this.listRows)
    // this.svgClickAnimation = LocalContainer.createSVGCLickAnimation(this.container)
    this.hoverAnimations = this.listRows.map(LocalContainer.createHoverAnimation)
    this.hoverAnimations[this.props.pathIndex || 0].play()
  }

  shouldComponentUpdate({ pathIndex }) {
    return this.props.pathIndex !== pathIndex
  }

  componentWillUpdate() {
    this.hoverAnimations[this.props.pathIndex].reverse()
  }

  componentDidUpdate() {
    this.hoverAnimations[this.props.pathIndex].play()
  }

  createListItem ({ text, path, children, backgroundColor }, index) {
    const isActive = index === this.props.pathIndex

    return (
        <ListRow
          key={text[0]}
          onMouseOver={this.handleOnHover(index)}
          onMouseOut={this.handleOnHoverOff(index)}
        >
          <ListLink
            to={{pathname: path, state: {isBody: false}}}
            onClick={this.handleClick(index)}
          >
            <LinkBlock
              innerRef={div => this.listRows.push(div)}
              themeColor={backgroundColor[0]}
            >
              <LinkBackground themeColor={backgroundColor[0]} />
              <ListTitle>{text.map(el => <ListText key={el}>{el}</ListText>)}</ListTitle>
            </LinkBlock>
          </ListLink>
          {children.length > 0 &&
            <UncollapseList
              key={text[0]}
              in={isActive}
              timeout={600}
              mountOnEnter={true}
              unmountOnExit={true}
            >
              <SubList
                textList={children}
                colors={backgroundColor}
                path={path}
              />
            </UncollapseList>
          }
        </ListRow>
    )
  }

  createList (data) {
    return Object.keys(data).map((row, index) => this.createListItem(data[row], index))
  }

  callEnterAnimation() {
    this.enterAnimation.restart()
  }

  handleClick(index) {
    return () => this.props.pathChange(index)
  }

  handleOnHover(index) {
    if (index === this.props.pathIndex) return
    return () => this.hoverAnimations[index].play()
  }

  handleOnHoverOff(index) {
    if (index === this.props.pathIndex) return
    return () => this.hoverAnimations[index].reverse()
  }

  handleOnClickSVG(toggle) {
    this.newClickSvg(toggle)
    !toggle && this.enterAnimation.restart()
    // return (!toggle ? (this.svgClickAnimation.play(), this.enterAnimation.restart()) : this.svgClickAnimation.reverse())
  }


  render() {

    return (
      <SideNav
        visible={this.state.toggle}
        onClickSVG={this.handleOnClickSVG.bind(this)}
        inputMain={div => this.container = div}
      >
        {this.createList(viewData)}
      </SideNav>
    )
  }
}

const mapStateToProps = ({ events }) => ({
  pathIndex: events.pathIndex,
})

const mapDispatchToProps = (dispatch) => ({
  pathChange: (index) => dispatch(pathChange(index)),
  rotationRestart: () => dispatch(rotationRestart()),
  viewRestart: () => dispatch(viewRestart()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LocalContainer))

