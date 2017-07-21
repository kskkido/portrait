import React from 'react'

import { BodyContent, Flex1, Flex5, Title } from '../Shared/Styles'
import { Line } from '../Shared/SVG'
import HomeText from './content'


const HomeView = ({ currentView, language }) => (
  <BodyContent>
    <Flex1>
      <Title>
        {currentView}
      </Title>
    </Flex1>
    <Flex5>
      <p>
        BODY TEXT
      </p>
    </Flex5>
  </BodyContent>
)

export default HomeView
