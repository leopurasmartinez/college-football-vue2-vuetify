import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'
import i18n from './i18n'
import '@/api/interceptors'
import './assets/tailwind.css'
import utilities from '@/assets/utilities.js'
import globals from '@/assets/globals.js'

Vue.prototype.EventBus = new Vue();
Vue.prototype.utilities = utilities
Vue.prototype.globals = globals

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')

