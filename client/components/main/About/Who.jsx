import React from 'react'
import styled from 'styled-components'
import { BodyContent, BodyText } from '../../shared/Styles'

const ResumeContainer = styled.span`
position: relative;
&::before {
  position: absolute;
  left: 0;
  content: '';
  background-color: black;
  width: 0;
  height: 1.1em;
  opacity: 0.1;
  transition: width 0.3s;
  z-index: -1;
}
&:hover::before {
  width: 100%;
}
`

const Resume = styled.a`
color: #CFD8DC;
transition: color 0.3s;
&:hover {
  color: #EEEEEE;
}
`

const Content = () => (
    <BodyContent>
      <BodyText>
      <p>
        Hi there, my name is Keisuke Kido. I used to pursue a career in the music industry, but now I am a fullstack web developer who recently graduated Fullstack Academy of Code in New York 2017 May. I'm still new to the field, but so far I'm loving every step of the process. I currently live in Tokyo, Japan, so if you happen to be in town and love programming, lets get in touch! Also, here's
        <ResumeContainer>
          <Resume target="_self" href="resume"> my resume </Resume>
        </ResumeContainer>
        for your interest.
      </p>
      </BodyText>
    </BodyContent>
)

export default Content
