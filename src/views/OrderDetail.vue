<template>
    <div class="OrderDetail">
        <!--         <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">订单详情</div>
            <div class="add"></div>
        </header> -->
        <div class="header">
            <template v-if="!orderStatus">
                <p>已过期</p>
            </template>
            <template v-else>
                <template v-if="order_info.order_status == 200">
                    <p>已撤销</p>
                </template>
                <template v-else-if="order_info.order_status == 201">
                    <p>已撤销</p>
                </template>
                <template v-else-if="order_info.order_status == 0">
                    <p>待付款</p>
                </template>
                <template v-else-if="order_info.order_status == 2">
                    <p>订单超时</p>
                </template>
                <template v-else-if="order_info.order_status == 3">
                    <p>分单退款</p>
                </template>
                <template v-else-if="order_info.order_status == 4">
                    <p>已退款</p>
                </template>
                <template v-else-if="order_info.order_status == 5">
                    <p>已使用</p>
                </template>
                <template v-else-if="order_info.order_status == 6">
                    <p>退款申请中</p>
                </template>
                <!--                 <template v-else-if="order_info.order_status == 1">
                    <template v-if="order_info.is_comment == 0">
                        <p>待评价</p>
                    </template>
                    <template v-else-if="order_info.is_use == 0">
                        <p>待使用</p>
                    </template>
                    <template v-else>
                        <p v-if="order_info.order_type == 1">已使用</p>
                        <p v-else-if="order_info.order_type == 3">已激活</p>
                    </template>
                </template> -->
                <template v-else-if="order_info.order_status == 1">
                    <template v-if="order_info.is_use == 0">
                        <p>待使用</p>
                    </template>
                    <template v-else>
                        <template v-if="order_info.is_comment == 0">
                            <p>待评价</p>
                        </template>
                        <template v-else>
                            <p v-if="order_info.order_type == 1">已使用</p>
                            <p v-else-if="order_info.order_type == 3">已激活</p>
                            <p v-else-if="order_info.is_comment == 1">已评价</p>
                        </template>
                    </template>
                </template>
                <template v-if="order_info.order_status == 1">
                    <template v-if="type ==1 || type == 3">
                        <!-- <div class="limit-time" v-if="!$calcTime(order_info.limit_type,order_info.pay_time,order_info.limit_days,order_info.limit_stime,order_info.limit_etime)">已过期</div> -->
                        <div v-if="!$validatenull(order_info) && !$validatenull(order_info)" class="limit-time">{{$calcTime(order_info.limit_type,order_info.pay_time,order_info.limit_days,order_info.limit_stime,order_info.limit_etime,3)}}</div>
                        <!-- 
                    <template v-if="order_info.limit_type == 2">
                        {{toTime(order_info.pay_time,order_info.limit_days)}} 到期
                    </template>
                    <template v-else>
                        <span>{{order_info.limit_etime}}到期</span>
                    </template> -->
                    </template>
                </template>
            </template>
        </div>
        <!--  <div class="header" v-else-if="order_info.order_status == 0">
            <p>待付款</p>
            <span>订单还有1天00:00:00取消</span>
        </div> -->
        <!--  <div class="header" v-else-if="order_info.order_status == 1">
            <template v-if="order_info.limit_type == 2">
                <p>付款成功</p>
                <span>下单时间2019-02-02</span>
            </template>
        </div> -->
        <!--  <div class="header" v-else-if="order_info.order_status == 4">
            <p>退款申请中</p>
            <span>您的退款正在申请</span>
        </div> -->
        <ul class="not_comment">
            <li class="not_comment_list">
                <h3>产品名称</h3>
                <div class="img">
                    <span><img :src="$imgUrl+order_info.goods_img" alt=""></span>
                    <div class="box">
                        <p class="text1" @click="goDetail(order_info.goods_id)">
                            <a>{{order_info.goods_title}}</a>
                            <i>￥{{order_info.total_amount}}</i>
                        </p>
                        <p class="text2">
                            <a class="text-hide"  v-if="order_info.attr_name">{{order_info.attr_name}}</a>
                            <i>x{{order_info.order_num}}</i>
                        </p>
                        <div class="btn">
                            <template v-if="orderStatus">
                                <template v-if="order_info.order_status == 0">
                                    <van-button type="primary" size="mini" @click.stop="payOrder(order_info.order_id)">去付款</van-button>
                                </template>
                                <template v-else-if="order_info.order_status == 1">
                                    <van-button v-if="order_info.is_comment == 0" type="primary" size="mini" @click.stop="handleComment(order_info.order_id,order_info.order_type,order_info.goods_id)">去评价</van-button>
                                </template>
                            </template>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <!-- 核销信息 -->
        <!-- <div class="timer" v-if="order_info.order_status == 1 && type == 1"> -->
        <div class="timer" v-if="type == 1">
            <!-- <div class="timer_top" v-for="(item,index) in goods_cancle" v-if="item.cancle_status != 2"> -->
            <div class="timer_top" v-for="(item,index) in goods_cancle" v-if="index<3">
                <p>
                    <a>
                    <b>{{item.cancle_code}}</b>
                    <span v-if="item.cancle_status == 1"> 已核销</span>
                    <span v-else> 未核销</span>
                  </a>
                    <time v-if="item.cancle_status == 1">核销时间：{{toDate(item.cancle_time)}}</time>
                </p>
                <!-- <i @click="previewImg(index)" :id="'qrcode'+index" ref="qrcodes" :data-code="item.cancle_code"><img src="../assets/code.png" alt=""></i> -->
                <i><img @click="previewImg('qrcode'+index)" :id="'qrcode'+index" ref="qrcodes" :data-code="item.cancle_code" src="" alt=""></i>
            </div>
            <div class="timer_top" v-for="(item,index) in goods_cancle" v-show="index >= 3 && showMore">
                <p>
                    <a>
                    <b>{{item.cancle_code}}</b>
                    <span v-if="item.cancle_status == 1"> 已核销</span>
                    <span v-else> 未核销</span>
                  </a>
                    <time v-if="item.cancle_status == 1">核销时间：{{toDate(item.cancle_time)}}</time>
                </p>
                <i><img @click="previewImg('qrcode'+index)" :id="'qrcode'+index" ref="qrcodes" :data-code="item.cancle_code" src="" alt=""></i>
            </div>
            <div class="timer_top more" v-if="goods_cancle.length > 2" @click="handlwMore">
                <van-icon v-if="!showMore" name="arrow-down" />
                <van-icon v-else name="arrow-up" />
            </div>
        </div>
        <!-- 用户信息 -->
        <div class="user" v-if="order_info.real_name || order_info.play_time || order_info.tel_phone">
            <p v-if="order_info.real_name">姓名：{{order_info.real_name}}</p>
            <!-- <p v-if="order_info.play_time">游玩时间：{{order_info.play_time}}</p> -->
            <p v-if="order_info.tel_phone">监护人电话：{{order_info.tel_phone}}</p>
        </div>
        <!-- <div class="group_purchase" v-if="groupPurchaseState">
            <div class="imgs">
                <span>团长</span>
                <p>
                    <i><img src="../assets/head_portrait.png" alt=""></i>
                    <i><img src="../assets/head_portrait.png" alt=""></i>
                </p>
            </div>
            <div class="btns">
                <span>4/5</span>
                <a><i>查看团拼</i></a>
            </div>
        </div> -->
        <div class="order_del">
            <h3>订单详情</h3>
            <ul v-if="state == 1">
                <li> <span>支付方式 :</span>微信支付</li>
                <li><span>订单号:</span>{{order_info.order_sn}}</li>
                <li v-if="order_info.add_time"><span>创建时间:</span>{{toDate(order_info.add_time)}}</li>
                <li v-if="order_info.pay_time"><span>付款时间:</span>{{toDate(order_info.pay_time)}}</li>
            </ul>
            <ul v-else-if="state == 2">
                <li><span>订单号:</span>{{order_info.order_sn}}</li>
                <li v-if="order_info.add_time"><span>创建时间:</span>{{toDate(order_info.add_time)}}</li>
            </ul>
            <ul v-if="state == 3">
                <li> <span>支付方式 :</span>微信支付</li>
                <li><span>订单号:</span>{{order_info.order_sn}}</li>
                <li v-if="order_info.add_time"><span>创建时间:</span>{{toDate(order_info.add_time)}}</li>
                <li v-if="order_info.pay_time"><span>付款时间:</span>{{toDate(order_info.pay_time)}}</li>
            </ul>
        </div>
        <van-image-preview v-model="show" :showIndex="false" :start-position="index" :images="images"></van-image-preview>
    </div>
</template>
<script>
import QRCode from 'qrcode'

export default {
    name: 'OrderDetail',
    data() {
        return {
            state: 1, //1待使用 2代付款 3付款成功 4退款
            orderStatus: true, //订单状态
            groupPurchaseState: true, //团购
            showMore: false,
            id: '',
            type: '',
            show: false,
            index: 1,
            images: [],
            attr_name: '',
            order_info: {},
            goods_cancle: {},
        }
    },
    components: {},
    methods: {
        handlwMore() {
            this.showMore = !this.showMore
        },
        //预览核销码
        previewImg(obj) {
            let url = document.getElementById(obj).getAttribute("src")
            this.images = []
            this.images.push(url)
            this.show = true
        },
        //支付
        payOrder(id) {
            if (this.type == 1 || this.type == 3) {
                this.$router.push({ name: 'ConfirmPay', query: { id: id } })
            } else {
                this.$router.push({ name: 'VipOrderBuy', query: { id: id } })
            }
        },
        //查看商品
        goDetail(id) {
            if (this.type == 1) {
                this.$router.push({ name: 'CommodityDetails', query: { id: id, type: 1 } })
            } else if (this.type == 2) {
                this.$router.push({ name: 'VipEquity' })
            } else if (this.type == 3) {
                this.$router.push({ name: 'CardDetails', query: { id: id, type: 3 } })
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
        },
        //日期转换
        toDate(time) {
            return this.$dayjs.unix(time).format('YYYY-MM-DD')
        },
        toTime(t1, t2) {
            let day1 = this.$dayjs.unix(t1).format('YYYY-MM-DD')
            let day2 = this.$dayjs().add(t2, 'day').format('YYYY-MM-DD')
            return day2
        },
        //获取订单
        async getOrder() {
            this.$Indicator.open({ spinnerType: 'fading-circle' });
            let id = this.$route.query.id
            let res = await this.$getRequest('/order/OrderDetail', { order_id: id })
            this.order_info = res.data.data.order_info
            this.goods_cancle = res.data.data.goods_cancle

            if (!this.$validatenull) {
                this.goods_cancle = this.goods_cancle.filter(item => {
                    return item.cancle_status != 2
                })
            }

            //计算过期时间
            this.orderStatus = this.$calcTime(this.order_info.limit_type, this.order_info.pay_time, this.order_info.limit_days, this.order_info.limit_stime, this.order_info.limit_etime)

            setTimeout(() => {
                this.$nextTick(() => {
                    let arr = this.$refs.qrcodes
                    arr && arr.map(item => {

                        var opts = {
                            width: 300,
                            height: 300,
                            errorCorrectionLevel: 'H',
                            type: 'image/png',
                            margin: 0
                        }
                        QRCode.toDataURL(item.dataset.code, opts)
                            .then(url => {
                                let img = new Image()
                                img.src = url
                                img.onload = () => {
                                    document.getElementById(item.id).setAttribute("src", url)
                                }
                            })
                            .catch(err => {
                                console.error(err)
                            })

                    })
                })
            }, 50)
            this.$Indicator.close();
        },

        //获取订单详情
        // async getOrderDetail() {
        //     this.$Indicator.open({ spinnerType: 'fading-circle' });
        //     let res = await this.$getRequest('/order_info/getOrder', { id: this.id })
        //     this.order_info = res.data.data
        //     this.$Indicator.close();
        // }
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.title = "订单详情"
        document.body.style.background = "#F6F6F6";
        this.id = this.$route.query.id
        this.type = this.$route.query.type
        this.getOrder()
        // this.getOrderDetail()
    },

    // 挂载前状态
    beforeMount() {},

    // 挂载结束状态
    mounted() {

    },

    // 更新前状态
    beforeUpdate() {

    },

    // 更新完成状态
    updated() {

    },

    // 销毁前状态
    beforeDestroy() {},

    // 销毁完成状态
    destroyed() {}

}
</script>
<style lang="scss" scoped>
.OrderDetail {
    background: #f0f0f0;

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

    .header {
        height: 1.4rem;
        padding: 0 0.6rem;
        background: #FF6C5F;
        display: flex;
        align-items: center;
        color: #fff;
        font-size: .28rem;

        p {
            font-size: .36rem;
            font-weight: bold;
            flex: 1;
        }
    }

    .not_comment {
        background: #fff;

        li {
            padding: 0 .51rem .52rem;

            h3 {
                padding: .4rem 0 .14rem;
                border-bottom: 1px solid #CCCCCC;
            }

            div.img {
                display: flex;
                padding-top: .24rem;

                span {
                    width: 1.26rem;
                    height: 1.26rem;
                    overflow: hidden;

                    img {
                        display: block;
                        width: 100%;
                        height: 1.26rem;
                        object-fit: cover
                    }
                }

                div {
                    padding-left: .32rem;
                    flex: 1;

                    p {
                        display: flex;

                        a {
                            flex: 1;
                        }

                        i {
                            font-style: normal;
                        }
                    }

                    p.text1 {
                        a {
                            font-size: .28rem;
                            color: #535D70;
                        }

                        i {
                            font-size: .28rem;
                            color: #535D70;
                            font-weight: bold;
                        }
                    }

                    p.text2 {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;

                        .text-hide {
                            display: block;
                            width: 0.2rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            color: #999;
                        }

                        a {
                            font-size: .24rem;
                            color: #999999;
                        }

                        i {
                            font-size: .22rem;
                            color: #999999;
                        }
                    }

                    .btn {
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-end;
                    }
                }
            }
        }
    }


    .more {
        display: flex;
        justify-content: center;
        background: #fff;

        .van-icon {
            font-size: .5rem;
            color: #666;
        }
    }

    .timer {
        margin-top: .2rem;
        padding: 0 .51rem;
        background: #fff;

        div {
            padding: .3rem 0;
            display: flex;
            align-items: center;

            p {
                flex: 1;

                a {
                    display: block;
                    font-size: .24rem;
                    color: #000;

                    span {
                        color: #999;
                    }
                }

                b {
                    font-size: .36rem;
                }

                time {
                    display: block;
                }
            }

            i {
                width: 1rem;
                height: 1rem;
                overflow: hidden;
            }
        }

        div:last-of-type {
            border-top: 1px solid #f0f0f0;
        }
    }

    .user {
        margin-top: .2rem;
        background: #fff;
        padding: 0 .51rem;

        p {
            height: .8rem;
            line-height: .8rem;
            font-size: .24rem;
        }
    }

    .group_purchase {
        margin-top: .2rem;
        background: #fff;
        padding: .3rem .51rem;
        display: flex;
        align-items: center;

        .imgs {
            flex: 1;
            display: flex;
            flex-direction: column;

            span {
                width: 2.2rem;
                text-align: center;
                font-size: .3rem;
                color: #000;
                padding-bottom: .2rem;
            }

            p {
                display: flex;
                align-items: center;

                i {
                    width: 1rem;
                    height: 1rem;
                    border-radius: 50%;
                    overflow: hidden;
                }

                i:last-of-type {
                    margin-left: .2rem;
                }
            }
        }

        .btns {
            display: flex;
            flex-direction: column;
            align-items: center;

            span {
                font-size: .3rem;
                padding-bottom: .2rem;
            }

            a {
                height: 1rem;
                display: flex;
                align-items: center;

                i {
                    width: 1.5rem;
                    display: block;
                    text-align: center;
                    height: .5rem;
                    line-height: .5rem;
                    color: #fff;
                    font-style: normal;
                    border-radius: 3px;
                    background: #FF6C5F;
                }
            }
        }
    }

    .order_del {
        margin-top: .2rem;
        background: #fff;
        padding: 0 .51rem .6rem;

        h3 {
            font-size: .3rem;
            font-weight: bold;
            line-height: 1rem;
        }

        ul {
            li {
                line-height: .6rem;
                display: flex;

                span {
                    width: 1.5rem;
                    padding-right: .3rem;
                }
            }
        }
    }
}
</style>