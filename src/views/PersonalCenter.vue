<template>
    <div class="PersonalCenter">
        <header v-if="userInfo.status == 1" class="vip_class">
            <div class="user_message">
                <div class="head_portrait">
                    <span><img :src="userInfo.wechat_img" alt="" srcset=""></span>
                    <i><img src="../assets/icon_vip.png" alt=""></i>
                </div>
                <div class="user_name">
                    <p>{{userInfo.username}}</p>
                    <div>
                        <a>会员到期：{{userInfo.over_time}}</a>
                        <i><img src="../assets/vt_renew.png" alt=""></i>
                    </div>
                </div>
            </div>
            <ul>
                <li>
                    <p>￥{{userInfo.history_money ||　0.00}}</p>
                    <a>历史收益</a>
                </li>
                <li>
                    <p>￥{{userInfo.freeze_money ||　0.00}}</p>
                    <a>可提现</a>
                </li>
                <li>
                    <p>￥{{userInfo.getmoney ||　0.00}}</p>
                    <a>待生效</a>
                </li>
            </ul>
            <b><img src="../assets/PersonalCenter_headerBg2.png" alt="" srcset=""></b>
        </header>
        <header v-else class="user_class">
            <span><img :src="userInfo.wechat_img" alt="" srcset=""></span>
            <div>
                <p>{{userInfo.username}}</p>
                <a>{{userInfo.tel_phone}}</a>
            </div>
            <b><img src="../assets/PersonalCenter_headerBg.png" alt="" srcset=""></b>
        </header>
        <div class="share" v-if="userInfo.status == 1">
            <p><img src="../assets/invitation.png" alt=""></p>
                <router-link :to="{name:'MyShop'}">
                    <p><img src="../assets/my_shop.png" alt=""></p>
                </router-link>
        </div>
        <div class="order">
            <div class="order_tel">
                <div>
                    <span><img src="../assets/icon_order.png" alt=""></span>
                    <p>我的订单</p>
                </div>
                <router-link :to="{name:'Order'}">
                    全部订单&gt;
                </router-link>
            </div>
            <ul>
                <li>
                    <router-link :to="{name:'Order'}">
                        <span><img src="../assets/icon_payment.png" alt=""></span>
                        <p>待付款</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'Order'}">
                        <span><img src="../assets/icon_employ.png" alt=""></span>
                        <p>待使用</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'Order'}">
                        <span><img src="../assets/icon_evaluate.png" alt=""></span>
                        <p>待评价</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'Order'}">
                        <span><img src="../assets/icon_refund.png" alt=""></span>
                        <p>退款</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="inform">
            <div>
                <i><img src="../assets/icon_conversion.png" alt=""></i>
                <p>若有兑换码可</p>
                <a @click="popShowFn">直接兑换></a>
            </div>
        </div>
        <ul :class="userInfo.status == 1 ? 'vip_function' : 'user_function'">
            <li>
                <span><img src="../assets/icon_collect.png" alt=""></span>
                <p>收藏</p>
            </li>
            <li>
                <router-link :to="{name:'MyCardBag'}">
                    <span><img src="../assets/icon_card_bag2.png" alt=""></span>
                    <p>卡包</p>
                </router-link>
            </li>
            <li>
                <span><img src="../assets/icon_record.png" alt=""></span>
                <p>核销记录</p>
            </li>
            <li>
                <span><img src="../assets/icon_discount_coupon.png" alt=""></span>
                <p>优惠券</p>
            </li>
            <li v-if="userInfo.status == 1">
                <router-link :to="{name:'DistributionTow'}">
                    <span><img src="../assets/icon_generalize.png" alt=""></span>
                    <p>我的推广</p>
                </router-link>
            </li>
        </ul>
        <MyFooter></MyFooter>
        <div class="service"><a href="tel:110"><img src="../assets/icon_service.png" alt=""></a></div>
        <div class="pop_bg" v-if="popShow">
            <div class="pop" v-if="popState == 1">
                <p>恭喜成功兑换XX商品</p>
                <time>到期时间：2018-5-6</time>
                <span>立即使用</span>
                <i @click="popHideFn"><img src="../assets/icon_close.png" alt=""></i>
            </div>
            <div class="pop" v-else-if="popState == 2">
                <p>恭喜你成为PLUS</p>
                <em>你可以邀请好友获得奖励</em>
                <time>到期时间：2018-5-6</time>
                <span>邀请好友</span>
                <i @click="popHideFn"><img src="../assets/icon_close.png" alt=""></i>
            </div>
            <div class="pop" v-else-if="popState == 3">
                <p>恭喜你获得卡券一张</p>
                <em>前往激活即可使用</em>
                <time>到期时间：2018-5-6</time>
                <span>立即激活</span>
                <i @click="popHideFn"><img src="../assets/icon_close.png" alt=""></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PersonalCenter',
    data() {
        return {
            vip: 0,
            userInfo: {},
            popState: 3,
            popShow: false
        }
    },
    components: {},
    methods: {
        popShowFn() {
            const that = this;
            that.popShow = true;
        },
        popHideFn() {
            const that = this;
            that.popShow = false;
        },
        async getUserInfo() {
            let openid = this.$localstore.get('openid1')
            let res = await this.$getRequest('/wechat/GetUserInfo', { openid: openid })
            if (res.data.code == 1) {
                this.$localstore.set('userInfo', res.data.data)
                this.userInfo = res.data.data
                this.vip = this.userInfo.status
            } else {
                this.$message('获取用户资料失败！')
            }
        }

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        this.getUserInfo()
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
<style lang="scss">
body {
    background: #fff !important;
}

.PersonalCenter {
    header {
        position: relative;
        overflow: hidden;

        &.user_class {
            background: linear-gradient(89deg, rgba(102, 161, 236, 1) 0%, rgba(137, 215, 255, 1) 100%);
            height: 2.8rem;
            align-items: center;
            display: flex;

            span {
                width: 1.36rem;
                height: 1.36rem;
                border-radius: 50%;
                border: .08rem solid #83CDFB;
                margin-left: .8rem;
                margin-right: .28rem;
            }

            img {
                border-radius: 50%;
            }

            div {
                color: #fff;

                p {
                    font-weight: bold;
                    font-size: .28rem;
                }

                a {
                    font-size: .24rem;
                }
            }
        }

        &.vip_class {
            height: 3.96rem;
            background: linear-gradient(91deg, rgba(255, 102, 102, 1) 0%, rgba(255, 179, 137, 1) 100%);

            .user_message {
                display: flex;
                align-items: center;
                padding-top: .8rem;

                .head_portrait {
                    width: 1.52rem;
                    margin-left: .8rem;
                    margin-right: .28rem;
                    position: relative;
                    display: flex;

                    span {
                        width: 100%;
                        overflow: hidden;
                        border-radius: 50%;
                        border: .08rem solid #ff947b;

                        img {
                            float: left;
                        }
                    }

                    i {
                        position: absolute;
                        right: -.25rem;
                        top: -.25rem;
                        width: .63rem;
                    }
                }

                .user_name {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    color: #fff;

                    p {
                        font-weight: bold;
                        font-size: .28rem;
                    }

                    div {
                        display: flex;
                        align-items: center;

                        a {
                            color: #fff;
                            font-size: .24rem;
                        }

                        i {
                            width: 1.36rem;
                            overflow: hidden;
                            margin-left: 2px;
                        }
                    }
                }
            }

            ul {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: .2rem 1rem 0;

                li {
                    color: #fff;
                    display: flex;
                    align-items: center;
                    flex-direction: column;

                    a {
                        color: #fff;
                    }

                    p {
                        font-size: .4rem;
                    }
                }
            }
        }

        b {
            position: absolute;
            width: 100%;
            height: .8rem;
            bottom: 0;
            overflow: hidden;
        }
    }

    .share {
        padding: .24rem .22rem .56rem;
        border-bottom: 5px solid #f6f6f6;
        display: flex;
        align-items: center;
        justify-content: space-between;

        p {
            width: 3.4rem;
        }
    }


    .order {
        .order_tel {
            padding: .5rem .4rem .32rem .6rem;
            border-bottom: 1px solid #f1f1f1;
            display: flex;

            div {
                flex: 1;
                display: flex;
                align-items: center;

                span {
                    width: .34rem;
                    overflow: hidden;
                    margin-right: .16rem;
                }

                p {
                    font-weight: bold;
                    color: #515C6F;
                    font-size: .28rem;
                }
            }

            a {
                font-size: .24rem;
                color: #999;
            }
        }

        ul {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: .4rem .42rem .64rem;

            li {
                width: .9rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                color: #515C6F;
                font-size: .24rem;
                text-align:center;

                span {
                    display:block;
                    margin-top:2px;
                    overflow: hidden;
                    margin-bottom: .08rem;
                }
            }
        }
    }

    .inform {
        border-top: 5px solid #f6f6f6;
        border-bottom: 5px solid #f6f6f6;

        div {
            display: flex;
            align-items: center;
            height: .56rem;
            justify-content: flex-end;
            padding-right: .36rem;

            i {
                width: .28rem;
                overflow: hidden;
            }

            p {
                padding: 0 4px;
                color: #515C6F;
                font-size: .24rem;
            }

            a {
                color: #FF6666;
                font-size: .24rem;
            }
        }
    }

    .user_function {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: .6rem .5rem;

        li {
            display: flex;
            align-items: center;
            flex-direction: column;
            padding-right: .6rem;

            a {
                display: block;
                width: .72rem;
                overflow: hidden;
            }

            p {
                color: #666;
            }

            span {
                width: .72rem;
                overflow: hidden;
            }
        }

        li:last-of-type {
            padding: 0;
        }
    }

    .vip_function {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: .6rem .5rem 2.8rem;

        li {
            display: flex;
            align-items: center;
            flex-direction: column;
            padding-right: .6rem;
            text-align: center;
            width: 20%;

            a {
                display: block;
                width: 100%;
            }

            span {
                overflow: hidden;
            }
        }

        li:last-of-type {
            padding: 0;
        }
    }

    .service {
        position: fixed;
        right: .26rem;
        bottom: 1.86rem;
        width: .8rem;
        height: .8rem;
        background: #fff;
        border-radius: 50%;
    }

    .pop_bg {
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: 0.3);
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        .pop {
            background: #fff;
            border-radius: 10px;
            width: 5.72rem;
            position: relative;
            padding: .94rem .3rem .54rem;

            i {
                position: absolute;
                width: .48rem;
                height: .48rem;
                overflow: hidden;
                display: block;
                right: .24rem;
                top: .24rem;
            }

            p {
                font-size: .4rem;
                color: #FF6666;
                text-align: center;
            }

            em {
                font-size: .4rem;
                color: #FF6666;
                text-align: center;
                display: block;
                font-style: normal;
            }

            time {
                font-size: .32rem;
                color: #515C6F;
                text-align: center;
                display: block;
            }

            span {
                display: block;
                width: 3.7rem;
                background: #FF6666;
                border-radius: 50px;
                text-align: center;
                line-height: .8rem;
                height: .8rem;
                color: #fff;
                font-weight: bold;
                font-size: .32rem;
                margin: .26rem auto 0;
            }

        }
    }

}
</style>