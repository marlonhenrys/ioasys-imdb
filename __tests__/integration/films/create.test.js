const request = require('supertest')
const faker = require('faker/locale/pt_BR')
const app = require('../../../src/config/app')

describe('Film endpoints', () => {
  const url = '/api/v1/films'

  const admin = {
    email: 'admin@system.com.br',
    password: 'admin:p@ss'
  }

  const genre = {
    name: faker.lorem.word()
  }

  const person = {
    name: faker.name.findName(),
    biography: faker.lorem.paragraph()
  }

  const film = {
    name: faker.name.title(),
    synopsis: faker.lorem.paragraph(),
    language: 'Português',
    release: faker.date.past(),
    duration: '2:16'
  }

  beforeAll(async () => {
    const response = await request(app)
      .post('/api/v1/signin')
      .send({
        email: admin.email,
        password: admin.password
      })

    admin.token = response.body.token

    const responseCreateGenre = await request(app)
      .post('/api/v1/genres')
      .send(genre)
      .set({ Authorization: `Bearer ${admin.token}` })

    genre.id = responseCreateGenre.body.id

    const responseCreatePerson = await request(app)
      .post('/api/v1/persons')
      .send(person)
      .set({ Authorization: `Bearer ${admin.token}` })

    person.id = responseCreatePerson.body.id
  })

  describe('POST /films', () => {
    test('Should return 201 when admin creates a new film with valid data', async () => {
      const response = await request(app)
        .post(url)
        .send({
          ...film,
          genres: [
            genre.id
          ],
          persons: [
            {
              id: person.id,
              role: 'Diretor'
            }
          ]
        })
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('id')
    })

    test('Should return 400 when genres are not provided', async () => {
      const response = await request(app)
        .post(url)
        .send({
          ...film,
          persons: [
            {
              id: person.id,
              role: 'Diretor'
            }
          ]
        })
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(400)
      expect(response.body.message).toEqual(
        expect.stringMatching('A lista de gêneros é obrigatória')
      )
    })

    test('Should return 404 when a genre is not found', async () => {
      const response = await request(app)
        .post(url)
        .send({
          ...film,
          genres: [
            9999
          ],
          persons: [
            {
              id: person.id,
              role: 'Diretor'
            }
          ]
        })
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(404)
      expect(response.body.message).toEqual(
        expect.stringMatching('Gênero de ID 9999 não encontrado')
      )
    })

    test('Should return 404 when a person is not found', async () => {
      const response = await request(app)
        .post(url)
        .send({
          ...film,
          genres: [
            genre.id
          ],
          persons: [
            {
              id: 9999,
              role: 'Diretor'
            }
          ]
        })
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(404)
      expect(response.body.message).toEqual(
        expect.stringMatching('Pessoa de ID 9999 não encontrada')
      )
    })

    test('Should return 422 when duration is invalid', async () => {
      const response = await request(app)
        .post(url)
        .send({
          ...film,
          duration: '1:60',
          genres: [
            genre.id
          ],
          persons: [
            {
              id: person.id,
              role: 'Diretor'
            }
          ]
        })
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(422)
      expect(response.body.message).toEqual(
        expect.stringMatching('Formato de tempo inválido')
      )
    })
  })
})
