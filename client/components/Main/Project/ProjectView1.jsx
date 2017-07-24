import React from 'react'

import { BodyContent, Flex1, Flex5, Title } from '../../Shared/Styles'
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
  <BodyContent>
    <Flex1>
      <Title>
        Audiosphere
      </Title>
    </Flex1>
    <Flex5>
      <p>
        Your own space for your favorite music
      </p>
    </Flex5>
  </BodyContent>
  )
}

export default ProjectView
