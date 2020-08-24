module.exports = {

  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'API IMDb',
    description: 'Trilha de aprendizagem - ioasys'
  },
  host: 'localhost:3333',
  basePath: '/api/v1',
  tags: [
    {
      name: 'Autenticação',
      description: 'Cadastro / Login'
    },
    {
      name: 'Usuário',
      description: 'CRUD'
    },
    {
      name: 'Filme',
      description: 'CRUD'
    },
    {
      name: 'Gênero',
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
      },
      get: {
        tags: [
          'Usuário'
        ],
        summary: 'Listar usuários existentes',
        parameters: [
          {
            name: 'role',
            in: 'query',
            description: 'Tipo dos usuários a serem listados',
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'Lista de usuários',
            schema: {
              type: 'array',
              items: {
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
                  }
                }
              }
            }
          },
          400: {
            description: 'Erro na requisição'
          }
        }
      },
      patch: {
        tags: [
          'Usuário'
        ],
        summary: 'Atualizar status de usuários existentes',
        parameters: [
          {
            name: 'users, status',
            in: 'body',
            description: 'Lista de usuários que terão o status atualizado',
            schema: {
              type: 'object',
              properties: {
                users: {
                  type: 'array',
                  items: {
                    type: 'integer'
                  }
                },
                status: {
                  type: 'string'
                }
              },
              required: [
                'status'
              ]
            }
          }
        ],
        responses: {
          204: {
            description: 'Status atualizados com sucesso'
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
    '/users/{id}': {
      get: {
        tags: [
          'Usuário'
        ],
        summary: 'Buscar um usuário existente',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do usuário a ser pesquisado',
            required: true,
            type: 'integer'
          }
        ],
        responses: {
          200: {
            description: 'Usuário encontrado',
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
                }
              }
            }
          },
          400: {
            description: 'Erro na requisição'
          }
        }
      },
      put: {
        tags: [
          'Usuário'
        ],
        summary: 'Atualizar um usuário existente',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do usuário a ser atualizado',
            required: true,
            type: 'integer'
          },
          {
            name: 'user',
            in: 'body',
            description: 'Dados do usuário que serão atualizados',
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
                }
              }
            }
          }
        ],
        responses: {
          204: {
            description: 'Usuário atualizado com sucesso'
          },
          400: {
            description: 'Erro na requisição'
          },
          422: {
            description: 'Erro de validação dos dados'
          }
        }
      },
      delete: {
        tags: [
          'Usuário'
        ],
        summary: 'Excluir um usuário existente',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do usuário a ser excluído',
            required: true,
            type: 'integer'
          }
        ],
        responses: {
          204: {
            description: 'Usuário excluído com sucesso'
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
    '/films': {
      post: {
        tags: [
          'Filme'
        ],
        summary: 'Cadastrar um novo filme',
        parameters: [
          {
            name: 'film',
            in: 'body',
            description: 'Dados do filme que será cadastrado',
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string'
                },
                synopsis: {
                  type: 'string'
                },
                genres: {
                  type: 'array',
                  items: {
                    type: 'integer'
                  }
                },
                duration: {
                  type: 'string'
                },
                language: {
                  type: 'string'
                },
                release: {
                  type: 'string'
                }
              },
              required: [
                'name',
                'synopsis',
                'genres',
                'duration',
                'language',
                'release'
              ]
            }
          }
        ],
        responses: {
          204: {
            description: 'Filme cadastrado com sucesso'
          },
          400: {
            description: 'Erro na requisição'
          },
          422: {
            description: 'Erro de validação dos dados'
          }
        }
      },
      get: {
        tags: [
          'Filme'
        ],
        summary: 'Listar filmes cadastrados',
        responses: {
          200: {
            description: 'Lista de filmes',
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer'
                  },
                  name: {
                    type: 'string'
                  },
                  synopsis: {
                    type: 'string'
                  },
                  genres: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  },
                  duration: {
                    type: 'string'
                  },
                  language: {
                    type: 'string'
                  },
                  release: {
                    type: 'string'
                  }
                }
              }
            }
          },
          400: {
            description: 'Erro na requisição'
          }
        }
      }
    },
    '/films/{id}': {
      get: {
        tags: [
          'Filme'
        ],
        summary: 'Buscar um filme cadastrado',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do filme a ser pesquisado',
            required: true,
            type: 'integer'
          }
        ],
        responses: {
          200: {
            description: 'Filme encontrado',
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer'
                },
                name: {
                  type: 'string'
                },
                synopsis: {
                  type: 'string'
                },
                genres: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'integer'
                      },
                      name: {
                        type: 'string'
                      }
                    }
                  }
                },
                duration: {
                  type: 'string'
                },
                language: {
                  type: 'string'
                },
                release: {
                  type: 'string'
                }
              }
            }
          },
          400: {
            description: 'Erro na requisição'
          }
        }
      },
      put: {
        tags: [
          'Filme'
        ],
        summary: 'Atualizar um filme cadastrado',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do filme a ser atualizado',
            required: true,
            type: 'integer'
          },
          {
            name: 'film',
            in: 'body',
            description: 'Dados do filme que serão atualizados',
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string'
                },
                synopsis: {
                  type: 'string'
                },
                genres: {
                  type: 'array',
                  items: {
                    type: 'integer'
                  }
                },
                duration: {
                  type: 'string'
                },
                language: {
                  type: 'string'
                },
                release: {
                  type: 'string'
                }
              }
            }
          }
        ],
        responses: {
          204: {
            description: 'Filme atualizado com sucesso'
          },
          400: {
            description: 'Erro na requisição'
          },
          422: {
            description: 'Erro de validação dos dados'
          }
        }
      },
      delete: {
        tags: [
          'Filme'
        ],
        summary: 'Excluir um filme cadastrado',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do filme a ser excluído',
            required: true,
            type: 'integer'
          }
        ],
        responses: {
          204: {
            description: 'Filme excluído com sucesso'
          },
          400: {
            description: 'Erro na requisição'
          }
        }
      }
    },
    '/genres': {
      post: {
        tags: [
          'Gênero'
        ],
        summary: 'Cadastrar um novo gênero',
        parameters: [
          {
            name: 'genre',
            in: 'body',
            description: 'Dados do gênero que será cadastrado',
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string'
                }
              },
              required: [
                'name'
              ]
            }
          }
        ],
        responses: {
          204: {
            description: 'Gênero cadastrado com sucesso'
          },
          400: {
            description: 'Erro na requisição'
          },
          422: {
            description: 'Erro de validação dos dados'
          }
        }
      },
      get: {
        tags: [
          'Gênero'
        ],
        summary: 'Listar gêneros cadastrados',
        responses: {
          200: {
            description: 'Lista de gêneros',
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer'
                  },
                  name: {
                    type: 'string'
                  }
                }
              }
            }
          },
          400: {
            description: 'Erro na requisição'
          }
        }
      }
    },
    '/genres/{id}': {
      put: {
        tags: [
          'Gênero'
        ],
        summary: 'Atualizar um gênero cadastrado',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do gênero a ser atualizado',
            required: true,
            type: 'integer'
          },
          {
            name: 'genre',
            in: 'body',
            description: 'Dados do gênero que serão atualizados',
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string'
                }
              },
              required: [
                'name'
              ]
            }
          }
        ],
        responses: {
          204: {
            description: 'Gênero atualizado com sucesso'
          },
          400: {
            description: 'Erro na requisição'
          },
          422: {
            description: 'Erro de validação dos dados'
          }
        }
      },
      delete: {
        tags: [
          'Gênero'
        ],
        summary: 'Excluir um gênero cadastrado',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do gênero a ser excluído',
            required: true,
            type: 'integer'
          }
        ],
        responses: {
          204: {
            description: 'Gênero excluído com sucesso'
          },
          400: {
            description: 'Erro na requisição'
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
