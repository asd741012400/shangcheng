<template>
  <div class="WithdrawDepositDel">
    <div class="money">
      <p>金额</p>
      <span>500.00</span>
    </div>
    <ul>
      <li>
        <p>当前状态</p>
        <span class="col1">已到账</span>
      </li>
      <li>
        <p>提现金额</p>
        <span>357.09</span>
      </li>
      <li>
        <p>服 务 费</p>
        <span>0.50</span>
      </li>
      <li>
        <p>申请时间</p>
        <span>2019-03-19</span>
      </li>
      <li>
        <p>提现时间</p>
        <span>2019-03-19</span>
      </li>
      <li>
        <p>提现去向</p>
        <span>微信零钱</span>
      </li>
      <li>
        <p>提现单号</p>
        <span>25335t8512e2</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name:'WithdrawDepositDel',
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
    document.title = "提现明细"
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
.WithdrawDepositDel{
  .money{
    margin: .2rem .6rem 0;
    border-bottom: 1px solid #CECECE;
    height: 1rem;
    display: flex;
    align-items: center;
    p{
      flex: 1;
      font-size: .28rem;
      color: #666666;
    }
    span{
      font-size: .36rem;
      color: #FF6C60;
    }
  }
  ul{
    padding: .08rem .6rem 0;
    li{
      display: flex;
      padding-top: .24rem;
      font-size: .28rem;
      color: #999999;
      span{
        flex: 1;
        text-align: right;
        color: #222222;
        &.col1{
          color: #999999;
        }
        &.col2{
          color: #FF6C60;
        }
      }
    }
  }
}
</style>



    
