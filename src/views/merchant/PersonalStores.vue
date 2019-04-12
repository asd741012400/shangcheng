<template>
  <div class="PersonalStores">
    <div class="logo">img</div>
    <div class="shop_name">
      <p>
        <input type="text" v-if="compile">
        <span v-else>万达广场LUCA店</span>
        <i @click="compileFn"><img src="../../assets/merchant/icon_compile.png" alt=""></i>
      </p>
      <a>ID：22322424</a>
    </div>
    <div class="advertising">img</div>
    <div class="product">
      <ul>
        <li>
          <span>
            <i>img</i>
            <b><em>月光小猪储钱罐月光小猪储钱罐月光小猪储钱罐月光小猪储钱罐</em></b>
          </span>
          <p>
            <a>玩具</a>
            <a>玩具</a>
          </p>
          <div class="text">
            <div>
              <b>原价：￥120.00</b>
              <i>现价：￥100.00</i>
              <strong>会员价：￥56.88</strong>
            </div>
            <em @click="popShowFn">分享赚￥66</em>
          </div>
        </li>
        <li>
          <span>
            <i>img</i>
            <b><em>月光小猪储钱罐月光小猪储钱罐月光小猪储钱罐月光小猪储钱罐</em></b>
          </span>
          <p>
            <a>玩具</a>
            <a>玩具</a>
          </p>
          <div class="text">
            <div>
              <b>原价：￥120.00</b>
              <i>现价：￥100.00</i>
              <strong>会员价：￥56.88</strong>
            </div>
            <em @click="popShowFn">分享赚￥66</em>
          </div>
        </li>
      </ul>
    </div>

    <div class="pop_bg" v-if="popState" @click="popHideFn">
      <div class="pop" @click.stop>
        <ul>
          <li>
            <span><img src="../../assets/merchant/wx.png" alt=""></span>
            <p>微信</p>
          </li>
          <li>
            <span><img src="../../assets/merchant/circle_of_friends.png" alt=""></span>
            <p>朋友圈</p>
          </li>
          <li @click="commodityShowFn">
            <span><img src="../../assets/merchant/poster.png" alt=""></span>
            <p>海报</p>
          </li>
          <li v-clipboard:copy="message">
            <span><img src="../../assets/merchant/copy.png" alt=""></span>
            <p>复制链接</p>
          </li>
        </ul>
        <a @click="popHideFn">取消</a>
      </div>
    </div>

    <div class="commodity_pop_bg" v-if="commodityState" @click="commodityHideFn">
      <div class="commodity_pop" @click.stop>
        <div>
          <span><Commodity ref="myCommodity"></Commodity></span>
          <i @click="commodityHideFn"><img src="../../assets/merchant/close.png" alt=""></i>
        </div>
        <ul>
          <li><img src="../../assets/merchant/wx.png" alt=""></li>
          <li><img src="../../assets/merchant/circle_of_friends.png" alt=""></li>
          <li @click="downloadImg"><img src="../../assets/merchant/download.png" alt=""></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
import Commodity from '../../components/Commodity'
export default {
  name:'PersonalStores',
  data(){
    return{
      role:1,
      compile:false,
      message:"123123",
      popState:false,
      commodityState:false
    }
  },
  components:{
    Commodity
  },
  methods:{
    compileFn(){
      this.compile = !this.compile;
    },
    popHideFn(){
      this.popState = false;
    },
    popShowFn(){
      this.popState = true;
    },
    commodityHideFn(){
      this.commodityState = false;
    },
    commodityShowFn(){
      this.popState = false;
      this.commodityState = true;
    },
    downloadImg() {
      this.$refs.myCommodity.clickGeneratePicture();
    }
  },

  // 创建前状态
  beforeCreate(){
  },

  // 创建完毕状态 
  created(){
    document.title = "我的店铺"
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
.PersonalStores{
  .logo{
    width: 1.76rem;
    height: 1.76rem;
    overflow: hidden;
    border-radius: 5px;
    background: #ccc;
    margin: .58rem auto 0;
  }
  .shop_name{
    margin: .4rem auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    p{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: .36rem;
      color: #333333;
      position: relative;
      height: .5rem;
      input{
        height: 100%;
        width: 2.2rem;
        padding-left: .1rem;
        border: 1px solid #F0F0F0;
        border-radius: 3px;
      }
      i{
        width: .26rem;
        overflow: hidden;
        position: absolute;
        right: -.54rem;
      }
    }
    a{
      color: #666666;
      font-size: .28rem;
    }
  }
  .advertising{
    margin: 0 .4rem;
    background: #ccc;
    border-radius: 10px;
    height: 2.2rem;
  }
  .product{
    margin-top: .4rem;
    border-top: .16rem solid #F0F0F0;
    ul{
      padding: .3rem .4rem 0;
      li{
        padding-bottom: .32rem;
        border-bottom: 1px solid #CECECE;
        margin-bottom: .4rem;
        span{
          display: block;
          position: relative;
          height: 4.72rem;
          border-radius: 15px;
          overflow: hidden;
          i{
            display: block;
            width: 100%;
            height: 100%;
            background: #ccc;
            overflow: hidden;
          }
          b{
            position: absolute;
            bottom: 0;
            height: .9rem;
            line-height: .9rem;
            width: 100%;
            font-size: .36rem;
            color: #fff;
            background: rgba($color: #000000, $alpha: 0.3);
            font-weight: normal;
            em{
              font-style: normal;
              padding-left: .26rem;
              padding-right: .26rem;
              text-overflow:ellipsis;
              white-space:nowrap;
              overflow: hidden;
              display: block;
            }
          }
        }
        p{
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-top: .1rem;
          flex-wrap: wrap;
          a{
            padding: 1px .16rem;
            border:1px solid #000;
            border-radius: 5px;
            margin-right: .2rem;
            color: #333333;
          }
        }
        .text{
          display: flex;
          align-items: flex-end;
          div{
            flex: 1;
            display: flex;
            flex-direction: column;
            padding-top: .1rem;
            b{
              font-size: .28rem;
              color: #222222;
              font-weight: normal;
              text-decoration: line-through;
            }
            i{
              font-size: .28rem;
              color: #222222;
              font-style: normal;
            }
            strong{
              color: #222222;
              font-size: .36rem;
              font-weight:500;
            }
          }
          em{
            width: 1.9rem;
            line-height: .72rem;
            height: .72rem;
            text-align: center;
            color: #fff;
            background: #FF6C60;
            border-radius: 5px;
            font-style: normal;
            font-size: .28rem;
          }
        }
      }
    }
  }
  .pop_bg{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.7);
    display: flex;
    align-items: flex-end;
    .pop{
      margin: 0 .4rem;
      flex: 1;
      background: #fff;
      border-radius: 15px 15px 0 0;
      padding: .6rem 0 .52rem;
      ul{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li{
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          width: 33%;
          padding-bottom: .44rem;
          span{
            width: .96rem;
            height: .96rem;
            overflow: hidden;
            border-radius: 50%;
          }
          p{
            padding-top: .24rem;
            font-size: .24rem;
            color: #333333;
          }
        }
      }
      a{
        text-align: center;
        margin: 0 .6rem;
        background: #999999;
        border-radius:8px;
        font-size: .36rem;
        line-height: .88rem;
        height: .88rem;
        display: block;
        color: #fff;
      }
    }
  }
  .commodity_pop_bg{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    .commodity_pop{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      div{
        width: 6.7rem;
        height: 7.06rem;
        position: relative;
        span{
          display: block;
          width: 100%;
          height: 100%;
          border-radius:15px;
          background: #fff;
          overflow: hidden;
        }
        i{
          width: .68rem;
          height: .68rem;
          overflow: hidden;
          position: absolute;
          right: -.34rem;
          top: -.34rem;
        }
      }
      ul{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 5.94rem;
        padding-top: .6rem;
        li{
          width: .96rem;
          height: .96rem;
          overflow: hidden;
        }
      }
    }
  }
}
</style>



    
