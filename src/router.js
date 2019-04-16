import Vue from 'vue'
import Router from 'vue-router'
import Dome from './views/Dome.vue'
import Index from './views/Index.vue'
import PersonalCenter from './views/PersonalCenter.vue'
import MyShop from './views/MyShop.vue'
import CommodityDetails from './views/CommodityDetails.vue'
import CardProjectDetails from './views/CardProjectDetails.vue'
import MyCardBag from './views/MyCardBag.vue'
import CardActivate from './views/CardActivate.vue'
import UseCard from './views/UseCard.vue'
import PaySucceed from './views/PaySucceed.vue'
import WithdrawDeposit from './views/WithdrawDeposit.vue'
import MyShopUser from './views/MyShopUser.vue'
import CardDetails from './views/CardDetails.vue'
import Comment from './views/Comment.vue'
import CommentSucceed from './views/CommentSucceed.vue'
import CommodityList from './views/CommodityList.vue'
import ConfirmAnOrder from './views/ConfirmAnOrder.vue'
import ConfirmPay from './views/ConfirmPay.vue'
import DistributionTow from './views/DistributionTow.vue'
import DistributionThree from './views/DistributionThree.vue'
import CardEquity from './views/CardEquity.vue'
import CardDetailsTow from './views/CardDetailsTow.vue'
import Bargain from './views/Bargain.vue'
import ClassifyList from './views/ClassifyList.vue'
import ShopDetails from './views/ShopDetails.vue'
import City from './views/City.vue'
import SharePoster from './views/SharePoster.vue'
import MerchantShop from './views/merchant/MerchantShop.vue'
import WithdrawDepositDel from './views/merchant/WithdrawDepositDel.vue'
import TeamDel from './views/merchant/TeamDel.vue'
import TeamDelTow from './views/merchant/TeamDelTow.vue'
import MemberDel from './views/merchant/MemberDel.vue'
import Generalize from './views/merchant/Generalize.vue'
import PersonalStores from './views/merchant/PersonalStores.vue'

import localstore from 'store2' //本地存储
import { getRequest, postRequest } from './lib/axios'
const qs = require('qs')


Vue.use(Router)


let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'Dome',
            component: Index
        },
        {
            path: '/Index',
            name: 'Index',
            component: Index
        },
        {
            path: '/PersonalCenter',
            name: 'PersonalCenter',
            component: PersonalCenter
        },
        {
            path: '/MyShop',
            name: 'MyShop',
            component: MyShop
        },
        {
            path: '/CommodityDetails',
            name: 'CommodityDetails',
            component: CommodityDetails
        },
        {
            path: '/CardProjectDetails',
            name: 'CardProjectDetails',
            component: CardProjectDetails
        },
        {
            path: '/MyCardBag',
            name: 'MyCardBag',
            component: MyCardBag
        },
        {
            path: '/CardActivate',
            name: 'CardActivate',
            component: CardActivate
        },
        {
            path: '/UseCard',
            name: 'UseCard',
            component: UseCard
        },
        {
            path: '/PaySucceed',
            name: 'PaySucceed',
            component: PaySucceed
        },
        {
            path: '/WithdrawDeposit',
            name: 'WithdrawDeposit',
            component: WithdrawDeposit
        },
        {
            path: '/MyShopUser',
            name: 'MyShopUser',
            component: MyShopUser
        },
        {
            path: '/CardDetails',
            name: 'CardDetails',
            component: CardDetails
        },
        {
            path: '/Comment',
            name: 'Comment',
            component: Comment
        },
        {
            path: '/CommentSucceed',
            name: 'CommentSucceed',
            component: CommentSucceed
        },
        {
            path: '/CommodityList',
            name: 'CommodityList',
            component: CommodityList
        },
        {
            path: '/ConfirmAnOrder',
            name: 'ConfirmAnOrder',
            component: ConfirmAnOrder
        },
        {
            path: '/ConfirmPay',
            name: 'ConfirmPay',
            component: ConfirmPay
        },
        {
            path: '/DistributionTow',
            name: 'DistributionTow',
            component: DistributionTow
        },
        {
            path: '/DistributionThree',
            name: 'DistributionThree',
            component: DistributionThree
        },
        {
            path: '/CardEquity',
            name: 'CardEquity',
            component: CardEquity
        },
        {
            path: '/CardDetailsTow',
            name: 'CardDetailsTow',
            component: CardDetailsTow
        },
        {
            path: '/Bargain',
            name: 'Bargain',
            component: Bargain
        },
        {
            path: '/ClassifyList',
            name: 'ClassifyList',
            component: ClassifyList
        },
        {
            path: '/ShopDetails',
            name: 'ShopDetails',
            component: ShopDetails
        },
        {
            path: '/City',
            name: 'City',
            component: City
        },
        {
            path: '/SharePoster',
            name: 'SharePoster',
            component: SharePoster
        },
        {
            path: '/MerchantShop',
            name: 'MerchantShop',
            component: MerchantShop
        },
        {
            path: '/WithdrawDepositDel',
            name: 'WithdrawDepositDel',
            component: WithdrawDepositDel
        },
        {
            path: '/TeamDel',
            name: 'TeamDel',
            component: TeamDel
        },
        {
            path: '/TeamDelTow',
            name: 'TeamDelTow',
            component: TeamDelTow
        },
        {
            path: '/MemberDel',
            name: 'MemberDel',
            component: MemberDel
        },
        {
            path: '/Generalize',
            name: 'Generalize',
            component: Generalize
        },
        {
            path: '/PersonalStores',
            name: 'PersonalStores',
            component: PersonalStores
        },
        {
            path: '*', //404页面跳转
            redirect: '/Index'
        }
    ]
})



// 进入页面判断是否微信授权 没授权 拉取授权
//Router
// router.beforeEach((to, from, next) => {

//     let openid = getParamString('openid');
//     let openid2 = localstore.get('openid')

//     if (!openid2 && !openid) {
//         let url = window.location.href
//         getRequest('/wechat/check', { url: url }).then(res => {
//             window.location.href = res.data
//         })
//     }
//     if (openid) {
//         //保存openid
//         localstore.set('openid', openid)
//     }

//     //使用 openid 获取用户资料 缓存本地
//     getRequest('/wechat/GetUserInfo', { openid: openid || openid2 }).then(res => {
//         console.log(res);
//     })

//     next()
// })

export default router


/** 
 * 获取指定的URL参数值 
 * URL:http://www.quwan.com/index?name=tyler 
 * 参数：paramName URL参数 
 * 调用方法:getParam("name") 
 * 返回值:tyler 
 */
function getParamString(name) {
    var paramUrl = window.location.search.substr(1);
    var paramStrs = paramUrl.split('&');
    var params = {};
    for (var index = 0; index < paramStrs.length; index++) {
        params[paramStrs[index].split('=')[0]] = decodeURI(paramStrs[index].split('=')[1]);
    }
    return params[name];
}