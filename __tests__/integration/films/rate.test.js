const request = require('supertest')
const faker = require('faker/locale/pt_BR')
const app = require('../../../src/config/app')

describe('Film endpoints', () => {
  const url = '/api/v1/films'

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
    const responseLoginAdmin = await request(app)
      .post('/api/v1/signin')
      .send({
        email: admin.email,
        password: admin.password
      })

    admin.token = responseLoginAdmin.body.token

    await request(app)
      .post('/api/v1/signup')
      .send(user)

    const responseLoginUser = await request(app)
      .post('/api/v1/signin')
      .send({
        email: user.email,
        password: user.password
      })

    user.token = responseLoginUser.body.token

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

  describe('POST /films/:id/ratings', () => {
    test('Should return 204 when admin rates a film', async () => {
      const response = await request(app)
        .post(`${url}/${film.id}/ratings`)
        .send({
          value: 4
        })
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(204)
    })

    test('Should return 400 when value is not provided', async () => {
      const response = await request(app)
        .post(`${url}/${film.id}/ratings`)
        .send({})
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(400)
      expect(response.body.message).toEqual(
        expect.stringMatching('O valor da avaliação é obrigatório')
      )
    })

    test('Should return 404 when a film is not found', async () => {
      const response = await request(app)
        .post(`${url}/999/ratings`)
        .send({
          value: 4
        })
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(404)
      expect(response.body.message).toEqual(
        expect.stringMatching('Filme não encontrado')
      )
    })
  })

  test('Should return 422 when value is invalid', async () => {
    const response = await request(app)
      .post(`${url}/${film.id}/ratings`)
      .send({
        value: 5
      })
      .set({ Authorization: `Bearer ${admin.token}` })

    expect(response.status).toBe(422)
    expect(response.body.message).toEqual(
      expect.stringMatching('O valor deve estar entre 0 e 4')
    )
  })

  describe('GET /films/:id (average rating)', () => {
    test('Should return 200 with average film rating equal to 3', async () => {
      await request(app)
        .post(`${url}/${film.id}/ratings`)
        .send({
          value: 2
        })
        .set({ Authorization: `Bearer ${user.token}` })

      const response = await request(app)
        .get(`${url}/${film.id}`)

      expect(response.status).toBe(200)
      expect(response.body.avgRating).toBe(3)
    })
  })
})
