import React from 'react'
import { PreviewContainer } from '../../shared/Styles'
import data from './content'

import Button from '../Button'

const ProjectPreview = ({ toggleBody, viewIndex }) => {
  if (data[viewIndex] === undefined) return <div />

  const { preview } = data[viewIndex]
      , location = {
          pathname: '/projects',
          state: {isBody: true}
        }
  return (
    <PreviewContainer>
      <p>{preview}</p>
      <Button onClick={toggleBody} />
    </PreviewContainer>
  )
}

export default ProjectPreview
