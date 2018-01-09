const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')

const app = express()

app.use(morgan('combined')) // Add console logging on requests to endpoints on server
app.use(bodyParser.json()) // Add easy parse of json on server
app.use(cors()) // Add cors support

// Require routes module (routes.js) with all our routes defined,
// and pass app to be used in routs module
require('./routes')(app)

// Connect sequelize to database and sync it to sequelize
// Then, start up server
//
// Tip: To clear sqlite database, just use this line instead: sequelize.sync({force: true})
// and then just save file, change back and save again, done now db is cleared.
sequelize.sync()
  .then(() => {
    app.listen(config.port)
    console.log(`--- server started on port ${config.port}`)
  })
