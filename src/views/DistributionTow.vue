<template>
  <div class="DistributionTow">
    <div class="icon_return"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
    <header><span>我的推广</span></header>
    <div class="header">
      <div class="shop_message">
        <span><img src="../assets/head_portrait.png" alt=""></span>
        <div>
          <h3>
            <b>江北万象城店</b>
            <i><img src="../assets/icon_vip2.png" alt=""></i>
          </h3>
          <p>13526489578</p>
        </div>
        <em>我的店铺 ></em>
      </div>

      <div class="message_show">
        <ul>
          <li>
            <p>￥799</p>
            <span>历史收益</span>
          </li>
          <li>
            <p>￥799</p>
            <span>可提现</span>
          </li>
          <li>
            <p>￥799</p>
            <span>在途收益</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="project_nav">
      <ul>
        <li>
          <div>
            <i><img src="../assets/icon_team.png" alt=""></i>
            <p>团队成员<span>(<b>1</b>）</span></p>
          </div>
        </li>
        <li>
          <div>
            <i><img src="../assets/icon_generalize2.png" alt=""></i>
            <p>我的推广</p>
          </div>
        </li>
        <li>
          <div>
            <i><img src="../assets/icon_withdraw_deposit.png" alt=""></i>
            <p>申请提现</p>
          </div>
        </li>
        <li>
          <div>
            <i><img src="../assets/icon_record2.png" alt=""></i>
            <p>提现记录</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
    export default {
      name:'DistributionTow',
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
.DistributionTow{
  .icon_return{
    position: absolute;
    width: 1rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    top: .3rem;
    left: .2rem;
    span{
      width: .27rem;
      overflow: hidden;
    }
  }
  header{
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:  0 auto;
    padding-top:.3rem; 
    background: #fff;
    background: #F6F6F6;
    span{
      font-size: .32rem;
      color: #515C6F;
      font-weight: bold;
    }
  }
  .header{
    background: url('../assets/distribution_bg.png')center top/ 100% no-repeat;
    height: 4rem;
    .shop_message{
      display: flex;
      align-items: center;
      height: 2.16rem;
      padding-left: .74rem;
      position: relative;
      span{
        width: 1.52rem;
        height: 1.52rem;
        overflow: hidden;
        border-radius: 50%;
      }
      div{
        padding-left: .36rem;
        h3{
          display: flex;
          align-items: center;
          b{
            font-size: .28rem;
            color: #fff;
            padding-right: .12rem;
          }
          i{
            width: .34rem;
            overflow: hidden;
          }
        }
        p{
          font-size: .22rem;
          color: #fff;
          padding-top: 4px;
        }
      }
      em{
        font-style: normal;
        position: absolute;
        right: .3rem;
        font-size: .24rem;
        color: #fff;
        top: .32rem;
      }
    }

    .message_show{
      background: #fff;
      border-radius:10px 10px 0 0; 
      ul{
        width: 5.6rem;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 1.84rem;
        li{
          text-align: center;
          p{
            font-size: .4rem;
            color: #FF6666;
          }
          span{
            font-size: .24rem;
            color: #515C6F;
          }
        }
      }
    }
  }
  .project_nav{
    border-top: 10px solid #F6F6F6;
    ul{
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      padding-top: .6rem;
      li{
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 1rem;
        div{
          width: 2rem; 
          text-align: center;
          i{
            overflow: hidden;
            width: 1.52rem;
            height: 1.52rem;
            display: block;
            margin: 0 auto;
          }
          p{
            font-size: .28rem;
            color: #515C6F;
            padding-top: .4rem;
            b{
              font-weight: normal;
              color: #FF6666;
            }
          }
        }
      }
    }
  }
}
</style>



    
