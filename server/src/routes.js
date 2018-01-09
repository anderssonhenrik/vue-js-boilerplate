const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  // This is express.js middleware, it will run the functions listed on the endpoint
  // in sequence. For one method to execute the next one, the method should say: next()
  app.post('/register',
    AuthenticationControllerPolicy.register, // Run first - validate request
    AuthenticationController.register) // Run second - actually hadle the request

  app.post('/login',
    AuthenticationController.login)
}
