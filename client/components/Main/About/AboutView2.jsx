import React from 'react'

import { BodyContainer, BodyContent, BodyText, Flex1, TitleDiv, createTitle } from '../../Shared/Styles'
import HomeText from './content'


const HomeView = ({ language }) => (
  <BodyContainer>
    <Flex1>
      <TitleDiv id="title">
        {createTitle('< What >')}
      </TitleDiv>
    </Flex1>
    <BodyContent>
      <BodyText>
      <p>
        Integer vel pharetra dui. Curabitur tincidunt elit nec diam posuere, eu feugiat sapien egestas. Ut ac lacinia dui, et mollis urna. Nullam interdum lacinia auctor. Ut nec dui in nisl condimentum tincidunt sit amet nec purus. Integer in justo vitae nunc mattis sagittis nec eu erat. Integer in sagittis lorem. Aenean aliquet, urna sed dignissim scelerisque, dui justo placerat erat, quis hendrerit felis magna non arcu. Nulla tellus orci, condimentum at tempus ut, faucibus non enim. Etiam ultrices purus et augue porttitor volutpat.
        --> Might be cool to do an animation explaining NERP
      </p>
      </BodyText>
    </BodyContent>
  </BodyContainer>
)

export default HomeView
