import React from 'react'

import { BodyContainer, BodyContent, BodyText, Flex1, Flex5, Title } from '../../Shared/Styles'
import HomeText from './content'


const HomeView = () => (
  <BodyContainer>
    <Flex1>
      <Title>
       {'< Who >'}
      </Title>
    </Flex1>
    <BodyContent>
      <BodyText full>
      <p>
        Hello visitor! My name is Keisuke Kido, an independent software developer born and raised in Japan.
      </p>
      </BodyText>
    </BodyContent>
  </BodyContainer>
)

export default HomeView
