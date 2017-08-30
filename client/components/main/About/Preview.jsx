import React from 'react'
import Button from '../Button'
import { PreviewContainer } from '../../shared/Styles'
import data from './content'

const AboutPreview = ({ toggleBody, viewIndex }) => {
  if (!data[viewIndex]) return <div />

  const { preview } = data[viewIndex]

  return (
    <PreviewContainer>
      <p>{preview}</p>
      <Button onClick={toggleBody} />
    </PreviewContainer>
  )
}

export default AboutPreview

