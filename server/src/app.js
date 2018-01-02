console.log('hello world')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(morgan('combined')) // Add console logging on requests to endpoints on server
app.use(bodyParser.json()) // Add easy parse of json on server
app.use(cors()) // Add cors support

// First basic endpoint
app.post('/register', (req, res) => {
  res.send({
    message: `Hi ${req.body.email}, your user was registered.`
  })
})

app.listen(process.env.PORT || 8081)
