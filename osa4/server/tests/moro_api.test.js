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

test('get works', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('post works', async () => {
  const moro = {author: 'keijo', title: ' Keijos blogi', url: 'keijo.fi', likes: 159130}
  await api
    .post('/api/blogs', moro)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    const all = await api.get('/api/blogs')
    console.log(all.body)

})


test('post without likes works', async () => {
  const moro = {author: 'keijo', title: ' Keijos blogi', url: 'keijo.vif'}
  await api.post('/api/blogs', moro)
  const all = await api.get('/api/blogs')
  console.log(all)

})

afterAll(() => {
  Blog.remove({}, () => server.close())
})