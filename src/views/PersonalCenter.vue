<template>
    <div class="PersonalCenter">
        <header v-if="userInfo.status == 1" class="vip_class">
            <div class="user_message">
                <div class="head_portrait">
                    <span><img :src="userInfo.wechat_img || avatar" alt="" srcset=""></span>
                    <i><img src="../assets/icon_vip.png" alt=""></i>
                </div>
                <div class="user_name">
                    <p>{{userInfo.username || username}}</p>
                    <div>
                        <a>会员到期：{{userInfo.over_time}}</a>
                        <i v-if="overTime(userInfo.over_time)"><img src="../assets/vt_renew.png" alt=""></i>
                    </div>
                </div>
            </div>
            <ul>
                <li>
                    <p>￥{{userInfo.history_money ||　'0.00'}}</p>
                    <a>历史收益</a>
                </li>
                <li>
                    <p>￥{{userInfo.mymoney ||　'0.00'}}</p>
                    <a>已提现</a>
                </li>
                <li>
                    <router-link :to="{name:'WithdrawDeposit'}">
                        <p>￥{{userInfo.getmoney ||　'0.00'}}</p>
                        <a>可提现</a>
                    </router-link>
                </li>
                <li>
                    <p>￥{{userInfo.freeze_money ||　'0.00'}}</p>
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
            <router-link :to="{name:'VipPlus'}">
                <p><img src="../assets/invitation.png" alt=""></p>
            </router-link>
            <router-link :to="{name:'MyShop',query:{user_id:userInfo.user_id}}">
                <p><img src="../assets/my_shop.png" alt=""></p>
            </router-link>
        </div>
        <div class="order">
            <div class="order_tel">
                <div>
                    <span><img src="../assets/icon_order.png" alt=""></span>
                    <p>我的订单</p>
                </div>
                <router-link :to="{name:'Order',query:{index:1}}">
                    全部订单&gt;
                </router-link>
            </div>
            <ul>
                <li>
                    <router-link :to="{name:'Order',query:{index:2}}">
                        <span><img src="../assets/icon_payment.png" alt=""></span>
                        <p>待付款</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'Order',query:{index:3}}">
                        <span><img src="../assets/icon_employ.png" alt=""></span>
                        <p>待使用</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'Order',query:{index:4}}">
                        <span><img src="../assets/icon_evaluate.png" alt=""></span>
                        <p>待评价</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'Order',query:{index:5}}">
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
            <!--             <li>
                <router-link :to="{name:'Collect'}">
                    <span><img src="../assets/icon_collect.png" alt=""></span>
                    <p>我的收藏</p>
                </router-link>
            </li> -->
            <li>
                <router-link :to="{name:'MyCardBag'}">
                    <span><img src="../assets/icon_card_bag2.png" alt=""></span>
                    <p>我的卡包</p>
                </router-link>
            </li>
            <li>
                <router-link :to="{name:'CommodityList'}">
                    <span><img src="../assets/icon_record.png" alt=""></span>
                    <p>我的评价</p>
                </router-link>
            </li>
            <!--             <li>
                <a href="javascript:;">
                    <router-link :to="{name:'MyCardBag'}">
                        <span><img src="../assets/icon_discount_coupon.png" alt=""></span>
                        <p>优惠券</p>
                    </router-link>
                </a>
            </li> -->
            <li v-if="userInfo.status == 1">
                <router-link :to="{name:'TeamDelTow'}">
                    <span><img src="../assets/icon_generalize.png" alt=""></span>
                    <p>我的推广</p>
                </router-link>
            </li>
        </ul>
        <MyFooter></MyFooter>
        <div class="service" v-if="mobile"><a :href="'tel:'+mobile"><img src="../assets/icon_service.png" alt=""></a></div>
        <div class="service" v-else><a href="javascript:;"><img src="../assets/icon_service.png" alt=""></a></div>
        <!-- 兑换码兑换 -->
        <div class="card_add_pop" v-if="popShow">
            <div class="card_add">
                <div>
                    <span class="close" @click="popHideFn"><em><img src="../assets/icon_close.png" alt=""></em></span>
                    <h3>兑换码</h3>
                    <p>
                        <input v-model="code" type="text">
                        <!-- <i><img src="../assets/icon_close2.png" alt=""></i> -->
                    </p>
                    <a @click="getcode">提 交</a>
                </div>
            </div>
        </div>
        <!-- 兑换成功后提示 -->
        <div class="pop_bg" v-if="popShow1">
            <div class="pop">
                <p>恭喜你成为PLUS</p>
                <em>你可以邀请好友获得奖励</em>
                <!-- <time>到期时间：2018-5-6</time> -->
                <span @click="shareShowFn">邀请好友</span>
                <i @click="popHideFn1"><img src="../assets/icon_close.png" alt=""></i>
            </div>
            <div class="pop" v-if="goods_count > 0">
                <p>恭喜成功兑换{{goods_count}}件商品</p>
                <!-- <time>到期时间：2018-5-6</time> -->
                <span @click="goOrder">前去查看</span>
                <i @click="popHideFn1"><img src="../assets/icon_close.png" alt=""></i>
            </div>
            <div class="pop" v-if="card_count > 0">
                <p>恭喜你获得卡券{{card_count}}张</p>
                <em>前往激活即可使用</em>
                <!-- <time>到期时间：2018-5-6</time> -->
                <span @click="goCardDetail">前往激活</span>
                <i @click="popHideFn1"><img src="../assets/icon_close.png" alt=""></i>
            </div>
        </div>
        <Share ref="myShare"></Share>
        <BindPhone :show="show"></BindPhone>
    </div>
</template>
<script>
import Share from '../components/Share'
export default {
    name: 'PersonalCenter',
    data() {
        return {
            vip: 1,
            show: false,
            userInfo: {
                user_id: '',
                tel_phone: '',
                status: 0
            },
            avatar: '',
            card_count: 0,
            goods_count: 0,
            username: '',
            code: '',
            mobile: '',
            popState: 3,
            popShow: false,
            popShow1: false,
        }
    },
    components: { Share },
    methods: {
        //是否到过期时间
        overTime(day) {
            let now = this.$dayjs().format('YYYY-MM-DD')
            const date1 = this.$dayjs(now)
            const date2 = this.$dayjs(day)
            let num = date2.diff(date1, 'day')
            if (num <= 30) {
                return true
            } else {
                return false
            }
        },
        shareShowFn() {
            this.$router.push({ name: 'VipPlus' })
        },
        goOrder() {
            this.$router.push({ name: 'Order' })
        },
        goCardDetail() {
            this.$router.push({ name: 'MyCardBag' })
        },
        popShowFn() {
            this.popShow = true;
        },
        popHideFn() {
            this.popShow = false;
        },
        popShowFn1() {
            this.popShow1 = true;
        },
        popHideFn1() {
            this.popShow1 = false;
            location.reload()
        },
        //兑换卡片商品权益
        async getcode() {
            let data = { code: this.code, user_id: this.userInfo.user_id }
            if (this.code == '') {
                this.$message('兑换码不能为空！')
                return false
            }
            let res = await this.$postRequest('/user/GetThings', data)
            this.$message(res.data.msg);
            if (res.data.code == 1) {
                this.card_count = res.data.data.card_count.length || 0
                this.goods_count = res.data.data.goods_count.length || 0
                this.code = ''
                this.popShow = false;
                this.popShow1 = true;

                this.getUser()
            }
        },
        //更新用户身份
        async getUser() {
            let res = await this.$postRequest('/wechat/GetUserInfo', { union_id: this.userInfo.union_id })
            if (res.data.code == 1) {
                this.$localstore.set('wx_user', res.data.data)
            }
        },
        //获取客服电话
        async getMobile() {
            let res = await this.$postRequest('/home/GetCustomMobile')
            if (res.data.code == 1) {
                this.mobile = res.data.data
            }
        },
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        document.body.style.background = "#fff";
        let userInfo = this.$localstore.get('wx_user')
        if (userInfo) {
            this.userInfo = userInfo
            this.avatar = userInfo.wechat_img
            this.username = userInfo.username
        }

        this.getMobile()
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
    background: #fff;
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
                overflow: hidden;
            }



            div {
                color: #fff;

                p {
                    font-weight: bold;
                    font-size: .28rem;
                }

                a {
                    color: #fff;
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
                        font-size: .32rem;
                    }

                    div {
                        display: flex;
                        align-items: center;

                        a {
                            color: #fff;
                            font-size: .3rem;
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
                    text-align: center;

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
                text-align: center;

                span {
                    display: block;
                    margin-top: 2px;
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
            text-align: center;

            a {
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: center;

                img {
                    display: block;
                    width: .72rem;
                }
            }

            p {
                color: #666;
            }

            span {
                display: block;
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


    .card_add_pop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: .5);

        .card_add {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            div {
                background: #fff;
                border-radius: 10px;
                width: 6.32rem;
                position: relative;
                padding-bottom: .74rem;

                span {
                    width: 1rem;
                    height: 1rem;
                    display: flex;
                    justify-content: flex-end;
                    position: absolute;
                    top: .24rem;
                    right: .24rem;

                    em {
                        width: .49rem;
                        height: .49rem;
                        overflow: hidden;
                        border-radius: 50%;
                    }
                }

                h3 {
                    font-size: .32rem;
                    color: #515C6F;
                    text-align: center;
                    padding-top: 1rem;
                }

                p {
                    width: 5.26rem;
                    height: .82rem;
                    display: flex;
                    align-items: center;
                    margin: .28rem auto .46rem;
                    background: #EEEEEF;
                    border-radius: 5px;

                    input {
                        flex: 1;
                        outline: medium;
                        height: 100%;
                        background: none;
                        padding-left: .3rem;
                    }

                    i {
                        width: .36rem;
                        height: .36rem;
                        overflow: hidden;
                        margin-right: .26rem;
                    }
                }

                a {
                    width: 3.7rem;
                    height: .8rem;
                    line-height: .8rem;
                    text-align: center;
                    font-weight: bold;
                    color: #fff;
                    border-radius: 50px;
                    background: #FF6666;
                    display: block;
                    margin: 0 auto;
                }
            }
        }
    }

    .pop_bg {
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: 0.3);
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .pop {
            background: #fff;
            border-radius: 10px;
            width: 5rem;
            position: relative;
            margin-top: 5px;
            padding: .4rem .3rem .54rem;

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