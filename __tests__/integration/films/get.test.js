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

    const responseCreateFilm = await request(app)
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

    film.id = responseCreateFilm.body.id
  })

  describe('GET /films/:id', () => {
    test('Should return 200 with a film found by ID', async () => {
      const response = await request(app)
        .get(`${url}/${film.id}`)

      expect(response.status).toBe(200)
      expect(response.body.id).toBe(film.id)
      expect(response.body.name).toEqual(
        expect.stringMatching(film.name)
      )
    })

    test('Should return 404 when a film is not found', async () => {
      const response = await request(app)
        .get(`${url}/999`)

      expect(response.status).toBe(404)
      expect(response.body.message).toEqual(
        expect.stringMatching('Filme não encontrado')
      )
    })
  })
})
