import React from 'react'

import { BodyContainer, BodyText, Flex1, Flex5, Title } from '../../Shared/Styles'
import HomeText from './content'


const HomeView = ({ language }) => (
  <BodyContainer>
    <Flex1>
      <Title>
        What
      </Title>
    </Flex1>
    <Flex5>
      <BodyText>
      <p>
Aliquam mauris nunc, posuere vitae sollicitudin at, eleifend pharetra nunc. Donec egestas, eros varius cursus feugiat, leo dolor dapibus ipsum, suscipit rhoncus felis diam in metus. Ut id scelerisque nisl. Donec ultrices sem vel est vehicula, eget maximus tortor tincidunt. Nulla eleifend mi convallis dui vulputate, nec faucibus ex bibendum. Nulla convallis leo eu elementum fringilla. Maecenas viverra facilisis purus id semper. Curabitur tempus, libero non pellentesque dignissim, massa nibh tristique turpis, at fringilla orci ex vel tellus. Aenean ultricies risus quam, quis pharetra tortor pretium nec.
      </p>
      </BodyText>
    </Flex5>
  </BodyContainer>
)

export default HomeView
