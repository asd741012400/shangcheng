<template>
  <div class="Bargain">

    <div class="bargain_bg">
      <div class="bargain_img1">
        <i><img src="" alt=""></i>
        <div class="bargain_img1_text">
          <div>
            <span><img src="../assets/icon_timepiece.png" alt=""></span>
            <p>
              <b>剩余时间：</b>
              <strong>13 : 52 : 38</strong>
            </p>
          </div>
          <a>活动名称活动名称活动名称活动名称</a>
        </div>
      </div>

      <div class="vip_inform" v-if="vip">
        <i><img src="../assets/icon_trumpet.png" alt=""></i>
        <p>PLUS会员享有直接购买权益，您可直接购买！</p>
      </div>
      <div class="bargain_img2" v-else><img src="../assets/activity_img1.png" alt=""></div>

    </div>

    <div class="main">
      <div class="help" v-if="vip == false">
        <div class="help_title">
          <h3>本单可返现 183元，已砍 29.1元</h3>
          <h4>你还可以邀请3人砍价哟</h4>
          <div>
            <span><b></b></span>
            <i><img src="../assets/icon_schedule.png" alt=""></i>
          </div>
        </div>
        <h5>助力详情</h5>
        <ul>
          <li>
            <span><img src="../assets/head_portrait.png" alt=""></span>
            <p>小皮</p>
            <a>砍价1元</a>
            <time>2018-5-1 10:00</time>
          </li>
          <li>
            <span><img src="../assets/head_portrait.png" alt=""></span>
            <p>小皮</p>
            <a>砍价1元</a>
            <time>2018-5-1 10:00</time>
          </li>
          <li>
            <span><img src="../assets/head_portrait.png" alt=""></span>
            <p>小皮</p>
            <a>砍价1元</a>
            <time>2018-5-1 10:00</time>
          </li>
        </ul>
        <div class="pull_down"><span><img src="../assets/icon_pull_down.png" alt=""></span></div>
      </div>

      <div class="attention">
        <h3>砍价须知</h3>
        <ul>
          <li>
            <div>
              <i><img src="../assets/icon_yuan.png" alt=""></i>
              <span>须知一</span>
            </div>
            <p>想参考自行车的路线，可以看看我的上一篇的游记： 熊本 人吉市 ｜寻访夏目友人帐的温柔治愈地</p>
          </li>
          <li>
            <div>
              <i><img src="../assets/icon_yuan.png" alt=""></i>
              <span>须知一</span>
            </div>
            <p>想参考自行车的路线，可以看看我的上一篇的游记： 熊本 人吉市 ｜寻访夏目友人帐的温柔治愈地</p>
          </li>
          <li>
            <div>
              <i><img src="../assets/icon_yuan.png" alt=""></i>
              <span>须知一</span>
            </div>
            <p>想参考自行车的路线，可以看看我的上一篇的游记： 熊本 人吉市 ｜寻访夏目友人帐的温柔治愈地</p>
          </li>
        </ul>
      </div>
      <div class="shop_del">
        <h3>活动详情</h3>
        <div></div>
      </div>
    </div>

    <div class="vip_btns" v-if="vip">
      <div class="puy"><span>会员直购(￥20)</span></div>
      <div class="bargain_btn"><a>分享给好友</a></div>
    </div>


    <div class="btns" v-else>
      <div class="puy"><span>直接购买(￥199)</span></div>
      <div class="bargain_btn" @click="helpShow"><a>邀请好友砍价</a></div>
    </div>



    <div class="help_pop_bg" v-if="helpState">
      <div class="help_pop">
        <div>
          <i @click="helpHide"><img src="../assets/icon_close.png" alt=""></i>
          <h3>助力成功</h3>
          <a @click="helpHide">确 定</a>
        </div>
      </div>
    </div>


  </div>
</template>
<script>
export default {
  name:'Bargain',
  data(){
    return{
      helpState:false,
      vip:true
    }
  },
  components:{
  },
  methods:{
    helpShow(){
      const that = this;
      that.helpState = true;
    },
    helpHide(){
      const that = this;
      that.helpState = false;
    }
  },

  // 创建前状态
  beforeCreate(){
  },

  // 创建完毕状态 
  created(){
    document.body.style.background = "#FFCD5E";
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
.Bargain{
  .bargain_bg{
    .bargain_img1{
      height: 9.16rem;
      position: relative;
      i{
        width: 100%;
        overflow: hidden;
      }
      .bargain_img1_text{
        position: absolute;
        bottom: .4rem;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        div{
          width: 4.6rem;
          background: #fff;
          border-radius:20px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          height: .64rem;
          line-height: .64rem;
          span{
            width: .3rem;
            overflow: hidden;
          }
          p{
            b{
              font-size: .28rem;
              color: #515C6F;
              padding-left: .12rem;
            }
            strong{
              font-style: normal;
              font-size: .32rem;
              color: #FE6565;
            }
          }
        }
        a{
          font-size: .28rem;
          color: #515C6F;
          padding-top: .28rem;
          font-weight: bold;
        }
      }
    }
    .vip_inform{
      margin: 0 .31rem;
      background: #E4A945;
      display: flex;
      align-items: center;
      border-radius:20px;
      height: .52rem;
      i{
        width: .32rem;
        overflow: hidden;
        padding-left: .26rem;
      }
      p{
        font-size: .28rem;
        color: #fff;
        padding-left: .2rem;
        width: 5.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .bargain_img2{
      padding: 0 .16rem;
      overflow: hidden;
    }
  }
  .main{
    padding-bottom: 1.16rem;
    .help{
      border-radius:10px;
      background: #fff;
      margin: 0 .16rem;
      .help_title{
        h3{
          text-align: center;
          font-size: .36rem;
          color: #FF6666;
          padding-top: .4rem;
          font-weight: bold;
        }
        h4{
          font-size: .28rem;
          color: #515C6F;
          text-align: center;
          padding-top: 4px;
        }
        div{
          margin: .46rem .47rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          height: .4rem;
          i{
            overflow: hidden;
            width: .4rem;
            height: .4rem;
            position: absolute;
            left: 95%;
          }
          span{
            background: #C8C8C8;
            height: .22rem;
            width: 100%;
            border-radius:20px;
            display: flex;
            align-items: center;
            b{
              width: 100%;
              background: #FF6666;
              border-radius:20px;
              height: .22rem;
            }
          }
        }
      }
      h5{
        margin: .2rem .47rem 0;
        font-weight: bold;
        line-height: .8rem;
        font-size: .28rem;
        color: #515C6F;
        border-bottom: 1px solid #E8E8E8;
      }
      ul{
        margin: 0 .47rem;
        li{
          display: flex;
          align-items: center;
          padding-top:.2rem;
          padding-bottom: .1rem; 
          border-bottom: 1px solid #E8E8E8;
          span{
            width: .82rem;
            height: .82rem;
            border-radius: 50%;
            border: 1px solid #E8E8E8;
          }
          p{
            padding-left: .3rem;
            width: .9rem;
            font-size: .28rem;
            color: #515C6F;
            overflow: hidden;
          }
          a{
            padding-left: .1rem;
            font-size: .24rem;
            color: #FF6666;
            flex: 1;
          }
          time{
            font-size: .22rem;
            color: #999999;
          }
        }
      }
      .pull_down{
        display: flex;
        justify-content: center;
        padding-top: .44rem;
        padding-bottom: .32rem;
        span{
          overflow: hidden;
          width: .32rem;
        }
      }
    }
    .attention{
      margin-top: .24rem;
      background: #fff;
      h3{
        line-height: .8rem;
        font-size: .28rem;
        color: #515C6F;
        padding-left: .6rem;
        border-bottom:1px solid #f6f6f6;
      }
      ul{
        padding: 0 .44rem .4rem .64rem;
        li{
          padding-top: .2rem;
          div{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            i{
              width: .1rem;
            }
            span{
              font-size: .24rem;
              color: #FF6666;
              padding-left: .14rem;
            }
          }
          p{
            font-size: .24rem;
            color: #515C6F;
            text-indent: 2em;
            padding-top: .1rem;
          }
        }
      }
    }
    .shop_del{
      margin-top: .2rem;
      background: #fff;
      h3{
        line-height: .8rem;
        font-size: .28rem;
        color: #515C6F;
        padding-left: .6rem;
        border-bottom:1px solid #f6f6f6;
      }
      div{
        height: 4.6rem;
        background: #C8C8C8;
      }
    }  
  }
  .btns{
    position: fixed;
    bottom: .2rem;
    width: 100%;
    display: flex;
    height: .8rem;
    div{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        display: block;
        width: 3.16rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        color: #fff;
        font-size: .32rem;
        background: #FFA471;
        box-shadow:0px 5px 10px rgba(212,151,97,0.6);
        border-radius:50px;
      }
      a{
        display: block;
        width: 3.16rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        color: #fff;
        font-size: .32rem;
        background: #FF6666;
        box-shadow:0px 5px 10px rgba(255,128,128,0.6);
        border-radius:50px;
      }
    }
    
  }
  .vip_btns{
    position: fixed;
    bottom: .2rem;
    width: 100%;
    display: flex;
    height: .8rem;
    div{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        display: block;
        width: 3.16rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        color: #fff;
        font-size: .32rem;
        background: #FF6666;
        box-shadow:0px 5px 10px rgba(255,128,128,0.6);
        border-radius:50px;
      }
      a{
        display: block;
        width: 3.16rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        color: #fff;
        font-size: .32rem;
        border-radius:50px;
        background: #FFA471;
        box-shadow:0px 5px 10px rgba(212,151,97,0.6);
      }
    }
  }  

  .help_pop_bg{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: .5);
    top: 0;
    left: 0;
    .help_pop{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      div{
        width: 6.48rem;
        background: #fff;
        border-radius:10px;
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        i{
          position: absolute;
          top: .2rem;
          right: .2rem;
          width: .48rem;
          height: .48rem;
          overflow: hidden;
        }
        h3{
          font-weight: bold;
          padding-top: 1.28rem;
          font-size: .32rem;
          color: #515C6F;
        }
        a{
          font-size: .28rem;
          color: #fff;
          background: #FF6666;
          border-radius:50px;
          width: 3.16rem;
          text-align: center;
          line-height: .8rem;
          height: .8rem;
          font-weight: bold;
          margin: .7rem 0;
        }
      }
    }
  }
}
</style>



    
