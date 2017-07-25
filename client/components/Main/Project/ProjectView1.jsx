import React from 'react'
import styled from 'styled-components'

import { BodyContainer, BodyContent, Flex1, BodyText, Title } from '../../Shared/Styles'
import ProjectText from './content'

// const createMetadataItem = (metadata) => (key) => (
//   <li key={key}>{metadata[key]}</li>
// )

// const mapMetadata = (metadata) => (
//   Object.keys(metadata).map(createMetadataItem(metadata))
// )

const TextContainer = styled.div`
  flex 1;
  display: flex;
  flex-direction: column;
  max-width: 500px;
`

const Image = styled.div`
  width: 400px;
  height: 337px;
  background-image: url(mac-icon.png);
  background-repeat: no-repeat;
  background-size: contain;
`

const ProjectView = ({ language }) => {
  // if (!currentProject) return null
  // const { code, media, metadata, name } = currentProject
  return (
  <BodyContainer>
    <Flex1>
      <Title>
        Audiosphere
      </Title>
    </Flex1>
    <BodyContent>
      <Image />
      <TextContainer>
      <p>
        Your own space for your favorite music
      </p>
      </TextContainer>
    </BodyContent>
  </BodyContainer>
  )
}

export default ProjectView
