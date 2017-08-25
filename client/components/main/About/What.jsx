import React from 'react'

import { BodyText,  BodyContent } from '../../shared/Styles'
import HomeText from './content'

const Content = ({ language }) => (
    <BodyContent>
      <BodyText>
      <p>
        I do fullstack Javascript web development using the NERP (NODE, EXPRESS, REACT, POSTGRES) stack.
      </p>
      </BodyText>
    </BodyContent>
)

// --> Might be cool to do an animation explaining NERP

export default Content
