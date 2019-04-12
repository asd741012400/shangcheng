<template>
  <div class="Commodity" ref="imageDom">
    <span>img</span>
    <div>
      <p>
        <b>月光小猪储钱罐月光小猪储钱罐</b>
        <strong>￥56.88</strong>
      </p>
      <i><img src="../assets/code2.png" alt=""></i>
    </div>
  </div>
</template>
<script>
import html2canvas from "html2canvas"
export default {
  name:'Commodity',
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
.Commodity{
  height: 100%;
  display: flex;
  flex-direction:column;
  span{
    width: 100%;
    overflow: hidden;
    height: 4.84rem;
    background: #ccc;
    display: block;
  }
  div{
    display: flex;
    align-items: center;
    flex: 1;
    padding: 0 .18rem 0 .36rem;
    p{
      display: flex;
      flex-direction: column;
      flex: 1;
      color: #222222;
      b{
        font-size: .36rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        width: 4.6rem;
      }
      strong{
        font-size: .48rem;
        font-weight: 500;
      }
    }
    i{
      width: 1.62rem;
      height: 1.62rem;
      overflow: hidden;
    }
  }
}
</style>



    
