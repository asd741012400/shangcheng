import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import dayjs from 'dayjs'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import common from '../public/commonality'
import { getRequest, postRequest } from './lib/axios'
Vue.use(Mint);

//移动端调试
import Vconsole from 'vconsole';
const vConsole = new Vconsole();
Vue.use(vConsole)


import { Toast } from 'mint-ui';

Vue.config.productionTip = false
Vue.prototype.$message = Toast;
Vue.prototype.$dayjs = dayjs;
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
