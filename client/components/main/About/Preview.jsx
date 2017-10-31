import React from 'react'
import { PreviewContainer } from '../../shared/Styles'
import { Keyword } from '../../shared/Transition'
import { keywordMarkup } from '../../shared/Utils'
import data from './content'

import Button from '../shared/Button'

const AboutPreview = ({ toggleBody, viewIndex }) => {
  if (!data[viewIndex]) return <div />

  const { preview } = data[viewIndex]

  return (
    <PreviewContainer>
      <Keyword key={'about' + viewIndex}>
        <p>{keywordMarkup(preview, '#F5F5F5')}</p>
      </Keyword>
      <Button onClick={toggleBody}/>
    </PreviewContainer>
  )
}

export default AboutPreview

