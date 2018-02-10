const morgan = require('morgan')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Person = require('./person')

morgan.token('jbody', (req, res) => JSON.stringify(req.body))

const tiny = morgan('tiny')

const withBody = morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.jbody(req, res),
    ].join(' ')
  })
  const cors = require('cors')

  app.use(cors())

app.use(withBody)
app.use(bodyParser.json())

app.get('/info', (request, response) => {
    const str = 'puhelinluettelossa ' + persons.length + ' henkilön tiedot' + '<br><br>' + new Date();
    response.send(str)
  })

  app.get('/api/persons', (request, response) => {
    Person.find({}).then((result) => response.json(result.map(Person.format)))
  })

  app.put('/api/persons/:id', (request, response ) => {
    const {id, name, number} = request.body
    Person.find({_id: id})
    .then(result => {
      if (result.length === 0) response.status(404).end()


      result[0].update({name, number}).then(response.status(200).end())

    }
    )

  })

  app.post('/api/persons', (request, response) => {
    const n = request.body
    if (!n.name) response.json({'error': 'name missing'}).end()
    if (!n.number) response.json({'error': 'number missing'}).end()

    Person.find({name: n.name}).then(result => {

    if (result.length !== 0) {
      response.json({'error': 'name must be unique'})
  }
  else {
      const newEntry = new Person({...n})

      newEntry.save().then(() => response.json(Person.format(newEntry)))
  }

    })
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id

    Person.find({_id: id}).then((result) => response.json(result.map(Person.format)))
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id

    Person.remove({_id: id})
      .then(() => response.status(204).end())
      .catch(() => response.status(404).end())
  })

app.listen(3001)
