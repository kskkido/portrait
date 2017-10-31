import React from 'react'
import { PreviewContainer } from '../../shared/Styles'
import { keywordMarkup } from '../../shared/Utils'
import { Keyword } from '../../shared/transition'
import data from './content'

import Button from '../shared/Button'

const ProjectPreview = ({ toggleBody, viewIndex }) => {
  if (data[viewIndex] === undefined) return <div />

  const { preview } = data[viewIndex]

  return (
    <PreviewContainer>
      <Keyword key={'project' + viewIndex}>
        <p>{keywordMarkup(preview, '#EEEEEE')}</p>
      </Keyword>
      <Button onClick={toggleBody} />
    </PreviewContainer>
  )
}

export default ProjectPreview
