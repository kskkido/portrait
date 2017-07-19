import React from 'react'

import { BodyContent, BodyTitle } from '../Shared/Styles'
import HomeText from './content'


const HomeView = ({ language }) => (
  <BodyContent>
    <BodyTitle>{HomeText[language].TITLE}</BodyTitle>
  </BodyContent>
)

export default HomeView
