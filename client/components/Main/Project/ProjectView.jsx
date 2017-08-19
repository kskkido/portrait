import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { BodyContainer, BodyContent, Flex1, Title} from '../../Shared/Styles'
import { createSpans } from '../../Shared/Utils'
import { Scramble } from '../../Shared/Transition'
import { MacIcon } from '../../Shared/SVG'
import ProjectText from './content'

// const createMetadataItem = (metadata) => (key) => (
//   <li key={key}>{metadata[key]}</li>
// )

// const mapMetadata = (metadata) => (
//   Object.keys(metadata).map(createMetadataItem(metadata))
// )

const Image = styled.div`
  align-self: center;
  width: 450px;
  height: 214px;
  background-image: url(leopard.png);
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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

const BodyText = styled.div`
  flex 1;
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-left: 50px;
  max-width: 400px;
`

const ProjectView = ({ viewIndex, language, scale }) => {
  const data = ProjectText[viewIndex]
      , title = data.title
  return (
    <BodyContainer key={viewIndex}>
      <Flex1>
        <Scramble key={title} in={true} appear={true} delay={0} text={`<${title}>`}>
          <Title>
            {createSpans(title.length + 2)}
          </Title>
        </Scramble>
      </Flex1>
      <BodyContent>
        <Image>
          <ImageLink href={data.url} target="_blank">
            <ProjectImage imageSource={data.imageSource}/>
          </ImageLink>
        </Image>
          <BodyText>
          <h3>Technology</h3>
          <p>
            {data.technology}
          </p>
          <h3>When</h3>
          <p>
          {data.when}
          </p>
          <h3>Description</h3>
          <p>
            {data.description}
          </p>
        </BodyText>
      </BodyContent>
    </BodyContainer>
  )
}

export default ProjectView
