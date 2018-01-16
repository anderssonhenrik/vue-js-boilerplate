const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const {Song} = require('../models')

module.exports = {

  async getSong (req, res) {
    try {
      const fetchedSong = await Song.findById(req.params.songId)
      res.send(fetchedSong)
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred fetching song'
      })
    }
  },

  async getSongs (req, res) {
    try {
      let songs = null;
      const search = req.query.search
      if (search) {
        console.log('------search:',search)
        songs = await Song.findAll({
          where: {
            [Op.or]: [
              'title', 'artist', 'genre', 'album'
            ].map(key => ({
              [key]: { // Search for each key (title, artist etc)
                [Op.like]: `%${search}%`
              }
            }))
          }
        })
      } else {
        songs = await Song.findAll()
      }
      res.send(songs)
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred fetching songs'
      })
    }
  },

  async createSong (req, res) {
    try {
      const song = await Song.create(req.body)
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to create the song'
      })
    }
  },

  async updateSong (req, res) {
    try {
      const song = await Song.update(req.body, {
        where: {
          id: req.params.songId
        }
      })
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to create the song'
      })
    }
  }

 }
