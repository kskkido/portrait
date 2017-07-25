import React from 'react'

import { BodyContainer, BodyText, Flex1, BodyContent, Title } from '../../Shared/Styles'
import HomeText from './content'


const HomeView = ({ language }) => (
  <BodyContainer>
    <Flex1>
      <Title>
       {'< Why >'}
      </Title>
    </Flex1>
    <BodyContent>
      <BodyText>
      <p>
        I've studied Music Business in Berklee College of Music for my undergrad and spent half of my post work in the Music Industry in New York. The experience was fruitful, but the work was missing something. That something, I realized was creativity. Being a musician at heart I always loved building and expressing in new ways. It used to be music, but now my instrument of expression is coding. There is so much to learn in between where I currently stand and greatness, but I enjoy every step of this journey.
      </p>
      </BodyText>
    </BodyContent>
  </BodyContainer>
)

export default HomeView
