<template>
  <div class="VipPlus">
    <div class="head_portrait"><img src="../assets/head_portrait.png" alt=""></div>
    <div class="code"><img src="../assets/code2.png" alt=""></div>
    <div class="img"><img src="../assets/VipPuls.jpg" alt=""></div>
  </div>
</template>
<script>
export default {
  name:'VipPlus',
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
    document.title = "PLUS会员"
    
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
.VipPlus{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #000;
  .head_portrait{
    width: 1.5rem;
    height: 1.5rem;
    background: #fff;
    border-radius: 50%;
    right: .24rem;
    position: absolute;
    top: .24rem;
    overflow: hidden;
  }
  .code{
    width: 2rem;
    height: 2rem;
    overflow: hidden;
    position: absolute;
    bottom: .8rem;
    left: 50%;
    margin-left: -1rem;
  }
  .img{
    width: 100%;
    height: 100%;
    overflow: hidden;
    img{
      height: 100%;
    }
  }
}
</style>



    
