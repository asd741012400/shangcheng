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
                    <span>待付款</span>
                </div>
                <div class="mid">
                    <div class="img-box">
                        <img src="../assets/img1.png">
                    </div>
                        <div class="center">
                            <div class="clip title">{{item.goods_title}}</div>
                            <div>有效期 2015-8-6 至 2018-8-9</div>
                        </div>
                        <div class="right">
                            <div>￥{{item.amount}}</div>
                            <div>X {{item.order_num}}</div>
                        </div>
                    </div>
                    <div class="footer">
                        <div>
                            <span>合计 ￥{{item.total_amount}}</span>
                        </div>
                        <div>
                            <template v-if="active == 1">

                            </template>
                            <template v-else-if="active == 2">
                            </template>
                            <template v-else-if="active == 3">
                            </template>
                            <template v-else-if="active == 4">
                            </template>
                            <template v-else-if="active == 5">
                            </template>
                            <!-- <van-button type="danger" size="mini">取消订单</van-button> -->
                            <!-- <van-button type="danger" size="mini">申请退款</van-button> -->
                            <!-- <van-button type="primary" size="mini">还想买</van-button> -->
                            <!-- <van-button type="info" size="mini">去使用</van-button> -->
                            <van-button type="info" size="mini" @click="handleComment(item.order_id,item.order_type,item.goods_id)">去评价</van-button>
                            <van-button type="info" size="mini">激活使用</van-button>
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
            order_status: '',
            orderList: [],
            currSize: 0,
            pageSize: 10,
            active: 1
        }
    },
    components: {

    },
    methods: {
        //获取订单
        async getOrderList(index) {
            this.orderList = []
            index--
            switch (index) {
                case 1:
                    this.order_status = 1
                    break;
                case 2:
                    this.order_status = 2
                    break;
                case 3:
                    this.order_status = 1
                    break;
                case 4:
                    this.order_status = 4
                    break;
                default:
                    this.order_status = ''
            }

            let res = await this.$getRequest('wechat/UserOrder', { user_id: this.user_id, order_status: this.order_status, page: this.page })
            this.orderList = res.data.data.list
            this.currSize = res.data.data.list.length
            this.pageSize = res.data.data.count
        },

        //获取更多订单
        async getOrderListMore(cid) {
            let res = await this.$getRequest('wechat/UserOrder', { user_id: this.user_id, order_status: this.order_status, page: this.page })
            let data = res.data.data.list
            this.orderList = this.orderList.concat(data);
            this.currSize = res.data.data.list.length
        },

        //评价订单
        async handleComment(id, type,goods_id) {
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
        this.active = this.$route.query.index -1
        let user = this.$localstore.get('userInfo')
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
            justify-content: space-between;
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