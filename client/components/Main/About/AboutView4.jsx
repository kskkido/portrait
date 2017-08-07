import React from 'react'

import { BodyContainer, BodyText, Flex1, BodyContent, Title } from '../../Shared/Styles'
import HomeText from './content'


const HomeView = ({ language }) => (
  <BodyContainer>
    <Flex1>
      <Title>
       {'< When >'}
      </Title>
    </Flex1>
    <BodyContent>
      <BodyText>
      <p>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non ornare quam. Morbi condimentum convallis euismod. Mauris nec porttitor elit. Suspendisse mi lectus, ullamcorper id sagittis tristique, hendrerit at dolor. Curabitur sed enim tellus. Nulla eu mattis ipsum. Duis auctor eleifend purus eu fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
      </p>
      </BodyText>
    </BodyContent>
  </BodyContainer>
)

export default HomeView
