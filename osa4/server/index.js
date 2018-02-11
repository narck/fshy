const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const moroRouter = require('./moro')
const mongoose = require('mongoose')
const middleware = require('./middjleware')

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', moroRouter)
app.use(middleware.error)
app.use(middleware.logger)

const mongoUrl = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/bloglisttest': 'mongodb://localhost/bloglist'

mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

const port = process.env.NODE_ENV === 'test' ? 4001:3001

const server = http.createServer(app)

server.listen(port)

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}