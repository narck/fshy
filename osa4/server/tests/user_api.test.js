const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../user')
const moroHelper = require('../test_helper')
const listHelper = require('../list_helper')

beforeAll(async () => {
    await User.remove({})
})

test('post user fails on invalid password input', async () => {
    const moro = {username: 'keijo', user: 'Keke', password: 'mo'}

    const response = await api
      .post('/api/users')
      .send(moro)
      .expect(400)
})

test('post user fails on duplicate username', async () => {
    const moro = {username: 'keijo', user: 'Keke', password: 'moro123'}

    await api.post('/api/users').send(moro).expect(200)

    await api.post('/api/users').send(moro).expect(400)
})

afterAll(async () => {
    await User.remove({})
    server.close()
})


