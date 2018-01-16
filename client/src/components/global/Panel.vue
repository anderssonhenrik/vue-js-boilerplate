<template>
  <div class="white elevation-2">
    <v-toolbar flat dense dark class="cyan">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <slot name="actions"></slot> <!-- any elements wrapped in <div slot="actions">elements</div> will be placed here -->
    </v-toolbar>
    <div class="pl-4 pr-4 pt-2 pb-2">
      <!-- <slot> tag is where whatever content you place in <panel></panel> will be included -->
      <slot>
        No slot content defined.
      </slot>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: [
    'title'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
