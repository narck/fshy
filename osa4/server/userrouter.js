
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('./user')

userRouter.get('/', async (request, response) => {
    const r = await User.find({})

    response.json(r.map(User.format))
  })

  userRouter.post('/', async (request, response) => {
    try {
        const {username, name, password, adult} = request.body

        const x = await User.findOne({username})

        if (x !== null) {
            response.status(400).json('already éxists')
            return
        }
        if (password.length <= 3) {
            response.status(400).json('password too short')
            return
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({username, name, passwordHash, adult: adult || true})

        const savedUser = await user.save()

        response.json(savedUser)
      } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
      }
  })

  userRouter.delete('/:id', async (request, response) => {
    try {
      const b = await User.findOneAndRemove({_id: request.params.id})
      response.status(201).json('okk')
    } catch (e) {
      response.status(500).json({ error: 'hups' })
    }
  })


  userRouter.put('/:id', async (request, response) => {
    try {
      const a = {title, url ,author} = request.body
      if (title === undefined || url === undefined || author === undefined) response.status(400).end()

      const b = await User.findByIdAndUpdate(request.params.id, a)
      response.status(201).json(b)
    } catch (e) {
      console.log(e)
      response.status(500).json({ error: 'hups' })
    }
  })

module.exports = userRouter
