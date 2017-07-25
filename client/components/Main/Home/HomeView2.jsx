import React from 'react'

import { BodyContainer, BodyText, Flex1, Flex5, Title } from '../../Shared/Styles'
import HomeText from './content'


const HomeView = ({ language }) => (
  <BodyContainer>
    <Flex1>
      <Title>
        Who
      </Title>
    </Flex1>
    <Flex5>
      <BodyText>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac mi ac mi tempus ornare. In hac habitasse platea dictumst. Pellentesque dui est, vulputate vel ex ut, maximus aliquet dolor. Nunc a venenatis quam, vitae aliquam elit. Proin non lacus vel mi vestibulum fermentum. Suspendisse luctus hendrerit dolor. Aenean sagittis eleifend mauris sagittis tristique. Nullam mi ex, aliquet tristique dolor ac, mattis bibendum massa. Pellentesque eget finibus mi, quis scelerisque est. Nullam luctus augue non ligula venenatis fringilla. Fusce viverra lorem id vehicula facilisis. Donec aliquam varius viverra.

Aliquam mauris nunc, posuere vitae sollicitudin at, eleifend pharetra nunc. Donec egestas, eros varius cursus feugiat, leo dolor dapibus ipsum, suscipit rhoncus felis diam in metus. Ut id scelerisque nisl. Donec ultrices sem vel est vehicula, eget maximus tortor tincidunt. Nulla eleifend mi convallis dui vulputate, nec faucibus ex bibendum. Nulla convallis leo eu elementum fringilla. Maecenas viverra facilisis purus id semper. Curabitur tempus, libero non pellentesque dignissim, massa nibh tristique turpis, at fringilla orci ex vel tellus. Aenean ultricies risus quam, quis pharetra tortor pretium nec.
      </p>
      </BodyText>
    </Flex5>
  </BodyContainer>
)

export default HomeView
