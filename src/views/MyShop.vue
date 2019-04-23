<template>
  <div class="MyShop">

    <header>
      <div class="return" @click="$router.go(-1)"><span><img src="../assets/icon_return_w.png" alt=""></span></div>
      <div class="shop_message">
        <span><img src="../assets/head_portrait.png" alt="" srcset=""></span>
        <div>
          <p>
            <input type="text" value="门店名称">
            <i><img src="../assets/icon_compile.png" alt=""></i>
          </p>
          <a>ID：54335616</a>
        </div>
      </div>
      <b><img src="../assets/my_shopBg.png" alt="" srcset=""></b>
    </header>
    
    <div class="vip_card">
        <p>
            <span>邀请好友赚</span>
            <a>￥100</a>
        </p>
    </div>
    
    <div class="activity_list">
      <h3>
        <span><img src="../assets/icon_recommend.png" alt=""></span>
        <a>为您推荐</a>
      </h3>
      <ul>
        <li class="vip_price">
          <div class="img">
            <span></span>
            <div>
              <p>会员价</p>
              <i>￥</i>
              <a>20</a>
            </div>
          </div>
          <div class="project">
            <p>悠游堂亲子嘉年华</p>
            <span>报名　11/22</span>
          </div>
          <div class="share">
            <div class="price">
              <span>现价</span>
              <b>￥45.0</b>
              <a>￥345</a>
            </div>
            <p>分享赚<span>￥15</span></p>
          </div>
        </li>
      </ul>
    </div>

    <div class="click_share">
      <div @click="shareShowFn">
        <span><img src="../assets/icon_share.png" alt=""></span>
        <p>分享店铺</p>
      </div>
    </div>

    <Share ref="myShare"></Share>

  </div>
</template>
<script>
import Share from '../components/Share'
export default {
  name:'MyShop',
  data(){
    return{
    }
  },
  components:{
    Share
  },
  methods:{
    shareShowFn() {
      this.$refs.myShare.shareShowFn();
    }
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
.MyShop{
  header{
    position: relative;
    overflow: hidden;
    background:linear-gradient(147deg,rgba(255,102,102,1) 0%,rgba(255,179,137,1) 100%);
    height: 3.7rem;
    .return{
      display: flex;
      justify-content: flex-start;
      padding-top: .3rem;
      padding-left: .1rem;
      span{
        overflow: hidden;
        width: 1rem;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: .27rem;
        }
      }
    }
    .shop_message{
      align-items: center;
      display: flex;
      padding-top: .3rem;
      span{
        width: 1.36rem;
        height: 1.36rem;
        border-radius: 50%;
        border: .08rem solid #ff947b;
        margin-left: .8rem;
        margin-right: .28rem;
      }
      div{
        p{
          display: flex;
          padding-bottom: .1rem;
          input{
            background: none;
            font-size: .28rem;
            font-weight: bold;
            width: 1.2rem;
            color: #fff;
          }
          i{
            overflow: hidden;
            width: .26rem;
          }
        }
        a{
          font-size: .22rem;
          color: #fff;
        }
      }
    }
    b{
      position: absolute;
      width: 100%;
      height: .8rem;
      bottom: 0;
      overflow: hidden;
    }
  }
  .vip_card {
      height: 4.66rem;
      background: url('../assets/VipEquity_card.png') center/100% no-repeat;
      border-radius: 10px;
      margin: 0 auto;
      overflow: hidden;
      display: flex;
      justify-content: center;

      p {
          margin-top: 2.9rem;
          width: 3.84rem;
          height: .8rem;
          border-radius: 21px;
          text-align: center;
          color: #fff;
          font-size: .26rem;
          display: flex;
          background: #C1A06B;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          span{
            font-weight: bold;
          }
          a {
            font-weight: bold;
            color: #fff;
            font-size: .36rem;
          }
      }
  }
  .activity_list{
    h3{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: .24rem;
      span{
        width: .32rem;
        overflow: hidden;
        margin-right: .08rem;
      }
      a{
        font-size: .28rem;
        color: #515C6F;
        font-weight: bold;
      }
    }
    ul{
      li{
        background: #fff;
        padding-top: .2rem;
        margin-bottom: .2rem;
        
        &.vip_price{
          .img{
            margin: 0 .2rem;
            height: 3rem;
            background: #ccc;
            border-radius: 5px;
            position: relative;
            span{
              overflow: hidden;
            }
            div{
              width: 2.48rem;
              background:linear-gradient(269deg,rgba(255,102,102,1) 0%,rgba(255,179,137,1) 100%);
              border-radius:0px 20px 20px 0px;
              position: absolute;
              bottom: -.12rem;
              display: flex;
              align-items: center;
              height: .62rem;
              justify-content: center;
              color: #fff;
              p{
                font-size: .28rem;
              }
              i{
                font-size: .32rem;
                font-style: normal;
              }
              a{
                font-size: .4rem;
              }
            }
          }
          .project{
            display: flex;
            padding: .3rem .2rem;
            p{
              flex: 1;
              color: #515C6F;
              padding-left: .28rem;
            }
            span{
              color: #FF6666;
            }
          }
          .share{
            display: flex;
            .price{
              flex: 1;
              display: flex;
              align-items: center;
              padding-bottom: .4rem;
              justify-content: flex-start;
              padding-left: .46rem;
              span{
                color: #515C6F;
              }
              b{
                font-weight: normal;
                font-size: .36rem;
                padding-left: 2px;
                padding-right: .2rem;
              }
              a{
                text-decoration: line-through;
              }
            }
            p{
              background:linear-gradient(90deg,rgba(255,102,102,1) 0%,rgba(255,179,137,1) 100%);
              width: 2rem;
              height: .5rem;
              line-height: .5rem;
              border-radius:20px;
              text-align: center;
              font-size: .22rem;
              color: #fff;
              margin-right: .22rem;
              span{
                font-size: .28rem;
              }
            }
          }
        }
      }
      
     
    }
  }
  .click_share{
    position: fixed;
    bottom: .4rem;
    display: flex;
    justify-content: center;
    width: 100%;
    div{
      width: 5.6rem;
      height: .8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #FF6666;
      border-radius:50px;
      box-shadow:0px 5px 10px rgba(255,128,128,0.6);
      span{
        width: .36rem;
        overflow: hidden;
      }
      p{
        font-size: .32rem;
        font-weight: bold;
        padding-left: .2rem;
        color: #fff;
      }
    }
  }
}
</style>





    
