<template>
  <panel title="Songs">
    <div slot="actions">
      <v-btn
        icon
        to="songs/create">
        <v-icon>add</v-icon>
      </v-btn>
    </div>
    <div
      class="song"
      v-for="song in songs"
      :key="song.id">

      <v-layout>
        <v-flex xs6>
          <div class="song-title">
            {{song.title}}
          </div>
          <div class="song-artist">
            {{song.artist}}
          </div>
          <div class="song-genre">
            {{song.genre}}
          </div>

          <v-btn
            dark
            class="cyan"
            @click="navigateTo({
              name: 'song',
              params: {
                songId: song.id
              }
            })">
            View
          </v-btn>
        </v-flex>

        <v-flex xs6>
          <img class="album-image" :src="song.albumImageUrl" />
        </v-flex>
      </v-layout>
    </div>
  </panel>
</template>

<script>
import SongService from '@/services/SongService'

export default {
  name: 'Songs',
  data () {
    return {
      songs: null
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  watch: {
    '$route.query.search': { // Watch changes to route query param of 'search'
      immediate: true, // React to even inital value
      async handler (value) {
        this.songs = (await SongService.getSongs(value)).data
      }
    }
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
