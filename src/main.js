import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import common from '../public/commonality'
Vue.use(Mint);
Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$common = common;
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
