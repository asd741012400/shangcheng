<template>
  <div class="ClassifyList">
    <header>
      <div class="icon_return"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
      <div class="tel">分类列表</div>
      <div class="add"></div>
    </header>
    <div class="nav_list">
        <ul>
          <li :class="allCateIndex == index ? 'active' : ''" v-for="(item,index) in AllCate">
            <div>
              <p>{{item.c_name}}</p>
              <span></span>
            </div>
          </li>
        </ul>
      </div>
    
    <div class="activity_list">
      <ul>
        <li>
          <div class="img">
            <span></span>
            <div>
              <p>会员价</p>
              <i>￥</i>
              <a>20</a>
            </div>
          </div>
          <div class="project">
            <p>悠游堂亲子嘉年华</p>
            <span>报名　11/22</span>
          </div>
          <div class="share">
            <div class="price">
              <span>现价</span>
              <b>￥45.0</b>
              <a>￥345</a>
            </div>
          </div>
        </li>
        <li>
          <div class="img">
            <span></span>
            <div>
              <p>会员价</p>
              <i>￥</i>
              <a>20</a>
            </div>
          </div>
          <div class="project">
            <p>悠游堂亲子嘉年华</p>
            <span>报名　11/22</span>
          </div>
          <div class="share">
            <div class="price">
              <span>现价</span>
              <b>￥45.0</b>
              <a>￥345</a>
            </div>
          </div>
        </li>
      </ul>
    </div>

   
  </div>
</template>
<script>
export default {
  name:'ClassifyList',
  data(){
    return{
      apiUrl:this.$common.ApiUrl(),
      AllCate:"",
      allCateIndex:0
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
    const that = this;
    that.$http.get(that.apiUrl+'home/GetAllCate')
      .then(response=>{
        var data = JSON.parse(JSON.stringify(response.data))
        if(data.code){
          const resData = data.data;
          that.AllCate = [
            {
              c_id:0,
              c_name:"全部"
            }
          ]
          that.AllCate = that.AllCate.concat(resData);
        }

      })  
      .catch(function(error) {
          console.log(error);
      });
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
.ClassifyList{
  header{
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:  0 auto;
    padding-top:.3rem; 
    padding-bottom: .2rem;
    background: #FFFFFF;
    position: relative;
    .icon_return{
      width: 1rem;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      position: absolute;
      left: .4rem;
      span{
        overflow: hidden;
        width: .27rem;
      }
    }
    .tel{
      color:#515C6F;
      font-weight: bold;
      font-size: .32rem;
      text-align: center;
    }
 
  }
  .nav_list{
    margin: .1rem 0;
    background: #fff;
    ul{
      white-space:nowrap;
      padding: 0 .32rem;
      width: auto;
      overflow-x: scroll;
      li{
        background: #fff;
        margin-right: .3rem;
        display: inline-block;
        color: #515C6F;
        font-size: .28rem;
        div{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: .82rem;
          position: relative;
          span{
            width: 1.08rem;
            height: 4px;
            background: #FF6666;
            position: absolute;
            bottom: 0;
            display: none;
            border-radius:5px;
          }
        }
      }
      li.active{
        div{
          span{
            display: block;
          }
        }
      }
    } 
  }
  .activity_list{
    ul{
      li{
        background: #fff;
        padding-top: .2rem;
        margin-bottom: .2rem;
        
        .img{
          margin: 0 .2rem;
          height: 3rem;
          background: #ccc;
          border-radius: 5px;
          position: relative;
          div{
            width: 2.48rem;
            background:linear-gradient(269deg,rgba(255,102,102,1) 0%,rgba(255,179,137,1) 100%);
            border-radius:0px 20px 20px 0px;
            position: absolute;
            bottom: -.12rem;
            display: flex;
            align-items: center;
            height: .62rem;
            justify-content: center;
            color: #fff;
            p{
              font-size: .28rem;
            }
            i{
              font-size: .32rem;
              font-style: normal;
            }
            a{
              font-size: .4rem;
            }
          }
        }
        .project{
          display: flex;
          padding: .3rem .2rem;
          p{
            flex: 1;
            color: #515C6F;
            padding-left: .28rem;
          }
          span{
            color: #FF6666;
          }
        }
        .share{
          display: flex;
          .price{
            flex: 1;
            display: flex;
            align-items: center;
            padding-bottom: .4rem;
            justify-content: flex-start;
            padding-left: .46rem;
            span{
              color: #515C6F;
            }
            b{
              font-weight: normal;
              font-size: .36rem;
              padding-left: 2px;
              padding-right: .2rem;
            }
            a{
              text-decoration: line-through;
            }
          }
          p{
            background:linear-gradient(90deg,rgba(255,102,102,1) 0%,rgba(255,179,137,1) 100%);
            width: 2rem;
            height: .5rem;
            line-height: .5rem;
            border-radius:20px;
            text-align: center;
            font-size: .22rem;
            color: #fff;
            margin-right: .22rem;
            span{
              font-size: .28rem;
            }
          }
        }
      }
      
     
    }
  }
}
</style>





    
