import React from 'react'

import { BodyContent, Flex1, Title } from '../../Shared/Styles'
import ProjectText from './content'

// const createMetadataItem = (metadata) => (key) => (
//   <li key={key}>{metadata[key]}</li>
// )

// const mapMetadata = (metadata) => (
//   Object.keys(metadata).map(createMetadataItem(metadata))
// )

const ProjectView = ({ currentView, language }) => {
  // if (!currentProject) return null
  // const { code, media, metadata, name } = currentProject
  return (
    <BodyContent>
      <Flex1>
        <Title>{currentView}</Title>
      </Flex1>
    </BodyContent>
  )
}

export default ProjectView
