import React from 'react'
import styled from 'styled-components'

import { BodyContent } from '../../Shared/Styles'

const HomeText = require('../Styles')('Home')

const Title = styled.h1`

`

const HomeView = ({ language }) => (
  <BodyContent>
    <Title>{HomeText.Title[language]}</Title>
  </BodyContent>
)

export default HomeView
