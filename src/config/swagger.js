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
    },
    {
      name: 'Genre',
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
  security: [
    {
      Authorization: []
    }
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
          201: {
            description: 'User registered',
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
          201: {
            description: 'User created',
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
            name: 'page',
            in: 'query',
            description: 'Page number',
            type: 'integer'
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Records per page',
            type: 'integer'
          },
          {
            name: 'name',
            in: 'query',
            description: 'User name',
            type: 'string'
          },
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
                persons: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'integer'
                      },
                      role: {
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
              },
              required: [
                'name',
                'synopsis',
                'genres',
                'persons',
                'duration',
                'language',
                'release'
              ]
            }
          }
        ],
        responses: {
          201: {
            description: 'Film created',
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
                participations: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'integer'
                      },
                      role: {
                        type: 'string'
                      },
                      person: {
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
                },
                average_ratings: {
                  type: 'integer'
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
          'Film'
        ],
        summary: 'List films',
        parameters: [
          {
            name: 'page',
            in: 'query',
            description: 'Page number',
            type: 'integer'
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Records per page',
            type: 'integer'
          },
          {
            name: 'name',
            in: 'query',
            description: 'Film name',
            type: 'string'
          },
          {
            name: 'rating',
            in: 'query',
            description: 'Average film rating',
            type: 'integer'
          },
          {
            name: 'genre',
            in: 'query',
            description: 'Genre ID',
            type: 'integer'
          },
          {
            name: 'person',
            in: 'query',
            description: 'Person name',
            type: 'string'
          },
          {
            name: 'role',
            in: 'query',
            description: 'Person role',
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'Film list',
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
                  },
                  average_ratings: {
                    type: 'integer'
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
                participations: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'integer'
                      },
                      role: {
                        type: 'string'
                      },
                      person: {
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
                },
                average_ratings: {
                  type: 'integer'
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
                persons: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'integer'
                      },
                      role: {
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
    '/films/{id}/rating': {
      post: {
        tags: [
          'Film'
        ],
        summary: 'Rate film',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Film ID',
            required: true,
            type: 'integer'
          },
          {
            name: 'rating',
            in: 'body',
            description: 'User vote',
            required: true,
            schema: {
              type: 'object',
              properties: {
                value: {
                  type: 'integer'
                }
              }
            }
          }
        ],
        responses: {
          204: {
            description: 'Film rated successfully'
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
        parameters: [
          {
            name: 'page',
            in: 'query',
            description: 'Page number',
            type: 'integer'
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Records per page',
            type: 'integer'
          },
          {
            name: 'name',
            in: 'query',
            description: 'Person name',
            type: 'string'
          }
        ],
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
    },
    '/genres': {
      post: {
        tags: [
          'Genre'
        ],
        summary: 'Create genre',
        parameters: [
          {
            name: 'genre',
            in: 'body',
            description: 'Genre data',
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
          201: {
            description: 'Genre created',
            schema: {
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
          'Genre'
        ],
        summary: 'List genres',
        parameters: [
          {
            name: 'page',
            in: 'query',
            description: 'Page number',
            type: 'integer'
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Records per page',
            type: 'integer'
          },
          {
            name: 'name',
            in: 'query',
            description: 'Genre name',
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'Genre list',
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
    '/genres/{id}': {
      put: {
        tags: [
          'Genre'
        ],
        summary: 'Update genre',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Genre ID',
            required: true,
            type: 'integer'
          },
          {
            name: 'genre',
            in: 'body',
            description: 'Genre data',
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
            description: 'Genre updated successfully'
          },
          400: {
            description: 'Bad request'
          },
          422: {
            description: 'Data validation error'
          }
        }
      },
      delete: {
        tags: [
          'Genre'
        ],
        summary: 'Delete genre',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Genre ID',
            required: true,
            type: 'integer'
          }
        ],
        responses: {
          204: {
            description: 'Genre deleted successfully'
          },
          400: {
            description: 'Bad request'
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
