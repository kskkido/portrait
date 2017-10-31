import React from 'react'
import { BodyContainer, Flex1, Title } from '../../shared/Styles'
import { createSpans, createTitle } from '../../shared/Utils'
import { Scramble } from '../../shared/Transition'

import Return from '../shared/Return'
import Textline from '../shared/Textline'
import Body from './Body'

const AboutView = ({ navigationList, viewIndex, toggleBody }) => {
  if (!navigationList[viewIndex]) return <div />

  const title = navigationList[viewIndex]

  return (
      <BodyContainer >
        <Flex1>
          <Scramble key={title} in={true} tail="tail" appear={true} delay={0.2} text={`<${title}>`} tailText={`</${title}>`} >
            <Title id="title">
            {createSpans(title.length + 2)}
            </Title>
          </Scramble>
        </Flex1>
        <Body viewIndex={viewIndex} />
        <Flex1>
          <Title id="tail">
            {createSpans(title.length + 3)}<Textline delay={0.8} />
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

