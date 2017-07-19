import React, { Component } from 'react'
import styled from 'styled-components'

import LanguageQuery from './Language'

const preloadDiv = styled.div`
  flex: 1;
`

const Preload = () => (
  <preloadDiv>
    <LanguageQuery />
  </preloadDiv>
)

export default Preload
