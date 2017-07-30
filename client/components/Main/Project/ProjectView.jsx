import React from 'react'
import styled from 'styled-components'

import { BodyContainer, BodyContent, Flex1, Title } from '../../Shared/Styles'
import ProjectText from './content'

// const createMetadataItem = (metadata) => (key) => (
//   <li key={key}>{metadata[key]}</li>
// )

// const mapMetadata = (metadata) => (
//   Object.keys(metadata).map(createMetadataItem(metadata))
// )

const Image = styled.div`
  width: 400px;
  height: 337px;
  background-image: url(mac-icon.png);
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const ImageLink = styled.a`
  align-self: center;
  margin-top: 20px;
  width: 360px;
  height: 202px;
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
  margin-left: 50px;
  max-width: 400px;
`

const ProjectView = ({ currentView, language }) => {
  const data = ProjectText[currentView]
  return (
  <BodyContainer>
    <Flex1>
      <Title>
        {`< ${data.title} >`}
      </Title>
    </Flex1>
    <BodyContent>
      <Image>
        <ImageLink href={data.url} target="_blank">
          <ProjectImage imageSource={data.imageSource} />
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
