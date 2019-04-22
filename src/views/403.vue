<template>
  <div class="error403">
    <div class="error403-body-con">
        <div class="error403-body-con-title">
          <!-- 4<span>0</span>3 -->
        </div>
        <p class="error403-body-con-message">你无权访问该页面！</p>
<!--         <div class="error403-btn-con">
          <el-button @click="goHome" size="large" style="width: 200px;" type="text">返回首页</el-button>
          <el-button @click="backPage" size="large" style="width: 200px;margin-left: 40px;" type="primary">返回上一页</el-button>
        </div> -->
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    backPage() {
      this.$router.go(-1);
    },
    goHome() {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@keyframes error404animation {
  0% {
    transform: rotateZ(0deg);
  }
  20% {
    transform: rotateZ(-60deg);
  }
  40% {
    transform: rotateZ(-10deg);
  }
  60% {
    transform: rotateZ(50deg);
  }
  80% {
    transform: rotateZ(-20deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
.error403 {
  &-body-con {
    // width: 700px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    &-title {
      text-align: center;
      font-size: 44px;
      font-weight: 700;
      color: red;
      height: 260px;
      line-height: 260px;
      // margin-top: 40px;
      span {
        display: inline-block;
        color: red;
        font-size: 44px;
        animation: error404animation 3s ease 0s infinite alternate;
      }
    }
    &-message {
      display: block;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 12px;
      color: #ccc;
    }
  }
  &-btn-con {
    text-align: center;
    padding: 20px 0;
    margin-bottom: 40px;
  }
}
</style>