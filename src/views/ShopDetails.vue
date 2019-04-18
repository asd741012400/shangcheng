<template>
  <div class="ShopDetails">
    <header>
      <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
      <div class="tel">门店详情</div>
      <div class="add"></div>
    </header>
    <div class="shop_message">
      <div>
        <a>营业时间：</a>
        <p>
          <span>周一到周五 ：10:00-18:00</span>
          <span>周末：9:00-18:00</span>
        </p>
      </div>
      <div>
        <a>地址：</a>
        <p>
          <span>重庆渝中区</span>
        </p>
      </div>
      <div>
        <a>电话：</a>
        <p>
          <span>255555</span>
        </p>
      </div>
    </div>

    <div class="nav_list">
      <p>门店图片</p>
      <ul>
        <li>
          <div>
            <span><img src="../assets/img1.png" alt=""></span>
          </div>
        </li>
        <li>
          <div>
            <span><img src="../assets/img1.png" alt=""></span>
          </div>
        </li>
        <li>
          <div>
            <span><img src="../assets/img1.png" alt=""></span>
          </div>
        </li>
        <li>
          <div>
            <span><img src="../assets/img1.png" alt=""></span>
          </div>
        </li>
        <li>
          <div>
            <span><img src="../assets/img1.png" alt=""></span>
          </div>
        </li>
      </ul>
    </div>
    
    <div class="introduce">
      <h3>介绍</h3>
      <div></div>
    </div>
    
    <footer>
      <div>
        <p><span><img src="../assets/btn_navigation.png" alt=""></span></p>
        <p><span><img src="../assets/btn_relation.png" alt=""></span></p>
      </div>
    </footer>
   
  </div>
</template>
<script>
export default {
  name:'ShopDetails',
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
.ShopDetails{
  header{
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:  0 auto;
    padding-top:.3rem; 
    padding-bottom: .2rem;
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
  .shop_message{
    padding: .28rem  .4rem .28rem .8rem;
    background: #fff;
    div{
      display: flex;
      padding-top: .1rem;
      font-size: .28rem;
      color: #535D70;
      a{
        width: 1.4rem;
        text-align: right;
      }
      p{
        display: flex;
        flex-direction: column;
      }
    }
  }
  .nav_list{
    margin: .1rem 0;
    background: #fff;
    padding: .3rem 0 .68rem .8rem;
    p{
      font-size: .28rem;
      color: #535D70;
    }
    ul{
      white-space:nowrap;
      padding-top: .42rem;
      width: auto;
      overflow-x: scroll;
      li{
        background: #fff;
        margin-right: .2rem;
        display: inline-block;
        color: #515C6F;
        font-size: .28rem;
        div{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          span{
            overflow: hidden;
            width: 1.2rem;
            height: 1.2rem;
          }
        }
      }
    } 
  }

  .introduce{
    background: #fff;
    padding: .26rem .16rem;
    h3{
      font-size: .28rem;
      color: #535D70;
      padding-left: .64rem;
      padding-bottom: .22rem;
    }
    div{
      height: 5rem;
      background: #DFE6EC;
    }
  }

  footer{
    position: fixed;
    bottom: .76rem;
    width: 100%;
    height: .8rem;
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





    
