<template>
  <div class="MyTeamTow">
    <header>
      <div>
        <p>999</p>
        <span>团队总人数</span>
      </div>
      <div>
        <p>999</p>
        <span>团队</span>
      </div>
      <div>
        <p>999</p>
        <span>会员</span>
      </div>
    </header>
    <div class="tab_title">
      <p :class="table == 1 ? 'active' : ''" @click="tabkeChage(1)">团队成员</p>
      <p :class="table == 2 ? 'active' : ''" @click="tabkeChage(2)">直属会员</p>
    </div>
    <ul class="team_member" v-if="table == 1">
      <li>
        <i><img src="../../assets/head_portrait2.png" alt=""></i>
        <div>
          <p class="name">
            <b>张继生</b>
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
          </p>
          <p>推广会员：8人 </p>
          <p>收益：￥800.00</p>
        </div>
      </li>
    </ul>
    <ul class="team_member" v-if="table == 2">
      <li>
        <i><img src="../../assets/head_portrait2.png" alt=""></i>
        <div>
          <p class="name">
            <b>张继生</b>
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
  name:'MyTeamTow',
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
    document.title = "团队详情"
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
.MyTeamTow{
  header{
    height: 2.4rem;
    background: #FF6C5F;
    display: flex;
    align-items: center;
    justify-content: space-around;
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
  
}
</style>



    
