<template>
    <div class="VipEquity">
        <header>
            <div class="icon_return" @click="goBack"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">会员权益</div>
            <div class="add"></div>
        </header>
        <div class="vip_card">
            <p>
                <span>累积为您节省：￥</span>
                <a>99999</a>
            </p>
        </div>
        <div class="exclusive_bg">
            <i class="img1"><img src="../assets/VipEquity_img1.png" alt=""></i>
            <div class="exclusive">
                <div class="tle_text">
                    <span></span>
                    <a class="left"></a>
                    <p><img src="../assets/title1.png" alt=""></p>
                        <a class="right"></a>
                        <span></span>
                </div>
                <i class="tle_en">EXCLUSIVE RIGHTS</i>
                <ul class="tab">
                    <li class="active">
                        <span><img src="../assets/VipEquity_icon1.png" alt=""></span>
                        <p>畅玩特权</p>
                    </li>
                    <li>
                        <span><img src="../assets/VipEquity_icon2.png" alt=""></span>
                        <p>畅玩特22231权</p>
                    </li>
                    <li>
                        <span><img src="../assets/VipEquity_icon3.png" alt=""></span>
                        <p>畅玩特权</p>
                    </li>
                    <li>
                        <span><img src="../assets/VipEquity_icon4.png" alt=""></span>
                        <p>畅玩特123权</p>
                    </li>
                    <li>
                        <span><img src="../assets/VipEquity_icon5.png" alt=""></span>
                        <p>畅玩特asd权</p>
                    </li>
                    <li>
                        <span><img src="../assets/VipEquity_icon6.png" alt=""></span>
                        <p>畅玩特权</p>
                    </li>
                    <li>
                        <span><img src="../assets/VipEquity_icon7.png" alt=""></span>
                        <p>畅玩特权</p>
                    </li>
                </ul>
                <div class="text">
                    <h3>
            <span></span>
            <b>畅玩特权</b>
          </h3>
                    <p>会员可享时光里·BABY MALL三店全年不限次游乐区畅玩特权
                        （龙湖时代天街店、恒大中渝广场店、茶园悦地购物中心店）</p>
                </div>
                <div class="privilege">
                    <div class="tle_text">
                        <span></span>
                        <a class="left"></a>
                        <p><img src="../assets/title3.png" alt=""></p>
                            <a class="right"></a>
                            <span></span>
                    </div>
                    <i class="tle_en">EXCLUSIVE RIGHTS</i>
                    <div class="privilege_img"><img src="../assets/img5.png" alt=""></div>
                    </div>
                </div>
            </div>
            <div class="recommend">
                <div class="tle_text">
                    <span></span>
                    <a class="left"></a>
                    <p><img src="../assets/title2.png" alt=""></p>
                        <a class="right"></a>
                        <span></span>
                </div>
                <ul class="tab">
                    <li class="active">
                        <p>免 费</p>
                        <span></span>
                    </li>
                    <li>
                        <p>免 费</p>
                        <span></span>
                    </li>
                    <li>
                        <p>免 费</p>
                        <span></span>
                    </li>
                    <li>
                        <p>免 费</p>
                        <span></span>
                    </li>
                    <li>
                        <p>免 费</p>
                        <span></span>
                    </li>
                    <li>
                        <p>免 费</p>
                        <span></span>
                    </li>
                </ul>
                <ul class="product">
                    <li>
                        <i><img src="../assets/img1.png" alt=""></i>
                        <p>加勒比儿童</p>
                        <a>免费</a>
                        <span>市场价：￥200</span>
                    </li>
                    <li>
                        <i><img src="../assets/img1.png" alt=""></i>
                        <p>加勒比儿童</p>
                        <a>免费</a>
                        <span>市场价：￥200</span>
                    </li>
                    <li>
                        <i><img src="../assets/img1.png" alt=""></i>
                        <p>加勒比儿童</p>
                        <a>免费</a>
                        <span>市场价：￥200</span>
                    </li>
                    <li>
                        <i><img src="../assets/img1.png" alt=""></i>
                        <p>加勒比儿童</p>
                        <a>免费</a>
                        <span>市场价：￥200</span>
                    </li>
                    <li>
                        <i><img src="../assets/img1.png" alt=""></i>
                        <p>加勒比儿童</p>
                        <a>免费</a>
                        <span>市场价：￥200</span>
                    </li>
                    <li>
                        <i><img src="../assets/img1.png" alt=""></i>
                        <p>加勒比儿童</p>
                        <a>免费</a>
                        <span>市场价：￥200</span>
                    </li>
                </ul>
            </div>
            <div class="buyVip">
                <template v-if="share_id !== '' &&　user.status < 1">
                    <!-- <router-link :to="{name:'VipOrder',query:{type:2}}"> -->
                    <van-button round block type="info" @click="BuyPlus">立即开通 ￥599</van-button>
                    <!-- </router-link> -->
                </template>
                <template v-else-if="share_id !== '' &&　!user.user_id">
                    <!-- <router-link :to="{name:'VipOrder',query:{type:2}}"> -->
                    <van-button round block type="info" @click="BuyPlus">立即开通 ￥599</van-button>
                    <!-- </router-link> -->
                </template>
                <template v-else-if="user.status >= 1">
                    <router-link :to="{name:'VipPlus'}">
                        <van-button round block type="info">邀请好友赚 ￥100</van-button>
                    </router-link>
                </template>
            </div>
            <BindPhone :show="show"></BindPhone>
            <MyFooter></MyFooter>
        </div>
</template>
<script>
import wxapi from '@/lib/wx.js'
export default {
    name: 'VipEquity',
    data() {
        return {
            show: false,
            firstEnter: false,
            user: {
                user_id: '',
                tel_phone: '',
                status: 0
            },
            share_id: '',
            plus: {}
        }
    },
    components: {},
    methods: {
        //购买Plus
        BuyPlus() {
            let user = this.$localstore.get('userInfo')
            if (user) {
                this.user = user
            }
            if (!user) {
                this.show = true
                return false
            } else {
                this.postUser()
                this.$router.push({ name: 'VipOrder', query: { type: 2 } })
            }

        },
        goBack() {
            let from_url = this.$localstore.get('from_url')
            if (!from_url) {
                this.$router.push({ name: 'Index' })
            } else {
                this.$router.go(-1)
            }
        },
        //获取PlUS
        async getPlUS() {
            let id = this.$route.query.id
            let res = await this.$getRequest('/home/GetPlus')
            this.plus = res.data.data
        },
        //关系绑定
        // async postUser() {
        //     let openid = this.$localstore.get('openid6')
        //     let data = {
        //         share_id: this.share_id,
        //         openid: openid
        //     }
        //     if (this.share_id) {
        //         let res = await this.$postRequest('/user/Recommend', data)
        //     }
        // },
        // 用于微信JS-SDK回调   
        wxRegCallback() {
            this.wxShareTimeline()
            this.wxShareAppMessage()
        },
        // 微信自定义分享到朋友圈
        wxShareTimeline() {
            let option = {
                title: this.plus.title, // 分享标题, 请自行替换
                link: 'http://' + window.location.host + '/#/VipEquity?share_id=' + this.user.user_id +
                    '&type=2', // 分享链接，根据自身项目决定是否需要split
                imgUrl: this.$imgUrl + this.plus.thumb, // 分享图标, 请自行替换，需要绝对路径
                success: () => {
                    // alert('分享成功')
                },
                error: () => {
                    // alert('已取消分享')
                }
            }
            // 将配置注入通用方法
            wxapi.ShareTimeline(option)
        },
        // 微信自定义分享给朋友
        wxShareAppMessage() {
            let option = {
                title: this.plus.title, // 分享标题, 请自行替换
                desc: this.plus.desc, // 分享描述, 请自行替换
                link: 'http://' + window.location.host + '/#/VipEquity?share_id=' + this.user.user_id +
                    '&type=2', // 分享链接，根据自身项目决定是否需要split
                imgUrl: this.$imgUrl + this.plus.thumb, // 分享图标, 请自行替换，需要绝对路径
                success: () => {
                    // alert('分享成功')
                },
                error: () => {
                    // alert('已取消分享')
                }
            }
            // 将配置注入通用方法
            wxapi.ShareAppMessage(option)
        },
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        document.body.style.background = "#000";
        let user = this.$localstore.get('userInfo')
        if (user) {
            this.user = user
        }
        let has_share = this.$localstore.get('has_share')
        if (has_share && has_share.query.share_id) {
            this.share_id = has_share.query.share_id
        }
        this.getPlUS()
        // this.postUser()

    },

    // 挂载前状态
    beforeMount() {},

    // 挂载结束状态
    mounted() {
        wxapi.wxRegister(this.wxRegCallback)
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
.buyVip {
    position: fixed;
    bottom: 100px;
    padding: 0 0.8rem;
    width: 100%;
    box-sizing: border-box;

    .van-button--info {
        background: #C1A06B;
        border: 1px solid #C1A06B;
    }

    .van-button--block {
        width: 100%;
    }
}

header {
    height: .6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding-top: .3rem;
    padding-bottom: .2rem;
    background: #FFFFFF;

    // position: fixed;
    // top: 0;
    // left: 0;
    // width: 100%;
    .icon_return {
        width: 1rem;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: absolute;
        left: .4rem;
        z-index: 100;

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

// header + div{
//   margin-top:1.1rem!important;
// }

.VipEquity {
    background: url('../assets/VipEquity_bg.png') top/100% 17.38rem no-repeat;

    .vip_card {
        height: 4.66rem;
        background: url('../assets/VipEquity_card.png') center/100% no-repeat;
        border-radius: 10px;
        margin: 0 auto;
        overflow: hidden;
        display: flex;
        justify-content: center;

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

    .exclusive_bg {
        display: flex;
        justify-content: center;
        position: relative;

        .img1 {
            position: absolute;
            left: 0;
            top: 0;
            width: 1.2rem;
            overflow: hidden;
        }

        .exclusive {
            width: 7.08rem;
            background: url('../assets/VipEquity_bg2.png') center/100% 100% repeat-y;
            border-radius: .1rem;
            overflow: hidden;

            .tle_text {
                display: flex;
                align-items: center;
                justify-content: center;
                padding-top: .42rem;

                span {
                    width: .1rem;
                    height: .1rem;
                    background: #000;
                    border-radius: 50%;
                    overflow: hidden;
                }

                a {
                    width: .14rem;
                    height: .14rem;
                    background: #c1a06b;
                    border-radius: 50%;
                    overflow: hidden;

                    &.left {
                        margin-left: .1rem;
                    }

                    &.right {
                        margin-right: .1rem;
                    }
                }

                p {
                    width: 1.7rem;
                    overflow: hidden;
                    padding: 0 .25rem;
                }
            }

            .tle_en {
                text-align: center;
                color: #c1a06b;
                font-size: .12rem;
                display: block;
                padding-top: .14rem;
            }

            ul {
                white-space: nowrap;
                width: auto;
                overflow-x: scroll;
                margin: .59rem 0 0 .48rem;

                li {
                    display: inline-block;
                    margin-right: .29rem;

                    span {
                        display: block;
                        overflow: hidden;
                        width: .8rem;
                        height: .8rem;
                        border-radius: 50%;
                        margin: 0 auto;
                    }

                    p {
                        color: #141211;
                        font-size: .24rem;
                        padding-top: .1rem;
                    }
                }
            }

            .text {
                border: solid 1px #b19363;
                margin: .2rem .18rem 0;
                padding: .38rem .13rem .38rem .2rem;

                h3 {
                    display: flex;
                    align-items: center;

                    span {
                        width: .14rem;
                        height: .14rem;
                        background: #c1a06b;
                        border-radius: 50%;
                        overflow: hidden;
                    }

                    b {
                        color: #141211;
                        font-size: .28rem;
                        padding-left: .13rem;
                    }
                }

                p {
                    color: #141211;
                    font-size: .24rem;
                    line-height: .36rem;
                }
            }

            .privilege {
                padding-top: .47rem;

                .privilege_img {
                    padding: .3rem .14rem .2rem;
                    overflow: hidden;
                }
            }
        }
    }

    .recommend {
        padding: 1.27rem .33rem 0;

        .tle_text {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: .42rem;

            span {
                width: .1rem;
                height: .1rem;
                background: #c1a06b;
                border-radius: 50%;
                overflow: hidden;
            }

            a {
                width: .14rem;
                height: .14rem;
                background: #c1a06b;
                border-radius: 50%;
                overflow: hidden;

                &.left {
                    margin-left: .1rem;
                }

                &.right {
                    margin-right: .1rem;
                }
            }

            p {
                width: 1.7rem;
                overflow: hidden;
                padding: 0 .25rem;
            }
        }

        .tab {
            white-space: nowrap;
            width: auto;
            overflow-x: scroll;
            margin: .66rem .33rem 0 .55rem;

            li {
                display: inline-block;
                margin-right: .7rem;
                height: .6rem;

                span {
                    overflow: hidden;
                    height: 2px;
                    background-color: #ffe29f;
                    border-radius: 2px;
                    display: block;
                    opacity: 0;
                }

                p {
                    color: #c1a06b;
                    font-size: .24rem;
                    padding-top: .1rem;
                }
            }

            .active {
                span {
                    opacity: 1;
                }

                p {
                    color: #ffe29f;
                }
            }
        }

        .product {
            flex-wrap: wrap;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: .4rem;

            li {
                background: #fff;
                margin-bottom: .2rem;
                padding: .18rem;
                display: flex;
                flex-direction: column;

                i {
                    height: 3rem;
                    width: 3rem;
                    overflow: hidden;
                }

                p {
                    font-size: .24rem;
                    color: #515C6F;
                    padding-top: .14rem;
                }

                a {
                    width: .7rem;
                    height: .34rem;
                    line-height: .34rem;
                    text-align: center;
                    color: #FFB389;
                    font-size: .24rem;
                    border: 1px solid #FFB389;
                    margin-top: .44rem;
                }

                span {
                    font-size: .22rem;
                    color: #999999;
                    padding-top: .14rem;
                }
            }
        }
    }
}
</style>