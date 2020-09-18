require('dotenv').config()

module.exports = {
  dialect: process.env.DB_DIALECT,
  host:
    process.env.NODE_ENV === 'test'
      ? process.env.DB_HOST_TEST
      : process.env.DB_HOST,
  username:
    process.env.NODE_ENV === 'test'
      ? process.env.DB_USER_TEST
      : process.env.DB_USER,
  password:
    process.env.NODE_ENV === 'test'
      ? process.env.DB_PASS_TEST
      : process.env.DB_PASS,
  database:
    process.env.NODE_ENV === 'test'
      ? process.env.DB_NAME_TEST
      : process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true
  }
}
