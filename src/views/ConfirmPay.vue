<template>
    <div class="ConfirmPay">
        <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">确认订单</div>
            <div class="add"></div>
        </header>
        <div class="mian">
            <div class="commodity">
                <i><img :src="$imgUrl + order.goods_img" alt=""></i>
                <ul>
                    <li>
                        <strong>{{order.goods_title}}</strong>
                    </li>
                    <li>
                        <span v-if="order.attr_name">{{order.attr_name}}</span>
                    </li>
                    <li>
                        <p>
                            <b>￥{{order.amount}}</b>
                            <em>×{{order.order_num}}</em>
                        </p>
                    </li>
                </ul>
            </div>
            <div class="message" v-if="form_table.length > 0">
                <h3>订单信息</h3>
                <ul>
                    <li v-show="is_inArrary('3')">
                        <label>宝贝姓名：</label>&nbsp;&nbsp;
                        <p>{{order.real_name}}</p>
                    </li>
                    <li v-show="is_inArrary('4')">
                        <label>监护人手机号</label>&nbsp;&nbsp;
                        <p>{{order.tel_phone}}</p>
                    </li>
                    <li v-show="is_inArrary('1')">&nbsp;&nbsp;
                        <label>监护人身份证</label>
                        <p>{{order.id_code}}</p>
                    </li>
                    <li v-show="is_inArrary('2')">
                        <label>游玩日期</label>&nbsp;&nbsp;
                        <p>{{order.play_time}}</p>
                    </li>
                </ul>
            </div>
            <div class="pay">
                <i><img src="../assets/icon_wx.png" alt=""></i>
                <span>微信支付</span>
            </div>
            <!--            <div class="describe">
                <span>已优惠:￥10</span>
                <span>合计:￥188</span>
            </div> -->
        </div>
        <div class="btns">
            <span>合计:￥{{order.total_amount}}</span>
            <b @click="payOrder">去支付</b>
        </div>
    </div>
</template>
<script>
import wx from 'weixin-js-sdk' //微信sdk依赖
import wxapi from '@/lib/wx.js'

export default {
    name: 'ConfirmPay',
    data() {
        return {
            order: '',
            form_table: [],
            attr_name: ''
        }
    },
    components: {

    },
    methods: {
        is_inArrary(num) {
            if (this.form_table.indexOf(num) > -1) {
                return true
            } else {
                return false
            }
        },
        //获取订单
        async getOrder() {
            let id = this.$route.query.id
            let res = await this.$getRequest('/order/getOrder', { id: id })
            this.order = res.data.data

            if (this.order.order_type == 1) {
                let res1 = await this.$getRequest('home/GetGoodsDetail', { id: this.order.goods_id })
                this.goods = res1.data.data
                this.form_table = res1.data.data.form_table
            }

            if (this.order.order_type == 3) {
                let res1 = await this.$getRequest('home/GetCardDetail', { id: this.order.goods_id })
                this.form_table = res1.data.data.form_table
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

                    // 支付成功后的操作
                    options.success = async function() {
                        let has_share = that.$localstore.session.get('has_share')
                        if (has_share && has_share.query.share_id) {
                            if (has_share.query.id == that.order.order_id && has_share.query.type == that.order.order_type) {
                                that.$localstore.session.set('has_share', '')
                            }
                        }

                        let res = await that.$getRequest('/order/PaySuccess', { id: that.order.order_id })
                        if (res.data.code == 1) {
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
                            that.$message(res.data.msg)
                        }

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
    beforeCreate() {

    },

    // 创建完毕状态 
    created() {
        this.getOrder()
        wxapi.wxRegister() //微信config注册
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

    .mian {
        padding-bottom: 1.2rem;

        .commodity {
            display: flex;
            padding: .28rem .6rem .32rem .46rem;
            background: #fff;

            i {
                width: 2.04rem;
                height: 2.04rem;
                overflow: hidden;

                img {
                    display: block;
                    width: 100%;
                    height: 2.04rem;
                    object-fit: cover
                }
            }

            ul {
                padding-left: .26rem;
                flex: 1;

                li {
                    strong {
                        font-size: .28rem;
                        color: #535D70;
                        font-weight: normal;
                    }

                    span {
                        font-size: .24rem;
                        color: #999999;
                    }

                    p {
                        display: flex;
                        padding-top: .6rem;

                        b {
                            font-weight: normal;
                            flex: 1;
                            font-size: .28rem;
                            color: #535D70;
                        }

                        em {
                            font-style: normal;
                            font-size: .24rem;
                            color: #999999;
                        }
                    }
                }
            }
        }

        .message {
            margin-top: 10px;
            background: #fff;
            padding: .22rem .45rem .4rem;

            h3 {
                font-size: .28rem;
                color: #515C6F;
                padding-left: .22rem;
                font-weight: bold;
            }

            ul {
                background: #F6F6F6;
                border-radius: 10px;
                padding: .33rem .64rem;
                font-size: .24rem;
                margin-top: .16rem;
                color: #515C6F;

                li {
                    display: flex;
                    align-items: center;
                    height: .55rem;

                    label {
                        width: 1.8rem;
                        text-align: right;
                        font-size: .3rem;
                    }

                    p {
                        font-size: .3rem;
                    }
                }
            }
        }

        .pay {
            display: flex;
            height: .68rem;
            align-items: center;
            background: #fff;
            margin-top: 10px;
            padding-left: .68rem;
            font-size: .24rem;
            color: #515C6F;

            i {
                width: .4rem;
                overflow: hidden;
                margin-right: .16rem;
            }
        }

        .describe {
            margin-top: 10px;

            span {
                padding: 0 .89rem;
                height: .8rem;
                line-height: .8rem;
                text-align: right;
                display: block;
                background: #fff;
                margin-bottom: 2px;
            }
        }
    }

    .btns {
        display: flex;
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #fff;

        span {
            flex: 1;
            text-align: right;
            height: 1.16rem;
            line-height: 1.16rem;
            font-size: .4rem;
            color: #515C6F;
            padding-right: .34rem;
        }

        b {
            width: 3.4rem;
            line-height: 1.16rem;
            height: 1.16rem;
            text-align: center;
            font-size: .32rem;
            color: #FFFFFF;
            background: #FF6666;
        }
    }
}
</style>