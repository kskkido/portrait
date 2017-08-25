import React from 'react'
import { connect } from 'react-redux'

import Textline from '../Textline'
import { BodyContainer, Flex1, Title } from '../../shared/Styles'
import { createSpans, createTitle } from '../../shared/Utils'
import { Scramble } from '../../shared/Transition'

import Who from './Who'
import What from './What'
import Where from './Where'
import When from './When'
// const renderCurrentView = (viewIndex, language) => {
//   if (viewIndex === 0) {
//     return <AboutView1 key="one" language={language} />
//   } else if (viewIndex === 1) {
//     return <AboutView2 key="two" language={language} />
//   } else if (viewIndex === 2) {
//     return <AboutView3 key="three" language={language} />
//   } else if (viewIndex === 3) {
//     return <AboutView4 key="four" language={language} />
//   } else {
//     return <AboutView1 key="one" language={language} />
//   }
// }

const list = [
  <Who key="one" />,
  <What  key="two" />,
  <Where key="three" />,
  <When key="four" />]

const AboutView = ({ navigationList, viewIndex }) => {
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
      </BodyContainer>
  )
}


// export default connect(({events: {viewIndex}}) => ({viewIndex}))(AboutView)
export default AboutView

