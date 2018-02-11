const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../blog')

// const Blog = mongoose.model('Blog', {
//   title: String,
//   author: String,
//   url: String,
//   likes: Number
// })

beforeAll(async () => {
  await Blog.remove({})
})



test('get works', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('post works', async () => {
  const moro = {author: 'keijo', title: ' Keijos blogi', url: 'keijo.fi', likes: 159130}
  await api
    .post('/api/blogs')
    .send(moro)
    .expect(201)
    .expect('Content-Type', /application\/json/)
})


test('post without likes works', async () => {
  const moro = {author: 'keijo', title: ' Keijos blogi', url: 'keijo.vif'}
  await api.post('/api/blogs', moro)
  const all = await api.get('/api/blogs')

})

afterAll(async () => {
  await Blog.remove({})
  server.close()
})


