import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { languageSelect } from '../../reducers/language'

const LanguageCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 20%;
`

const Button = styled.button`
  font-size: 2em;
  padding: 2em;
  margin: 50px;
  border: 0;
  background: none;
  position: relative;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
  }
  &::before,
  &::after {
    box-sizing: inherit;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
  }
    transition: color 0.2s;

  &::before,
  &::after {
    border: 2px solid transparent;
    width: 0;
    height: 0;
  }

  &::before {
    top: 0;
    left: 0;
  }

  &::after {
    bottom: 0;
    right: 0;
  }

  &:hover {
    color: black;
    opacity: 0.6;
    transition: opacity 0.3s ease-out
  }

  &:hover::before,
  &:hover::after {
    width: 100%;
    height: 100%;
  }

  &:hover::before {
    border-top-color: black;
    border-right-color: black;
    transition:
      width 0.2s ease-out,
      height 0.2s ease-out 0.2s;
  }

  &:hover::after {
    border-bottom-color: black;
    border-left-color: black;
    transition:
      border-color 0s ease-out 0.4s,
      width 0.2s ease-out 0.4s,
      height 0.2s ease-out 0.60s;
  }
`

// add national flag to button

const LanguageQuery = ({ onLanguageSelect }) => (
  <LanguageCard>
    <Button value="ENGLISH" onClick={({target}) => onLanguageSelect(target.value)}>English</Button>
    <Button value="JAPANESE" onClick={({target}) => onLanguageSelect(target.value)}>日本語</Button>
  </LanguageCard>
)

const mapDispatchToProps = dispatch => ({
  onLanguageSelect: (language) => dispatch(languageSelect(language))
})

export default connect(null, mapDispatchToProps)(LanguageQuery)
