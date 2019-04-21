import Vue from 'vue'
import Router from 'vue-router'


//前台商城
import Index from './views/Index.vue'
import PersonalCenter from './views/PersonalCenter.vue' //个人中心
import MyShop from './views/MyShop.vue' //我的店铺
import MyShopUser from './views/MyShopUser.vue' //我的店铺-用户看
import CardProjectDetails from './views/CardProjectDetails.vue' //卡片项目详情
import MyCardBag from './views/MyCardBag.vue' //我的卡包
import UseCard from './views/UseCard.vue'  //使用卡片
import CardActivate from './views/Cardactivate.vue'  // 卡片激活
import PaySucceed from './views/PaySucceed.vue' //付款成功
import WithdrawDeposit from './views/WithdrawDeposit.vue' //提现详情
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
import CardDetailsTow from './views/CardDetailsTow.vue' //卡片详情
import Bargain from './views/Bargain.vue'
import ClassifyList from './views/ClassifyList.vue' // 商品分类
import ShopDetails from './views/ShopDetails.vue' //门店详情
import City from './views/City.vue'
import SharePoster from './views/SharePoster.vue'
import VipOrder from './views/VipOrder.vue'
import VipOrderBuy from './views/VipOrderBuy.vue'
import VipEquity from './views/VipEquity.vue'
import Order from './views/Order.vue'  //订单列表
import OrderDetail from './views/OrderDetail.vue'  //订单详情
import Collect from './views/Collect.vue'  //收藏
import error403 from './views/403.vue'
import error404 from './views/404.vue'



//分销商城
import Login from './views/merchant/Login.vue'
import MerchantShop from './views/merchant/MerchantShop.vue' //主页
import ChageShop from './views/merchant/ChageShop.vue' //切换门店
import WithdrawList from './views/merchant/WithdrawList.vue'//提现列表
import WithdrawDepositDel from './views/merchant/WithdrawDepositDel.vue' //提现明细
import MyTeam from './views/merchant/MyTeam.vue' //我的团队
import TeamDel from './views/merchant/TeamDel.vue'  //团队详情
import MemberDel from './views/merchant/MemberDel.vue' //成员详情
import MyTeamTow from './views/merchant/MyTeamTow.vue' //我的团队(有切换的)
import TeamDelTow from './views/merchant/TeamDelTow.vue' //我的团队（二级）
import MyGeneralize from './views/merchant/MyGeneralize.vue' //我的团队（二级）
import Generalize from './views/merchant/Generalize.vue'  //我的推广
import PersonalStores from './views/merchant/PersonalStores.vue' //我的店铺


//核销
import Login2 from './views/checkstore/Login.vue'
import Administrator from './views/checkstore/Administrator.vue' //绑定管理员
import CheckHome from './views/checkstore/Home.vue' //主页
import CheckList from './views/checkstore/CheckList.vue' //核销记录
import StoreList from './views/checkstore/StoreList.vue' //提现记录
import CheckCode from './views/checkstore/CheckCode.vue' //核销码核销
import CheckWithdrawDeposit from './views/checkstore/WithdrawDeposit.vue' //申请提现
import Commodity from './views/checkstore/Commodity.vue' //商品核销
import CardCheck from './views/checkstore/CardCheck.vue' //卡片核销
import CheckGoods from './views/checkstore/CheckGoods.vue'
import CheckCard from './views/checkstore/CheckCard.vue'
import Appointment from './views/checkstore/Appointment.vue' //预约记录


import localstore from 'store2' //本地存储
import { getRequest, postRequest } from './lib/axios'
const qs = require('qs')


Vue.use(Router)


let router = new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
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
            path: '/Login',
            name: 'Login',
            component: Login
        },
        {
            path: '/Login2',
            name: 'Login2',
            component: Login2
        },
        {
            path: '/Administrator',
            name: 'Administrator',
            component: Administrator
        },
        {
            path: '/CheckHome',
            name: 'CheckHome',
            component: CheckHome
        },
        {
            path: '/CheckCode',
            name: 'CheckCode',
            component: CheckCode
        },
        {
            path: '/CardCheck',
            name: 'CardCheck',
            component: CardCheck
        },
        {
            path: '/CheckWithdrawDeposit',
            name: 'CheckWithdrawDeposit',
            component: CheckWithdrawDeposit
        },
        {
            path: '/Commodity',
            name: 'Commodity',
            component: Commodity
        },
        {
            path: '/CheckList',
            name: 'CheckList',
            component: CheckList
        },
        {
            path: '/StoreList',
            name: 'StoreList',
            component: StoreList
        },
        {
            path: '/Appointment',
            name: 'Appointment',
            component: Appointment
        },
        {
            path: '/WithdrawList',
            name: 'WithdrawList',
            component: WithdrawList
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
            path: '/CommentMore',
            name: 'CommentMore',
            component: CommentMore
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
            path: '/Order',
            name: 'Order',
            component: Order
        },
        {
            path: '/OrderDetail',
            name: 'OrderDetail',
            component: OrderDetail
        },
        {
            path: '/Collect',
            name: 'Collect',
            component: Collect
        },
        {
            path: '/SharePoster',
            name: 'SharePoster',
            component: SharePoster
        },
        {
            path: '/VipOrder',
            name: 'VipOrder',
            component: VipOrder
        },
        {
            path: '/VipOrderBuy',
            name: 'VipOrderBuy',
            component: VipOrderBuy
        },
        {
            path: '/VipEquity',
            name: 'VipEquity',
            component: VipEquity
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
            path: '/MyTeam',
            name: 'MyTeam',
            component: MyTeam
        },
        {
            path: '/MyTeamTow',
            name: 'MyTeamTow',
            component: MyTeamTow
        },
        {
            path: '/ChageShop',
            name: 'ChageShop',
            component: ChageShop
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
            path: '/MyGeneralize',
            name: 'MyGeneralize',
            component: MyGeneralize
        },
        {
            path: '/PersonalStores',
            name: 'PersonalStores',
            component: PersonalStores
        },
        {
            path: '/error403',
            name: 'error403',
            component: error403
        },
        {
            path: '/error404',
            name: 'error404',
            component: error404
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

    let openid = getParamString('openid1');

    //门店id存储
    let business_id = getParamString('business_id');
    if (business_id) {
        localstore.set('business_id', business_id)
    }

    let openid2 = localstore.get('openid1')

    if (!openid2 && !openid) {
        // let url = window.location.href
        let url = encodeURIComponent(window.location.href.split('#')[0]);
        //微信授权
        getRequest('/wechat/check', { url: url }).then(res => {
            window.location.href = res.data
        })
    }

    //使用 openid 获取用户资料 缓存本地
    if (openid) {
        //保存openid
        localstore.set('openid1', openid)
        getRequest('/wechat/GetUserInfo', { openid: openid }).then(res => {
            localstore.set('userInfo', res.data.data)
        })
    }


    next()
})

export default router


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