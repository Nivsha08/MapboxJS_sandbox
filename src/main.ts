import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShuttleVan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShuttleVan);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
