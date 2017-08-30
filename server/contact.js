const api = module.exports = require('express').Router()
    , { initialProp } = require('./constant')
api
  .get('/', (req, res, next) => {
    console.log(req.session.contact)
    res.send(req.session.contact)
  })

  .post('/', ({ session, body }, res, next) => {
    session.contact = {name: initialProp, email: initialProp, message: initialProp}
    res.sendStatus(200)
  })

  .put('/:props', ({ params: {props}, session, body }, res, next) => {
    session.contact[props] = body.contact
    res.sendStatus(200)
  })
