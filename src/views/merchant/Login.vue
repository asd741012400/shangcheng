<template>
    <div class="login">
        <div>
            <van-cell-group>
                <van-field v-model="phone" label="手机号" placeholder="请输入手机号" error-message="" />
                <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
                    <van-button slot="button" size="small" type="primary">发送验证码</van-button>
                </van-field>
            </van-cell-group>
        </div>
        <div style="padding:0 10px;">
            <router-link :to="{name:'MerchantShop'}">
                <van-button type="info" block>登录</van-button>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: 'WithdrawDepositDel',
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
</style>