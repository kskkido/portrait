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
  console.log(args, 'console args')
  return (fn.apply(this, args), args)
}

export const truncate = (string) => {
  return string.length > 15 ?
  `${string.slice(0, 15)}...` :
  string
}

export const isEveryPropValid = (state) => {
  return Object.keys(state).every((prop) => state[prop].isValid)
}
