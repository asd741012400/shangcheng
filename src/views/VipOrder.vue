<template>
    <div class="VipOrder">
        <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">确认支付</div>
            <div class="add"></div>
        </header>
        <div class="mian">
            <div class="vip_card">
                <img :src="$imgUrl+plus.photo" alt="">
                <!--        <p>
                    <span>累积为您节省：￥</span>
                    <a>{{plus.price}}</a>
                </p> -->
            </div>
            <div class="nav">
                <ul>
                    <li v-for="(item,ii) in vip" :key="ii">
                        <span><img :src="$imgUrl+item.thumb" alt=""></span>
                        <p>{{item.name}}</p>
                    </li>
                </ul>
            </div>
            <div class="agreement">
                <span @click.stop="changeAgree" v-if="agreementState"><img src="../assets/icon_schedule.png" alt=""></span>
                <span @click.stop="changeAgree" v-else><img src="../assets/icon_unselected.png" alt=""></span>
                <p @click.stop="changeAgree">同意</p>&nbsp;&nbsp;
                <a herf="javascript:;" @click="changeStatus">PLUS协议</a>
            </div>
            <!--            <div class="total">
                <p>合计:￥{{plus.sale_price}}</p>
            </div> -->
        </div>
        <div class="confirm_pop_bg" v-if="confirmPop">
            <div class="confirm_pop">
                <div class="boxs">
                    <h3>会员协议</h3>
                    <div class="detail" v-html="plus.agreement"></div>
                    <div class="colse" @click="confirmPopHide"><span><img src="../assets/icon_close.png" alt=""></span></div>
                </div>
            </div>
        </div>
        <footer>
            <p>合计:￥{{plus.sale_price}}</p>
            <b @click="payOrder">
                确认支付
            </b>
        </footer>
    </div>
</template>
<script>
import wx from 'weixin-js-sdk' //微信sdk依赖
export default {
    name: 'VipOrder',
    data() {
        return {
            share_id: '',
            plus: {},
            order: {},
            vip: [],
            confirmPop: false,
            agreementState: true
        }
    },
    components: {},
    methods: {
        changeAgree() {
            this.agreementState = !this.agreementState
        },
        changeStatus() {
            this.confirmPop = true
        },
        confirmPopShow() {
            this.confirmPop = true
        },
        confirmPopHide() {
            this.agreementState = false
            this.confirmPop = false
        },
        //获取PlUS
        async getPlus() {
            let plus = this.$localstore.session.get('plus')
            if (plus) {
                this.plus = plus
            } else {
                let res = await this.$getRequest('/home/GetPlus')
                this.plus = res.data.data
                this.$localstore.session('plus', this.plus)
            }
        },
        //获取所有权益
        async getVipList() {
            let vip = this.$localstore.session.get('vip')
            if (vip) {
                this.vip = vip
            } else {
                let res = await this.$getRequest('/plus/PlusEquityList')
                this.vip = res.data.data
                this.$localstore.session('vip', this.vip)
            }
        },
        //添加订单
        // async addOrder() {
        //     if (!this.agreementState) {
        //         this.$message('你未同意会员协议！')
        //         return false
        //     }
        //     if (!this.plus) {
        //         return false;
        //     }

        //     let WxAuth = this.$localstore.get('wx_user')
        //     let postData = {
        //         order_type: 2,
        //         share_id: this.share_id,
        //         goods_id: this.plus.setting_id,
        //         goods_title: this.plus.name,
        //         goods_img: this.plus.thumb,
        //         union_id: WxAuth.union_id,
        //         is_wechat: 1,
        //         order_num: 1,
        //         amount: this.plus.sale_price,
        //         total_amount: this.plus.sale_price
        //     }

        //     let instance = this.$message({
        //         message: '正在提交订单中,请耐心等待。。。。',
        //         duration: 5000
        //     });

        //     let res = await this.$postRequest('/order/AddOrder', postData)
        //     this.$message(res.data.msg)
        //     if (res.data.code == 1) {
        //         this.$router.replace({ name: 'VipOrderBuy', query: { id: res.data.data } })
        //         instance.close();
        //     } else {
        //         instance.close();
        //     }
        // },
        // 
        //获取订单
        async getOrder() {
            let id = this.$route.query.id
            let res = await this.$getRequest('/order/getOrder', { id: id })
            this.order = res.data.data

            //订单缓存
            this.$localstore.session('order', this.order)
        },
        //支付
        async payOrder() {
            let that = this
            if (!this.agreementState) {
                this.$message('你未同意会员协议！')
                return false
            }
            if (!this.order) {
                that.$message('订单正在获取中请耐心等待！')
                return false;
            }
            // that.$router.replace({ name: 'PaySucceed', query: { id: that.order.order_id, type: that.order.order_type } })
            //获取微信支付
            let res = await this.$getRequest('/wechat/GetWxPay', { transaction_sn: this.order.transaction_sn })
            if (res.data.code == 1) {
                let config = JSON.parse(res.data.data)

                wx.ready(function() {
                    // 这里获取到PHP生成签名参数包，注意是JSON格式
                    var options = config;
                    // 支付成功后的操作
                    options.success = async () => {
                        that.$localstore.session('has_share', '')

                        // let res = await that.$getRequest('/order/PaySuccess', { id: that.order.order_id })
                        // if (res.data.code == 1) {
                        //     that.$localstore.session('PaySucceed', res.data.data)
                        that.$router.replace({
                            name: 'PaySucceed',
                            query: {
                                id: that.order.order_id,
                                goods_id: that.order.goods_id,
                                type: that.order.order_type,
                            }
                        })
                        // } else {
                        //     that.$message(res.data.msg)
                        // }


                        //10s钟后重新发起请求
                        // let timer = setInterval(async () => {
                        //     let res = await that.$getRequest('/order/PaySuccess', { id: that.order.order_id })
                        //     if (res.data.code == 1) {
                        //         that.$localstore.session('PaySucceed', res.data.data)
                        //         clearInterval(timer)
                        //         that.$router.replace({
                        //             name: 'PaySucceed',
                        //             query: {
                        //                 id: that.order.order_id,
                        //                 goods_id: that.order.goods_id,
                        //                 type: that.order.order_type,
                        //             }
                        //         })
                        //     } else {
                        //         clearInterval(timer)
                        //     }
                        // }, 10000)

                        // let res = await that.$getRequest('/order/PaySuccess', { id: that.order.order_id })
                        // if (res.data.code == 1) {
                        //     that.$localstore.session('PaySucceed', res.data.data)
                        //     that.$router.replace({
                        //         name: 'PaySucceed',
                        //         query: {
                        //             id: that.order.order_id,
                        //             goods_id: that.order.goods_id,
                        //             type: that.order.order_type,
                        //         }
                        //     })
                        // } else {
                        //     that.$message(res.data.msg)
                        // }
                    };

                    //  取消支付的操作
                    options.cancel = function() {
                        that.$message('已取消')
                    };

                    // 支付失败的处理 
                    options.fail = function(res) {
                        that.$message('支付失败')
                    };

                    // 传入参数，发起JSAPI支付
                    wx.chooseWXPay(options);
                });
            } else {
                that.$message(res.data.msg)
            }
        }
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        document.title = "支付订单"
        document.body.style.background = "#f6f6f6";
        let has_share = this.$localstore.session.get('has_share')
        if (has_share && has_share.query.share_id && has_share.name == "VipEquity") {
            this.share_id = has_share.query.share_id
        }
        if (has_share && has_share.query.type == 4) {
            this.share_id = has_share.query.share_id
        }

        this.getOrder()
        this.getPlus()
        this.getVipList()
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
.VipOrder {
    header {
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        padding-top: .3rem;
        padding-bottom: .2rem;
        // position: relative;
        background: #F6F6F6;

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

    .mian {
        padding-bottom: 1.3rem;
        overflow: hidden;

        .vip_card {
            // height: 4.66rem;
            // background: url('../assets/VipOrder_card.png') center/100% no-repeat;
            border-radius: 10px;
            margin: -20px auto;
            overflow: hidden;
            display: flex;
            justify-content: center;
            position: absolute;
            width: 100%;
            padding: 0.2rem;
            box-sizing: border-box;

            img {
                width: 100%;
                height: 3.5rem;
                border-radius: 10px;
            }

            p {
                margin-top: 3.1rem;
                width: 3.84rem;
                height: .42rem;
                border-radius: 21px;
                border: solid 2px #d7b783;
                text-align: center;
                color: #ffe29f;
                font-size: .26rem;
                display: flex;
                align-items: center;
                justify-content: center;

                a {
                    color: #ffe29f;
                    font-size: .36rem;
                }
            }
        }

        .nav {
            background: #FBF9F2;
            margin-top: 1.7rem;

            ul {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                padding: 2rem .28rem .4rem;

                li {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-right: .32rem;
                    margin-bottom: .28rem;

                    span {
                        width: 1rem;
                        height: 1rem;
                        border-radius: 50%;
                        overflow: hidden;
                    }

                    p {
                        font-size: .24rem;
                        color: #C1A06B;
                        padding-top: 2px;
                    }
                }

                li:nth-of-type(5n) {
                    margin-right: 0;
                }
            }
        }

        .agreement {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding: 0 .4rem;
            height: 1.2rem;
            background: #F6F6F6;
            font-size: .32rem;

            span {
                width: .34rem;
                height: .34rem;

                // overflow: hidden;
                img {
                    width: .34rem;
                    height: .34rem;
                    vertical-align: baseline;
                }
            }

            p {
                padding-left: .2rem;
            }

            a {
                color: #FF6666;
            }
        }

        .total {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding: 0 .4rem;
            height: .8rem;
            background: #fff;
            font-size: .32rem;
            color: #515C6F;
        }
    }

    footer {
        display: flex;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 1.16rem;
        align-items: center;
        background: #fff;

        p {
            flex: 1;
            text-align: right;
            padding-right: .34rem;
            font-size: .4rem;
            color: #515C6F;
        }

        b {
            width: 3.4rem;
            height: 1.16rem;
            line-height: 1.16rem;
            text-align: center;
            color: #fff;
            text-align: center;
            background: #FF6666;
            font-size: .32rem;
        }
    }

    .confirm_pop_bg {
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha:0.24);
        top: 0;
        left: 0;

        .confirm_pop {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 1.02rem;

            .boxs {
                background: #fff;
                border-radius: 10px;
                position: relative;
                overflow: hidden;
                padding-bottom: 20px;

                .detail {
                    padding: 0.2rem .6rem;
                    background: #fff;
                    max-height: 250px;
                    overflow-y: auto;
                }

                h3 {
                    font-size: .32rem;
                    color: #515C6F;
                    padding: .74rem 0 .2rem;
                    text-align: center;
                }

                ul {
                    padding: 0 .5rem 0 .4rem;

                    li {
                        padding-bottom: .2rem;

                        h4 {
                            display: flex;
                            align-items: center;
                            font-size: .24rem;
                            color: #FF6666;
                            padding-bottom: .1rem;

                            i {
                                width: .1rem;
                                margin-right: .18rem;
                            }
                        }

                        p {
                            font-size: .24rem;
                            color: #515C6F;
                            text-indent: 2em;
                        }

                    }
                }

                .agreement {
                    display: flex;
                    align-items: center;
                    padding: .16rem .5rem 0 .4rem;

                    span {
                        width: .3rem;
                        margin-right: .18rem;
                    }

                    b {
                        font-size: .24rem;
                        color: #515C6F;
                    }
                }

                .btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding-top: .6rem;

                    a {
                        text-align: center;
                        flex: 1;
                        color: #fff;
                        background: #8A8A8A;
                        font-weight: bold;
                        line-height: 1.06rem;
                    }

                    b {
                        flex: 1;
                        text-align: center;
                        color: #fff;
                        background: #FF6666;
                        line-height: 1.06rem;
                    }
                }

                .colse {
                    position: absolute;
                    right: .16rem;
                    top: .16rem;
                    width: 1rem;
                    height: 1rem;
                    display: flex;
                    align-items: flex-start;
                    justify-content: flex-end;

                    span {
                        width: .48rem;
                        height: .48rem;
                    }
                }
            }
        }
    }

}
</style>