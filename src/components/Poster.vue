<template>
  <div class="Poster" ref="imageDom">
    <div class="name">
      <span><img src="../assets/head_portrait.png" alt=""></span>
      <b>小皮孩儿</b>
    </div>
    <div class="img"><img src="../assets/img2.png" alt=""></div>
    <div class="code">
      <div class="code_text">
        <h3>加勒比儿童票一大一小加勒比</h3>
        <a>限购一份</a>
        <p><i>￥</i><span>100</span></p>
      </div>
      <div class="code_img">
        <span><img src="../assets/code2.png" alt=""></span>
        <p>扫码立享限时优惠</p>
      </div>
    </div>
  </div>
</template>
<script>
import html2canvas from "html2canvas"
export default {
  name:'Poster',
  data(){
    return{
      imgUrl:""
    }
  },
  components:{
  },
  methods:{
    clickGeneratePicture() {
      html2canvas(this.$refs.imageDom).then(canvas => {
        // 转成图片，生成图片地址
        this.imgUrl = canvas.toDataURL("image/png");
        var eleLink = document.createElement("a");
        eleLink.href = this.imgUrl; // 转换后的图片地址
        eleLink.download = "pictureName";
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
      });
    }
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
.Poster{
  height: 100%;
  background:linear-gradient(180deg,rgba(255,102,102,1) 0%,rgba(255,179,137,1) 100%);
  .name{
    display: flex;
    align-items: center;
    padding:.28rem .18rem .14rem; 
    span{
      width: 1rem;
      height: 1rem;
      overflow: hidden;
      border:4px solid #FF947B;
      border-radius:50%;
      margin-left: .26rem;
    }
    b{
      font-size: .2rem;
      color:#fff;
      padding-left: .18rem;
    }
  }
  .img{
    overflow: hidden;
    margin: 0 .18rem;
    height: 5rem;
    border-radius:5px;
  }
  .code{
    display: flex;
    background: #fff;
    align-items: center;
    border-radius:5px;
    margin: .1rem .18rem 0;
    overflow: hidden;
    padding: .26rem .2rem .24rem .26rem;
    .code_text{
      flex: 1;
      h3{
        font-size: .28rem;
        font-weight: bold;
        color: #515C6F;

      }
      a{
        display: block;
        width: 1.2rem;
        height: .32rem;
        line-height: .32rem;
        text-align: center;
        color: #FFB389;
        border-radius:15px;
        border:1px solid #FFB389;
      }
      p{
        display: flex;
        align-items: flex-end;
        color: #FF6967;
        padding-top: .2rem;
        i{
          font-size: .2rem;
          font-weight: bold;
          font-style: normal;
        }
        span{
          font-size: .3rem;
          font-weight: bold;
        }
      }
    }
    .code_img{
      width: 1.68rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      span{
        width: 1.38rem;
        overflow: hidden;
      }
      p{
        color: #515C6F;
        font-size: .2rem;
      }
    }
  }
}
</style>



    
