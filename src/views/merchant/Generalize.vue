<template>
  <div class="Generalize">
    <header>
      <p>99</p>
      <span>团队总人数</span>
    </header>
  
    <ul class="team_member">
      <li>
        <i></i>
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
        <i></i>
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
        <i></i>
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

  </div>
</template>
<script>
export default {
  name:'Generalize',
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
    document.title = "我的推广"
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
.Generalize{
  header{
    height: 2.4rem;
    background: #FF6C5F;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    font-size: .28rem;
    p{
      font-size: .48rem;
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
        background: #ccc;
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
            font-weight: 400;
            flex: 1;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
          span{
            font-weight: 300;
            text-align: right;
            font-size: .24rem;
          }
        }
        .name{
          margin-bottom: .1rem;
        }
      }
    }
  }
}
</style>



    
