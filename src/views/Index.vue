<template>
  <div class="Index">
    <header>
      <div class="header_top">
        <div class="header">
          <div class="site"><i class="iconfont icon-alldizhi"></i></div>
          <div class="search">
            <span><img src="../assets/icon_search.png" alt=""></span>
            <input type="text" placeholder="亲子卡">
          </div>
          <div class="more"><i class="iconfont icon-allgengduo"></i></div>
        </div>
      </div>
      
      <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide"><img src="../assets/activity_img1.png" /></div>
            <div class="swiper-slide"><img src="../assets/activity_img1.png" /></div>
            <div class="swiper-slide"><img src="../assets/activity_img1.png" /></div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </header>
    
    <div class="nav">
      <ul>
        <li>
          <span><img src="../assets/icon_theme.png" alt=""></span>
          <p>主题场馆</p>
        </li>
        <li>
          <span><img src="../assets/icon_paradise.png" alt=""></span>
          <p>亲子乐园</p>
        </li>
        <li>
          <span><img src="../assets/icon_activity.png" alt=""></span>
          <p>活动演出</p>
        </li>
        <li>
          <span><img src="../assets/icon_interest.png" alt=""></span>
          <p>兴趣启蒙</p>
        </li>
        <li>
          <span><img src="../assets/icon_early_education.png" alt=""></span>
          <p>亲子服务</p>
        </li>
      </ul>
    </div>
    <div class="activity_img"><img src="../assets/activity_img1.png" alt=""></div>
    <div class="play_freely">
      <h3>
        <span><img src="../assets/icon_play_freely.png" alt=""></span>
        <a>畅玩卡</a>
      </h3>
      <div class="play_freely_box">
        <ul>
          <li>
            <div class="img">
              <span><img src="../assets/img3.png" alt=""></span>
              <div>
                <p>会员价</p>
                <i>￥</i>
                <a>20</a>
              </div>
            </div>
            <div class="project">
              <p>悠游堂亲子嘉年华</p>
            </div>
          </li>
          <li>
            <div class="img">
              <span><img src="../assets/img3.png" alt=""></span>
              <div>
                <p>会员价</p>
                <i>￥</i>
                <a>20</a>
              </div>
            </div>
            <div class="project">
              <p>悠游堂亲子嘉年华</p>
            </div>
          </li>
          <li>
            <div class="img">
              <span><img src="../assets/img3.png" alt=""></span>
              <div>
                <p>会员价</p>
                <i>￥</i>
                <a>20</a>
              </div>
            </div>
            <div class="project">
              <p>悠游堂亲子嘉年华</p>
            </div>
          </li>
        </ul>
      </div>
      
    </div>
    <div class="activity_list">
      <h3>
        <span><img src="../assets/icon_recommend.png" alt=""></span>
        <a>爆款推荐</a>
      </h3>
      <ul>
        <!-- <li class="shopping">
          <div class="img"></div>
          <div class="vip">
            <div class="shop">
              <span><a><img src="../assets/icon_shopB.png" alt=""></a></span>
              <p>商城</p>
            </div>
            <div class="icon_vip">
              <span><img src="../assets/icon_vip_imgA.png" alt=""></span>
              <P>会员</P>
            </div>
            <div class="personage">
              <span><a><img src="../assets/icon_myA.png" alt=""></a></span>
              <P>个人中心</P>
            </div>
          </div>
          <div class="price">
            <span>现价</span>
            <b>￥45.0</b>
            <a>￥345</a>
          </div>
        </li> -->

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
          <div class="price">
            <span>现价</span>
            <b>￥45.0</b>
            <a>￥345</a>
          </div>
          <div class="status"><span><img src="../assets/icon_null.png" alt=""></span></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
import '../components/iconfont/iconfont.css'
export default {
  name:'Index',
  data(){
    return{
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
    new Swiper ('.swiper-container', {
      loop: true,
      // 如果需要分页器
      pagination:{
        el: '.swiper-pagination',
        bulletActiveClass: 'swiper-pagination-active',
        bulletClass : 'swiper-pagination-bullet',
      }
    }) 
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
.Index{
  header{
    height: 4.4rem;
    .header_top{
      height: 2.84rem;
      background:linear-gradient(90deg,rgba(255,102,102,1) 0%,rgba(255,179,137,1) 100%);
      .header{
        height: .7rem;
        padding: .52rem .16rem;
        display: flex;
        justify-content: center;
        font-size: .28rem;
        align-items: center;
        .site{
          width: .64rem;
          i{
            font-size: .6rem;
            color: #fff;
          }
        }
        .search{
          flex: 1;
          background:rgba(86,84,82,.2);
          border-radius:18px;
          margin-right: .2rem;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;
          span{
            width: .22rem;
            padding: 0 .3rem;
          }
          input{
            flex: 1;
            height: 100%;
            outline: medium;
            background: none;
            border: none;
          }
        }
        .more{
          width: .64rem;
          i{
            font-size: .6rem;
            color: #fff;
          }
        }
      }
    }
  }
  .nav{
    padding: .4rem .76rem .24rem;
    ul{
      display: flex;
      align-items: center;
      justify-content: space-between;
      li{
        display: flex;
        flex-direction: column;
        align-items: center;
        span{
          width: 1rem;
          overflow: hidden;
        }
        p{
          font-size: .24rem;
          color:#515C6F;
          padding-top:.08rem; 
          
        }
      }
    }
  }
  .activity_img{
    overflow: hidden;
  }

  .play_freely{
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
    .play_freely_box{
      margin-left: .46rem;
      ul{
        white-space:nowrap;
        width: auto;
        overflow-x: scroll;
        li{
          background: #fff;
          width: 5.6rem;
          margin-right: .4rem;
          display: inline-block;
          .img{
            height: 2.04rem;
            background: #ccc;
            border-radius: 5px;
            position: relative;
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
        }
      }
    }
  }
  .activity_list{
    padding-top: .6rem;
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
        position: relative;
        &.shopping{
          .img{
            margin: 0 .2rem;
            height: 2.04rem;
            background: #ccc;
            border-radius: 5px 5px 0 0;
            overflow: hidden;
          }
          .vip{
            display: flex;
            justify-content: space-around;
            box-shadow:0px 0px 6px rgba(0,0,0,0.1);
            height: 1.9rem;
            .shop{
              display: flex;
              flex-direction: column;
              align-items: center;
              span{
                width: 1.2rem;
                height: 1.2rem;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                a{
                  width: .6rem;
                }
              }
              p{
                font-size: .28rem;
                color: #727C8E;
              }
            }
            .icon_vip{
              display: flex;
              flex-direction: column;
              align-items: center;
              span{
                width: .92rem;
                padding: .14rem;
                overflow: hidden;
                position: relative;
                top: -.26rem;
                background: #fff;
                border-radius: 50%;
                box-shadow:0px 0px 12px rgba(0,0,0,0.15);
              }
              p{
                font-size: .28rem;
                color: #727C8E;
              }
            }
            .personage{
              display: flex;
              flex-direction: column;
              align-items: center;
              span{
                width: 1.2rem;
                height: 1.2rem;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                a{
                  width: .5rem;
                }
              }
              p{
                font-size: .28rem;
                color: #727C8E;
              }
            }
          }
          .price{
            display: flex;
            align-items: center;
            height: 1.06rem;
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
        }
        &.vip_price{
          .img{
            margin: 0 .2rem;
            height: 3rem;
            background: #ccc;
            border-radius: 5px;
            position: relative;
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
          .price{
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
        }
        .status{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba($color: #000000, $alpha: 0.33);
          display: flex;
          justify-content: center;
          span{
            width: 1.73rem;
            overflow: hidden;
            padding-top: 1rem;
          }
        }
      }
      
     
    }
  }
}
</style>
<style>
.swiper-container{
  margin: 0 .16rem;
  height: 2.76rem;
  background: #ccc;
  top: -1.2rem;
  border-radius:5px;
}
.swiper-pagination-bullet{
  background: #fff;
  opacity: 1;
}
.swiper-pagination-active{
  background: #FF6666;
  opacity: 1;
}
</style>




    
