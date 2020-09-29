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

  describe('GET /users', () => {
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

    test('Should return 200 and a list users without filters', async () => {
      const response = await request(app)
        .get(url)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(200)
      expect(response).toMatchObject({
        body: expect.any(Array)
      })
      expect(response.body.length).toBeGreaterThan(1)
    })

    test('Should return 200 and a list users with all filters', async () => {
      const response = await request(app)
        .get(`${url}?page=1&limit=5&name=${user.name}&role=Member`)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(200)
      expect(response).toMatchObject({
        body: expect.any(Array)
      })
      expect(response.body.length).toBe(1)
      expect(response.body[0].name).toEqual(
        expect.stringMatching(user.name)
      )
    })

    test('Should return 204 when the user list is empty', async () => {
      const response = await request(app)
        .get(`${url}?name=123`)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(204)
    })
  })
})
