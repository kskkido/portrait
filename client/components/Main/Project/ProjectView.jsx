import React from 'react'

import { BodyContent, BodyTitle } from '../Shared/Styles'
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
      <BodyTitle>{ProjectText[language].TITLE}</BodyTitle>
    </BodyContent>
  )
}

export default ProjectView
