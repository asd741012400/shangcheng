<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    components: {},
    methods: {},
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
    // color: #666;
    outline: none;
    text-decoration: none;
}
</style>