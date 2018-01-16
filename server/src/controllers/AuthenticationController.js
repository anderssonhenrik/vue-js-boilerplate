const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

// Function for signign a user object, using the jwt library to get a jsonwebtoken
function jwtSignUser(user) {
  const oneWeek = 60 * 60 * 24 * 7;
  const secret = config.authentication.jwtSecret
  const options = { expiresIn: oneWeek }
  return jwt.sign(user, secret, options)
}

module.exports = {

 async register (req, res) {
   try {
     const user = await User.create(req.body)
     const userAsJson = user.toJSON()

     res.send({
       user: userAsJson,
       token: jwtSignUser(userAsJson)
     })

   } catch (err) {
     res.status(400).send({
       error: 'This email account is already in use'
     })
   }
 },

 async login (req, res) {
   try {
     const {email, password} = req.body
     const user = await User.findOne({
       where: {
         email: email
       }
     })

     if(!user) {
       res.status(403).send({
         error: 'The login details was incorrect'
       })
     }

     const isPasswordValid = user.comparePassword(password)

     if(!isPasswordValid) {
       res.status(403).send({
         error: 'The login details was incorrect'
       })
     }

     const userAsJson = user.toJSON()

     res.send({
       user: userAsJson,
       token: jwtSignUser(userAsJson)
     })

   } catch (err) {
     res.status(400).send({
       error: 'An error occurred while logging in'
     })
   }


 }
}
