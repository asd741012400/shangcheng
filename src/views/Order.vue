<template>
    <div class="ConfirmPay">
        <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">订单列表</div>
            <div class="add"></div>
        </header>

      <van-panel title="标题" desc="描述信息" status="状态">
        <div>内容</div>
        <div slot="footer">
          <van-button size="small">按钮</van-button>
          <van-button size="small" type="danger">按钮</van-button>
        </div>
      </van-panel>


    </div>
</template>
<script>
export default {
    name: 'ConfirmPay',
    data() {
        return {
            order: '',
            active:1
        }
    },
    components: {

    },
    methods: {
        //获取订单
        async getOrder() {
            let id = this.$route.query.id
            let res = await this.$getRequest('/order/getOrder', { id: id })
            this.order = res.data.data
        },
        //支付
        async payOrder() {

        }
    },

    // 创建前状态
    beforeCreate() {

    },

    // 创建完毕状态 
    created() {
        this.getOrder()
        document.body.style.background = "#F6F6F6";
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
.van-tab__pane {
    padding: 10px;
}
.van-card {
    background-color: #fff;
}
.ConfirmPay {
    header {
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        padding-top: .3rem;
        padding-bottom: .2rem;
        background: #f6f6f6;
        position: relative;

        .icon_return {
            width: 1rem;
            height: 1rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            left: .4rem;

            span {
                overflow: hidden;
                width: .27rem;
            }
        }

        .tel {
            color: #515C6F;
            font-weight: bold;
            font-size: .32rem;
            text-align: center;
        }

    }

}
</style>