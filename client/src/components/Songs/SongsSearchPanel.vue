<template>
  <panel title="Search">
    <v-text-field
        name="search"
        label="Search by song title, artist, album or genre"
        v-model="search"></v-text-field>
    <br />
  </panel>
</template>

<script>
import _ from 'lodash'

export default {
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search: _.debounce(async function (value) { // Watch data property of search declared above for changes
      const route = { name: 'songs' }
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route)
    }, 700),
    '$route.query.search': { // Watch changes to route query param of 'search'
      immediate: true, // React to even inital value
      handler (value) {
        this.search = value
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
