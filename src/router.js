import Vue from 'vue'
import Router from 'vue-router'
import Dome from './views/Dome.vue'
import Index from './views/Index.vue'
import PersonalCenter from './views/PersonalCenter.vue'
import MyShop from './views/MyShop.vue'
import CommodityDetails from './views/CommodityDetails.vue'
import MyCardBag from './views/MyCardBag.vue'
import Cardactivate from './views/Cardactivate.vue'
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

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Dome',
      component: Dome
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
      path: '/MyCardBag',
      name: 'MyCardBag',
      component: MyCardBag
    },
    {
      path: '/Cardactivate',
      name: 'Cardactivate',
      component: Cardactivate
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
    }
  ]
})
