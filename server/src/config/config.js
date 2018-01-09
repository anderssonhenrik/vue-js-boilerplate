module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'vuejsboilerplate',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || 'password',
    options: {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'sqlite', // Specify what database type sequelize should connect to
      storage: './vuejsboilerplate.sqlite'
    }
  },
  authentication: {
    jwsSecret: process.env.JWS_SECRET || 'secret'
  }
}
