module.exports = {
  user: {
    'name.required': 'O nome é obrigatório',
    'name.min': 'O nome deve possuir no mínimo 3 caracteres',
    'username.required': 'O nome de usuário é obrigatório',
    'username.unique': 'Este nome de usuário já está cadastrado',
    'username.min': 'O nome de usuário deve possuir no mínimo 3 dígitos',
    'username.max': 'O nome de usuário deve possuir no máximo 30 dígitos',
    'password.required': 'A senha é obrigatória',
    'password.min': 'A senha deve possuir no mínimo 6 caracteres',
    'role.required': 'O tipo de usuário é obrigatório',
    'role.in': 'Tipo de usuário inválido',
    'email.required': 'O email é obrigatório',
    'email.email': 'Formato de email inválido',
    'email.unique': 'Este email já está cadastrado',
    'users.array': 'É esperado um vetor com ID de usuários',
    'status.required': 'O status é obrigatório',
    'status.in': 'Status inválido'
  },
  film: {
    'name.required': 'O nome é obrigatório',
    'synopsis.required': 'A sinopse é obrigatória',
    'genres.required': 'A lista de gêneros é obrigatória',
    'genres.array': 'É esperado um vetor com IDs de gêneros',
    'genres.min': 'Deve ser informado pelo menos um gênero',
    'language.required': 'O idioma é obrigatório',
    'release.required': 'A data de lançamento é obrigatória',
    'release.date': 'Formato de data inválido',
    'duration.required': 'O tempo de duração é obrigatório',
    'duration.regex': 'Formato de tempo inválido'
  },
  genre: {

  },
  person: {
    'name.required': 'O nome é obrigatório'
  }
}
