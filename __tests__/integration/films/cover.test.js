const request = require('supertest')
const faker = require('faker/locale/pt_BR')
const app = require('../../../src/config/app')

describe('Film endpoints', () => {
  const url = '/api/v1/films'

  const validFile = `${__dirname}/../../utils/files/valid.png`
  const invalidFileType = `${__dirname}/../../utils/files/invalid.txt`
  const invalidFileSize = `${__dirname}/../../utils/files/6mb.jpg`

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

  describe('POST /films/:id/covers', () => {
    test('Should return 204 when admin uploads a film cover', async () => {
      const response = await request(app)
        .post(`${url}/${film.id}/covers`)
        .attach('file', validFile)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(204)
    })

    test('Should return 400 when a file size is greater than allowed', async () => {
      const response = await request(app)
        .post(`${url}/${film.id}/covers`)
        .attach('file', invalidFileSize)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(400)
      expect(response.body.message).toEqual(
        expect.stringMatching('O tamanho máximo permitido para o arquivo é de 5MB')
      )
    })

    test('Should return 400 when a file is not provided', async () => {
      const response = await request(app)
        .post(`${url}/${film.id}/covers`)
        .attach('file')
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(400)
      expect(response.body.message).toEqual(
        expect.stringMatching('O arquivo é obrigatório')
      )
    })

    test('Should return 404 when a film is not found', async () => {
      const response = await request(app)
        .post(`${url}/999/covers`)
        .attach('file', validFile)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(404)
      expect(response.body.message).toEqual(
        expect.stringMatching('Filme não encontrado')
      )
    })

    test('Should return 422 when a file type is invalid', async () => {
      const response = await request(app)
        .post(`${url}/${film.id}/covers`)
        .attach('file', invalidFileType)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(422)
      expect(response.body.message).toEqual(
        expect.stringMatching('Tipo de arquivo inválido')
      )
    })
  })
})
