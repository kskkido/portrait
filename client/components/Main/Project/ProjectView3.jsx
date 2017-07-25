import React from 'react'

import { BodyContainer, Flex1, Flex5, Title } from '../../Shared/Styles'
import ProjectText from './content'

// const createMetadataItem = (metadata) => (key) => (
//   <li key={key}>{metadata[key]}</li>
// )

// const mapMetadata = (metadata) => (
//   Object.keys(metadata).map(createMetadataItem(metadata))
// )

const ProjectView = ({ language }) => {
  // if (!currentProject) return null
  // const { code, media, metadata, name } = currentProject
  return (
  <BodyContainer>
    <Flex1>
      <Title>
        Portfolio
      </Title>
    </Flex1>
    <Flex5>
      <p>
        Meta
      </p>
    </Flex5>
  </BodyContainer>
  )
}

export default ProjectView
