import React from 'react'

import { BodyContainer, BodyContent, BodyText, Flex1, Flex5, Title } from '../../Shared/Styles'
import HomeText from './content'


const HomeView = ({ language }) => (
  <BodyContainer>
    <Flex1>
      <Title>
        {'< What >'}
      </Title>
    </Flex1>
    <BodyContent>
      <BodyText>
      <p>
        My strength lies in fullstack Javascript web development using the NERP Stack.
        --> Might be cool to do an animation explaining NERP
      </p>
      </BodyText>
    </BodyContent>
  </BodyContainer>
)

export default HomeView
