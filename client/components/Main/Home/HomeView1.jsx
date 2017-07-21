import React from 'react'

import { BodyContent, Flex1, Flex5, Title } from '../Shared/Styles'
import HomeText from './content'


const HomeView = ({ currentView, language }) => (
  <BodyContent>
    <Flex1>
      <Title>
        {currentView}
      </Title>
    </Flex1>
    <Flex5>
      <h4>
        Welcome
      </h4>
    </Flex5>
  </BodyContent>
)

export default HomeView
