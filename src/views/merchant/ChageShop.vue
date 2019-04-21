<template>
  <div class="ChageShop">
    <div>
      <h3>当前门店</h3>
      <ul class="team_member">
        <li>
          <i></i>
          <div>
            <p class="name">
              <b>游乐园亲子门票系列游乐园亲子门票系列游乐园亲子门票系列</b>
            </p>
            <p>
              <b>重庆市渝中区大坪龙湖时代天街悠游堂店</b>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <h3>其他门店</h3>
      <ul class="team_member">
        <li>
          <i></i>
          <div>
            <p class="name">
              <b>游乐园亲子门票系列游乐园亲子门票系列游乐园亲子门票系列</b>
            </p>
            <p>
              <b>重庆市渝中区大坪龙湖时代天街悠游堂店</b>
            </p>
          </div>
        </li>
        <li>
          <i></i>
          <div>
            <p class="name">
              <b>游乐园亲子门票系列</b>
            </p>
            <p>
              <b>重庆市渝中区大坪龙湖时代天街悠游堂店</b>
            </p>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
export default {
  name:'ChageShop',
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
    document.title = "切换门店"
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
.ChageShop{
  div{
    h3{
      height: 1rem;
      background: #f0f0f0;
      padding-left: .3rem;
      font-size: .3rem;
      line-height: 1rem;
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
}
</style>



    
