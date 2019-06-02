import 'babel-polyfill'
import 'classlist-polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import dayjs from 'dayjs'
import common from '../public/commonality'
import { getRequest, postRequest } from './lib/axios'
import localstore from 'store2' //本地存储
import { ENV, IMG_URL, API_URL, HOME_URL } from './config/index.js'
import { validatenull, calcTime, calcTime2, ScrollTop } from './config/util.js'

import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

//剪切板
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)


// 引入全局组件
//注册全局组件
Vue.component('MyFooter', resolve => { require(['@/components/Footer'], resolve) }) //footer
Vue.component('BindPhone', resolve => { require(['@/components/BindPhone'], resolve) }) //footer
Vue.component('loadMore', resolve => { require(['@/components/loadMore'], resolve) }) //footer

//ui库
import Mint from 'mint-ui';
import { Indicator } from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import { Dialog } from 'vant';
Vue.use(Dialog);


import { CountDown } from 'vue-ydui/dist/lib.rem/countdown';
Vue.component(CountDown.name, CountDown);


//移动端调试
import Vconsole from 'vconsole';
if (!ENV) {
    const vConsole = new Vconsole();
    Vue.use(vConsole)
}

import { Toast } from 'mint-ui';

Vue.config.productionTip = false
Vue.prototype.$validatenull = validatenull;
Vue.prototype.$imgUrl = IMG_URL;
Vue.prototype.$HOME_URL = HOME_URL;
Vue.prototype.$message = Toast;
Vue.prototype.$Indicator = Indicator;
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$localstore = localstore;
Vue.prototype.$calcTime = calcTime; //到期时间计算
Vue.prototype.$calcTime2 = calcTime2; //到期时间计算
Vue.prototype.$ScrollTop = ScrollTop; // 页面滚动
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