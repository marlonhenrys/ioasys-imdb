const request = require('supertest')
const faker = require('faker/locale/pt_BR')
const app = require('../../../src/config/app')

describe('Person endpoints', () => {
  const url = '/api/v1/persons'

  const admin = {
    email: 'admin@system.com.br',
    password: 'admin:p@ss'
  }

  const person = {
    name: faker.name.findName(),
    biography: faker.lorem.paragraph()
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

  describe('POST /persons', () => {
    test('Should return 201 when admin creates a new person with valid data', async () => {
      const response = await request(app)
        .post(url)
        .send(person)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('id')
    })

    test('Should return 400 when name is not provided', async () => {
      const response = await request(app)
        .post(url)
        .send({
          biography: faker.lorem.paragraph()
        })
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
          name: 'aa',
          biography: faker.lorem.paragraph()
        })
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(422)
      expect(response.body.message).toEqual(
        expect.stringMatching('O nome deve possuir no mínimo 3 caracteres')
      )
    })
  })
})
