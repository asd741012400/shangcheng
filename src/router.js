import Vue from 'vue'
import Router from 'vue-router'
import { ENV, IMG_URL } from './config/index.js'
import localstore from 'store2' //本地存储
import { getRequest, postRequest } from './lib/axios'
import wxapi from '@/lib/wx.js'

//前台商城
import Index from './views/Index.vue'
import PersonalCenter from './views/PersonalCenter.vue' //个人中心
import MyShop from './views/MyShop.vue' //我的店铺
import MyShopUser from './views/MyShopUser.vue' //我的店铺-用户看
import CardProjectDetails from './views/CardProjectDetails.vue' //卡片项目详情
import MyCardBag from './views/MyCardBag.vue' //我的卡包
import UseCard from './views/UseCard.vue' //使用卡片
import CardActivate from './views/Cardactivate.vue' // 卡片激活
import PaySucceed from './views/PaySucceed.vue' //付款成功
import WithdrawDeposit from './views/WithdrawDeposit.vue' //申请提现
import CardDetails from './views/CardDetails.vue' //卡片详情
import GiveCard from './views/GiveCard.vue' //获取卡片
import CommodityDetails from './views/CommodityDetails.vue' //商品详情
import CommentMore from './views/CommentMore.vue' //更多评论
import Comment from './views/Comment.vue' //提交评论
import CommentSucceed from './views/CommentSucceed.vue' //评论成功
import CommodityList from './views/CommodityList.vue' //评论列表
import ConfirmAnOrder from './views/ConfirmAnOrder.vue'
import ConfirmPay from './views/ConfirmPay.vue'
import DistributionTow from './views/DistributionTow.vue' //我的推广（二级）
import DistributionThree from './views/DistributionThree.vue' //我的推广（三级）
import CardEquity from './views/CardEquity.vue' //卡包权益中心
import CardDetailsTow from './views/CardDetailsTow.vue' //卡片权益详情
import Bargain from './views/Bargain.vue'
import ClassifyList from './views/ClassifyList.vue' // 商品分类
import ShopDetails from './views/ShopDetails.vue' //门店详情
import City from './views/City.vue'
import SharePoster from './views/SharePoster.vue'
import SharePlus from './views/SharePlus.vue'
import VipOrder from './views/VipOrder.vue'
import VipOrderBuy from './views/VipOrderBuy.vue'
import VipEquity from './views/VipEquity.vue'
import Order from './views/Order.vue' //订单列表
import OrderDetail from './views/OrderDetail.vue' //订单详情
import Collect from './views/Collect.vue' //收藏
import error403 from './views/403.vue'
import error404 from './views/404.vue'
import VipPlus from './views/VipPlus.vue'


//分销商城
import Login from './views/merchant/Login.vue'
import MerchantShop from './views/merchant/MerchantShop.vue' //主页
// import ChageShop from './views/merchant/checkstore.vue' //切换门店
// import WithdrawList from './views/merchant/WithdrawList.vue' //提现列表
import WithdrawDepositDel from './views/merchant/WithdrawDepositDel.vue' //提现明细
// import MyTeam from './views/merchant/MyTeam.vue' //我的团队
// import TeamDel from './views/merchant/TeamDel.vue' //团队详情
// import MemberDel from './views/merchant/MemberDel.vue' //成员详情
import MyGeneralize from './views/merchant/MyGeneralize.vue' //我的推广
import TeamDelTow from './views/merchant/TeamDelTow.vue' //我的推广
import Generalize from './views/merchant/Generalize.vue' //我的团队(二级)
// import MyTeamTow from './views/merchant/MyTeamTow.vue' //我的团队（三级）
// import PersonalStores from './views/merchant/PersonalStores.vue' //我的店铺


//核销
// import Login2 from './views/checkstore/Login.vue'
import Administrator from './views/checkstore/Administrator.vue' //绑定管理员
// import CheckHome from './views/checkstore/Home.vue' //主页
// import CheckList from './views/checkstore/CheckList.vue' //核销记录
import StoreList from './views/checkstore/StoreList.vue' //提现记录
// import CheckCode from './views/checkstore/CheckCode.vue' //核销码核销
// import CheckWithdrawDeposit from './views/checkstore/WithdrawDeposit.vue' //申请提现
// import Commodity from './views/checkstore/Commodity.vue' //商品核销
// import CardCheck from './views/checkstore/CardCheck.vue' //卡片核销
// import CheckGoods from './views/checkstore/CheckGoods.vue'
// import CheckCard from './views/checkstore/CheckCard.vue'
// import Appointment from './views/checkstore/Appointment.vue' //预约记录


Vue.use(Router)


let router = new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'Home',
            component: Index,//商城端
            // component: DistributionTow,//商家端主页
            // component: Administrator,//核销端
        },
        {
            path: '/Index',
            name: 'Index',
            component: Index,
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
            path: '/MyShopUser',
            name: 'MyShopUser',
            component: MyShopUser
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
            path: '/UseCard',
            name: 'UseCard',
            component: UseCard
        },
        {
            path: '/CardActivate',
            name: 'CardActivate',
            component: CardActivate
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
            path: '/CardDetails',
            name: 'CardDetails',
            component: CardDetails
        },
        {
            path: '/GiveCard',
            name: 'GiveCard',
            component: GiveCard
        },
        {
            path: '/CommodityDetails',
            name: 'CommodityDetails',
            component: CommodityDetails
        },
        {
            path: '/CommentMore',
            name: 'CommentMore',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/CommentMore.vue')
        },

        {
            path: '/Comment',
            name: 'Comment',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/Comment.vue')
        },
        {
            path: '/CommentSucceed',
            name: 'CommentSucceed',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/CommentSucceed.vue')
        },
        {
            path: '/CommodityList',
            name: 'CommodityList',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/CommodityList.vue')
        },
        {
            path: '/ConfirmAnOrder',
            name: 'ConfirmAnOrder',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/ConfirmAnOrder.vue')
        },
        {
            path: '/ConfirmPay',
            name: 'ConfirmPay',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/ConfirmPay.vue')
        },
        {
            path: '/CardEquity',
            name: 'CardEquity',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/CardEquity.vue')
        },
        {
            path: '/CardDetailsTow',
            name: 'CardDetailsTow',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/CardDetailsTow.vue')
        },
        {
            path: '/Bargain',
            name: 'Bargain',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/Bargain.vue')
        },
        {
            path: '/ClassifyList',
            name: 'ClassifyList',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/ClassifyList.vue')
        },
        {
            path: '/ShopDetails',
            name: 'ShopDetails',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/ShopDetails.vue')
        },
        {
            path: '/City',
            name: 'City',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/City.vue')
        },
        {
            path: '/SharePoster',
            name: 'SharePoster',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/SharePoster.vue')
        },
        {
            path: '/SharePlus',
            name: 'SharePlus',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/SharePlus.vue')
        },
        {
            path: '/VipOrder',
            name: 'VipOrder',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/VipOrder.vue')
        },
        {
            path: '/VipOrderBuy',
            name: 'VipOrderBuy',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/VipOrderBuy.vue')
        },
        {
            path: '/VipEquity',
            name: 'VipEquity',
            component: VipEquity,
        },
        {
            path: '/Order',
            name: 'Order',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/Order.vue')
        },
        {
            path: '/OrderDetail',
            name: 'OrderDetail',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/OrderDetail.vue')
        },
        {
            path: '/Collect',
            name: 'Collect',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/Collect.vue')
        },
        {
            path: '/error403',
            name: 'error403',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/403.vue')
        },
        {
            path: '/error404',
            name: 'error404',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/404.vue')
        },
        {
            path: '/VipPlus',
            name: 'VipPlus',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/VipPlus.vue')
        },


        /*核销端*/
        {
            path: '/Administrator',
            name: 'Administrator',
            component: () => import( /* webpackChunkName: "checkstore" */ '@/views/checkstore/Administrator.vue')
        },
        {
            path: '/CheckHome',
            name: 'CheckHome',
            component: () => import( /* webpackChunkName: "checkstore" */ '@/views/checkstore/Home.vue'),
            meta: { business: true }
        },
        {
            path: '/CheckCode',
            name: 'CheckCode',
            component: () => import( /* webpackChunkName: "checkstore" */ '@/views/checkstore/CheckCode.vue'),
            meta: { business: true }
        },
        {
            path: '/CardCheck',
            name: 'CardCheck',
            component: () => import( /* webpackChunkName: "checkstore" */ '@/views/checkstore/CardCheck.vue'),
            meta: { business: true }
        },

        {
            path: '/Commodity',
            name: 'Commodity',
            component: () => import( /* webpackChunkName: "checkstore" */ '@/views/checkstore/Commodity.vue'),
            meta: { business: true }
        },
        {
            path: '/CheckList',
            name: 'CheckList',
            component: () => import( /* webpackChunkName: "checkstore" */ '@/views/checkstore/CheckList.vue'),
            meta: { business: true }
        },
        {
            path: '/StoreList',
            name: 'StoreList',
            component: () => import( /* webpackChunkName: "checkstore" */ '@/views/checkstore/StoreList.vue'),
            meta: { business: true }
        },
        {
            path: '/Appointment',
            name: 'Appointment',
            component: () => import( /* webpackChunkName: "checkstore" */ '@/views/checkstore/Appointment.vue'),
            meta: { business: true }
        },
        {
            path: '/CheckWithdrawDeposit',
            name: 'CheckWithdrawDeposit',
            component: () => import( /* webpackChunkName: "checkstore" */ '@/views/checkstore/WithdrawDeposit.vue'),
            meta: { business: true }
        },

        /*商家端*/
        {
            path: '/Login',
            name: 'Login',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/Login.vue')
        },
        {
            path: '/DistributionTow',
            name: 'DistributionTow',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/DistributionTow.vue'),
            meta: { shop: true }
        },
        {
            path: '/DistributionThree',
            name: 'DistributionThree',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/DistributionThree.vue'),
            meta: { shop: true }
        },
        {
            path: '/MerchantShop',
            name: 'MerchantShop',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/MerchantShop.vue'),
            meta: { shop: true }
        },
        {
            path: '/WithdrawList',
            name: 'WithdrawList',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/WithdrawList.vue'),
            meta: { shop: true }
        },
        {
            path: '/WithdrawDepositDel',
            name: 'WithdrawDepositDel',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/WithdrawDepositDel.vue'),
            meta: { shop: true }
        },
        {
            path: '/TeamDel',
            name: 'TeamDel',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/TeamDel.vue'),
            meta: { shop: true }
        },
        {
            path: '/MyTeam',
            name: 'MyTeam',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/MyTeam.vue'),
            meta: { shop: true }
        },
        {
            path: '/MyTeamTow',
            name: 'MyTeamTow',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/MyTeamTow.vue'),
            meta: { shop: true }
        },
        {
            path: '/ChageShop',
            name: 'ChageShop',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/checkstore/ChageShop.vue'),
            meta: { shop: true }
        },
        {
            path: '/TeamDelTow',
            name: 'TeamDelTow',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/TeamDelTow.vue'),
        },
        {
            path: '/MemberDel',
            name: 'MemberDel',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/MemberDel.vue'),
            meta: { shop: true }
        },
        {
            path: '/Generalize',
            name: 'Generalize',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/Generalize.vue'),
            meta: { shop: true }
        },
        {
            path: '/MyGeneralize',
            name: 'MyGeneralize',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/MyGeneralize.vue'),
            meta: { shop: true }
        },
        {
            path: '/PersonalStores',
            name: 'PersonalStores',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/PersonalStores.vue'),
            meta: { shop: true }
        },
        {
            path: '*', //404页面跳转
            redirect: '/Index'
        }
    ]
})


import wx from 'weixin-js-sdk' //微信sdk依赖

// 进入页面判断是否微信授权 没授权 拉取授权
//Router
router.beforeEach((to, from, next) => {

    //分享来源处理
    shareFrom(to);
    let code = getParamString('code');
    let user = localstore.get('wx_user')
    let union_id = ''
    if (user && user.union_id) {
        union_id = user.union_id
    }

    //使用code获取用户身份
    if (code) {
        getRequest('/wechat/GetCode', { code: code }).then(res => {
            if (res.data.code == 1) {
                localstore.set('wx_user', res.data.data.user)
                localstore.set('wx', res.data.data.wx)
                union_id = res.data.data.wx.unionid
                // let from_url = localstore.get('from_url')
                // if (from_url) {
                //     localstore.remove('from_url')
                //     if (from_url.length > 2) {
                //         window.location.href = '/#' + from_url
                //     }
                // }
                bindUser(union_id)
            }
        })
    } else {
        if (user) {
            getRequest('/wechat/GetUserInfo', { union_id: union_id }).then(res => {
                if (res.data.code == 1) {
                    localstore.set('wx_user', res.data.data)
                } else {
                    localstore.set('wx_user', '')
                    getAuth()
                }
            })
        }

        if (!code && !user) {
            getAuth()
        }
    }

    //门店id存储
    let business_id = getParamString('business_id');
    if (business_id) {
        localstore.set('business_id', business_id)
    }

    //用户关系绑定
    bindUser(union_id)
    //海报图预加载
    getPlUS()


    if (to.meta && !to.meta.business) {
        //每次进入自动计算用户金额
        AutoCount(union_id)
    }


    //商家端用户鉴权 拦截非法用户
    if (to.meta && to.meta.shop) {
        if (user && user.level < 2) {
            // this.$router.replace({ name: 'Login' })
            window.location.href = '/?#/Login'
        }
    }


    //核销端用户鉴权 拦截非法用户
    if (to.meta && to.meta.business) {
        let business_user = localstore.get('business_user')
        if (!business_user) {
            // this.$router.replace({ name: 'error404' })
            window.location.href = '/?#/error403'
        }
    }


    next()
})


router.afterEach((to, from) => {
    wxapi.wxRegister() //微信config注册
})

export default router

//海报图预加载
function getPlUS() {
    let plus = localstore.session.get('plus')
    if (!plus) {
        //获取PlUS
        getRequest('/home/GetPlus').then(res => {
            if (res.data.code == 1) {
                localstore.session('plus', res.data.data)
                //海报图预加载
                let imgArr = res.data.data.poster.split(',')
                imgArr.map((item) => {
                    if (!item) {
                        return false
                    }
                    let img = new Image()
                    img.src = IMG_URL + item
                    img.onload = () => {}
                })
            }
        })
    } else {
        let imgArr = plus.poster.split(',')
        imgArr.map((item) => {
            if (!item) {
                return false
            }
            let img = new Image()
            img.src = IMG_URL + item
            img.onload = () => {}
        })
    }
}


//用户关系绑定
function bindUser(union_id) {
    let has_share = localstore.session.get('has_share')
    if (union_id && has_share && has_share.query.share_id) {
        let data = {
            share_id: has_share.query.share_id,
            union_id: union_id
        }
        getRequest('/user/Recommend', data)
    }
}

//每次进入自动计算用户金额
function AutoCount(union_id) {
    if (union_id) {
        getRequest('/home/AutoCount', { union_id: union_id })
    }
}


//微信授权
function getAuth() {
    // let url = 'http://' + window.location.host;
    let url = encodeURIComponent(window.location.href);
    let hash = window.location.href.split('#')[1];

    //存储来源地址 用于授权返回
    // localstore.set('from_url', hash)s
    //微信授权
    postRequest('/wechat/check', { url: url }).then(res => {
        window.location.href = res.data
    })
}

/**
 * [shareFrom 分享来源处理]
 */
function shareFrom(to) {
    if (!isEmptyObject(to.query) && to.query.share_id) {
        //分享存储
        localstore.session('has_share', to)
    }
}

/**
 * [isEmptyObject 对象是否为空]
 * @return {Boolean}
 */
function isEmptyObject(val) {
    let res = (JSON.stringify(val) == "{}");
    return res
}


/**
 * 获取指定的URL参数值
 * URL:http://www.quwan.com/index?name=tyler
 * 参数：paramName URL参数
 * 调用方法:getParam("name")
 * 返回值:tyler
 */
const getParamString = (param) => {
    const reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)');
    const r = window.location.search.substr(1).match(reg) || window.location.hash.substring((window.location.hash.search(/\?/)) + 1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
};