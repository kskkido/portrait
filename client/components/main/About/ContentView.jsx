import React from 'react'
import { BodyContainer, Flex1, Title } from '../../shared/Styles'
import { createSpans, createTitle } from '../../shared/Utils'
import { Scramble } from '../../shared/Transition'
import Textline from '../Textline'

import Return from '../Return'
import Who from './Who'
import What from './What'
import Where from './Where'
import When from './When'

const list = [
  <Who key="one" />,
  <What  key="two" />,
  <Where key="three" />,
  <When key="four" />]

const AboutView = ({ navigationList, viewIndex, toggleBody }) => {
  if (!navigationList[viewIndex]) return <div />

  const title = navigationList[viewIndex]

  return (
      <BodyContainer >
        <Flex1>
          <Scramble key={title} in={true} appear={true} delay={0.2} text={`<${title}>`}>
            <Title id="title">
            {createSpans(title.length + 2)}
            </Title>
          </Scramble>
        </Flex1>
        {list[viewIndex]}
        <Flex1>
          <Title bottom>
            {createTitle(`</${title}>`)}
            <Textline />
          </Title>
        </Flex1>
        <Return
          text={'Back to About Index'}
          toggleBody={toggleBody}
        />
      </BodyContainer>
  )
}


// export default connect(({events: {viewIndex}}) => ({viewIndex}))(AboutView)
export default AboutView

