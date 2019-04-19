<template>
  <div class="MyGeneralize">
    <header>
      <div>
        <p>￥999</p>
        <span>累计金额</span>
      </div>
      <div>
        <p>999</p>
        <span>累计订单</span>
      </div>
    </header>
    <div class="tab_title">
      <p :class="table == 1 ? 'active' : ''" @click="tabkeChage(1)">全部订单</p>
      <p :class="table == 2 ? 'active' : ''" @click="tabkeChage(2)">未结算</p>
      <p :class="table == 3 ? 'active' : ''" @click="tabkeChage(3)">已结算</p>
    </div>
    <ul class="team_member" v-if="table == 1">
      <li>
        <i></i>
        <div>
          <p class="name">
            <b>游乐园亲子门票系列游乐园亲子门票系列游乐园亲子门票系列</b>
          </p>
          <p class="col1">收益：￥800.00</p>
          <p>下单时间：2019-02-12 </p>
        </div>
        <span>已结算</span>
      </li>
    </ul>
    <ul class="team_member" v-if="table == 2">
      <li>
        <i></i>
        <div>
          <p class="name">
            <b>游乐园亲子门票系列游乐园亲子门票系列游乐园亲子门票系列</b>
          </p>
          <p class="col1">收益：￥800.00</p>
          <p>下单时间：2019-02-12 </p>
        </div>
        <span class="col1">未结算</span>
      </li>
    </ul>
    <ul class="team_member" v-if="table == 3">
      <li>
        <i></i>
        <div>
          <p class="name">
            <b>游乐园亲子门票系列游乐园亲子门票系列游乐园亲子门票系列</b>
          </p>
          <p class="col1">收益：￥800.00</p>
          <p>下单时间：2019-02-12 </p>
        </div>
          <span>已结算</span>
      </li>
    </ul>
    

  </div>
</template>
<script>
export default {
  name:'MyGeneralize',
  data(){
    return{
      table:1,
    }
  },
  components:{
  },
  methods:{
    tabkeChage(num){
      const that = this;
      that.table = num;
    },

  },

  // 创建前状态
  beforeCreate(){
  },

  // 创建完毕状态 
  created(){
    document.title = "我的团队（二级）"
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
.MyGeneralize{
  header{
    height: 2.4rem;
    background: #FF6C5F;
    display: flex;
    align-items: center;
    justify-content: center;
    div{
      width: 2.6rem;
      color: #fff;
      display: flex;
      align-items: center;
      flex-direction: column;
      font-size: .28rem;
      p{
        font-size: .48rem;
        padding-bottom: .1rem;
      }
    }
  }
  .tab_title{
    display: flex;
    height: 1.4rem;
    p{
      flex: 1;
      text-align: center;
      font-size: .32rem;
      line-height: 1.4rem;
      color: #222222;
      border-bottom: 2px solid #F0F0F0;
    }
    .active{
      border-bottom: 2px solid #000000;
      font-weight: bold;
    }
  }

  .team_member{
    li{
      padding: .4rem .3rem;
      border-bottom: 1px solid #F0F0F0;
      display: flex;
      align-items: center;
      i{
        width: 1.28rem;
        height: 1.28rem;
        overflow: hidden;
        border-radius: 5px;
        background: #ccc;
      }
      div{
        padding-left: .4rem;
        flex: 1;
        p{
          font-size: .28rem;
          color: #666666;
          display: flex;
          b{
            font-size: .32rem;
            color: #222222;
            width: 4.1rem;
            font-weight: 400;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
          
        }
        .name{
          padding-bottom: .1rem;
        }
        .col1{
          color: #FF6C5F;
        }
      }
      span{
        font-size: .24rem;
        color: #222222;
        font-weight: 400;
        text-align: right;
        flex: 1;
        &.col1{
          color: #FF6C5F;
        }
      }
    }
  }
}
</style>



    
