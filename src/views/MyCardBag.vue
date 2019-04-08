<template>
  <div class="MyCardBag">
    <header>
      <div class="icon_return"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
      <div class="tel">我的卡包</div>
      <div class="add" @click="cardAddPopShow">添加</div>
    </header>

    <div class="to_be_used">
      <i><img src="../assets/img3.png" alt=""></i>
      <div class="user">
        <span><img src="../assets/img1.png" alt=""></span>
        <p>小宝</p>
      </div>
      <div class="content">
        <div class="text">
          <p>幺儿陪伴卡幺儿陪伴卡幺儿陪伴卡</p>
          <span>剩余20天</span>
        </div>
        <div class="btn"><span>去使用</span></div>
      </div>
    </div>


    <div class="to_activate card_commonality">
      <div class="image">
        <i><img src="../assets/img3.png" alt=""></i>
        <div>
          <p>卡号：00000000</p>
          <span>去激活</span>
        </div>
      </div>
      <div class="content">
        <div class="text">
          <p>幺儿陪伴卡幺儿陪伴卡幺儿陪伴卡</p>
          <span>剩余20天</span>
        </div>
        <div class="btn"><span>去使用</span></div>
      </div>
    </div>


    <div class="expired card_commonality">
      <div class="image">
        <i><img src="../assets/img3.png" alt=""></i>
        <div>
          <p>卡号：00000000</p>
          <span class="color_hei">已过期</span>
          <em><img src="../assets/icon_close.png" alt=""></em>
        </div>
      </div>
      <div class="content">
        <div class="text">
          <p>幺儿陪伴卡幺儿陪伴卡幺儿陪伴卡</p>
        </div>
      </div>
    </div>

    <div class="card_add_pop" v-if="cardAddPop">
      <div class="card_add">
        <div>
          <span class="close" @click="cardAddPopHide"><em><img src="../assets/icon_close.png" alt=""></em></span>
          <h3>兑换码</h3>
          <p>
            <input type="text">
            <i><img src="../assets/icon_close2.png" alt=""></i>
          </p>
          <a>提 交</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
      name:'MyCardBag',
      data(){
        return{
          cardAddPop:false
        }
      },
      components:{
      },
      methods:{
        cardAddPopShow(){
          this.cardAddPop = true;
        },
        cardAddPopHide(){
          this.cardAddPop = false;
        },
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
.MyCardBag{
  header{
    height: 1rem;
    display: flex;
    align-items: center;
    width: 6.6rem;
    justify-content: space-between;
    margin:  0 auto;
    padding-top:.3rem; 
    margin-bottom: .2rem;
    .icon_return{
      width: 1rem;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      span{
        overflow: hidden;
        width: .27rem;
      }
    }
    .tel{
      color:#515C6F;
      font-weight: bold;
      font-size: .32rem;
    }
    .add{
      width: 1rem;
      text-align: right;
      font-size: .28rem;
      color: #FF6D69;
    }
  }

  .to_be_used{
    width: 6.6rem;
    margin: 0 auto;
    border-radius:10px;
    overflow: hidden;
    background: #fff;
    margin-bottom: .2rem;
    i{
      overflow: hidden;
      display: block;
      height: 2.4rem;
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
        }
      }
      .btn{
        width: 1.4rem;
        height: .52rem;
        line-height: .52rem;
        text-align: center;
        color: #fff;
        background: #FF6666;
        border-radius: 50px;
      }
    }
  }
  .card_commonality{
    width: 6.6rem;
    margin: 0 auto;
    border-radius:10px;
    overflow: hidden;
    background: #fff;
    margin-bottom: .2rem;
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
        background: rgba(4, 4, 4, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        p{
          position: absolute;
          left: .28rem;
          top: .18rem;
          color: #fff;
        }
        em{
          position: absolute;
          right: .18rem;
          width: .48rem;
          height: .48rem;
          top: .18rem;
        }
        span{
          width: 1.72rem;
          height: 1.72rem;
          line-height: 1.72rem;
          text-align: center;
          color: #FF6666;
          font-size: .28rem;
          background: #fff;
          border-radius: 50%;
          overflow: hidden;
          &.color_hei{
            color: #515C6F;
          }
        }
        
      }
    }
    .content{
      display: flex;
      padding: .16rem .28rem .2rem .4rem;
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
        }
      }
      .btn{
        width: 1.4rem;
        height: .52rem;
        line-height: .52rem;
        text-align: center;
        color: #fff;
        background: #FF6666;
        border-radius: 50px;
      }
    }
  }
  .card_add_pop{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: .5);
    .card_add{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      div{
        background: #fff;
        border-radius: 10px;
        width: 6.32rem;
        position: relative;
        padding-bottom: .74rem;
        span{
          width: 1rem;
          height: 1rem;
          display: flex;
          justify-content: flex-end;
          position: absolute;
          top: .24rem;
          right: .24rem;
          em{
            width: .49rem;
            height: .49rem;
            overflow: hidden;
            border-radius: 50%;
          }
        }
        h3{
          font-size: .32rem;
          color: #515C6F;
          text-align: center;
          padding-top: 1rem;
        }
        p{
          width: 5.26rem;
          height: .82rem;
          display: flex;
          align-items: center;
          margin: .28rem auto .46rem;
          background: #EEEEEF;
          border-radius:5px;
          input{
            flex: 1;
            outline: medium;
            height: 100%;
            background: none;
            padding-left: .3rem;
          }
          i{
            width: .36rem;
            height: .36rem;
            overflow: hidden;
            margin-right: .26rem;
          }
        }
        a{
          width: 3.7rem;
          height: .8rem;
          line-height: .8rem;
          text-align: center;
          font-weight: bold;
          color: #fff;
          border-radius:50px;
          background: #FF6666;
          display: block;
          margin: 0 auto;
        }
      }
    }
  }
  
}
</style>



    
