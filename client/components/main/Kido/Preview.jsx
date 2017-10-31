import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { PreviewContainer } from '../../shared/Styles'
import { keywordMarkup } from '../../shared/Utils'
import { Keyword } from '../../shared/Transition'
import data from './content'

import Button from '../shared/Button'

const ProjectsPreview = ({ history, viewIndex }) => {
   if (!data[viewIndex]) return <div />

  const { keyword, path, text } = data[viewIndex],
        marked = keywordMarkup(text, keyword)

  return (
    <PreviewContainer>
      <Keyword key={viewIndex} >
        <p>{marked}</p>
      </Keyword>
      {path && <Button onClick={() => history.push(path)} />}
    </PreviewContainer>
  )
}

export default withRouter(ProjectsPreview)
