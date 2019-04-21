import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import dayjs from 'dayjs'
import common from '../public/commonality'
import { getRequest, postRequest } from './lib/axios'
import localstore from 'store2' //本地存储

// 引入全局组件
//注册全局组件
Vue.component('MyFooter', resolve => { require(['@/components/Footer'], resolve) }) //footer

//ui库
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import {CountDown} from 'vue-ydui/dist/lib.rem/countdown';
Vue.component(CountDown.name, CountDown);


//移动端调试
// import Vconsole from 'vconsole';
// const vConsole = new Vconsole();
// Vue.use(vConsole)

import { Toast } from 'mint-ui';

Vue.config.productionTip = false
Vue.prototype.$message = Toast;
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$localstore = localstore;
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
