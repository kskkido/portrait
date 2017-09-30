const fs = require('fs')
    , api = module.exports = require('express').Router()
    , { initialProp, toText } = require('./util')

api
  .get('/', (req, res, next) => {
    res.send(req.session.contact)
  })

  .post('/', ({ session, body }, res, next) => {
    const ls = fs.createWriteStream('./message.txt', {
      flags: 'a',
      defaultEncoding: 'utf8'
    })

    ls.write(toText(body.contact))
    ls.end('\n', (err) => {
      if (err) throw err
      session.contact = {name: initialProp, email: initialProp, message: initialProp}
      res.sendStatus(200)
    })
  })

  .put('/:props', ({ params: {props}, session, body }, res, next) => {
    session.contact[props] = body.contact
    res.sendStatus(200)
  })
