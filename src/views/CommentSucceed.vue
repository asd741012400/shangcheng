<template>
  <div class="CommentSucceed">
    <header>
      <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
      <div class="tel">评价成功</div>
      <div class="add"></div>
    </header>


    <div class="header">
      <div class="use_card_message">
        <i><img src="../assets/CommentSucceed.png" alt=""></i>
        <p>
          <span><img src="../assets/PaySucceed_gou.png" alt=""></span>
          <a>评价成功</a>
        </p>
      </div>
      <b><img src="../assets/PersonalCenter_headerBg4.png" alt="" srcset=""></b>
    </div>
    
    <div class="btn">
      <div class="continue">查看评价</div>
      <div class="employ">继续逛逛</div>
    </div>


    <div class="recommend">
      <h3>精选推荐</h3>
      <ul>
        <li>
          <i><img src="../assets/img1.png" alt=""></i>
          <p>加勒比儿童票</p>
          <a>免费</a>
          <span>市场价：￥200</span>
        </li>
        <li>
          <i><img src="../assets/img1.png" alt=""></i>
          <p>加勒比儿童票</p>
          <a>免费</a>
          <span>市场价：￥200</span>
        </li>
        <li>
          <i><img src="../assets/img1.png" alt=""></i>
          <p>加勒比儿童票</p>
          <a>免费</a>
          <span>市场价：￥200</span>
        </li>
      </ul>
    </div>

    
  </div>
</template>
<script>
export default {
  name:'CommentSucceed',
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
.CommentSucceed{
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
    position: relative;
    overflow: hidden;
    background:url("../assets/PaySucceed_bg.png") center center /100% 100%  no-repeat;
    height: 4rem;
    .use_card_message{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      i{
        width: 2.06rem;
        overflow: hidden;
        &.vip_img{
          width: auto;
        }
      }
      p{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: .32rem;
        color: #fff;
        font-weight: bold;
        padding-top: .32rem;
        span{
          width: .36rem;
          overflow: hidden;
          margin-right: 4px;
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
  
  .btn{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .52rem 1.24rem;
    background: #fff;
    .continue{
      width: 2.06rem;
      height: .7rem;
      line-height: .7rem;
      text-align: center;
      color: #FF6666;
      border: 1px solid #FF6666;
      border-radius: 50px;
      font-size: .32rem;
    }
    .employ{
      width: 2.06rem;
      height: .7rem;
      line-height: .7rem;
      text-align: center;
      color: #fff;
      border: 1px solid #FF6666;
      background: #FF6666;
      border-radius: 50px;
      font-size: .32rem;
    }
  }
  
  .recommend{
    padding: 0 .33rem;
    h3{
      line-height: 1.1rem;
      text-align: center;
      color: #515C6F;
      font-size: .32rem;
      font-weight: bold;
    }
    ul{
      display: flex;
      flex-wrap:wrap;
      justify-content: space-between;
      li{
        background: #fff;
        margin-bottom: .2rem;
        padding: .18rem;
        display: flex;
        flex-direction: column;
        i{
          height: 3rem;
          width: 3rem;
          overflow: hidden;
        }
        p{
          font-size: .24rem;
          color: #515C6F;
          padding-top: .14rem;
        }
        a{
          width: .7rem;
          height: .34rem;
          line-height: .34rem;
          text-align: center;
          color: #FFB389;
          font-size: .24rem;
          border: 1px solid #FFB389;
          margin-top: .44rem;
        }
        span{
          font-size: .22rem;
          color: #999999;
          padding-top: .14rem;
        }
      }
    }
  }
}
</style>





    
