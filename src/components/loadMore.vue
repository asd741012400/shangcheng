<template>
    <div v-if="show" class="load-more">
        <p>没有更多了</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: false
        }
    },
    props: {},
    components: {},
    methods: {
        showTip() {
            this.show = true
        },
        hideTip() {
            this.show = false
        }
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {

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
.load-more {
    margin: 5px 0;
    text-align: center;
}
</style>