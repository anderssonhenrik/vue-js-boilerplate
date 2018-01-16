import Api from '@/services/Api'

export default({
  getHistories (userId) {
    return Api().get('histories')
  },
  createHistory (history) {
    return Api().post('histories', history)
  }
})
