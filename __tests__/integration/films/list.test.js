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

    await request(app)
      .post(url)
      .send({
        name: faker.name.title(),
        synopsis: faker.lorem.paragraph(),
        language: 'English',
        release: faker.date.past(),
        duration: '01:58',
        genres: [
          genre.id
        ],
        persons: [
          {
            id: person.id,
            role: 'Ator'
          }
        ]
      })
      .set({ Authorization: `Bearer ${admin.token}` })
  })

  describe('GET /films', () => {
    test('Should return 200 and a list films without filters', async () => {
      const response = await request(app)
        .get(url)

      expect(response.status).toBe(200)
      expect(response).toMatchObject({
        body: expect.any(Array)
      })
      expect(response.body.length).toBeGreaterThan(1)
    })

    test('Should return 200 and a list persons with all filters', async () => {
      const response = await request(app)
        .get(`${url}?page=1&limit=5&rating=0&genre=${genre.id}&person=${person.name}&role=Diretor&name=${film.name}`)

      expect(response.status).toBe(200)
      expect(response).toMatchObject({
        body: expect.any(Array)
      })
      expect(response.body.length).toBe(1)
      expect(response.body[0].id).toBe(film.id)
      expect(response.body[0].name).toEqual(
        expect.stringMatching(film.name)
      )
    })
  })
})
