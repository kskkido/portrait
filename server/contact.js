const api = module.exports = require('express').Router()
    , { initialProp } = require('./constant')
api
  .get('/', (req, res, next) => {
    res.send(req.session.contact)
  })

  .post('/', ({ session, body }, res, next) => {
    session.contact = {name: initialProp, email: initialProp, message: initialProp}
    res.sendStatus(200)
  })

  .put('/', ({ session, body }, res, next) => {

    for (const prop in body.contact) {
      if (body.contact.hasOwnProperty(prop)) {
        session.contact[prop] = body.contact[prop]
      }
    }

    res.sendStatus(200)
  })
