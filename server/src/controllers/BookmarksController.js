const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const {Bookmark, Song, User} = require('../models')

module.exports = {

  async getBookmarks (req, res) {
    try {
      const userId = req.user.id // User is set by isAuthenticated, so user is proven to be valid at this point
      const {songId} = req.query
      const where = {
        UserId: userId
      }

      if (songId) {
        where.SongId = songId
      }

      const bookmarks = await Bookmark.findAll({
        where: where,
        include: [ // For each bookmark, also return corresponding song
          {
            model: Song
          }
        ]
      })

      res.send(bookmarks)
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred fetching bookmarks'
      })
    }
  },

  async createBookmark (req, res) {
    try {
      const userId = req.user.id
      const {songId} = req.body
      const bookmarkExists = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      if(bookmarkExists) {
        res.status(400).send({
          error: 'Bookmark already exist'
        })
      }
      const newBookmark = await Bookmark.create({
        SongId: songId,
        UserId: userId
      })
      res.send(newBookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred creating the bookmark'
      })
    }
  },

  async deleteBookmark (req, res) {
    try {
      const userId = req.user.id
      const {bookmarkId} = req.params
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId,
          UserId: userId
        }
      })
      if (!bookmark) {
        req.status(403).send({
          error: 'You do not have access to this bookmark'
        })
      }
      await bookmark.destroy()
      res.send()
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred deleting the bookmark'
      })
    }
  }

 }
