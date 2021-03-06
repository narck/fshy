const jwt = require('jsonwebtoken')

const moroRouter = require('express').Router()
const Blog = require('./blog')
const currentUser = require('./authlol')
const User = require('./user')

moroRouter.get('/', async (request, response) => {
    response.json(await Blog.find({}).populate('user', {id: 1, username: 1, name: 1})) // format was really great!
  })

  moroRouter.post('/', async (request, response) => {
    try {
      let blog = new Blog(request.body)
      const fields = [blog.title, blog.author, blog.url]

      const {id, username} = jwt.verify(request.token, process.env.SECRET)

      const user = await User.findOne({_id: id})

      blog.user = user._id

      if (fields.some(x => x === undefined)) return response.status(400).json({ error: 'field missing' })
      if (blog.likes === undefined) blog['likes'] = 0

      const b = await blog.save()

      user.blogs = user.blogs.concat(b._id)
      await user.save()

      response.status(201).json(b)
    } catch (e) {

      if (e.name === 'JsonWebTokenError' ) {
        response.status(401).json({ error: e.message })
      } else {
        response.status(500).json({ error: 'something went wrong...' })
      }
    }
  })

  moroRouter.delete('/:id', async (request, response) => {
    try {
      const {id, username} = jwt.verify(request.token, process.env.SECRET)
      const b = await Blog.findOne({_id: request.params.id})

      if (b.user.toString() !== id.toString()) {
        response.status(403).end()
        return
      }

      const bx = await Blog.findOneAndRemove({_id: request.params.id})

      response.status(201).json('ok')
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

      response.status(500).json({ error: 'hups' })
    }
  })

module.exports = moroRouter
