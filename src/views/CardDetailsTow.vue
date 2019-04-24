<template>
  <div class="CardDetailsTow">
    <header>
        <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_w.png" alt=""></span></div>
        <h3>卡内权益详情</h3>
        <div class="to_be_used">
          <div class="image">
            <i><img src="../assets/img3.png" alt=""></i>
          </div>
          <div class="user">
            <span><img src="../assets/img1.png" alt=""></span>
            <p>小宝</p>
          </div>
          <div class="content">
            <div class="text">
              <p>幺儿陪伴卡幺儿陪伴卡幺儿陪伴卡</p>
              <span>
                <b>剩余20天</b>
                <a>去使用</a>
              </span>
            </div>
          </div>
        </div>
    </header>

    <div class="hint">
      <p>尊敬的圈豆会员xxx，价值X元的游乐权益，您可免费领取</p>
    </div>



    <div class="card_project">
      <h3>权益项目</h3>
      <ul>
        <li>
          <div class="image">
            <i><img src="../assets/img1.png" alt=""></i>
            <p><span>失效</span></p>
          </div>
          <div class="text">
            <h4>
              <span>龙湖时代天街悠游堂龙湖时代天街悠游堂龙湖时代天街悠游堂</span>
              <b class="col2">无限畅玩</b>
            </h4>
            <div class="text_div">
              <p>包含蹦床，滑梯</p>
              <p>有效期：2019-02-02至2019-02-02</p>
            </div>
            <div class="price_div">
              <b>价值￥199</b>
            </div>
          </div>
        </li>
        <li>
          <div class="image">
            <i><img src="../assets/img1.png" alt=""></i>
            <p><span>失效</span></p>
          </div>
          <div class="text">
            <h4>
              <span>龙湖时代天街悠游堂龙湖时代天街悠游堂龙湖时代天街悠游堂</span>
              <b class="col1">剩余1次</b>
            </h4>
            <div class="text_div">
              <p>包含蹦床，滑梯</p>
              <p>有效期：2019-02-02至2019-02-02</p>
            </div>
            <div class="price_div">
              <b>价值￥199</b>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="card_project">
      <h2><b>二选一</b><span>（使用其中一项，则另一项失效）</span></h2>
      <ul>
        <li class="li_color">
          <div class="image">
            <i><img src="../assets/img1.png" alt=""></i>
            <p><span>失效</span></p>
          </div>
          <div class="text">
            <h4>
              <span>龙湖时代天街悠游堂龙湖时代天街悠游堂龙湖时代天街悠游堂</span>
              <b class="col1">畅玩</b>
            </h4>
            <div class="text_div">
              <p>包含蹦床，滑梯</p>
              <p>有效期：2019-02-02至2019-02-02</p>
            </div>
            <div class="price_div">
              <b>价值￥199</b>
            </div>
          </div>
        </li>
        <li>
          <div class="image">
            <i><img src="../assets/img1.png" alt=""></i>
            <p><span>失效</span></p>
          </div>
          <div class="text">
            <h4>
              <span>龙湖时代天街悠游堂龙湖时代天街悠游堂龙湖时代天街悠游堂</span>
              <b class="col1">剩余1次</b>
            </h4>
            <div class="text_div">
              <p>包含蹦床，滑梯</p>
              <p>有效期：2019-02-02至2019-02-02</p>
            </div>
            <div class="price_div">
              <b>价值￥199</b>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

    export default {
      name:'CardDetailsTow',
      data(){
        return{
          distance:false,
          types:false,
          age:false
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
.CardDetailsTow{
  header{
    background:linear-gradient(147deg,rgba(255,102,102,1) 0%,rgba(255,179,137,1) 100%) center top/100% 4.76rem no-repeat;
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
    h3{
      line-height: 1.6rem;
      text-align: center;
      font-weight: bold;
      color: #fff;
      font-size: .32rem;
    }
    .to_be_used{
      width: 6.6rem;
      margin: 0 auto;
      border-radius:10px;
      overflow: hidden;
      background: #fff;
      .image{
        height: 2.4rem;
        position: relative;
        i{
          overflow: hidden;
          display: block;
        }
        div{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          p{
            position: absolute;
            left: .28rem;
            top: .18rem;
            color: #fff;
          }
          span{
            width: 1.5rem;
            height: 1.5rem;
            overflow: hidden;
          }
        }
      }
      .user{
        display: flex;
        padding-left: .4rem;
        height: .6rem;
        position: relative;
        span{
          width: .88rem;
          height: .88rem;
          border-radius: 50%;
          overflow: hidden;
          position: absolute;
          top: -.44rem;
        }
        p{
          padding-left: 1.1rem;
          font-size: .28rem;
          color: #515C6F;
          flex: 1;
          padding-top: 2px;
        }
        a{
          font-size: .24rem;
          color: #FF6666;
          padding-right: .32rem;
          padding-top: 2px;
        }
      }
      .content{
        display: flex;
        padding: 0 .28rem .2rem .4rem;
        align-items: flex-end;
        .text{
          display: flex;
          align-items: flex-start;
          flex: 1;
          flex-direction: column;
          justify-content: flex-start;
          p{
            font-size: .24rem;
            color: #535D70;
          }
          span{
            font-size: .22rem;
            color: #FFB389;
            padding-top: .1rem;
            display: flex;
            width: 100%;
            align-items: center;
            b{
              font-weight: normal;
              flex: 1;
            }
            a{
              background: #FF6666;
              width: 1.4rem;
              height: .52rem;
              line-height: .52rem;
              text-align: center;
              color: #fff;
              font-size: .24rem;
              border-radius:50px;
            }
          }
        }
 
      }
    }
  }
  .hint{
    background: url('../assets/CardDetailsTow_bg.png') center center /100% no-repeat;
    height: 1.8rem;
    margin: .1rem .27rem 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    p{
      width: 4.2rem;
      font-size: .28rem;
      color: #515C6F;
      margin-left: .72rem;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .card_project{
    margin-top: .1rem;
    h3{
      height: 1.04rem;
      background: #fff;
      text-align: center;
      line-height: 1.04rem;
      font-size: .32rem;
      color: #515C6F;
      font-weight: bold;
    }
    h2{
      height: 1.04rem;
      background: #fff;
      line-height: 1.04rem;
      font-size: .32rem;
      color: #515C6F;
      margin-top: .4rem;
      b{
        padding-left: .45rem;
      }
      span{
        font-size: .24rem;
        color: #FF6666;
      }
    }
    ul{
      padding-top: .1rem;
      li:last-of-type{
        border: 0;
      }
      
      li{
        display: flex;
        padding: .44rem .45rem .8rem;
        background: #fff;
        border-bottom: 1px solid #F6F6F6;
        .image{
          width: 2.04rem;
          height: 2.04rem;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          i{
            width: 2.04rem;
            height: 2.04rem;
            overflow: hidden;
          }
          p{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            color: #fff;
            background: rgba($color: #000000, $alpha: .45);
            display: flex;
            align-items: center;
            justify-content: center;
            span{
              font-weight: bold;
              font-size: .28rem;
            }
          } 
        }
        .text{
          padding-left: .26rem;
          flex: 1;
          h4{
            display: flex;
            align-items: center;
            span{
              flex: 1;
              font-size: .28rem;
              color: #535D70;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: .5rem;
            }
            b{
              font-weight: bold;
              font-size: .24rem;
              &.col1{
                color: #FF6666;
              }
              &.col2{
                color: #FFB389;
              }
            }
          }
          .text_div{
            height: 1.3rem;
            p{
              font-size: .24rem;
              color: #999999;
            }
            em{
              font-style: normal;
              display: block;
              width: 1.54rem;
              height: .34rem;
              line-height: .34rem;
              border:1px solid #FFB389;
              color: #FFB389;
              text-align: center;
            }
          }
          .price_div{
            display: flex;
            align-items: center;
            b{
              flex: 1;
              font-size: .28rem;
              color: #535D70;
            }
            a{
              border-radius:50px;
              background: #FF6666;
              color: #fff;
              text-align: center;
              width: 1.42rem;
              line-height: .52rem;
              height: .52rem;
            }
          }
        }
      }
      li.li_color{
        .text{
          h4{
            span{
              color: #999999;
            }
            b{
              color: #999999;
            }
          }
          .price_div{
            b{
              color: #999999;
            }
          }
        }
      }
    }
  }

}
</style>



    
