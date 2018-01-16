<template>
  <div>
    <v-layout>

      <v-flex xs6>
        <song-meta-data :song="song"> </song-meta-data>

        <v-btn
          dark
          class="cyan"
          to="{
            name: 'song-edit',
            params () {
              return {
                songId: song.id
              }
            }
          }">
          Edit
        </v-btn>
        <v-btn
          dark
          class="cyan"
          v-if="isUserLoggedIn && !bookmark"
          @click="setAsBookmark()">
          Set as bookmark
        </v-btn>
        <v-btn
          dark
          class="cyan"
          v-if="isUserLoggedIn && bookmark"
          @click="unsetAsBookmark()">
          Unset bookmark
        </v-btn>
      </v-flex>

      <v-flex xs6 class="ml-4">
        <song-video :youtubeId="song.youtubeId"></song-video>
      </v-flex>
    </v-layout>

    <v-layout class="mt-4">
      <v-flex xs6>
        <song-tab :tab="song.tab"></song-tab>
      </v-flex>

      <v-flex xs6 class="ml-4">
        <song-lyrics :lyrics="song.lyrics"></song-lyrics>
      </v-flex>
    </v-layout>
  </div>
</template>


<script>
  import SongService from '@/services/SongService'
  import SongMetaData from './SongMetaData'
  import SongVideo from './SongVideo'
  import SongLyrics from './SongLyrics'
  import SongTab from './SongTab'
  import {mapState} from 'vuex' // Makes it possible to get variable from Store state without having to do $store.state.VARIABLE (see below)
  import BookmarkService from '@/services/BookmarkService'
  import SongHistoryService from '@/services/SongHistoryService'

  export default {
    data () {
      return {
        song: {},
        bookmark: null
      }
    },
    async mounted () {
      const songId = this.route.params.songId

      try {
        this.song = (await SongService.getSong(songId)).data
      } catch (err) {
        // Error
      }

      // If user not logged in, abort from here
      if (!this.isUserLoggedIn) { return }

      try {
        const bookmarks = (await BookmarkService.getBookmarks(
          this.song.id
        )).data
        if (bookmarks.length) {
          this.bookmark = bookmarks[0]
        }
      } catch (err) {
        // Error
      }

      try {
        await SongHistoryService.createHistory({
          songId: songId
        })
      } catch (err) {
        // Error
      }
    },
    components: {
      SongMetaData,
      SongVideo,
      SongLyrics,
      SongTab
    },
    methods: {
      async setAsBookmark () {
        try {
          this.bookmark = (await BookmarkService.createBookmark(
            this.song.id)).data
        } catch (err) {
          // Error
        }
      },
      async unsetAsBookmark () {
        try {
          await BookmarkService.deleteBookmark(this.bookmark.id)
          this.bookmark = null
        } catch (err) {
          // Error
        }
      }
    },
    computed: {
      ...mapState([ // Make user and isUserLoggedIn from state in Store accessible as a computed variable
        'isUserLoggedIn',
        'user',
        'route'
      ])
    }
  }
</script>


<style scoped>
</style>
