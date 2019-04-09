<template>
  <div class="City">
    <div class="city">
      <div style="text-align: center;position: fixed;top: 0;height: 32px;width:100%;line-height: 32px;z-index: 300;background-color: #FFF;box-shadow: 0 0 2px rgba(0,0,0,.2)
      ">
        我的城市：&nbsp;&nbsp;<span id="qyxs" style="color:#FF0000">{{location}}</span>
      </div>
      <div class="city-wrapper city-wrapper-hook">
        <div class="scroller-hook">
          <div class="cities cities-hook">
            <div v-for="i in cityData">
                <div class="title">{{i.name}}</div>
                <ul>
                    <li v-for="item in i.cities" class="item city-click" :data-name="item.name" :data-id="item.code"><span class="border-1px name" @touchend="touchUp(item)"  @touchstart="chooseCity()">{{item.name}}</span>
                    </li>
                </ul>
            </div>
          </div>
        </div>
        <div class="shortcut shortcut-hook" style="right: 50px;top:100px !important;" @touchstart="touchIndex">
            <ul style="width: 100px;text-align: left;padding: 20px 0">
                <li v-for="i in cityData" :data-anchor="i.name" class="item">{{i.name.substr(0, 1)}}</li>
            </ul>
        </div>
      </div>
    </div>
   
  </div>
</template>
<script>
import cityData from '../components/City/city.js'
export default {
  name:'City',
  data(){
    return{
      cityData:cityData,
      location:"重庆"
    }
  },
  components:{

  },
  methods:{
    touchIndex: function (e) {
      // console.log(e, 'e')
      let v = this
      let anchor = e.target.getAttribute('data-anchor')
      // console.log(anchor ,'anchor')
      let firstTouch = e.touches[0]
      v.touch.y1 = firstTouch.pageY
      v.touch.anchor = anchor
      v.scrollTo(anchor)
    },
  },

  // 创建前状态
  beforeCreate(){
  },

  // 创建完毕状态 
  created(){
    console.log("cityData",cityData);
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
.City{

}
</style>



    
