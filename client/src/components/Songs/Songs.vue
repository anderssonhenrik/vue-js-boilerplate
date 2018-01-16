<template>
  <v-layout>
    <v-flex xs6 v-if="isUserLoggedIn">
      <songs-bookmarks class="mb-4" />
      <recently-viewed-songs />
    </v-flex>
    <v-flex
      :class="{
        xs12: !isUserLoggedIn,
        xs6: isUserLoggedIn
      }"
      class="ml-4">
      <songs-search-panel class="mb-4" />
      <songs-panel />
    </v-flex>
  </v-layout>
</template>

<script>
import SongService from '@/services/SongService'
import SongsPanel from './SongsPanel'
import SongsSearchPanel from './SongsSearchPanel'
import SongsBookmarks from './SongsBookmarks'
import RecentlyViewedSongs from './RecentlyViewedSongs'
import {mapState} from 'vuex' // Makes it possible to get variable from Store state without having to do $store.state.VARIABLE (see below)

export default {
  name: 'Songs',
  data () {
    return {
      songs: null
    }
  },
  components: {
    SongsPanel,
    SongsSearchPanel,
    SongsBookmarks,
    RecentlyViewedSongs
  },
  async mounted () {
    // To a request to backend for all items
    this.songs = (await SongService.getSongs()).data
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .song {
    padding: 20px;
    height: 330px;
    overflow: hidden;
  }
  .song-title {
    font-size: 30px;
  }
  .song-artist {
    font-size: 24px;
  }
  .song-genre {
    font-size: 18px;
  }
  .album-image {
    width: 70%;
    margin: 0 auto;
  }
</style>
