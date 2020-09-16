const request = require('supertest')
const app = require('../../../src/config/app')

describe('Genre endpoints', () => {
  const url = '/api/v1/genres'

  const admin = {
    email: 'admin@system.com.br',
    password: 'admin:p@ss'
  }

  const genre = {
    name: 'Drama'
  }

  beforeAll(async () => {
    const response = await request(app)
      .post('/api/v1/signin')
      .send({
        email: admin.email,
        password: admin.password
      })

    admin.token = response.body.token
  })

  describe('POST /genres', () => {
    test('Should return 201 when admin creates a new genre with valid data', async () => {
      const response = await request(app)
        .post(url)
        .send(genre)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('id')
    })

    test('Should return 400 when name is not provided', async () => {
      const response = await request(app)
        .post(url)
        .send()
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(400)
      expect(response.body.message).toEqual(
        expect.stringMatching('O nome é obrigatório')
      )
    })

    test('Should return 422 when name is invalid', async () => {
      const response = await request(app)
        .post(url)
        .send({
          name: 111
        })
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(422)
      expect(response.body.message).toEqual(
        expect.stringMatching('string validation failed on name')
      )
    })
  })
})
