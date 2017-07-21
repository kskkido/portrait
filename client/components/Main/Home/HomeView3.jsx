import React from 'react'

import { BodyContent, BodyTitle } from '../Shared/Styles'
import HomeText from './content'


const HomeView = ({ currentView, language }) => (
  <BodyContent>
    <BodyTitle>{currentView}</BodyTitle>
  </BodyContent>
)

export default HomeView