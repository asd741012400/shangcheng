<template>
  <div class="VipOrder">
    <header>
      <div class="icon_return"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
      <div class="tel">确认订单</div>
      <div class="add"></div>
    </header>
    <div class="mian">
      <div class="vip_card">
        <p>
          <span>累积为您节省：￥</span>
          <a>99999</a>
        </p>
      </div>
      <div class="nav">
        <ul>
          <li>
            <span><img src="../assets/VipEquity_icon_active7.png" alt=""></span>
            <p>畅玩特权</p>
          </li>
          <li>
            <span><img src="../assets/VipEquity_icon_active7.png" alt=""></span>
            <p>畅玩特权</p>
          </li>
          <li>
            <span><img src="../assets/VipEquity_icon_active7.png" alt=""></span>
            <p>畅玩特权</p>
          </li>
          <li>
            <span><img src="../assets/VipEquity_icon_active7.png" alt=""></span>
            <p>畅玩特权</p>
          </li>
          <li>
            <span><img src="../assets/VipEquity_icon_active7.png" alt=""></span>
            <p>畅玩特权</p>
          </li>
          <li>
            <span><img src="../assets/VipEquity_icon_active7.png" alt=""></span>
            <p>畅玩特权</p>
          </li>
          <li>
            <span><img src="../assets/VipEquity_icon_active7.png" alt=""></span>
            <p>畅玩特权</p>
          </li>
        </ul>
      </div>
      <div class="agreement">
        <span v-if="agreementState"><img src="../assets/icon_schedule.png" alt=""></span>
        <span v-else><img src="../assets/icon_unselected.png" alt=""></span>
        <p>同意</p>
        <a href="#">PLUS协议</a>
      </div>
      <div class="total">
        <p>合计:￥599</p>
      </div>
    </div>
    <footer>
      <p>合计:￥599</p>
      <b>提交订单</b>
    </footer>
  </div>
</template>
<script>
export default {
  name:'VipOrder',
  data(){
    return{
      agreementState:false
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
    document.body.style.background = "#f6f6f6";
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
.VipOrder{
  header{
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:  0 auto;
    padding-top:.3rem; 
    padding-bottom: .2rem;
    position: relative;
    background: #F6F6F6;
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
  .mian{
    padding-bottom: 1.3rem;
    overflow: hidden;
    .vip_card{
      height: 4.66rem;
      background: url('../assets/VipOrder_card.png') center/100% no-repeat;
      border-radius: 10px;
      margin: 0 auto;
      overflow: hidden;
      display: flex;
      justify-content: center;
      position: absolute;
      width: 100%;
      p{
        margin-top: 3.1rem;
        width: 3.84rem;
        height: .42rem;
        border-radius: 21px;
        border: solid 2px #d7b783;
        text-align: center;
        color: #ffe29f;
        font-size: .26rem;
        display: flex;
        align-items: center;
        justify-content: center;
        a{
          font-size: .36rem;
        }
      }
    }
    .nav{
      background: #3E3E3E;
      margin-top: 1.7rem;
      ul{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 2.7rem .28rem .6rem;
        li{
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: .32rem;
          margin-bottom: .28rem;
          span{
            width: 1rem;
            height: 1rem;
            border-radius:50%;
            overflow: hidden; 
          }
          p{
            font-size: .24rem;
            color: #C1A06B;
            padding-top: 2px;
          }
        }
        li:nth-of-type(5n){
          margin-right: 0;
        }
      }
    }
    .agreement{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 .4rem;
      height: 1rem;
      background: #F6F6F6;
      font-size: .32rem;
      span{
        width: .3rem;
        height: .3rem;
        overflow: hidden;
      }
      p{
        padding-left: .2rem;
      }
      a{
        color: #FF6666;
      }
    }
    .total{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 .4rem;
      height: .8rem;
      background: #fff;
      font-size: .32rem;
      color: #515C6F;
    }
  }

  footer{
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1.16rem;
    align-items: center;
    background: #fff;
    p{
      flex: 1;
      text-align: right;
      padding-right: .34rem;
      font-size: .4rem;
      color: #515C6F;
    }
    b{
      width: 3.4rem;
      height: 1.16rem;
      line-height: 1.16rem;
      text-align: center;
      color: #fff;
      text-align: center;
      background: #FF6666;
      font-size: .32rem;
    }
  }
}
</style>



    
