const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password, {
    host: config.db.options.host,
    dialect: config.db.options.dialect,
    operatorsAliases: Op,
    storage: config.db.options.storage
  }
)﻿

// Get all files in this current directory (models),
// except index.js, and then for each file (each model),
// let sequlize set it up in the db.
fs
  .readdirSync(__dirname)
  .filter((file) => {
    return file !== 'index.js'
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname,file))
    db[model.name] = model
  })

db.sequelize = sequelize
db.Sequelize = Sequelize


module.exports = db
