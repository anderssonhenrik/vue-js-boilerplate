// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync' // Keeps routing state updated in store automatically
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/store'
import Panel from '@/components/global/Panel'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.component('panel', Panel) // Make our component 'Panel' globally accessible, so we don't have to import it in all components

// Use vuex-router-sync to sync vuex store to router
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
