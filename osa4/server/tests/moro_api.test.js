const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../blog')
const moroHelper = require('../test_helper')
const listHelper = require('../list_helper')

beforeAll(async () => {
  await Blog.remove({})
})

test('get works', async () => {
  await moroHelper.runFixture()

  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    expect(listHelper.totalLikes(response.body)).toBe(105)

    const x = await moroHelper.totalBlogs()
    expect(response.body.length).toBe(x)
})

test('post works', async () => {
  const moro = {author: 'keijo', title: ' Keijos blogi', url: 'keijo.fi', likes: 159130}
  const x = await moroHelper.totalBlogs()

  const response = await api
    .post('/api/blogs')
    .send(moro)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    expect(response.body.author).toBe('keijo')
    const y = await moroHelper.totalBlogs()

    expect((x+1)).toBe(y)
})


test('delete works', async () => {
  await moroHelper.runFixture()
  const x = await moroHelper.someBlog()


  const response = await api.delete('/api/blogs/'+x._id)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const real = await moroHelper.blogExists(x)
  expect(real).toBe(false)
})


test('post without likes works', async () => {
  const moro = {author: 'keijo', title: ' Keijos blogi', url: 'keijo.vif'}
  const response = await api.post('/api/blogs').send(moro)
  expect(response.body.likes).toBe(0)
})

test('put works', async () => {
  await moroHelper.runFixture()
  const x = await moroHelper.someBlog()

  const newParams = {title: 'tere', author:'moro123', url:'veeveevee.kummit.vi', likes:52885198952918925}
  const response = await api.put('/api/blogs/'+x._id).send(newParams).expect(201).expect('Content-Type', /application\/json/)

  const edited  = await Blog.findOne({_id: x._id})

  expect(edited.author).toBe('moro123')
})

test('post without required fields fails', async () => {
  const moro = {author: 'keijo', title: ' Keijos blogi'}
  const moro2 = {author: 'keijo', url: 'keijo.vif'}
  const moro3 = {title: ' Keijos blogi', url: 'keijo.vif'}
  const moro4 = {}

  await api.post('/api/blogs').send(moro).expect(400)
  await api.post('/api/blogs').send(moro2).expect(400)
  await api.post('/api/blogs').send(moro3).expect(400)
  await api.post('/api/blogs').send(moro4).expect(400)
})

afterAll(async () => {
  await Blog.remove({})
  server.close()
})


