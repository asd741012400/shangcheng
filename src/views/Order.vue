<template>
    <div class="ConfirmPay">
        <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">订单列表</div>
            <div class="add"></div>
        </header>
        <van-tabs v-model="active" @change="getOrderList">
            <van-tab title="全部"></van-tab>
            <van-tab title="待付款"></van-tab>
            <van-tab title="待使用"></van-tab>
            <van-tab title="待评价"></van-tab>
            <van-tab title="退款"></van-tab>
        </van-tabs>
        <ul class="goods_list">
            <li v-for="(item,index) in orderList">
                <div class="top">
                    <template v-if="item.order_status == 200">
                        <span>已撤销</span>
                    </template>
                    <template v-else-if="item.order_status == 0">
                        <span>待付款</span>
                    </template>
                    <template v-else-if="item.order_status == 2">
                        <span>订单超时</span>
                    </template>
                    <template v-else-if="item.order_status == 3">
                        <span>分单退款</span>
                    </template>
                    <template v-else-if="item.order_status == 4">
                        <span>已退款</span>
                    </template>
                    <template v-else-if="item.order_status == 5">
                        <span>已使用</span>
                    </template>
                    <template v-else-if="item.order_status == 6">
                        <span>退款中</span>
                    </template>
                    <template v-else-if="item.order_status == 1">
                        <template v-if="item.is_use == 0">
                            <span>待使用</span>
                        </template>
                        <template v-else-if="item.is_comment == 0">
                            <span>待评价</span>
                        </template>
                        <template v-else>
                            <span v-if="item.order_type == 1">已使用</span>
                            <span v-else-if="item.order_type == 3">已激活</span>
                        </template>
                    </template>
                </div>
                <div class="mid">
                    <div class="img-box" @click="getOrder(item.order_id,item.order_type)">
                        <img :src="$imgUrl + item.goods_img">
                    </div>
                        <div class="center" @click="getOrder(item.order_id,item.order_type)">
                            <div class="clip title">{{item.goods_title}}</div>
                            <template v-if="item.order_status == 1">
                                <template v-if="item.order_type == 1">
                                    <template v-if="item.goods_info.limit_type == 2">
                                        <div class="limit-time">{{toTime(item.pay_time,item.goods_info.limit_days)}}</div>
                                    </template>
                                    <template v-else>
                                        <div class="limit-time">有效期 {{item.goods_info.limit_stime}} 至 {{item.goods_info.limit_etime}}</div>
                                    </template>
                                </template>
                                <template v-if="item.order_type == 3">
                                    <template v-if="item.card_info.limit_type == 2">
                                        <div class="limit-time">{{toTime(item.pay_time,item.card_info.limit_days)}}</div>
                                    </template>
                                    <template v-else>
                                        <div class="limit-time">有效期 {{item.card_info.limit_stime}} 至 {{item.card_info.limit_etime}}</div>
                                    </template>
                                </template>
                            </template>
                        </div>
                        <div class="right">
                            <div>￥{{item.amount}}</div>
                            <div>X {{item.order_num}}</div>
                        </div>
                    </div>
                    <div>
                        <div class="footer">
                            <span style="font-size:0.3rem;font-weight:700">合计 ￥{{item.total_amount}}</span>
                        </div>
                        <div class="footer">
                            <!-- 全部 -->
                            <!-- order_status`'订单状态 0:未支付;1:订单完成;2:订单超时 3分单退款 4:已退款 5已使用 6 退款中 200:用户取消订单 201:后台取消订单;', -->
                            <template v-if="active == 0">
                                <template v-if="item.order_status == 0">
                                    <van-button type="danger" size="small" @click.stop="cancleOrder(item.order_id)">取消订单</van-button>
                                    <van-button type="danger" size="small" @click.stop="payOrder(item.order_id)">去付款</van-button>
                                </template>
                                <template v-else-if="item.order_status == 1">
                                    <van-button v-if="item.is_comment == 0" type="primary" size="small" @click.stop="handleComment(item.order_id,item.order_type,item.goods_id)">去评价</van-button>
                                    <template v-if="item.goods_info.is_roll == 1 && item.order_type == 1 && item.order_status == 1">
                                        <van-button type="warning" size="small" @click="refundApply(item.order_id)">申请退款</van-button>
                                    </template>
                                    <van-button v-if="item.order_type == 1" type="info" size="small" @click="getOrder(item.order_id,item.order_type)">去使用</van-button>
                                    <template v-if="item.is_use == 0">
                                        <van-button v-if="item.order_type == 3" type="info" size="small" @click="activeCard(item.cg_id.id)">去激活</van-button>
                                    </template>
                                </template>
                                <template v-else-if="item.order_status == 2">
                                </template>
                                <template v-else-if="item.order_status == 3">
                                </template>
                                <template v-else-if="item.order_status == 4">
                                </template>
                            </template>
                            <!-- 待付款 -->
                            <template v-if="active == 1">
                                <van-button type="danger" size="small" @click.stop="cancleOrder(item.order_id)">取消订单</van-button>
                                <van-button type="primary" size="small" @click.stop="payOrder(item.order_id)">去付款</van-button>
                            </template>
                            <!-- 待使用 -->
                            <template v-else-if="active == 2">
                                <template v-if="item.goods_info.is_roll == 1 && item.order_type == 1 && item.order_status == 1">
                                    <van-button type="warning" size="small" @click="refundApply(item.order_id)">申请退款</van-button>
                                </template>
                                <van-button v-if="item.order_type == 1" type="info" size="small" @click="getOrder(item.order_id,item.order_type)">去使用</van-button>
                                <template v-if="item.is_use == 0">
                                    <van-button v-if="item.order_type == 3" type="info" size="small" @click="activeCard(item.cg_id.id)">去激活</van-button>
                                </template>
                            </template>
                            <!-- 待评价 -->
                            <template v-else-if="active == 3">
                                <van-button type="primary" size="small" @click.stop="handleComment(item.order_id,item.order_type,item.goods_id)">去评价</van-button>
                            </template>
                            <!-- 退款 -->
                            <template v-else-if="active == 4">
                            </template>
                            <template v-else-if="active == 5">
                            </template>
                            <!-- <van-button type="danger" size="small">取消订单</van-button> -->
                            <!-- <van-button type="danger" size="small">申请退款</van-button> -->
                            <!-- <van-button type="primary" size="small">还想买</van-button> -->
                            <!-- <van-button type="info" size="small" @click="getOrder(item.order_id,item.order_type)">去使用</van-button> -->
                            <!--                     <van-button type="info" size="small" @click="handleComment(item.order_id,item.order_type,item.goods_id)">去评价</van-button>
                            <van-button type="info" size="small">激活使用</van-button> -->
                        </div>
                    </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'Order',
    data() {
        return {
            page: 1,
            user_id: '',
            // order_status: '',
            orderList: [],
            currSize: 0,
            pageSize: 10,
            active: 1
        }
    },
    components: {

    },
    computed: {
        order_status() {
            switch (this.active) {
                case 1:
                    return status = 0
                    break;
                case 2:
                    return status = 1
                    break;
                case 3:
                    return status = 3
                    break;
                case 4:
                    return status = 4
                    break;
                case 5:
                    return status = 4
                    break;
                default:
                    return status = ''
            }
        }
    },
    methods: {
        //激活
        activeCard(cgid) {
            this.$router.push({ name: 'CardActivate', query: { id: cgid } })
        },
        toTime(t1, t2) {
            let day1 = this.$dayjs.unix(t1).format('YYYY-MM-DD')
            let day2 = this.$dayjs().add(t2, 'day').format('YYYY-MM-DD')
            return '有效期' + day1 + '至' + day2
        },
        //申请退款
        async refundApply(id) {
            this.$dialog.alert({
                showCancelButton: true,
                message: '你确定要申请退款吗？'
            }).then(async () => {
                let res = await this.$getRequest('/order/ApplyRefundOrder', { order_id: id })
                this.$message(res.data.msg)
                if (res.data.code == 1) {
                    setTimeout(() => {
                        this.getOrderList();
                    }, 2000)
                }
            }).catch(() => {

            });
        },
        //取消订单
        async cancleOrder(id) {
            this.$dialog.alert({
                showCancelButton: true,
                message: '你确定要取消订单吗？'
            }).then(async () => {
                let res = await this.$getRequest('/order/CancelOrder', { order_id: id })
                this.$message(res.data.msg)
                if (res.data.code == 1) {
                    setTimeout(() => {
                        this.getOrderList();
                    }, 2000)
                }
            }).catch(() => {

            });
        },
        //支付
        payOrder(id) {
            this.$router.push({ name: 'ConfirmPay', query: { id: id } })
        },
        //订单详情
        getOrder(id, type) {
            this.$router.push({ name: 'OrderDetail', query: { id: id, type: type } })
        },
        //获取订单
        async getOrderList(index) {
            this.orderList = []
            let res = await this.$getRequest('/order/UserOrder', { user_id: this.user_id, order_status: this.order_status, page: this.page })
            this.orderList = res.data.data.list
            if (res.data.data.list) {
                this.currSize = res.data.data.list.length
            }
            this.pageSize = res.data.data.count
        },

        //获取更多订单
        async getOrderListMore(cid) {
            let res = await this.$getRequest('/order/UserOrder', { user_id: this.user_id, order_status: this.order_status, page: this.page })
            let data = res.data.data.list
            this.orderList = this.orderList.concat(data);
            if (res.data.data.list) {
                this.currSize = res.data.data.list.length
            }
        },

        //评价订单
        async handleComment(id, type, goods_id) {
            this.$router.push({
                name: "Comment",
                query: {
                    id: id,
                    type: type,
                    goods_id: goods_id,
                }
            });
        }
    },

    // 创建前状态
    beforeCreate() {

    },

    // 创建完毕状态
    created() {
        this.active = this.$route.query.index - 1
        let user = this.$localstore.get('wx_user')
        this.user_id = user.user_id
        this.getOrderList()
        document.body.style.background = "#F6F6F6";

        window.onscroll = () => {
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            //滚动条到底部的条件
            if (scrollTop + windowHeight == scrollHeight) {
                if (this.currSize >= this.pageSize) {
                    this.page++;
                    this.getOrderListMore(this.cid)
                }
            }
        }

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
    font-size: 0.3rem;

    li {
        display: flex;
        flex-direction: column;
        background: #fff;
        padding: 0.2rem 0.2rem;
        margin-top: 0.2rem;

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

                img {
                    display: block;
                    width: 100%;
                    height: 1.26rem;
                    object-fit: cover
                }
            }

            .center {
                margin-left: 0.1rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex: 1;

                .title {
                    width: 160px;
                }

                .limit-time {
                    color: #666;
                    font-size: 0.26rem;
                }
            }

            .right {
                margin-right: 0.1rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                // width: 10%;
                text-align: right;
            }
        }

        .footer {
            margin-top: 0.2rem;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;

            button {
                margin-left: 10px;
            }
        }

    }
}

.van-tabs__content {
    display: none;
    padding: 0;
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