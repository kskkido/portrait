import React from 'react'

import { BodyText,  BodyContent } from '../../shared/Styles'
import HomeText from './content'

const Content = ({ language }) => (
    <BodyContent>
      <BodyText>
      <p>
        There are many things I can do like most people, but there are few activities I truly enjoy. Music, cooking, working out, and of course programming. As a graduate of Fullstack Academy of Code, I am most comfortable with Javascript web development using the NERP (Node, Express, React, Postgres) stack.
      </p>
      </BodyText>
    </BodyContent>
)

// --> Might be cool to do an animation explaining NERP

export default Content
