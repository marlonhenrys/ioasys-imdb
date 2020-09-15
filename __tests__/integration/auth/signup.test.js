const request = require('supertest')
const faker = require('faker/locale/pt_BR')
const app = require('../../../src/config/app')

describe('Authenticate endpoints', () => {
  const url = '/api/v1/signup'

  const userData = {
    name: faker.name.findName(),
    username: faker.random.alphaNumeric(6),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  describe('POST /signup', () => {
    test('Should return 201 when create a user with valid data', async () => {
      const response = await request(app)
        .post(url)
        .send(userData)

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('id')
    })

    test('Should return 400 when username is not provided', async () => {
      const response = await request(app)
        .post(url)
        .send({
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.internet.password()
        })

      expect(response.status).toBe(400)
      expect(response.body.message).toEqual(
        expect.stringMatching('O nome de usuário é obrigatório')
      )
    })

    test('Should return 422 when username is invalid', async () => {
      const response = await request(app)
        .post(url)
        .send({
          name: faker.name.findName(),
          username: faker.random.alphaNumeric(2),
          email: faker.internet.email(),
          password: faker.internet.password()
        })

      expect(response.status).toBe(422)
      expect(response.body.message).toEqual(
        expect.stringMatching('O nome de usuário deve possuir no mínimo 3 caracteres')
      )
    })
  })
})
