<template>
    <div class="ConfirmPay">
        <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">订单列表</div>
            <div class="add"></div>
        </header>
        <van-tabs v-model="active">
            <van-tab title="全部"></van-tab>
            <van-tab title="待付款"></van-tab>
            <van-tab title="待使用"></van-tab>
            <van-tab title="待评价"></van-tab>
            <van-tab title="退款"></van-tab>
        </van-tabs>
        <ul class="goods_list">
            <li>
                <div class="top">
                    <span>待付款</span>
                </div>
                <div class="mid">
                    <div class="img-box">
                        <img src="../assets/img1.png">
                    </div>
                        <div class="center">
                            <div>商品名称商品名称商品名称</div>
                            <div>有效期 2015-8-6 至 2018-8-9</div>
                        </div>
                        <div class="right">
                            <div>￥99</div>
                            <div>X1</div>
                        </div>
                    </div>
                    <div class="footer">
                        <div>
                            <span>合计 ￥99</span>
                        </div>
                        <div>
                            <van-button type="danger" size="mini">取消订单</van-button>
                            <!-- <van-button type="danger" size="mini">申请退款</van-button> -->
                            <!-- <van-button type="primary" size="mini">还想买</van-button> -->
                            <!-- <van-button type="info" size="mini">去使用</van-button> -->
                            <!-- <van-button type="info" size="mini">去评价</van-button> -->
                            <van-button type="info" size="mini">激活使用</van-button>
                        </div>
                    </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'ConfirmPay',
    data() {
        return {
            order: '',
            active: 1
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
.goods_list {
    padding: 0.1rem 0.1rem;
    background: #eee;

    li {
        display: flex;
        flex-direction: column;
        background: #fff;
        padding: 0.1rem 0.2rem;

        .top {
            text-align: right;
        }

        .mid {
            margin-top: 0.2rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .img-box {
                width: 20%;
            }

            .center {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex: 1;
            }

            .right {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 10%;
                text-align: right;
            }
        }

        .footer {
            margin-top: 0.2rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

    }
}

.van-tabs__content {
    display: none;
    padding:0;
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