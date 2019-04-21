<template>
  <div class="TeamDel">
    <header>
      <span><img src="../../assets/head_portrait2.png" alt=""></span>
      <div>
        <h3>
          <a>默写组</a>
          <i></i>
        </h3>
        <p>
          <a>会员：8人</a>
          <b>收益：￥800.00</b>
        </p>
      </div>
    </header>
    <div class="tab_title">
      <p :class="table == 1 ? 'active' : ''" @click="tabkeChage(1)">团队成员</p>
      <p :class="table == 2 ? 'active' : ''" @click="tabkeChage(2)">团队销售</p>
    </div>
    <ul class="team_member" v-if="table == 1">
      <li>
        <i><img src="../../assets/head_portrait2.png" alt=""></i>
        <div>
          <p class="name">
            <b>张继生</b>
            <span>2018-10-22成为会员</span>
          </p>
          <p>推广会员：8人 </p>
          <p>收益：￥800.00</p>
        </div>
      </li>
      <li>
        <i><img src="../../assets/head_portrait2.png" alt=""></i>
        <div>
          <p class="name">
            <b>张继生</b>
            <span>2018-10-22成为会员</span>
          </p>
          <p>推广会员：8人 </p>
          <p>收益：￥800.00</p>
        </div>
      </li>
    </ul>
    <div class="team_market" v-else>
      <div class="btns">
        <p :class="market == 1 ? 'active' : ''" @click="marketChage(1)">PLUS (43)</p>
        <p :class="market == 2 ? 'active' : ''" @click="marketChage(2)">商品 (43)</p>
      </div>
      <ul>
        <li>
          <i></i>
          <div>
            <p>
              <span><img src="../../assets/head_portrait2.png" alt=""></span>
              <a>于红乐</a>
              <b>已结算</b>
            </p>
            <h3>游乐园亲子门票系列</h3>
            <time>下单时间：2019-02-12</time>
            <em>收益：<strong>￥800</strong></em>
          </div>
        </li>
        <li>
          <i></i>
          <div>
            <p>
              <span><img src="../../assets/head_portrait2.png" alt=""></span>
              <a>于红乐</a>
              <b class="col1">已结算</b>
            </p>
            <h3>游乐园亲子门票系列</h3>
            <time>下单时间：2019-02-12</time>
            <em>收益：<strong>￥800</strong></em>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
export default {
  name:'TeamDel',
  data(){
    return{
      table:1,
      market:1
    }
  },
  components:{
  },
  methods:{
    tabkeChage(num){
      const that = this;
      that.table = num;
    },
    marketChage(num){
      const that = this;
      that.market = num;
    },
  },

  // 创建前状态
  beforeCreate(){
  },

  // 创建完毕状态 
  created(){
    document.title = "团队详情"
    document.body.style.background = "#fff";
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
.TeamDel{
  header{
    height: 2.4rem;
    background: #FF6C5F;
    display: flex;
    align-items: center;
    span{
      width: 1.32rem;
      height: 1.32rem;
      overflow: hidden;
      border: 5px solid #fff;
      border-radius: 50%;
      margin-left: 1.4rem;
    }
    div{
      padding-left: .4rem;
      color: #fff;
      h3{
        display: flex;
        font-size: .36rem;
        align-items: center;
        a{
          color: #fff;
        }
        i{
          width: .26rem;
          height: .26rem;
          background: #ccc;
          margin-left: .36rem;
        }
      }
      p{
        padding-top: .24rem;
        display: flex;
        align-items: center;
        font-size: .28rem;
        a{
          color: #fff;
        }
        b{
          font-weight: normal;
          padding-left: .4rem;
        }
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
        width: 1.32rem;
        height: 1.32rem;
        overflow: hidden;
        border-radius: 50%;
      }
      div{
        padding-left: .4rem;
        flex: 1;
        p{
          font-size: .28rem;
          color: #666666;
          display: flex;
          align-items: flex-end;
          b{
            font-size: .32rem;
            color: #222222;
            flex: 1;
          }
          span{
            font-size: .24rem;
          }
        }
        .name{
          margin-bottom: .14rem;
        }
      }
    }
  }
  .team_market{
    .btns{
      display: flex;
      height: 1.04rem;
      background: #F0F0F0;
      align-items: center;
      justify-content: space-around;
      p{
        width: 3.3rem;
        height: .64rem;
        line-height: .64rem;
        text-align: center;
        background: #fff;
        border: 1px solid #fff;
        font-size: .28rem;
        color:#222222;
        border-radius:7px;
      }
      .active{
        border: 1px solid #FF6C5F;
        color:#FF6C5F;
      }
    }
    ul{
      li{
        display: flex;
        padding: .3rem .3rem .48rem .36rem;
        border-bottom: 1px solid #F0F0F0;
        align-items: center;
        i{
          width: 1.28rem;
          height: 1.28rem;
          border-radius: 5px;
          overflow: hidden;
          background: #ccc;
        }
        div{
          flex: 1;
          padding-left: .32rem;
          p{
            display: flex;
            align-items: center;
            padding-bottom: .2rem;
            border-bottom: 1px dashed #F0F0F0;
            span{
              width: .64rem;
              height: .64rem;
              overflow: hidden;
              border-radius: 50%;
            }
            a{
              flex: 1;
              padding-left: .22rem;
              font-size: .28rem;
              font-weight: bold;
              color: #222222;
            }
            b{
              font-size: .28rem;
              color: #222222;
              &.col1{
                color: #FF6C5F;
              }
            }
          }
          h3{
            font-size: .32rem;
            color: #222222;
            font-weight: bold;
            padding-top: .12rem;
          }
          time{
            font-size: .28rem;
            color: #666666;
            display: block;
          }
          em{
            font-size: .28rem;
            color: #666666;
            display: block;
            font-style: normal;
            strong{
              color: #222222;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
}
</style>



    
