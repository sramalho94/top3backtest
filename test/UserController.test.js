process.env.NODE_ENV = 'test'
const request = require('supertest')
const app = require('../server')
const { User } = require('../models')

describe('User API endpoints', () => {
  beforeEach(async () => {
    await User.sync({ force: true })
  })

  // Test case for creating a user
  it('should create a new user', async () => {
    const res = await request(app).post('/api/users').send({
      username: 'testuser',
      name: 'Test User',
      password: 'testpassword'
    })
    expect(res.statusCode).toEqual(201)
    expect(res.body.user).toHaveProperty('id')
    expect(res.body.user.username).toEqual('testuser')
    expect(res.body.user.name).toEqual('Test User')
  })

  // Test case for retrieving all users
  it('should get all users', async () => {
    // Create a user first
    const user = await User.create({
      username: 'testuser',
      name: 'Test User',
      password: 'testpassword'
    })
    const res = await request(app).get('/api/users')
    expect(res.statusCode).toEqual(200)
    expect(res.body.users.length).toEqual(1)
  })

  // Test case for retrieving a user by id
  it('should get a user by id', async () => {
    // Create a user first
    const user = await User.create({
      username: 'testuser',
      name: 'Test User',
      password: 'testpassword'
    })
    const res = await request(app).get(`/api/users/${user.id}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body.user.id).toEqual(user.id)
    expect(res.body.user.username).toEqual(user.username)
    expect(res.body.user.name).toEqual(user.name)
  })

  // Test case for updating a user
  it('should update a user', async () => {
    // Create a user first
    const user = await User.create({
      username: 'testuser',
      name: 'Test User',
      password: 'testpassword'
    })
    const res = await request(app).put(`/api/users/${user.id}`).send({
      username: 'updateduser',
      name: 'Updated User',
      password: 'updatedpassword'
    })
    expect(res.statusCode).toEqual(200)
    expect(res.body.user.username).toEqual('updateduser')
    expect(res.body.user.name).toEqual('Updated User')
  })

  // Test case for deleting a user
  it('should delete a user', async () => {
    // Create a user first
    const user = await User.create({
      username: 'testuser',
      name: 'Test User',
      password: 'testpassword'
    })
    const res = await request(app).delete(`/api/users/${user.id}`)
    expect(res.statusCode).toEqual(204)
    // Make sure user is removed
    const findUser = await User.findOne({ where: { id: user.id } })
    expect(findUser).toBeNull()
  })
})
