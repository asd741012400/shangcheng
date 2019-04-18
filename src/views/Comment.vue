<template>
  <div class="Comment">
    <header>
      <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
      <div class="tel">发表评价</div>
      <div class="add"></div>
    </header>

    <div class="commodity">
      <span><img src="../assets/img1.png" alt=""></span>
      <div>
        <a>服务态度</a>
        <p>
          <i><img src="../assets/icon_enshrineA.png" alt=""></i>
          <i><img src="../assets/icon_enshrineA.png" alt=""></i>
          <i><img src="../assets/icon_enshrineA.png" alt=""></i>
          <i><img src="../assets/icon_enshrineB.png" alt=""></i>
          <i><img src="../assets/icon_enshrineB.png" alt=""></i>
        </p>
      </div>
    </div>

    <div class="comment_text">
      <div class="textareas">
        <textarea placeholder="快来发表你的评论吧">快来发表你的评论吧</textarea>
      </div>
      <div class="camera">
        <p v-for="(item,index) in imagesUrl">
          <span><img :src="item" alt=""></span>
          <em @click="removeImages(index)"><img src="../assets/icon_close.png" alt=""></em>
        </p>
        <p>
          <input type="file" id="upload-ele" multiple name="image" accept=“image/*” @change='handleInputChange'>
          <i><img src="../assets/icon_camera.png" alt=""></i>
        </p>
      </div>
      <div class="anonymity" @click="anonymityFn">
        <i v-if="anonymityState"><img src="../assets/icon_pitch_on.png" alt=""></i>
        <i v-else><img src="../assets/icon_unselected.png" alt=""></i>
        <p>匿名评价</p>
      </div>
    </div>

    <span class="btn">提 交</span>
  </div>
</template>
<script>
import { log } from 'util';
export default {
  name:'Comment',
  data(){
    return{
      imagesUrl:[],
      anonymityState:false
    }
  },
  components:{
  },
  methods:{
    handleInputChange(ev){
      let fil = document.getElementById('upload-ele').files;
      const that = this;
      that.imagesUrl = [];
      let imagesUrlArr = [];
      var length = fil.length;
      for( let i = 0 ; i < length ; i++ ){
        var reader = new FileReader();
        reader.readAsDataURL(fil[i]);
        reader.onload = function(event) {
          imagesUrlArr = event.target.result;
          that.imagesUrl.push(imagesUrlArr)
        }
      }
      that.imagesUrlLength = that.imagesUrl.length

    },
    removeImages(index){
      const that = this;
      that.imagesUrl.splice(index,1)
    },
    anonymityFn(){
      const that = this;
      that.anonymityState = !that.anonymityState
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
.Comment{
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
  .commodity{
    background: #fff;
    padding: .44rem .46rem .8rem;
    display: flex;
    align-items: center;
    span{
      overflow: hidden;
      width: 2.04rem;
      height: 2.04rem;
      margin-right: .6rem;
    }
    div{
      display: flex;
      align-items: center;
      justify-content: center;
      a{
        font-size: .28rem;
        color: #535D70;
        padding-right: .22rem;
      }
      p{
        display: flex;
        i{
          width: .28rem;
          overflow: hidden;
          margin-right: 5px; 
        }
      }
    }
    
  }
  .comment_text{
    background: #fff;
    margin-top: 10px;
    padding: .5rem .52rem;
    .textareas{
      display: block;
      height: 1.6rem;
      overflow: hidden;
      textarea{
        width: 100%;
        height: 100%;
        outline: medium;
        border: none;
      }
    }
    .camera{
      display: flex;
      p{
        width: 1rem;
        height: 1rem;
        position: relative;
        margin-right: .2rem;
        input{
          width: 100%;
          height: 100%;
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
        }
        i{
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        span{
          overflow: hidden;
          width: 1rem;
          height: 1rem;
          display: block;
        }
        em{
          position: absolute;
          top: -.15rem;
          right: -.15rem;
          width: .3rem;
          height: .3rem;
        }
      }
    }
  }
  .anonymity{
    display: flex;
    padding: .4rem 0 .72rem;
    margin-top: .8rem;
    border-top: 1px solid #CCCCCC;
    align-items: center;
    font-size: .28rem;
    i{
      width: .3rem;
      overflow: hidden;
      padding-right: .12rem;
    }
  }
  .btn{
    width: 5.6rem;
    line-height: .8rem;
    height: .8rem;
    text-align: center;
    color: #fff;
    background: #FF6666;
    box-shadow:0px 5px 10px rgba(255,128,128,0.6);
    display: block;
    margin: 1rem auto 0;
    border-radius:50px;
    
  }
}
</style>





    
