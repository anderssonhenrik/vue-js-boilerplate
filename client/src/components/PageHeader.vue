<template>
  <v-toolbar
    dark
    fixed
    class="cyan">
    <v-toolbar-title class="mr-4">
      <router-link to="/">Page Title</router-link>
    </v-toolbar-title>

    <!-- <v-toolbar-items>
      <v-btn flat dark>Browse</v-btn>
    </v-toolbar-items> -->

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <button
        v-if="!$store.state.isUserLoggedIn"
        class="btn btn--flat theme--dark">
        <router-link to="/register">Sign up</router-link>
      </button>
      <button
        v-if="!$store.state.isUserLoggedIn"
        class="btn btn--flat theme--dark">
        <router-link to="/login">Login</router-link>
      </button>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
