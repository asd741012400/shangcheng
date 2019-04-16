import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import common from '../public/commonality'
import { getRequest, postRequest } from './lib/axios'
Vue.use(Mint);

Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$common = common;

Vue.prototype.$getRequest = getRequest;
Vue.prototype.$postRequest = postRequest;

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
