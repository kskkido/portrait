import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { TimelineLite, Back } from 'gsap'
import SubList from './SubList'
import { viewData } from '../Shared/Data'
import { UncollapseList } from '../Shared/Transition'
import Button from './Button'
import { pathChange, rotationRestart, viewRestart } from '../../reducers/events'
// Collapsible button that extends into a navigation, or moves to a new navigation page

const Container = styled.div`
  min-width: 325px;
  position: fixed;
  left: 0;
  z-index: 100;
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
  width: 265px;
  position: absolute;
  list-style: none;
  left: 60px;
  top: 80px;
  padding: 0;
  z-index: 100;
`

const ListRow = styled.li`
  width: 100%;
  color: #F3F2F2;
`

const ListLink = styled(Link)`
  display: block;
  height: 100px;
  text-decoration: none;
  color: inherit;
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

const ListText = styled.h3`
  top: 0;
  bottom: 0;
  padding-left: 1em;
  padding-top: 10px;
  font-weight: normal;
  font-size: 0.95em;
  text-transform: uppercase;
  opacity: 0.6;
`

const listData = {
  row1: {
    text: ['Keisuke Kido', 'Developer'],
    path: '/',
    color: '#e8e5e6',
    subTextList: []
  },
  row2: {
    text: ['About'],
    path: '/about',
    color: '#65AFFF',
    subTextList: viewData.about.navigationList,
    colors: viewData.about.backgroundColor
  },
  row3: {
    text: ['Projects'],
    path: '/projects',
    color: viewData.projects,
    subTextList: viewData.projects.navigationList,
    colors: viewData.projects.backgroundColor
  },
  row4: {
    text: ['Contact'],
    path: '/contact',
    color: '#c1839f',
    subTextList: [],
  }
}

const SideNav = ({ children, onClickSVG, inputMain, inputSVG, onClick, mouseOut, mouseOver }) => (
  <Container >
    <Button onClick={onClickSVG} />
    <div id="sideNav" ref={inputMain} style={{height: '100%'}}>
      <List >
        {children}
      </List>
        <Overlay />
      </div>
  </Container>
)


class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }

  static enterAnimation(list) {
    return new TimelineLite()
      .staggerFrom(list, 0.6, {
        autoAlpha: 0,
        rotationX: 40,
        rotationY: 40,
        marginTop: '-=50px',
        scale: 0,
        ease: Back.easeOut
      }, 0.1)
      .delay(0.15)
  }

  static createHoverAnimation({ childNodes: [background, ...text] }) {
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

  static createSVGCLickAnimation(sidenav) {
    return new TimelineLite({paused: true})
      .to(sidenav, 0.4, {
        x: '-=100%',
        ease: Back.easeOut,
      })
      .to(document.getElementById('bodyContainer'), 0.4, {
        marginLeft: '-=325px',
        ease: Back.easeOut,
      }, '-=0.4')
  }

  static createSVGHoverAnimation(target) {
    return new TimelineLite({paused: true})
      .to(target, 0.4, {
        scale: 1.2,
        rotation: 90,
        ease: Back.easeOut
      })
  }

  componentWillMount() {
    this.listRows = []
  }

  componentDidMount() {
    this.enterAnimation = LocalContainer.enterAnimation(this.listRows)
    this.svgClickAnimation = LocalContainer.createSVGCLickAnimation(this.container)
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
            onClick={ this.handleClick(index) }
          >
            <LinkBlock
              innerRef={div => this.listRows.push(div)}
              themeColor={backgroundColor[0]}
            >
              <LinkBackground themeColor={backgroundColor[0]} />
              {text.map(el => <ListText key={el}>{el}</ListText>)}
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
      return (toggle ? (this.svgClickAnimation.reverse(), setTimeout((tl) => tl.restart(), 200, this.enterAnimation)) : this.svgClickAnimation.play())
  }

  render() {
    return (
      <SideNav
        onClickSVG={this.handleOnClickSVG.bind(this)}
        inputMain={div => this.container = div}
      >
        {this.createList(viewData)}
      </SideNav>
    )
  }
}

const mapStateToProps = ({ events }) => ({pathIndex: events.pathIndex})

const mapDispatchToProps = (dispatch) => ({
  pathChange: (index) => dispatch(pathChange(index)),
  rotationRestart: () => dispatch(rotationRestart()),
  viewRestart: () => dispatch(viewRestart()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LocalContainer))

