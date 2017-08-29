const { join } = require('path')
		, bodyParser = require('body-parser')
		, express = require('express')
		, app = express()
		, port = require('../').port
		, session = require('express-session')
		, { initialProp } = require('./constant')

app
// logging middleware
	.use(require('morgan')('dev'))

// body parsing middleware
	.use(bodyParser.urlencoded({extended: false}))
	.use(bodyParser.json())

// define html session
	.use(session({
		secret: 'cool',
		resave: false,
		saveUninitialized: false
	}))

	.use((req, res, next) => {
		req.session.contact = req.session.contact ?
			req.session.contact :
			{name: initialProp, email: initialProp, message: initialProp}

		next()
	})

	.use('/api', require('./contact'))

// redirect to api routes
	.use(express.static(join(__dirname, '..', '/client/public')))

	.get('/*', (req, res, next) => {
		res.sendFile(join(__dirname, '..', '/client/public'))
	})

// error handling middlware
	.use((err, req, res, next) => {
		console.error(err)
		res.status(err.status || 500).send(err.message || 'Internal server error')
	})

	.listen(port, () => {
		console.log('litening on port number: ', port)
	})
