import React from 'react'
import { BodyText,  BodyContent, Text } from '../../shared/Styles'
import { Keyword } from '../../shared/Transition'
import { keywordMarkup } from '../../shared/Utils'
import data from './content'

const Content = ({ viewIndex }) => {
  const { main, withLink } = data[viewIndex]
  console.log(main, 'MAIN', viewIndex)
  return (
    <BodyContent>
      <BodyText>
        <Keyword key={'aboutMain' + viewIndex}>
        <Text>{keywordMarkup(main, '#F5F5F5', withLink)}</Text>
        </Keyword>
      </BodyText>
    </BodyContent>
  )
}

// --> Might be cool to do an animation explaining NERP

export default Content
