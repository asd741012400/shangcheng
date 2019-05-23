<template>
    <div class="VipOrderBuy">
        <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">确认订单</div>
            <div class="add"></div>
        </header>
        <div class="mian">
            <div class="vip_card">
                <img :src="$imgUrl+plus.photo" alt="">
                <!--         <p>
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
            <div class="weixin">
                <span><img src="../assets/icon_wx.png" alt=""></span>
                <p>微信支付</p>
            </div>
            <div class="total">
                <p>合计:￥{{order.total_amount}}</p>
            </div>
        </div>
        <footer>
            <p>合计:￥{{order.total_amount}}</p>
            <b @click="payOrder">去支付</b>
        </footer>
    </div>
</template>
<script>
import wx from 'weixin-js-sdk' //微信sdk依赖
// import wxapi from '@/lib/wx.js'

export default {
    name: 'VipOrderBuy',
    data() {
        return {
            vip: [],
            plus: {},
            order: {},
        }
    },
    components: {},
    methods: {
        //获取订单
        async getOrder() {
            let id = this.$route.query.id
            let res = await this.$getRequest('/order/getOrder', { id: id })
            this.order = res.data.data
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
        //支付
        async payOrder() {
            let that = this
            if (!this.order) {
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
                    that.$localstore.session.set('has_share', '')
                    // 支付成功后的操作
                    options.success = () => {


                        let timer = setInterval(async () => {
                            console.log(33333333333);
                            let res = await that.$getRequest('/order/PaySuccess', { id: that.order.order_id })

                            if (res.data.code == 1) {
                                console.log(2222222222222);
                                clearInterval(timer)
                                that.$localstore.session('PaySucceed', res.data.data)
                                that.$router.replace({
                                    name: 'PaySucceed',
                                    query: {
                                        id: that.order.order_id,
                                        goods_id: that.order.goods_id,
                                        type: that.order.order_type,
                                    }
                                })
                            } else {
                                clearInterval(timer)
                                // that.$message(res.data.msg)
                            }

                        }, 30)



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
            }
        }
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.body.style.background = "#f6f6f6";
        this.getPlus()
        this.getOrder()
        this.getVipList()
    },

    // 挂载前状态
    beforeMount() {},

    // 挂载结束状态
    mounted() {
        // wxapi.wxRegister() //微信config注册
    },

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
.VipOrderBuy {
    header {
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        padding-top: .3rem;
        padding-bottom: .2rem;
        position: relative;
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

        .weixin {
            display: flex;
            align-items: center;
            padding-left: .68rem;
            height: .68rem;
            background: #fff;
            margin-top: .2rem;
            font-size: .32rem;

            span {
                width: .4rem;
                height: .4rem;
                overflow: hidden;
            }

            p {
                padding-left: .2rem;
                color: #515C6F;
                font-size: .24rem;
            }

        }

        .total {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding: 0 .4rem;
            margin-top: .2rem;
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
}
</style>