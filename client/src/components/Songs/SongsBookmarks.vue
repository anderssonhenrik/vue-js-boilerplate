<template>
  <panel title="Bookmarks">

    <v-data-table
      v-bind:headers="headers"
      :pagination.sync="pagination"
      :items="bookmarks">

      <template slot="items" slot-scope="props">
        <tr>
          <td class="text-xs-right">
            {{props.item.Song.title}}
          </td>
          <td class="text-xs-right">
            {{props.item.Song.artist}}
          </td>
        </tr>
      </template>

    </v-data-table>

  </panel>
</template>

<script>
import {mapState} from 'vuex' // Makes it possible to get variable from Store state without having to do $store.state.VARIABLE (see below)
import BookmarkService from '@/services/BookmarkService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Artist',
          value: 'artist'
        }
      ],
      pagination: {
        sortBy: 'createdAt'
      },
      bookmarks: []
    }
  },
  computed: {
    ...mapState([ // Make user and isUserLoggedIn from state in Store accessible as a computed variable
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.bookmarks = (await BookmarkService.getBookmarks()).data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
