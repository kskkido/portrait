module.exports = {
  initialProp: {value: undefined, isValid: false},
  toText (data = {}) {
    Object.keys(data).map(key => {
      delete data[key].isValid
    })

    return JSON.stringify(data)
  }
}
