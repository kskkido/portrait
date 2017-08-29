import axios from 'axios'

export const initialValue = Symbol('initialValue')
export const validateEmail = (email) => {
  return /^\w{2,}@{1}[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/i.test(email)
}
export const secretProperty = Symbol('fetched')
export const asyncFormPut = data => (
  axios.put('/api', {
    contact: data
  })
)
