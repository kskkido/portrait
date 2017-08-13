export const once = (fn) => {
  let done = false
  return (...args) => (
    done ? null : (done = true, fn.apply(this, args))
  )
}
