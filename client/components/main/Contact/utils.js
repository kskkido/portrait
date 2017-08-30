import axios from 'axios'

export const initialValue = Symbol('initialValue')
export const validateEmail = (email) => {
  return /^\w{2,}@{1}[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/i.test(email)
}
export const secretProperty = Symbol('fetched')
export const asyncFormPut = (prop, data) => (
  axios.put(`/api/${prop}`, {
    contact: data
  })
)

export const tap = (fn, ...args) => {
  return (fn.apply(this, args), args)
}
