<template>
    <div class="login">
        <van-nav-bar @click-left="onClickLeft" left-arrow fixed title="核销" />
        <div>
            <van-cell-group>
                <van-field @touchstart.stop="show = true" v-model="code" label="核销码" placeholder="请输入核销码" />
            </van-cell-group>
        </div>
        <van-number-keyboard :show="show" extra-key="." close-button-text="完成" @blur="show = false" @input="onInput" @delete="onDelete" />
    </div>
</template>
<script>
export default {

    data() {
        return {
            show: true,
            code: ''
        }
    },
    components: {},
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        onInput(value) {
            this.code += value
        },
        onDelete() {
            this.code = this.code.substring(0, this.code.length - 1);
        }
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.body.style.background = "#fff";
        document.title = "核销"
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