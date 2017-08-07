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
        Phasellus laoreet ex libero, sit amet molestie elit venenatis eu. Nulla laoreet nisi justo, a aliquam dolor tempus in. Nulla in dolor ullamcorper, vehicula dui et, gravida elit. Etiam rutrum odio nec sagittis porta. Duis quis nisl tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec a tincidunt lorem. Integer lectus libero, pretium at orci quis, venenatis tempor odio. Nullam venenatis mattis tempus.

Aenean vel tellus ac velit eleifend efficitur ac eu massa. Curabitur malesuada arcu tincidunt augue ornare porta. Aenean iaculis nisi in congue pharetra. Nullam in auctor dui. Praesent sodales elit lacus, a accumsan risus lobortis non. Aliquam et facilisis tellus. Ut vel turpis in eros imperdiet venenatis. Ut pharetra ipsum id risus varius ullamcorper. Donec iaculis id ipsum eget varius. Etiam fermentum tempor viverra. Proin at lectus rhoncus, condimentum metus eu, volutpat dolor. Etiam sit amet metus ac lectus fermentum gravida. Vivamus nec bibendum nisi. Etiam tempus venenatis pharetra.
      </p>
      </BodyText>
    </BodyContent>
  </BodyContainer>
)

export default HomeView
