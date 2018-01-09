const Joi = require('joi') // Import Joi for validation

module.exports = {
  register (req, res, next) {

    // Define a schema to validate against
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }

    // Validate req.body against schema.
    const {error,value} = Joi.validate(req.body, schema)

    if(error) {
      switch(error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: `Your password did not match the following rules:
              <br>
              1. It must contain ONLY lower case, upper case, numerics
              <br>
              2. It must be between 8-32 characters in length`
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      next()
    }

  }
}
