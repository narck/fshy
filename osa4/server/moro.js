const moroRouter = require('express').Router()
const Blog = require('./blog')

moroRouter.get('/', async (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })

  moroRouter.post('/', async (request, response) => {
    try {
      let blog = new Blog(request.body)
      const fields = [blog.title, blog.author, blog.url]

      if (fields.some(x => x === undefined)) return response.status(400).json({ error: 'field missing' })
      if (blog.likes === undefined) blog['likes'] = 0

      response.status(201).json(await blog.save())
    } catch (e) {
      response.status(500).json({ error: 'hups' })
    }
  })

module.exports = moroRouter
