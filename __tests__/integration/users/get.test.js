const request = require('supertest')
const faker = require('faker/locale/pt_BR')
const app = require('../../../src/config/app')

describe('User endpoints', () => {
  const url = '/api/v1/users'

  const admin = {
    email: 'admin@system.com.br',
    password: 'admin:p@ss'
  }

  const user = {
    name: faker.name.findName(),
    username: faker.random.alphaNumeric(6),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  describe('GET /users/:id', () => {
    beforeAll(async () => {
      const responseRegisterUser = await request(app)
        .post('/api/v1/signup')
        .send(user)

      user.id = responseRegisterUser.body.id

      const responseLoginAdmin = await request(app)
        .post('/api/v1/signin')
        .send({
          email: admin.email,
          password: admin.password
        })

      admin.token = responseLoginAdmin.body.token
    })

    test('Should return 200 with a user found by ID', async () => {
      const response = await request(app)
        .get(`${url}/${user.id}`)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(200)
      expect(response.body.id).toBe(user.id)
      expect(response.body.name).toEqual(
        expect.stringMatching(user.name)
      )
    })

    test('Should return 404 when a user is not found', async () => {
      const response = await request(app)
        .get(`${url}/9999`)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(404)
      expect(response.body.message).toEqual(
        expect.stringMatching('Usuário não encontrado')
      )
    })
  })
})
