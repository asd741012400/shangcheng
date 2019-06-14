<template>
    <div id="app">
        <!-- <keep-alive> -->
        <router-view>
            <!-- 这里是会被缓存的视图组件 -->
        </router-view>
        <!-- </keep-alive> -->
        <!-- <router-view v-if="!$route.meta.keepAlive"> -->
        <!-- 这里是不被缓存的视图组件 -->
        <!-- </router-view> -->
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    components: {},
    methods: {
        async check(index) {
            let user = this.$localstore.get('wx_user')
            let union_id = ''
            if (user && user.union_id) {
                union_id = user.union_id
            }
            let res = await this.$getRequest('/home/AutoCount', { union_id: union_id })
        },
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
        //每次进入自动计算用户金额
        this.check()
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
    beforeDestroy() {

    },

    // 销毁完成状态
    destroyed() {}

}
</script>
<style lang="scss">
#app {
    overflow-x: hidden;
    font-family: Microsoft YaHei;
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

.detail p {
    display: block;
    margin: 5px 0 !important;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
}

button {
    cursor: pointer;
}

.buy {
    cursor: pointer;
}
</style>