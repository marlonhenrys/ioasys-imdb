module.exports = {

  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'API IMDb',
    description: 'Trilha de aprendizagem - ioasys'
  },
  host: 'localhost:3333',
  basePath: '/',
  tags: [
    {
      name: 'Autenticação',
      description: 'Cadastro / Login'
    },
    {
      name: 'Usuário',
      description: 'CRUD'
    }
  ],
  schemes: [
    'http',
    'https'
  ],
  consumes: [
    'application/json'
  ],
  produces: [
    'application/json'
  ],
  paths: {
    '/signup': {
      post: {
        tags: [
          'Autenticação'
        ],
        summary: 'Cadastrar um usuário',
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'Dados do usuário que será criado',
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string'
                },
                email: {
                  type: 'string'
                },
                username: {
                  type: 'string'
                },
                password: {
                  type: 'string'
                }
              },
              required: [
                'name',
                'username',
                'email',
                'password'
              ]
            }
          }
        ],
        responses: {
          204: {
            description: 'Usuário criado'
          },
          400: {
            description: 'Erro na requisição'
          },
          422: {
            description: 'Erro de validação dos dados'
          }
        }
      }
    },
    '/signin': {
      post: {
        tags: [
          'Autenticação'
        ],
        summary: 'Autenticar um usuário',
        parameters: [
          {
            name: 'credentials',
            in: 'body',
            description: 'Credenciais de acesso',
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string'
                },
                password: {
                  type: 'string'
                }
              },
              required: [
                'email',
                'password'
              ]
            }
          }
        ],
        responses: {
          200: {
            description: 'Usuário autenticado',
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer'
                },
                name: {
                  type: 'string'
                },
                email: {
                  type: 'string'
                },
                username: {
                  type: 'string'
                },
                role: {
                  type: 'string'
                },
                createdAt: {
                  type: 'string'
                },
                updatedAt: {
                  type: 'string'
                },
                token: {
                  type: 'string'
                }
              }
            }
          },
          401: {
            description: 'Não autorizado'
          }
        }
      }
    },
    '/users': {
      post: {
        tags: [
          'Usuário'
        ],
        summary: 'Criar um novo usuário',
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'Dados do usuário que será criado',
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string'
                },
                email: {
                  type: 'string'
                },
                username: {
                  type: 'string'
                },
                password: {
                  type: 'string'
                },
                role: {
                  type: 'string'
                }
              },
              required: [
                'name',
                'username',
                'email',
                'password',
                'role'
              ]
            }
          }
        ],
        responses: {
          204: {
            description: 'Usuário criado'
          },
          400: {
            description: 'Erro na requisição'
          },
          422: {
            description: 'Erro de validação dos dados'
          }
        }
      }
    }
  },
  securityDefinitions: {
    Authorization: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  }
}
