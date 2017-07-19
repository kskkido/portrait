import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { languageSelect } from '../../reducers/language'

const LanguageCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 2px solid;
  margin: 20%;
`

const Button = styled.button`
  padding: 10px;
  margin: 50px;
  border: 2px solid;
  border-radius: 5px
`

// add national flag to button

const LanguageQuery = ({ onLanguageSelect }) => (
  <LanguageCard>
    <Button value="English" onClick={({target}) => onLanguageSelect(target.value)}>English</Button>
    <Button value="Japanese" onClick={({target}) => onLanguageSelect(target.value)}>日本語</Button>
  </LanguageCard>
)

const mapDispatchToProps = dispatch => ({
  onLanguageSelect: (language) => dispatch(languageSelect(language))
})

export default connect(null, mapDispatchToProps)(LanguageQuery)
