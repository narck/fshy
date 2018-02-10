const morgan = require('morgan')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const DATABASE = 'db.json'


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


app.use(withBody)

app.use(bodyParser.json())

const fs = require('fs')

const db = JSON.parse(fs.readFileSync(DATABASE))
let persons = db.persons

app.get('/info', (request, response) => {
    const str = 'puhelinluettelossa ' + persons.length + ' henkilön tiedot' + '<br><br>' + new Date();
    response.send(str)
  })

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.post('/api/persons', (request, response) => {
    const n = request.body
    const exists = persons.find(x => x.name === n.name)

    if (exists) {
        response.json({'error': 'name must be unique'})
    }
    else if (!n.name) {
        response.json({'error': 'name missing'})
    }
    else if (!n.number) {
        response.json({'error': 'number missing'})
    }
    else {
        const newentry = n
        n.id = Math.ceil(Math.random()*1000)
        persons = [...persons, newentry]
        response.json(newentry)
    }
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    response.json(persons.find(x => x.id === id))
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const x = persons.find(x => x.id === id)
    const i = persons.indexOf(x)

    if (x) {
        const newp = [...persons]
        persons = newp
        response.status(204).end()
    }
    else {
        response.status(404).end()
    }

  })

app.listen(3001)
