import React from 'react'

import { BodyContent, BodyText, Flex1, Flex5, Title } from '../../Shared/Styles'
import HomeText from './content'


const HomeView = ({ language }) => (
  <BodyContent>
    <Flex1>
      <Title>
        Home
      </Title>
    </Flex1>
    <Flex5>
      <BodyText>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac mi ac mi tempus ornare. In hac habitasse platea dictumst. Pellentesque dui est, vulputate vel ex ut, maximus aliquet dolor. Nunc a venenatis quam, vitae aliquam elit. Proin non lacus vel mi vestibulum fermentum. Suspendisse luctus hendrerit dolor. Aenean sagittis eleifend mauris sagittis tristique. Nullam mi ex, aliquet tristique dolor ac, mattis bibendum massa. Pellentesque eget finibus mi, quis scelerisque est. Nullam luctus augue non ligula venenatis fringilla. Fusce viverra lorem id vehicula facilisis. Donec aliquam varius viverra.

        Maecenas pretium egestas arcu, vitae tincidunt metus tempus quis. Phasellus viverra nisl at convallis ultrices. Phasellus et tellus iaculis, pulvinar urna sit amet, tempor velit. Phasellus finibus luctus vehicula. Phasellus aliquam consectetur ante. Pellentesque at urna lacinia, semper libero non, posuere ante. Morbi feugiat blandit justo sit amet placerat. Nunc ut viverra felis, vitae pretium sapien. Mauris eget vestibulum nisl. Nunc quis augue bibendum, sagittis sapien sit amet, vehicula mauris. Nullam vehicula aliquam purus, a sollicitudin arcu rutrum et. Aliquam sit amet sollicitudin ligula, eget sodales justo. Praesent a ante vel nulla malesuada pulvinar in eget est.
      </p>
      </BodyText>
    </Flex5>
  </BodyContent>
)

export default HomeView
