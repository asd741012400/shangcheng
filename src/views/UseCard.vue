<template>
  <div class="UseCard">
    <header>
      <div class="icon_return"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
      <div class="tel">使用卡片</div>
      <div class="add"></div>
    </header>
    <div class="header">
      <div class="use_card_message">
        <i><img src="../assets/head_portrait2.png" alt="" srcset=""></i>
        <div class="name">
          <p>小皮孩儿</p>
          <sub>2岁</sub>
        </div>
        <span>1352626454</span>
        <a>申请修改</a>
      </div>
      <b><img src="../assets/PersonalCenter_headerBg3.png" alt="" srcset=""></b>
    </div>
    
    <div class="code">
      <div class="code_img">
        <i><img src="../assets/code.png" alt=""></i>
        <p>将二维码展示给商家核销</p>
      </div>
      <div class="code_text">
        <h3>核销码</h3>
        <b>45613232</b>
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  name:'UseCard',
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
.UseCard{
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
    background:url("../assets/UseCard_bg.png") center center /100% 100%  no-repeat;
    height: 6rem;
    .use_card_message{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      i{
        width: 3.52rem;
        height: 3.52rem;
        overflow: hidden;
        border-radius: 50%;
        border: 2px solid #fff;
        margin-bottom: .26rem;
      }
      .name{
        display: flex;
        justify-content: center;
        p{
          font-size: .28rem;
          color: #fff;
          font-weight: bold;
        }
        sub{
          position: relative;
          top: -10px;
          width: .5rem;
          font-size: .22rem;
          text-align: center;
          color: #fff;
          background: url("../assets/icon_age.png") left center /.47rem .35rem  no-repeat;
        }
      }
      span{
        font-size: .28rem;
        color: #fff;
      }
      a{
        font-size: .24rem;
        color: #515C6F;
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
  .code{
    padding-top: .46rem;
    .code_img{
      display: flex;
      align-items: center;
      flex-direction: column;
      font-size: .28rem;
      color: #515C6F;
      i{
        width: 1.99rem;
        height: 1.99rem;
        overflow: hidden;
        margin-bottom: .2rem;
      }
    }
    .code_text{
      display: flex;
      flex-direction: column;
      color: #515C6F;
      align-items: center;
      padding-top: .32rem;
      h3{
        font-weight: bold;
        font-size: .28rem;
      }
      b{
        font-size: .36rem;
      }
    }
  }
}
</style>





    
