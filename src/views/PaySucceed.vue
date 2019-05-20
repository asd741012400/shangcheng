<template>
    <div class="PaySucceed">
        <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">支付成功</div>
            <div class="add"></div>
        </header>
        <div class="shop" v-if="order_type == 1">
            <div class="header">
                <div class="use_card_message">
                    <i><img src="../assets/PaySucceed_img1.png" alt=""></i>
                    <p>
                        <span><img src="../assets/PaySucceed_gou.png" alt=""></span>
                        <a>支付成功</a>
                    </p>
                </div>
                <b><img src="../assets/PersonalCenter_headerBg4.png" alt="" srcset=""></b>
            </div>
            <div class="btn">
                <div class="continue" @click="goHome">继续逛逛</div>
                <div class="employ" @click="goOrder">去使用</div>
            </div>
        </div>
        <div class="vip" v-else-if="order_type == 2">
            <div class="header">
                <div class="use_card_message">
                    <i class="vip_img"><img src="../assets/PaySucceed_img2.png" alt=""></i>
                </div>
                <b><img src="../assets/PersonalCenter_headerBg4.png" alt="" srcset=""></b>
            </div>
            <div class="vip_succeed_img"><span><img src="../assets/PaySucceed_logo.png" alt=""></span></div>
            <div class="vip_succeed_text">恭喜你获得属于自己的专属海报邀请好友成为会员再赚￥100</div>
            <div class="btn">
                <div class="continue" @click="goHome">继续逛逛</div>
                <div class="employ" @click="sharePlus">领取海报分享赚￥100</div>
            </div>
        </div>
        <div class="card" v-else-if="order_type == 3">
            <div class="header">
                <div class="use_card_message">
                    <i><img src="../assets/PaySucceed_img3.png" alt=""></i>
                    <p>
                        <span><img src="../assets/PaySucceed_gou.png" alt=""></span>
                        <a>支付成功</a>
                    </p>
                </div>
                <b><img src="../assets/PersonalCenter_headerBg4.png" alt="" srcset=""></b>
            </div>
            <div class="btns">
                <div class="continue" @click="goHome">继续逛逛</div>
                <!-- <div class="turn" @click="confirmPopShow">转赠好友</div> -->
                <div class="activate" @click.stop="activeCard(index)">前去激活</div>
            </div>
        </div>
        <!-- 转赠须知 -->
        <div class="confirm_pop_bg" v-if="confirmPop">
            <div class="confirm_pop">
                <div class="boxs">
                    <h3>转赠须知</h3>
                    <div class="detail" v-html="card.give_other"></div>
                    <div class="agreement">
                        <input class="song" v-model.number="value" placeholder="请输入转赠密码" />
                    </div>
                    <div class="btn">
                        <a @click="confirmPopHide">取 消</a>
                        <b @click="handleGive()">确 定</b>
                    </div>
                    <div class="colse" @click="confirmPopHide"><span><img src="../assets/icon_close.png" alt=""></span></div>
                </div>
            </div>
        </div>
        <!-- 转赠须知 -->
        <!-- 兑换成功后提示 -->
        <div class="pop_bg" v-if="popShow1">
            <div class="pop pop1" v-if="type == 'P'">
                <p>恭喜你成为PLUS会员</p>
                <!-- <em>你可以邀请好友获得奖励</em> -->
                <time class="time1">到期时间：{{toTime()}}</time>
                <p>我们为你准备了一份惊喜好礼</p>
                <div class="img">
                    <img src="../assets/gift.png">
                </div>
                    <div class="footer-box">
                        <span class="btn1" @click="sharePlus">邀请好友赚100</span>
                        <span class="btn2" @click="goMyCardBag">收下并前往</span>
                    </div>
                    <i @click="popHideFn1"><img src="../assets/icon_close.png" alt=""></i>
                </div>
            </div>
            <!-- 兑换券 -->
            <div class="confirm_pop_bg" v-if="PlusPop">
                <div class="confirm_pop">
                    <div class="boxs">
                        <h3>PLUS专享</h3>
                        <div class="detail">
                            <div class="give-box" v-for="item in give_goods" @click="getAll">
                                <img :src="$imgUrl+item.thumb_img" alt="">
                                <h4>{{item.goods_name}}</h4>
                            </div>
                            <div class="give-box" v-for="item in give_cards" @click="goMyCardBag">
                                <img :src="$imgUrl+item.thumb_img" alt="">
                                <h4>{{item.card_name}}</h4>
                            </div>
                        </div>
                        <div class="btn">
                            <b @click="getAll">收下并前往</b>
                        </div>
                        <div class="colse" @click="confirmPlusPopHide"><span><img src="../assets/icon_close.png" alt=""></span></div>
                    </div>
                </div>
            </div>
            <!-- 分享 -->
            <div class="masking" v-if="maskingShow">
                <span @click="maskingHideFn"><img src="../assets/share_img2.png" alt=""></span>
                <div>
                    <i><img src="../assets/share_img1.png" alt=""></i>
                    <p>点击上方分享此卡片给好友吧,让好友领取吧~</p>
                </div>
            </div>
            <!-- 分享 -->
            <!-- 兑换券 -->
        </div>
</template>
<script>
import wx from 'weixin-js-sdk'

export default {
    name: 'PaySucceed',
    data() {
        return {
            type: 'P',
            cd_id: '',
            cg_id: '',
            goods_id: '',
            share_url: '',
            value: '',
            give_goods: {},
            give_cards: {},
            card: {},
            user: {},
            order: {},
            PlusPop: false,
            popShow1: false,
            maskingShow: false,
            confirmPop: false,
            order_type: 3
        }
    },
    components: {},
    methods: {
        toTime() {
            let plus = this.$localstore.session.get('plus')
            let day1 = this.$dayjs().format('YYYY-MM-DD')
            let day2 = this.$dayjs(day1).add(plus.day, 'day').format('YYYY-MM-DD')
            return day2
        },
        popHideFn1() {
            this.popShow1 = false;
        },
        //分享plus
        sharePlus() {
            this.$router.push({ name: 'VipPlus' })
        },
        getAll() {
            this.$router.replace({ name: 'Order' })
        },
        //去主页
        goHome() {
            this.$router.replace({ name: 'Index' })
        },
        //去我的卡包
        goMyCardBag() {
            this.$router.replace({ name: 'MyCardBag' })
        },
        //去订单
        goOrder() {
            this.$router.replace({ name: 'OrderDetail', query: { "id": this.order_id, "type": 1 } })
        },
        confirmPopShow() {
            this.confirmPop = true
        },
        confirmPopHide() {
            this.confirmPop = false
        },
        confirmPlusPopShow() {
            this.PlusPop = true
        },
        confirmPlusPopHide() {
            this.PlusPop = false
        },
        //激活
        activeCard() {
            this.$router.replace({ name: 'CardActivate', query: { id: this.cg_id } })
        },
        maskingHideFn() {
            this.maskingShow = false;
        },
        //获取支付成功后回调
        async getPay() {
            let data = this.$localstore.session.get('PaySucceed')
            if (this.order_type == 2) {
                this.give_goods = data.goods_count
                this.give_cards = data.card_count
                if (!this.$validatenull(this.give_goods) && !this.$validatenull(this.give_cards)) {
                    this.PlusPop = true
                } else {
                    if (!this.$validatenull(this.give_cards)) {
                        this.popShow1 = true
                    }
                }
            }
            if (this.order_type == 3) {
                this.cd_id = data.cd_id
                this.cg_id = data.cg_id
                this.share_url = 'http://' + window.location.host + '/#/GiveCard?give_id=' + this.cd_id + '&title=' + this.order.goods_title

                this.wxRegCallback()
            }
            this.$localstore.remove('PaySucceed')
        },
        //获取订单
        async getOrder() {
            let res = await this.$getRequest('/order/getOrder', { id: this.order_id })
            this.order = res.data.data
            this.getPay()
        },
        //获取卡片
        async getCard() {
            let res = await this.$getRequest('/home/GetCardDetail', { id: this.goods_id })
            this.card = res.data.data
        },
        //赠送卡片
        async handleGive() {
            if (this.value == '') {
                this.$message('转赠码不能为空！')
                return false
            }
            if (!(/^\d+$/).test(this.value)) {
                this.$message('转赠码只能为数字！')
                return false
            }
            let data = {
                cdid: this.cd_id,
                card_password: this.value
            }
            let res = await this.$postRequest('/card/GiveCard', data)

            if (res.data.code == 1) {
                this.$message('操作成功！');
                this.confirmPop = false
                this.maskingShow = true;
            } else {
                this.$message(res.data.msg);
            }
        },
        // 用于微信JS-SDK回调
        wxRegCallback() {
               wx.ready(() => {
                //微信分享到朋友圈
                wx.onMenuShareTimeline({
                    title: this.order.goods_title, // 分享标题, 请自行替换
                    link: this.share_url, // 分享链接，根据自身项目决定是否需要split
                    imgUrl: this.$imgUrl + this.order.goods_img, // 分享图标, 请自行替换，需要绝对路径
                    success() {
                        // 用户成功分享后执行的回调函数

                    },
                    cancel() {
                        // 用户取消分享后执行的回调函数

                    }
                });

                wx.onMenuShareAppMessage({
                    title: this.order.goods_title, // 分享标题, 请自行替换
                    desc: '你的好友' + this.user.username + '赠送了你一张' + this.order.goods_title + '卡片,快来领取吧！', // 分享描述, 请自行替换
                    link: this.share_url, // 分享链接，根据自身项目决定是否需要split
                    imgUrl: this.$imgUrl + this.order.goods_img, // 分享图标, 请自行替换，需要绝对路径
                    success() {
                        // 用户成功分享后执行的回调函数

                    },
                    cancel() {
                        // 用户取消分享后执行的回调函数

                    }
                })
            })
        },

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        document.body.style.background = "#fff";
        let user = this.$localstore.get('wx_user')
        this.user = user
        this.user_id = user.user_id
        this.order_id = this.$route.query.id
        this.order_type = this.$route.query.type
        this.goods_id = this.$route.query.goods_id
        this.getOrder()

    },

    // 挂载前状态
    beforeMount() {},

    // 挂载结束状态
    mounted() {

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
.PaySucceed {
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
        position: relative;
        overflow: hidden;
        background: url("../assets/PaySucceed_bg.png") center center /100% 100% no-repeat;
        height: 4rem;

        .use_card_message {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;

            i {
                width: 2.06rem;
                overflow: hidden;

                &.vip_img {
                    width: auto;
                }
            }

            p {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: .32rem;
                color: #fff;
                font-weight: bold;
                padding-top: .32rem;

                span {
                    width: .36rem;
                    overflow: hidden;
                    margin-right: 4px;
                }

                a {
                    color: #fff;
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

    .vip_succeed_img {
        width: 1.8rem;
        height: .9rem;
        margin: 0 auto;
        position: relative;
        display: flex;

        span {
            position: absolute;
            width: 1.8rem;
            height: 1.8rem;
            overflow: hidden;
            border-radius: 50%;
            top: -.9rem;
        }
    }

    .vip_succeed_text {
        width: 3.48rem;
        text-align: center;
        color: #FF6666;
        font-size: .24rem;
        margin: .26rem auto 0;

    }

    .btn {
        display: flex;
        align-items: center;
        justify-content: space-around;
        // padding: .52rem 1.24rem 0;

        .continue {
            width: 2.06rem;
            height: .7rem;
            line-height: .7rem;
            text-align: center;
            color: #FF6666;
            border: 1px solid #FF6666;
            border-radius: 50px;
            font-size: .32rem;
        }

        .employ {
            width: 2.06rem;
            height: .7rem;
            line-height: .7rem;
            text-align: center;
            color: #fff;
            border: 1px solid #FF6666;
            background: #FF6666;
            border-radius: 50px;
            font-size: .32rem;
        }
    }

    .btns {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .52rem .62rem 0;

        .continue {
            width: 2.06rem;
            height: .7rem;
            line-height: .7rem;
            text-align: center;
            color: #FF6666;
            border: 1px solid #FF6666;
            border-radius: 50px;
            font-size: .32rem;
        }

        .turn {
            width: 1.58rem;
            height: .7rem;
            line-height: .7rem;
            text-align: center;
            color: #fff;
            border: 1px solid #66A1EC;
            background: #66A1EC;
            border-radius: 50px;
            font-size: .32rem;
        }

        .activate {
            width: 1.8rem;
            height: .7rem;
            line-height: .7rem;
            text-align: center;
            color: #fff;
            border: 1px solid #FF6666;
            background: #FF6666;
            border-radius: 50px;
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
            padding: 0 .4rem;

            .boxs {
                background: #fff;
                border-radius: 10px;
                position: relative;
                overflow: hidden;
                width: 95%;

                .detail {
                    padding: 0.2rem .3rem;
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
                    padding: 0 .2rem 0 .1rem;

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

                    .song {
                        // text-align: center;
                        width: 100%;
                        border: 1px solid #ccc;
                        padding: 0.14rem 0.1rem;
                        border-radius: 0.4rem;
                    }

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

        .footer-box {
            display: flex;
        }

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

        .time1 {
            margin: 0.2rem 0;
        }

        .pop1 {
            width: 6rem;

            .img {
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    width: 3.2rem;
                    height: 3.2rem
                }
            }

            .btn1 {
                background: #fff;
                color: red;
                border: 1px solid #FF6666;
                box-sizing: border-box;
                margin-right: 0.1rem;
            }
        }
    }

}


.give-box {
    display: flex;
    margin-top: 10px;

    img {
        width: 1.5rem;
        height: 1.2rem;
    }

    h4 {
        flex: 1;
        word-break: break-all;
        margin-left: 10px;
    }
}

.masking {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.5);
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
        width: 3.48rem;
        overflow: hidden;
    }

    div {
        position: absolute;
        right: .5rem;
        top: 0;

        p {
            width: 2rem;
            font-size: .36rem;
            margin: 1.5rem .6rem 0 0;
            color: #fff;
            text-align: center;
        }

        i {
            width: 1.2rem;
            overflow: hidden;
            position: absolute;
            right: 0;
            top: 0;
        }
    }
}
</style>