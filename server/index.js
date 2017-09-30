const { join } = require('path')
		, fs = require('fs')
		, bodyParser = require('body-parser')
		, express = require('express')
		, app = express()
		, port = require('../').port
		, session = require('express-session')
		, { initialProp } = require('./util')

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
		req.session.contact = req.session.contact ||
			{name: initialProp, email: initialProp, message: initialProp}

		next()
	})

	.use('/api', require('./contact'))

// redirect to api routes
	.use(express.static(join(__dirname, '..', '/client/public')))

	.get('/resume', (req, res, next) => {
		const file = fs.createReadStream(join(__dirname, '..', '/client/public/kido_resume.pdf'))
		const stat = fs.statSync(file.path)

		res.writeHead(200, {
			'Content-Type': 'application/pdf',
			'Content-Length': stat.size,
			'Content-Disposition': 'attachment; filename="kido_resume.pdf'
		})

		file.pipe(res)
	})

	.get('*', (req, res, next) => {
		res.sendFile(join(__dirname, '..', '/client/public/index.html'))
	})

// error handling middlware
	.use((err, req, res, next) => {
		console.error(err)
		res.status(err.status || 500).send(err.message || 'Internal server error')
	})

	.listen(port, () => {
		console.log('listening on port number: ', port)
	})
