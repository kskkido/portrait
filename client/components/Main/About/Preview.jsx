import React, { Component } from 'react'
import Button from '../Button'
import { PreviewContainer } from '../../Shared/Styles'
import data from './content'

const AboutPreview = ({ toggleBody, viewIndex }) => {
  console.log(toggleBody)
  const { preview } = data[viewIndex]
      , location = {
          pathname: '/about',
          state: {isBody: true}
        }
  return (
    <PreviewContainer>
      <p>{preview}</p>
      <Button onClick={toggleBody} />
    </PreviewContainer>
  )
}

export default AboutPreview

