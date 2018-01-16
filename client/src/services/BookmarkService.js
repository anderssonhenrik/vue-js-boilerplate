import Api from '@/services/Api'

export default({
  getBookmarks (songId) {
    return Api().get('bookmarks', {
      params: {
        songId
      }
    })
  },
  createBookmark (songId, userId) {
    return Api().post('bookmarks', {
      songId,
      userId
    })
  },
  deleteBookmark (bookmarkId) {
    return Api().delete(`bookmarks/${bookmarkId}`)
  }
})
