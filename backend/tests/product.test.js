const request = require('supertest')
const app = require('../src/app')

describe('Product endpoints', () => {
  it('create a product', async () => {
    const userToCreate = {
      name: 'onur',
      email: `onurozcn${Date.now()}@ozcn.com`,
      isCompany: true,
    }
    const userResponse = await request(app).post('/api/users').send(userToCreate).expect(200)
    const createdUser = userResponse.body

    const productToCreate = {
      name: 'testCar',
      gear: 'auto',
      owner: createdUser,
      fuel: 'diesel',
      amount: 5,
      price: 100,
      photo: 'somePhotoUrl',
      pickUpPoint: 'berlin',
    }
    const productResponse = await request(app).post('/api/products').send(productToCreate).expect(200)
    const createdProduct = productResponse.body
    // test created product
    expect(createdProduct).toMatchObject(productToCreate)

    // test find product by id
    const productById = await (await request(app).get(`/api/products/${createdProduct._id}`)).body
    expect(createdProduct).toMatchObject(productById)
    // delete user by ID
    await request(app).delete(`/api/users/deleteUserById/${createdUser._id}`).expect(200)
    // delete product by ID
    await request(app).delete(`/api/products/${createdProduct._id}`).expect(200)
  })
})
