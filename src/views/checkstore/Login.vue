<template>
    <div class="login">
        <div class="top-title">
            <p>悠游堂南坪店</p>
        </div>
        <div>
            <van-cell-group>
                <van-field v-model="name" label="姓名" placeholder="请输入姓名" error-message="" />
                <van-field v-model="phone" label="手机号" placeholder="请输入手机号" error-message="" />
            </van-cell-group>
        </div>
        <div style="padding:0 10px;">
            <router-link :to="{name:'CheckHome'}">
                <van-button type="info" block>登录</van-button>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {

    data() {
        return {}
    },
    components: {},
    methods: {},

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.title = "登录"
    },

    // 挂载前状态
    beforeMount() {},

    // 挂载结束状态
    mounted() {},

    // 更新前状态
    beforeUpdate() {},

    // 更新完成状态
    updated() {},

    // 销毁前状态
    beforeDestroy() {},

    // 销毁完成状态
    destroyed() {}

}
</script>
<style lang="scss" scoped>
.login {
    margin-top: 150px;
}

.top-title {
    text-align: center;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 600
}
</style>