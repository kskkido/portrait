import React from 'react'
import { CSSTransition } from 'react-transition-group'

export const FadeTransition = (props) => (
  <CSSTransition
    {...props}
    classNames="fade"
    timeout={{ enter: 300 }}
    exit={false}
  />
)
