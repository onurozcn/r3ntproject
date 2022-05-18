const request = require('supertest')
const app = require('../src/app')

describe('User endpoint', () => {
  it('post request to /users should create a user', async () => {
    const userToCreate = {
      name: 'Somename' + Date.now(),
      age: 27,
      email: 'Bsdadasd, done that' + Date.now(),
    }
    console.log('userToCreate')
    const createdUser = (await request(app).post('/api/users').send(userToCreate)).body

    expect(createdUser.name).toBe(userToCreate.name)
    expect(createdUser.age).toBe(userToCreate.age)
    expect(createdUser.email).toBe(userToCreate.email.toLowerCase())
  })
})
