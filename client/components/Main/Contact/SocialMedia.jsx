import React from 'react'
import styled from 'styled-components'
import { PreviewContainer } from '../../shared/Styles'
import { FacebookIcon, GithubIcon, LinkedinIcon } from './Button'

const List = styled.div`
  position: relative;
  top: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const SocialMedia = () => {

  return (
    <PreviewContainer>
      <p>Or lets just get in touch through social media</p>
      <List>
          <a target="_blank" rel="noopener noreferrer" href="https:github.com/kskkido">
            <GithubIcon scale={0.3} />
          </a>

          <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/keisuke-kido-037888b5/">
            <LinkedinIcon scale={0.3} />
          </a>

          <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/keisuke.k.kido?ref=br_rs">
            <FacebookIcon scale={0.3} />
          </a>

      </List>
    </PreviewContainer>
  )
}

export default SocialMedia
