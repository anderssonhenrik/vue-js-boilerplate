<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Register">
        <form
          name="some-form"
          autocomplete="off">

          <v-text-field
              name="email"
              label="Email"
              v-model="email"></v-text-field>
          <br />

          <v-text-field
              name="password"
              label="Password"
              type="password"
              v-model="password"
              autocomplete="new-password">
          </v-text-field>
          <br />

          <div class="danger-alert" v-html="error"></div>
          <br />

          <v-btn
            dark
            class="cyan"
            @click="register">
            Register
          </v-btn>

        </form>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        // Update store with token and user
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push('/songs')
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error { color: red; }
</style>
