<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Song metadata">
        <v-text-field
            label="Title"
            required
            :rules="[validationRules.required]"
            v-model="song.title">
        </v-text-field>

        <v-text-field
            label="Artist"
            required
            :rules="[validationRules.required]"
            v-model="song.artist">
        </v-text-field>

        <v-text-field
            label="Genre"
            required
            :rules="[validationRules.required]"
            v-model="song.genre">
        </v-text-field>

        <v-text-field
            label="Album"
            required
            :rules="[validationRules.required]"
            v-model="song.album">
        </v-text-field>

        <v-text-field
            label="Album image url"
            required
            :rules="[validationRules.required]"
            v-model="song.albumImageUrl">
        </v-text-field>

        <v-text-field
            label="Youtube ID"
            required
            :rules="[validationRules.required]"
            v-model="song.youtubeId">
        </v-text-field>
      </panel>
    </v-flex>
    <v-flex xs8>
      <panel title="Song structure" class="ml-3">
        <v-text-field
            label="Tab"
            multi-line
            required
            :rules="[validationRules.required]"
            v-model="song.tab">
        </v-text-field>

        <v-text-field
            label="Lyrics"
            multi-line
            required
            :rules="[validationRules.required]"
            v-model="song.lyrics">
        </v-text-field>
      </panel>

      <div class="error" v-if="error">{{error}}</div>

      <v-btn
        dark
        class="cyan"
        @click="save">
        Save
      </v-btn>

    </v-flex>
  </v-layout>
</template>


<script>
  import SongService from '@/services/SongService'

  export default {
    data () {
      return {
        song: {
          title: null,
          artist: null,
          genre: null,
          album: null,
          albumImageUrl: null,
          youtubeId: null,
          lyrics: null,
          tab: null
        },
        validationRules: {
          required: (value) => !!value || 'Required.'
        },
        error: null
      }
    },
    async mounted () {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongService.getSong(songId)).data
    },
    methods: {
      async save () {
        this.error = null

        const allFieldsFilled = Object
          .keys(this.song)
          .every(key => !!this.song[key])

        if (!allFieldsFilled) {
          this.error = 'Please fill all required fields.'
          return
        }

        try {
          await SongService.updateSong(this.song)
          this.$router.push({
            name: 'songs',
            params: {
              songId: this.song.id
            }
          })
        } catch (err) {

        }
      }
    }
  }
</script>


<style scoped>

</style>
