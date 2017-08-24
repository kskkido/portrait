import React from 'react'
import { connect } from 'react-redux'

import { BodyContainer, Flex1, Title } from '../../Shared/Styles'
import { createSpans, createTitle } from '../../Shared/Utils'
import { Scramble } from '../../Shared/Transition'

import AboutView1 from './AboutView1'
import AboutView2 from './AboutView2'
import AboutView3 from './AboutView3'
import AboutView4 from './AboutView4'

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
  <AboutView1 key="one" />,
  <AboutView2  key="two"/>,
  <AboutView3 key="three" />,
   <AboutView4 key="four" />]

const AboutView = ({ navigationList, viewIndex}) => {
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
        <Title>
          {createTitle(`</${title}>`)}
        </Title>
      </Flex1>
    </BodyContainer>
  )
}


// export default connect(({events: {viewIndex}}) => ({viewIndex}))(AboutView)
export default AboutView

