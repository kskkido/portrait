import React from 'react'
import styled from 'styled-components'

const ProjectContainer = styled.div`
  display: flex
`

const createMetadataItem = (metadata) => (key) => (
  <li key={key}>{metadata[key]}</li>
)

const mapMetadata = (metadata) => (
  Object.keys(metadata).map(createMetadataItem(metadata))
)

const ProjectView = ({ currentProject }) => {
  if (!currentProject) return null

  const { code, media, metadata, name } = currentProject
  return (
    <ProjectContainer>
      <h1>{name}</h1>
      <h6 >{code}</h6>{/*link to code*/}
      <div>
        {media}
      </div>
      <ul>{metadata && mapMetadata(metadata)}</ul>
    </ProjectContainer>
  )
}

export default ProjectView
