const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
const HistoriesController = require('./controllers/HistoriesController')
const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  // This is express.js middleware, it will run the functions listed on the endpoint
  // in sequence. For one method to execute the next one, the method should say: next()
  app.post('/register',
    AuthenticationControllerPolicy.register, // Run first - validate request
    AuthenticationController.register) // Run second - actually hadle the request

  app.post('/login',
    AuthenticationController.login)

  app.get('/songs',
    SongsController.getSongs)
  app.get('/songs/:songId',
    SongsController.getSong)
  app.put('/songs/:songId',
    SongsController.updateSong)
  app.post('/songs',
    SongsController.createSong)

  app.get('/bookmarks',
    isAuthenticated, // Validate that user is logged in, and has a valid jwt token
    BookmarksController.getBookmarks)
  app.post('/bookmarks',
    isAuthenticated, // Validate that user is logged in, and has a valid jwt token
    BookmarksController.createBookmark)
  app.delete('/bookmarks/:bookmarkId',
    isAuthenticated, // Validate that user is logged in, and has a valid jwt token
    BookmarksController.deleteBookmark)

  app.get('/histories',
    isAuthenticated, // Validate that user is logged in, and has a valid jwt token
    HistoriesController.getHistories)
  app.post('/histories',
    isAuthenticated, // Validate that user is logged in, and has a valid jwt token
    HistoriesController.createHistory)
}
