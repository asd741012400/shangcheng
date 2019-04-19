<template>
  <div class="MyTeam">
    <header>
      <span><img src="../../assets/head_portrait2.png" alt=""></span>
      <div>
        <h3>
          <a>北上</a>
          <i>2019-02-02成为会员</i>
        </h3>
        <p>
          <a>推广会员：8人</a>
          <b>收益：￥800.00</b>
        </p>
      </div>
    </header>

    <ul class="team_member">
      <li>
        <i></i>
        <div>
          <p class="name">
            <b>游乐园亲子门票系列游乐园亲子门票系列游乐园亲子门票系列</b>
          </p>
          <p>收益：￥800.00</p>
        </div>
      </li>
      <li>
        <i></i>
        <div>
          <p class="name">
            <b>游乐园亲子门票系列</b>
          </p>
          <p>收益：￥800.00</p>
        </div>
      </li>
    </ul>
    
  </div>
</template>
<script>
export default {
  name:'MyTeam',
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
    document.title = "我的团队"
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
.MyTeam{
  header{
    height: 2.4rem;
    background: #FF6C5F;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
      width: 1.32rem;
      height: 1.32rem;
      overflow: hidden;
      border: 5px solid #fff;
      border-radius: 50%;
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
          font-weight: bold;
        }
        i{
          margin-left: .28rem;
          font-size: 0.24rem;
          font-weight: normal;
          font-style: normal;
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
            width: 5.1rem;
            font-weight: 400;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
        }
        .name{
          padding-bottom: .1rem;
        }
      }
    }
  }
}
</style>



    
