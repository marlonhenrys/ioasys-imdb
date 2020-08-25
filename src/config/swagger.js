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
      name: 'Authentication',
      description: 'Sign Up / Sign In'
    },
    {
      name: 'User',
      description: 'CRUD'
    },
    {
      name: 'Film',
      description: 'CRUD'
    },
    {
      name: 'Person',
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
          'Authentication'
        ],
        summary: 'Register user',
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'User data',
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
            description: 'Registered user successfully'
          },
          400: {
            description: 'Bad request'
          },
          422: {
            description: 'Data validation error'
          }
        }
      }
    },
    '/signin': {
      post: {
        tags: [
          'Authentication'
        ],
        summary: 'Authenticate user',
        parameters: [
          {
            name: 'credentials',
            in: 'body',
            description: 'Access credentials',
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
            description: 'Authenticated user',
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
            description: 'Unauthorized'
          }
        }
      }
    },
    '/users': {
      post: {
        tags: [
          'User'
        ],
        summary: 'Create user',
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'User data',
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
            description: 'User created successfully'
          },
          400: {
            description: 'Bad request'
          },
          422: {
            description: 'Data validation error'
          }
        }
      },
      get: {
        tags: [
          'User'
        ],
        summary: 'List users',
        parameters: [
          {
            name: 'role',
            in: 'query',
            description: 'User role',
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'User list',
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
            description: 'Bad request'
          }
        }
      },
      patch: {
        tags: [
          'User'
        ],
        summary: 'Update status',
        parameters: [
          {
            name: 'users, status',
            in: 'body',
            description: 'User list',
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
            description: 'Updated status successfully'
          },
          400: {
            description: 'Bad request'
          },
          404: {
            description: 'User not found'
          },
          422: {
            description: 'Data validation error'
          }
        }
      }
    },
    '/users/{id}': {
      get: {
        tags: [
          'User'
        ],
        summary: 'Find user',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'User ID',
            required: true,
            type: 'integer'
          }
        ],
        responses: {
          200: {
            description: 'User found',
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
            description: 'Bad request'
          },
          404: {
            description: 'User not found'
          }
        }
      },
      put: {
        tags: [
          'User'
        ],
        summary: 'Update user',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'User ID',
            required: true,
            type: 'integer'
          },
          {
            name: 'user',
            in: 'body',
            description: 'User data',
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
            description: 'Updated user successfully'
          },
          400: {
            description: 'Bad request'
          },
          404: {
            description: 'User not found'
          },
          422: {
            description: 'Data validation error'
          }
        }
      },
      delete: {
        tags: [
          'User'
        ],
        summary: 'Delete user',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'User ID',
            required: true,
            type: 'integer'
          }
        ],
        responses: {
          204: {
            description: 'User deleted successfully'
          },
          400: {
            description: 'Bad request'
          },
          404: {
            description: 'User not found'
          },
          422: {
            description: 'Data validation error'
          }
        }
      }
    },
    '/films': {
      post: {
        tags: [
          'Film'
        ],
        summary: 'Create film',
        parameters: [
          {
            name: 'film',
            in: 'body',
            description: 'Film data',
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
            description: 'Film created successfully'
          },
          400: {
            description: 'Bad request'
          },
          422: {
            description: 'Data validation error'
          }
        }
      },
      get: {
        tags: [
          'Film'
        ],
        summary: 'List films',
        responses: {
          200: {
            description: 'Film list',
            schema: {
              type: 'array',
              items: {
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
            description: 'Bad request'
          }
        }
      }
    },
    '/films/{id}': {
      get: {
        tags: [
          'Film'
        ],
        summary: 'Find film',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Film ID',
            required: true,
            type: 'integer'
          }
        ],
        responses: {
          200: {
            description: 'Film found',
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
            description: 'Bad request'
          },
          404: {
            description: 'Film not found'
          }
        }
      },
      put: {
        tags: [
          'Film'
        ],
        summary: 'Update film',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Film ID',
            required: true,
            type: 'integer'
          },
          {
            name: 'film',
            in: 'body',
            description: 'Film data',
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
            description: 'Film updated successfully'
          },
          400: {
            description: 'Bad request'
          },
          404: {
            description: 'Film not found'
          },
          422: {
            description: 'Data validation error'
          }
        }
      },
      delete: {
        tags: [
          'Film'
        ],
        summary: 'Delete film',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Film ID',
            required: true,
            type: 'integer'
          }
        ],
        responses: {
          204: {
            description: 'Film deleted successfully'
          },
          400: {
            description: 'Bad request'
          },
          404: {
            description: 'Film not found'
          }
        }
      }
    },

    '/persons': {
      post: {
        tags: [
          'Person'
        ],
        summary: 'Create person',
        parameters: [
          {
            name: 'person',
            in: 'body',
            description: 'Person data',
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string'
                },
                biography: {
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
          201: {
            description: 'Person created',
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer'
                },
                name: {
                  type: 'string'
                },
                biography: {
                  type: 'string'
                },
                created_at: {
                  type: 'string'
                },
                updated_at: {
                  type: 'string'
                }
              }
            }
          },
          400: {
            description: 'Bad request'
          },
          422: {
            description: 'Data validation error'
          }
        }
      },
      get: {
        tags: [
          'Person'
        ],
        summary: 'List persons',
        responses: {
          200: {
            description: 'Person list',
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
            description: 'Bad request'
          }
        }
      }
    },
    '/persons/{id}': {
      get: {
        tags: [
          'Person'
        ],
        summary: 'Find person',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Person ID',
            required: true,
            type: 'integer'
          }
        ],
        responses: {
          200: {
            description: 'Person found',
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer'
                },
                name: {
                  type: 'string'
                },
                biography: {
                  type: 'string'
                }
              }
            }
          },
          404: {
            description: 'Person not found'
          }
        }
      },
      put: {
        tags: [
          'Person'
        ],
        summary: 'Update person',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Person ID',
            required: true,
            type: 'integer'
          },
          {
            name: 'person',
            in: 'body',
            description: 'Person data',
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string'
                },
                biography: {
                  type: 'string'
                }
              }
            }
          }
        ],
        responses: {
          204: {
            description: 'Person updated successfully'
          },
          400: {
            description: 'Bad request'
          },
          404: {
            description: 'Person not found'
          },
          422: {
            description: 'Data validation error'
          }
        }
      },
      delete: {
        tags: [
          'Person'
        ],
        summary: 'Delete person',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Person ID',
            required: true,
            type: 'integer'
          }
        ],
        responses: {
          204: {
            description: 'Person deleted successfully'
          },
          404: {
            description: 'Person not found'
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
