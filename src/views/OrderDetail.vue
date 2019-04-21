<template>
  <div class="OrderDetail">
    <header>
      <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
      <div class="tel">订单详情</div>
      <div class="add"></div>
    </header>
    <div class="header">
      <p>待使用</p>
      <span>2019-02-02到期</span>
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

    <div class="timer">
      <div class="timer_top">
      </div>
      <div class="timer_bottom"></div>
    </div>
  </div>
</template>
<script>
export default {
  name:'OrderDetail',
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
}
</style>





    
