<template>
  <div class="OrderDetail">
    <header>
      <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
      <div class="tel">订单详情</div>
      <div class="add"></div>
    </header>
    <div class="header" v-if="state == 1">
      <p>待使用</p>
      <span>2019-02-02到期</span>
    </div>

    <div class="header" v-else-if="state == 2">
      <p>待付款</p>
      <span>订单还有1天00:00:00取消</span>
    </div>

    <div class="header" v-else-if="state == 3">
      <p>付款成功</p>
      <span>下单时间2019-02-02</span>
    </div>

    <div class="header" v-else-if="state == 4">
      <p>退款申请中</p>
      <span>您的退款正在申请</span>
    </div>

    <ul class="not_comment">
      <li class="not_comment_list">
        <h3>商家名称</h3>
        <div class="img">
          <span><img src="../assets/img1.png" alt=""></span>
          <div>
            <p class="text1">
              <a>龙湖时代天街悠游堂</a>
              <i>￥199</i>
            </p>
            <p class="text2">
              <a>两大一小</a>
              <i>x1</i>
            </p>
          </div>
        </div>
      </li>
    </ul>

    <div class="timer" v-if="state == 1">
      <div class="timer_top">
        <p>
          <a>
            <b>123123</b>
            <span>已核销</span>
          </a>
          <time>核销时间：2015-6-9</time>
        </p>
        <i><img src="../assets/code.png" alt=""></i>
      </div>
      <div class="timer_bottom">
        <p><b>123123</b></p>
        <i><img src="../assets/code.png" alt=""></i>
      </div>
    </div>

    <div class="user" v-if="state == 1">
      <p>姓名：张三</p>
      <p>游玩时间：2015-6-9</p>
    </div>

    <div class="group_purchase" v-if="groupPurchaseState">
      <div class="imgs">
        <span>团长</span>
        <p>
          <i><img src="../assets/head_portrait.png" alt=""></i>
          <i><img src="../assets/head_portrait.png" alt=""></i>
        </p>
      </div>
      <div class="btns">
        <span>4/5</span>
        <a><i>查看团拼</i></a>
      </div>
    </div>

    <div class="order_del">
      <h3>订单详情</h3>
      <ul v-if="state == 1">
        <li> <span>支付方式 :</span>微信支付</li>
        <li><span>订单号:</span>123123</li>
        <li><span>创建时间:</span>2015-6-9</li>
        <li><span>付款时间:</span>2015-6-9</li>
      </ul>

      <ul v-else-if="state == 2">
        <li><span>订单号:</span>123123</li>
        <li><span>创建时间:</span>2015-6-9</li>
      </ul>

      <ul v-if="state == 3">
        <li> <span>支付方式 :</span>微信支付</li>
        <li><span>订单号:</span>123123</li>
        <li><span>创建时间:</span>2015-6-9</li>
        <li><span>付款时间:</span>2015-6-9</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name:'OrderDetail',
  data(){
    return{
      state:1,//1待使用 2代付款 3付款成功 4退款
      groupPurchaseState:true,//团购
    }
  },
  components:{
  },
  methods:{

  },

  // 创建前状态
  beforeCreate(){
  },

  // 创建完毕状态 
  created(){
    document.body.style.background = "#F6F6F6";
  },

  // 挂载前状态
  beforeMount(){
  },

  // 挂载结束状态
  mounted(){
 
  },
  
  // 更新前状态
  beforeUpdate(){
  },

  // 更新完成状态
  updated(){
  },

  // 销毁前状态
  beforeDestroy(){
  },

  // 销毁完成状态
  destroyed(){
  } 
  
}
</script>
<style lang="scss" scoped>
.OrderDetail{
  background: #f0f0f0;
  header{
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:  0 auto;
    padding-top:.3rem; 
    padding-bottom: .2rem;
    background: #f6f6f6;
    position: relative;
    
    .icon_return{
      width: 1rem;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      position: absolute;
      left: .4rem;
      span{
        overflow: hidden;
        width: .27rem;
      }
    }
    .tel{
      color:#515C6F;
      font-weight: bold;
      font-size: .32rem;
      text-align: center;
    }
 
  }
  .header{
    height:1.4rem;
    padding: 0 1rem;
    background: #FF6C5F;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: .28rem;
    p{
      font-size: .36rem;
      font-weight: bold;
      flex: 1;
    }
  }

  .not_comment{
    background: #fff;
    li{
      padding: 0 .51rem .52rem;
      h3{
        padding: .4rem 0 .14rem;
        border-bottom: 1px solid #CCCCCC;
      }
      div.img{
        display: flex;
        padding-top: .24rem;
        span{
          width: 1.26rem;
          height: 1.26rem;
          overflow: hidden;
        }
        div{
          padding-left: .32rem;
          flex: 1;
          p{
            display: flex;
            a{
              flex: 1;
            }
            i{
              font-style: normal;
            }
          }
          p.text1{
            a{
              font-size: .28rem;
              color: #535D70;
            }
            i{
              font-size: .28rem;
              color: #535D70;
              font-weight: bold;
            }
          }
          p.text2{
            a{
              font-size: .24rem;
              color: #999999;
            }
            i{
              font-size: .22rem;
              color: #999999;
            }
          }
        }
      }
    }
  }
  .timer{
    margin-top: .2rem;
    padding: 0 .51rem;
    background: #fff;
    div{
      padding: .3rem 0;
      display: flex;
      align-items: center;
      p{
        flex: 1;
        a{
          display: block;
          font-size: .24rem;
          color: #000;
          span{
            color: #999;
          }
        }
        b{
          font-size: .36rem;
        }
        time{
          display: block;
        }
      }
      i{
        width: 1rem;
        overflow: hidden;
      }
    }
    div:last-of-type{
      border-top: 1px solid #f0f0f0;
    }
  }

  .user{
    margin-top: .2rem;
    background: #fff;
    padding: 0 .51rem;
    p{
      height: .8rem;
      line-height: .8rem;
      font-size: .24rem;
    }
  }
  .group_purchase{
    margin-top: .2rem;
    background: #fff;
    padding: .3rem .51rem;
    display: flex;
    align-items: center;
    .imgs{
      flex: 1;
      display: flex;
      flex-direction: column;
      span{
        width: 2.2rem;
        text-align: center;
        font-size: .3rem;
        color: #000;
        padding-bottom: .2rem;
      }
      p{
        display: flex;
        align-items: center;
        i{
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          overflow: hidden;
        }
        i:last-of-type{
          margin-left: .2rem;
        }
      }
    }
    .btns{
      display: flex;
      flex-direction: column;
      align-items: center;
      span{
        font-size: .3rem;
        padding-bottom: .2rem;
      }
      a{
        height: 1rem;
        display: flex;
        align-items: center;
        i{
          width: 1.5rem;
          display: block;
          text-align: center;
          height: .5rem;
          line-height: .5rem;
          color: #fff;
          font-style: normal;
          border-radius: 3px;
          background: #FF6C5F;
        }
      }
    }
  }

  .order_del{
    margin-top: .2rem;
    background: #fff;
    padding: 0 .51rem .6rem;
    h3{
      font-size: .3rem;
      font-weight: bold;
      line-height: 1rem;
    }
    ul{
      li{
        line-height: .6rem;
        display: flex;
        span{
          width: 1.5rem;
          padding-right: .3rem;
        }
      }
    }
  }
}
</style>





    
