import Vue from 'vue'
import Router from 'vue-router'


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
// import ChageShop from './views/merchant/ChageShop.vue' //切换门店
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


import localstore from 'store2' //本地存储
import { getRequest, postRequest } from './lib/axios'
const qs = require('qs')


Vue.use(Router)


let router = new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'Home',
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
            path: '/DistributionTow',
            name: 'DistributionTow',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/DistributionTow.vue')
        },
        {
            path: '/DistributionThree',
            name: 'DistributionThree',
            component: () => import( /* webpackChunkName: "Home" */ '@/views/DistributionThree.vue')
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
            component: VipEquity
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
            path: '/Login2',
            name: 'Login2',
            component: () => import( /* webpackChunkName: "checkstore" */ '@/views/checkstore/Login.vue')
        },
        {
            path: '/Administrator',
            name: 'Administrator',
            component: () => import( /* webpackChunkName: "checkstore" */ '@/views/checkstore/Administrator.vue')
        },
        {
            path: '/CheckHome',
            name: 'CheckHome',
            component: () => import( /* webpackChunkName: "checkstore" */ '@/views/checkstore/Home.vue')
        },
        {
            path: '/CheckCode',
            name: 'CheckCode',
            component: () => import( /* webpackChunkName: "checkstore" */ '@/views/checkstore/CheckCode.vue')
        },
        {
            path: '/CardCheck',
            name: 'CardCheck',
            component: () => import( /* webpackChunkName: "checkstore" */ '@/views/checkstore/CardCheck.vue')
        },

        {
            path: '/Commodity',
            name: 'Commodity',
            component: () => import( /* webpackChunkName: "checkstore" */ '@/views/checkstore/Commodity.vue')
        },
        {
            path: '/CheckList',
            name: 'CheckList',
            component: () => import( /* webpackChunkName: "checkstore" */ '@/views/checkstore/CheckList.vue')
        },
        {
            path: '/StoreList',
            name: 'StoreList',
            component: () => import( /* webpackChunkName: "checkstore" */ '@/views/checkstore/StoreList.vue')
        },
        {
            path: '/Appointment',
            name: 'Appointment',
            component: () => import( /* webpackChunkName: "checkstore" */ '@/views/checkstore/Appointment.vue')
        },
        {
            path: '/CheckWithdrawDeposit',
            name: 'CheckWithdrawDeposit',
            component: () => import( /* webpackChunkName: "checkstore" */ '@/views/checkstore/WithdrawDeposit.vue')
        },

        /*商家端*/
        {
            path: '/Login',
            name: 'Login',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/Login.vue')
        },
        {
            path: '/MerchantShop',
            name: 'MerchantShop',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/MerchantShop.vue')
        },
        {
            path: '/WithdrawList',
            name: 'WithdrawList',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/WithdrawList.vue')
        },
        {
            path: '/WithdrawDepositDel',
            name: 'WithdrawDepositDel',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/WithdrawDepositDel.vue')
        },
        {
            path: '/TeamDel',
            name: 'TeamDel',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/TeamDel.vue')
        },
        {
            path: '/MyTeam',
            name: 'MyTeam',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/MyTeam.vue')
        },
        {
            path: '/MyTeamTow',
            name: 'MyTeamTow',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/MyTeamTow.vue')
        },
        {
            path: '/ChageShop',
            name: 'ChageShop',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/ChageShop.vue')
        },
        {
            path: '/TeamDelTow',
            name: 'TeamDelTow',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/TeamDelTow.vue')
        },
        {
            path: '/MemberDel',
            name: 'MemberDel',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/MemberDel.vue')
        },
        {
            path: '/Generalize',
            name: 'Generalize',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/Generalize.vue')
        },
        {
            path: '/MyGeneralize',
            name: 'MyGeneralize',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/MyGeneralize.vue')
        },
        {
            path: '/PersonalStores',
            name: 'PersonalStores',
            component: () => import( /* webpackChunkName: "merchant" */ '@/views/merchant/PersonalStores.vue')
        },
        {
            path: '*', //404页面跳转
            redirect: '/Index'
        }
    ]
})


import wx from 'weixin-js-sdk' //微信sdk依赖
import Cookies from 'js-cookie';

// 进入页面判断是否微信授权 没授权 拉取授权
//Router
router.beforeEach((to, from, next) => {
    //存储来源地址 用于分享返回主页
    localstore.set('from_url', business_id)

    //分享来源处理
    shareFrom(to);
    let code = getParamString('code');
    let user = localstore.get('WxAuth')
    if (!code && !user) {
        getAuth()
    }

    //使用code获取用户身份
    if (code) {
        getRequest('/wechat/GetCode', { code: code }).then(res => {
            if (res.data.code == 1) {
                localstore.set('WxAuth', res.data.data)
            } else {
                if (!user) {
                    getAuth()
                }
            }
        })
    }



    //门店id存储
    let business_id = getParamString('business_id');
    if (business_id) {
        localstore.set('business_id', business_id)
    }


    //判断用户头像链接是否存在 否则缓存
    userAvatar()


    //用户来自分享  但未注册
    if (!user && to.query.share_id) {
        let data = {
            share_id: to.query.share_id,
            union_id: user.unionid
        }
        getRequest('/user/Recommend', data)
    }


    //判断是否会员分享
    if (to.name == 'VipEquity' || to.name == 'CardDetails' || to.name == 'CommodityDetails') {
        // next()
    } else {
        let share = localstore.get('to_share')
        // if (share && share.name) {
        //     localstore.set('to_share', '')
        //     localstore.set('has_share', share)
        //     next({ name: share.name, query: share.query })
        // }
    }

    next()
})



export default router

//微信授权
function getAuth() {
    let url = encodeURIComponent(window.location.href.split('#')[0]);
    //微信授权
    getRequest('/wechat/check', { url: url }).then(res => {
        window.location.href = res.data
    })
}

/**
 * [shareFrom 分享来源处理]
 */
function shareFrom(to) {
    if (!isEmptyObject(to.query) && to.query.share_id) {
        //分享存储
        localstore.set('has_share', to)
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

// 用户头像设置
function userAvatar() {
    let avatar = localstore.get('avatar')
    let user = localstore.get('userInfo')
    if (!avatar && user) {
        let image = new Image();
        image.src = user.wechat_img;
        image.onload = async () => {
            let base64 = getBase64Image(image);
            localstore.set('avatar', base64)
            // postRequest('/upload/UpBase64Image', { img: base64 }).then((res) => {
            //     if (res.data.code == 1) {
            //         localstore.set('avatar', res.data.data)
            //     }
            // })
        }
    }
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    var dataURL = canvas.toDataURL("image/" + ext);
    return dataURL;
}

/**
 * 获取指定的URL参数值
 * URL:http://www.quwan.com/index?name=tyler
 * 参数：paramName URL参数
 * 调用方法:getParam("name")
 * 返回值:tyler
 */
function getParamString(name) {
    var url = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var newUrl = window.location.search.substr(1).match(url);
    if (newUrl != null) {
        return unescape(newUrl[2]);
    } else {
        return false;
    }
}