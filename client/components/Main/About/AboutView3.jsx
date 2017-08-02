import React from 'react'

import { BodyContainer, BodyText, Flex1, BodyContent, Title } from '../../Shared/Styles'
import HomeText from './content'


const HomeView = ({ language }) => (
  <BodyContainer >
    <Flex1>
      <Title>
        {'< Where >'}
      </Title>
    </Flex1>
    <BodyContent>
      <BodyText>
      <p>
        {`I've spent a total of five years in the states for four years of college and a year of postwork on OPT. Currently I am based in Tokyo, Japan. Contact me -->LINK TO CONTACTS<--`}
      </p>
      </BodyText>
    </BodyContent>
  </BodyContainer>
)

export default HomeView
