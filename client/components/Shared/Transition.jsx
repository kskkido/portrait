import React from 'react'
import { CSSTransition } from 'react-transition-group'

export const FadeTransition = (props) => (
  <CSSTransition
    {...props}
    classNames="fade"
    timeout={{ enter: 500 }}
  />
)

const slideDirection = {
  right: {classNames: 'rt', timeout: 700},
  left: {classNames: 'lf', timeout: 700},
  up: {classNames: 'up', timeout: 1200}
}

export const SlideTransition = (props) => (
  <CSSTransition
    {...props}
    classNames="right"
    timeout={{ enter: 300 }}
    {...slideDirection[props.direction]}
  />
)
