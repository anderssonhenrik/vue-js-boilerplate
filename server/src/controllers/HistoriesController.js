const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const {History, Song, User} = require('../models')

module.exports = {

  async getHistories (req, res) {
    try {
      const userId = req.user.id
      const histories = await History.findAll({
        where: {
          UserId: userId
        },
        include: [ // For each bookmark, also return corresponding song
          {
            model: Song
          }
        ]
      })

      res.send(histories)
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred fetching histories'
      })
    }
  },

  async createHistory (req, res) {
    try {
      const userId = req.user.id
      const {songId} = req.body
      const history = await History.create({
        SongId: songId,
        UserId: userId
      })
      res.send(history)
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred creating the history object'
      })
    }
  }

 }
