const moroRouter = require('express').Router()
const Blog = require('./blog')

moroRouter.get('/', async (request, response) => {
    response.json(await Blog.find({}))
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

  moroRouter.delete('/:id', async (request, response) => {
    try {
      const b = await Blog.findOneAndRemove({_id: request.params.id})
      response.status(201).json('okk')
    } catch (e) {
      response.status(500).json({ error: 'hups' })
    }
  })


  moroRouter.put('/:id', async (request, response) => {
    try {
      const a = {title, url ,author} = request.body
      if (title === undefined || url === undefined || author === undefined) response.status(400).end()

      const b = await Blog.findByIdAndUpdate(request.params.id, a)
      response.status(201).json(b)
    } catch (e) {
      console.log(e)
      response.status(500).json({ error: 'hups' })
    }
  })

module.exports = moroRouter
