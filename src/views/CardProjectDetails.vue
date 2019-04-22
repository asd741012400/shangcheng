<template>
  <div class="CardProjectDetails">
    <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
    <header> 
      <p class="active">
        <span>产品</span>
        <em></em>
      </p>
      <p>
        <span>评价</span>
        <em></em>
      </p>
      <p>
        <span>详情</span>
        <em></em>
      </p>
    </header>

    <div class="banner">
      <span><img src="../assets/img2.png" alt=""></span>
    </div>

    <div class="main">

        <div class="titles">
          <p>价值￥199</p>
          <b>加勒比儿童票一大一小加勒比</b>
          <span>项目详情</span>
        </div>

        <div class="message">
          <p>
            <a>有效期</a>
            <span>2018-5-6 至 2018-9-5</span>
          </p>
          <p>
            <a>适合年龄</a>
            <span>6岁以上</span>
          </p>
          <p>
            <a>是否预约</a>
            <span>是</span>
          </p>
        </div>

        <div class="shop">
          <h3>使用门店</h3>
          <ul>
            <li>
              <div class="del">
                <div class="tle">
                  <h4>悠游堂南坪店</h4>
                  <div>
                    <span><img src="../assets/icon_enshrineA.png" alt=""></span>
                    <span><img src="../assets/icon_enshrineA.png" alt=""></span>
                    <span><img src="../assets/icon_enshrineA.png" alt=""></span>
                    <span><img src="../assets/icon_enshrineB.png" alt=""></span>
                    <span><img src="../assets/icon_enshrineB.png" alt=""></span>
                  </div>
                </div>
                <div class="timer">营业时间：10:00-12:00</div>
                <div class="site">
                  <i><img src="../assets/icon_site.png" alt=""></i>
                  <p>地点：重庆南岸区南坪经纬大道</p>
                </div>
              </div>
            </li>
            <li>
              <div class="del">
                <div class="tle">
                  <h4>悠游堂南坪店</h4>
                  <div>
                    <span><img src="../assets/icon_enshrineA.png" alt=""></span>
                    <span><img src="../assets/icon_enshrineA.png" alt=""></span>
                    <span><img src="../assets/icon_enshrineA.png" alt=""></span>
                    <span><img src="../assets/icon_enshrineB.png" alt=""></span>
                    <span><img src="../assets/icon_enshrineB.png" alt=""></span>
                  </div>
                </div>
                <div class="timer">营业时间：10:00-12:00</div>
                <div class="site">
                  <i><img src="../assets/icon_site.png" alt=""></i>
                  <p>地点：重庆南岸区南坪经纬大道</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="shop_del">
          <h3>商品详情</h3>
          <div></div>
        </div>

    </div>

    <footer v-if="state">
      <div>
        <p><span><img src="../assets/btn_navigation.png" alt=""></span></p>
        <p><span><img src="../assets/btn_relation.png" alt=""></span></p>
      </div>
    </footer>

    <footer v-else>
      <a>￥199立即购卡</a>
    </footer>



  </div>
</template>
<script>
export default {
  name:'CardProjectDetails',
  data(){
    return{
      state:false,
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
.CardProjectDetails{
  .icon_return{
    position: absolute;
    width: 1rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    top: .3rem;
    left: .2rem;
    span{
      width: .27rem;
      overflow: hidden;
    }
  }
  header{
    height: 1rem;
    display: flex;
    align-items: center;
    width: 3.5rem;
    justify-content: space-between;
    margin:  0 auto;
    padding-top:.3rem; 
    background: #fff;
    p{
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      justify-content: center;
      span{
        font-size: .28rem;
        color: #515C6F;
      }
      em{
        width: 100%;
        background: #FF6666;
        border-radius: 5px;
        height: .08rem;
        position: absolute;
        bottom: 0;
        display: none;
      }
      &.active{
        span{
          color: #FF6666;
        }
        em{
          display: block;
        }
      }
    }
  }
  .banner{
    position: relative;
    span{
      overflow: hidden;
      display: block;
    }
  }
  .main{
    padding-bottom: 1.16rem;
    .titles{
      border-top:10px solid #f6f6f6;
      background: #fff;
      padding: .44rem .54rem;
      p{
        font-size: .32rem;
        color: #FF6666;
      }
      b{
        display: block;
        font-size: .28rem;
        color: #515C6F;
      }
      span{
        font-size: .24rem;
        color: #999999;
      }
    }
    .message{
      border-top:10px solid #f6f6f6;
      background: #fff;
      padding: .34rem .54rem .42rem;
      p{
        display: flex;
        align-items: center;
        height: .46rem;
        font-size: .24rem;
        color: #515C6F;
        a{
          width: 1.3rem;
          color: #FF6666;
        }
      }
    }
    .shop{
      border-top:10px solid #f6f6f6;
      background: #fff;
      h3{
        line-height: .8rem;
        font-size: .28rem;
        color: #515C6F;
        padding-left: .6rem;
        border-bottom:1px solid #f6f6f6;
      }
      ul{
        padding: .22rem .2rem .52rem;
        li{
          background: #f6f6f6;
          border-radius:5px;
          display: flex;
          overflow: hidden;
          padding-left:.42rem;
          margin-bottom: .1rem;
          position: relative;
          .del{
            flex: 1;
            padding-top: .32rem;
            .tle{
              display: flex;
              align-items: center;
              h4{
                font-size: .24rem;
                color: #515C6F;
                font-weight: bold;
              }
              div{
                display: flex;
                padding-left: .2rem;
                span{
                  width: .23rem;
                  overflow: hidden;
                  padding-right: .12rem;
                }
              }
            }
            .timer{
              font-size: .24rem;
              color: #999999;
              padding-top: .12rem;
            }
            .site{
              display: flex;
              align-items: center;
              padding-bottom: .16rem;
              i{
                overflow: hidden;
                width: .18rem;
              }
              p{
                padding-left: .12rem;
                color: #999999;
              }
            }
          }
          
        }
      }
    }
    
    .shop_del{
      border-top:10px solid #f6f6f6;
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
  footer{
    position: fixed;
    bottom: .76rem;
    width: 100%;
    height: .8rem;
    a{
      width: 5rem;
      box-shadow:0px 5px 10px rgba(255,128,128,0.6);
      border-radius:50px;
      height: .8rem;
      line-height: .8rem;
      text-align: center;
      color: #fff;
      margin: 0 auto;
      display: block;
      background: #FF8080;
      font-size: .32rem;
      font-weight:bold;
    }
    div{
      padding: 0 .58rem;
      display: flex;
      p{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        span{
          overflow: hidden;
        }
      }
    }
  } 
  
}
</style>



    
