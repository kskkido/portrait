import React from 'react'
import styled from 'styled-components'
import { BodyContainer, BodyContent, Title} from '../../shared/Styles'
import { Scramble } from '../../shared/Transition'
import { createSpans, createTitle } from '../../shared/Utils'
import projectData from './content'

import Return from '../shared/Return'
import Textline from '../shared/Textline'

// const createMetadataItem = (metadata) => (key) => (
//   <li key={key}>{metadata[key]}</li>
// )

// const mapMetadata = (metadata) => (
//   Object.keys(metadata).map(createMetadataItem(metadata))
// )


const Section = styled.section`
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-bottom: ${props => props.bottom ? '20px' : '50px'};
`

const Image = styled.div`
  margin: 0 auto;
  width: 450px;
  height: 214px;
  background-image: url(leopard.png);
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
`

const ImageLink = styled.a`
  align-self: center;
  margin-top: 14px;
  width: 308px;
  height: 190px;
`

const ProjectImage = styled.div.attrs({
  style: props => ({
    backgroundImage: `url(${props.imageSource})`
  })
})`
  width: inherit;
  height: inherit;
  background-repeat: no-repeat;
  background-size: contain;
`

const Description = styled.div`
  text-align: center;
  padding: 0 30px;
  min-height: 100px;
`

const TextContainer = Description.extend`
  margin-top: 15px;
  width: 100%;
`

const Header = styled.h3`
  font-weight: normal;
  font-size: 1.7em;
  margin: 0 0 10px; 0;
`

const Text = styled.p`
  margin: 0;
  text-align: center;
`

const SubText = styled.span`
  font-size: 1em;
`

const Line = styled.hr`
  display: block;
  height: 1px;
  width: 100%;
  background-color: black;
  position: relative;
  border: 0;
  margin: .5em 0 1em;
`


const ProjectView = ({ isBody, toggleBody, viewIndex }) => {
  if (!projectData[viewIndex]) return <div />

  const data = projectData[viewIndex]
      , title = data.title

  return (
    <BodyContainer key={viewIndex}>
      <Section>
        <Scramble
          key={title}
          in={true}
          appear={true}
          delay={0.2}
          text={`<${title}>`}
          tailText={`</${title}>`}
        >
          <Title>
            {createSpans(title.length + 2)}
          </Title>
        </Scramble>
          <Description>
            <p>{data.description}</p>
          </Description>
      </Section>
    <BodyContent column={true}>

      <Section>
        <Image>
          <ImageLink href={data.url} target="_blank" rel="noopener noreferrer" >
            <ProjectImage imageSource={data.imageSource} />
          </ImageLink>
        </Image>
      </Section>

      <Section>
        <TextContainer>
          <Header>Technology</Header>
          <Text>
            {data.technology}
          </Text>
        </TextContainer>
        <TextContainer>
          <Header>Role</Header>
          <Text>
            {data.role}
          </Text>
        </TextContainer>
        <TextContainer>
          <Header>Objective</Header>
            <Text paragraph>
              {data.objective}
            </Text>
        </TextContainer>
        <TextContainer>
          <Header>Idea</Header>
            <Text paragraph>
              {data.idea}
            </Text>
        </TextContainer>
      </Section>
      <Section bottom>
      <Title id="tail">
        {createSpans(title.length + 3)}<Textline delay={0.8} />
      </Title>
      </Section>
      </BodyContent>
        <Return
          text={'Back to Project Index'}
          toggleBody={toggleBody}
        />
    </BodyContainer>
  )
}

export default ProjectView
