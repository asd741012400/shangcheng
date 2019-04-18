<template>
    <div class="list">
        <van-nav-bar @click-left="onClickLeft" left-arrow fixed title="龙湖时代天街悠游堂" />
        <p>当前门店</p>
        <div class="list-box">
            <div class="top">
                <div>龙湖时代天街悠游堂</div>
                <div>
                    <van-radio-group v-model="radio" disabled>
                        <van-radio name="1"></van-radio>
                    </van-radio-group>
                </div>
            </div>
            <div class="footer">重庆市渝中区大坪龙湖时代天街悠游堂店</div>
        </div>
        <p>其他门店</p>
        <div class="list-box">
            <div class="top">
                <div>龙湖时代天街悠游堂</div>
                <div>
                    <van-radio-group v-model="radio" disabled>
                        <van-radio name="1"></van-radio>
                    </van-radio-group>
                </div>
            </div>
            <div class="footer">重庆市渝中区大坪龙湖时代天街悠游堂店</div>
        </div>
        <div class="list-box">
            <div class="top">
                <div>龙湖时代天街悠游堂</div>
                <div>
                    <van-radio-group v-model="radio" disabled>
                        <van-radio name="1"></van-radio>
                    </van-radio-group>
                </div>
            </div>
            <div class="footer">重庆市渝中区大坪龙湖时代天街悠游堂店</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'WithdrawList',
    data() {
        return {
            radio: 1
        }
    },
    components: {},
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        }
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.title = "提现明细"
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
.list {
    height: 100vh;
    background: #eee;
    padding-top: 65px;
}

.list-box {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    padding: .5rem .6rem;
    background: #fff;

    .top {
        display: flex;
        justify-content: space-between;
    }

}

p {
    margin-top: 10px;
}
</style>