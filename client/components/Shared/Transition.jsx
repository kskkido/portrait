import React from 'react'
import { CSSTransition } from 'react-transition-group'

const onEnterFadeAnimation = {
  // define custom animations for different pathnames
}

export const FadeTransition = (props) => (
  <CSSTransition
    {...props}
    classNames="fade"
    timeout={{ enter: 500 }}
    {...onEnterFadeAnimation[props.pathname]}
  />
)

const slideDirection = {
  right: {classNames: 'rt', timeout: 700},
  left: {classNames: 'lf', timeout: 700},
  up: {classNames: 'up', timeout: 2000}
}

export const SlideTransition = (props) => (
  <CSSTransition
    {...props}
    classNames="right"
    timeout={{ enter: 300 }}
    {...slideDirection[props.direction]}
  />
)
