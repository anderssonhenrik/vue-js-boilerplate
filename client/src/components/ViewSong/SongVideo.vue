<template>
  <panel title="Video">
    {{youtubeId}}
    <iframe
      id="ytplayer"
      type="text/html"
      width="640"
      height="360"
      :src="videoUrl"
      frameborder="0">
    </iframe>
  </panel>
</template>


<script>
  export default {
    computed: {
      videoUrl: function () {
        return `https://www.youtube.com/embed/${this.youtubeId}?autoplay=0&origin=http://example.com`
      }
    },
    props: [
      'youtubeId'
    ]
  }
</script>


<style scoped>

</style>
