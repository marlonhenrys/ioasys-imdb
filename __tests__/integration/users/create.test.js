const request = require('supertest')
const faker = require('faker/locale/pt_BR')
const app = require('../../../src/config/app')

describe('User endpoints', () => {
  const url = '/api/v1/users'

  const admin = {
    email: 'admin@system.com.br',
    password: 'admin:p@ss'
  }

  const userData = {
    name: faker.name.findName(),
    username: faker.random.alphaNumeric(6),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: 'Member'
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

  describe('POST /users', () => {
    test('Should return 201 when admin creates a new user with valid credentials', async () => {
      const response = await request(app)
        .post(url)
        .send(userData)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('id')
    })

    test('Should return 400 when role is not provided', async () => {
      const response = await request(app)
        .post(url)
        .send({
          name: faker.name.findName(),
          username: faker.random.alphaNumeric(6),
          email: faker.internet.email(),
          password: faker.internet.password()
        })
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(400)
      expect(response.body.message).toEqual(
        expect.stringMatching('O tipo de usuário é obrigatório')
      )
    })

    test('Should return 422 when role is invalid', async () => {
      const response = await request(app)
        .post(url)
        .send({
          name: faker.name.findName(),
          username: faker.random.alphaNumeric(6),
          email: faker.internet.email(),
          password: faker.internet.password(),
          role: 'Manager'
        })
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(422)
      expect(response.body.message).toEqual(
        expect.stringMatching('Tipo de usuário inválido')
      )
    })
  })
})
