const request = require('supertest')
const app = require('../src/app')

describe('Users endpoints', () => {
  it('create a user', async () => {
    await request(app).delete(`/api/users/deleteAllUsers`)
    const userToCreate = {
      name: 'onur',
      email: `onurozcn${Date.now()}@ozcn.com`,
    }

    const userResponse = await request(app).post('/api/users').send(userToCreate).expect(200)
    const createdUser = userResponse.body

    expect(createdUser).toMatchObject(userToCreate)

    await request(app).delete(`/api/users/deleteUserById/${createdUser._id}`)
  })
})
