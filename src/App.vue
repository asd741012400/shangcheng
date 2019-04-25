<template>
    <div id="app">
        <router-view />
        <BindPhone :show="show" ref="bindPhone"></BindPhone>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: false
        }
    },
    components: {},
    methods: {
        async getUser() {
            let openid2 = this.$localstore.get('openid6')
            if (openid2) {
                let res = await this.$getRequest('/wechat/GetUserInfo', { openid: openid2 })
                if (res.data.data && res.data.data.tel_phone) {
                    this.$localstore.set('userInfo', res.data.data)
                } else {
                     // this.show = true
                }
            }
        }
    },
    watch: {
        '$route': function(to, from) {
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        }
    },
    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.body.style.background = "#000";
        this.getUser()
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
<style lang="scss">
#app {
    overflow-x: hidden;
}

a,
a:focus,
a:hover,
a:active {
    color: #666;
    outline: none;
    text-decoration: none;
}

/* 文字溢出隐藏 */
.clip {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>