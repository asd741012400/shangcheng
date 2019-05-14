<template>
    <div class="MyShop">
        <header>
            <div class="return" @click="$router.go(-1)"><span><img src="../assets/icon_return_w.png" alt=""></span></div>
            <div class="shop_message">
                <span><img class="avatar" :src="userInfo.wechat_img" alt="" srcset=""></span>
                <div>
                    <p>
                        <input type="text" :value="userInfo.username +'的小店'">
                        <!-- <i><img src="../assets/icon_compile.png" alt=""></i> -->
                    </p>
                    <a>ID：{{userInfo.user_id}}</a>
                </div>
            </div>
            <b><img src="../assets/my_shopBg.png" alt="" srcset=""></b>
        </header>
        <div class="vip_card" :style="{backgroundImage: 'url('+$imgUrl+plus.photo+')'}" @click="invitation">
        </div>
        <div class="share" @click="invitation">
            <p>
                <span>邀请好友赚</span>
                <a>￥{{money || 0}}</a>
            </p>
        </div>
        <div class="activity_list">
            <h3>
        <span>
            <img src="../assets/icon_recommend.png" alt="">
        </span>
        <a>爆款推荐</a>
      </h3>
            <ul>
                <li class="vip_price" v-for="(item,index) in list" v-if="item.store > 0">
                    <div class="img" @click="goGoods(item)">
                        <span><img :src="$imgUrl+item.thumb_img" alt=""></span>
                        <div>
                            <p>会员价</p>
                            <i>￥</i>
                            <a>{{item.cost_price}}</a>
                        </div>
                    </div>
                    <div class="project">
                        <p>{{item.goods_name}}</p>
                        <span>已售　{{item.sale_num}}/{{parseInt(item.store)}}</span>
                    </div>
                    <div class="share">
                        <div class="price">
                            <span>现价</span>
                            <b>￥{{item.goods_price}}</b>
                            <a>￥{{item.mkt_price}}</a>
                        </div>
                        <div class="right">
                            <span class="btn" @click.stop="shareWin(item)">分享赚 ￥{{item.dist_money}}</span>
                        </div>
                    </div>
                    <!--                    <div class="price">
                        <div class="left-box">
                            <span>现价</span>
                            <b>￥{{item.goods_price}}</b>&nbsp;
                            <del>￥{{item.mkt_price}}</del>
                        </div>
                    </div> -->
                    <div class="status" v-if="item.store <= 0"><span><img src="../assets/icon_null.png" alt=""></span></div>
                </li>
            </ul>
        </div>
        <div class="click_share" v-show="userInfo.user_id == storeInfo.user_id">
            <div @click="shareShowFn">
                <span><img src="../assets/icon_share.png" alt=""></span>
                <p>分享店铺</p>
            </div>
        </div>
        <Share ref="myShare" :shareurl="url"></Share>
    </div>
</template>
<script>
import { HOME_URL } from '@/config/index.js'
import wx from 'weixin-js-sdk'
import Share from '../components/Share'
export default {
    name: 'MyShop',
    data() {
        return {
            userInfo: {},
            plus: '',
            money: '',
            user_id: '',
            url: '',
            page: 1,
            storeInfo: {},
            list: [],
            show: false,
            currSize: 0,
            pageSize: 10,
        }
    },
    components: {
        Share
    },
    methods: {
        goGoods(item) {
            this.$router.push({ name: 'CommodityDetails', query: { id: item.goods_id, type: 1 } })
        },
        invitation() {
            this.$router.push({ name: "VipPlus" })
        },
        shareShowFn() {
            this.$refs.myShare.shareShowFn();
        },
        shareWin(item) {
            this.$router.push({
                name: "SharePoster",
                query: {
                    id: item.goods_id,
                    type: 1,
                    share_id: this.user_id,
                }
            });
        },
        //获取PlUS
        async getPlUS() {
            let id = this.$route.query.id
            let res = await this.$getRequest('/home/GetPlus')
            this.plus = res.data.data
        },
        //推广赚
        async getMoney() {
            let res = await this.$postRequest('/store/GetLevel', { user_id: this.user_id })
            this.money = res.data.data
        },
        async getInfo() {
            let res = await this.$getRequest('/store/MyStore', { user_id: this.user_id, page: this.page })
            this.storeInfo = res.data.data.user_info
            this.list = res.data.data.goods_list
            this.currSize = res.data.data.goods_list.length
            this.pageSize = res.data.data.count
            this.wxRegister()
        },
        async getInfoMore() {
            let res = await this.$getRequest('/store/MyStore', { user_id: this.user_id, page: this.page })
            this.storeInfo = res.data.data.user_info
            this.list = this.list.concat(res.data.data.goods_list);
            this.currSize = res.data.data.goods_list.length
            this.pageSize = res.data.data.count
        },
        // 用于微信JS-SDK回调
        async wxRegister() {
            //获取微信jssdk
            let res = await this.$getRequest('/wechat/GetWxJSSDK', { url: window.location.href })
            let config = res.data.data
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: config.appId, // 必填，公众号的唯一标识
                timestamp: config.timestamp, // 必填，生成签名的时间戳
                nonceStr: config.nonceStr, // 必填，生成签名的随机串
                signature: config.signature, // 必填，签名
                jsApiList: config.jsApiList // 必填，需要使用的JS接口列表
            })
            wx.ready(() => {

                //微信分享到朋友圈
                wx.onMenuShareTimeline({
                    title: this.userInfo.username + '的小店', // 分享标题, 请自行替换
                    link: this.url, // 分享链接，根据自身项目决定是否需要split
                    imgUrl: this.userInfo.wechat_img, // 分享图标, 请自行替换，需要绝对路径
                    success() {
                        // 用户成功分享后执行的回调函数

                    },
                    cancel() {
                        // 用户取消分享后执行的回调函数

                    }
                });
                wx.onMenuShareAppMessage({
                    title: this.userInfo.username + '的小店', // 分享标题, 请自行替换
                    desc: this.userInfo.username + '分享给你的店铺快来看看吧', // 分享描述, 请自行替换
                    link: this.url, // 分享链接，根据自身项目决定是否需要split
                    imgUrl: this.userInfo.wechat_img, // 分享图标, 请自行替换，需要绝对路径
                    success() {
                        // 用户成功分享后执行的回调函数

                    },
                    cancel() {
                        // 用户取消分享后执行的回调函数

                    }
                })
                // wx.showOptionmenu();
            })

        },
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        document.body.style.background = "#F6F6F6";
        let userInfo = this.$localstore.get('wx_user')
        if (userInfo) {
            this.userInfo = userInfo
        }
        this.user_id = this.$route.query.user_id
        if (!this.userInfo.user_id) {
            this.$router.push({ name: 'Index' })
        }

        this.url = 'http://' + window.location.host + '/#/MyShopUser?share_id=' + this.userInfo.user_id
        if (HOME_URL) {
            this.url = HOME_URL + '/#/MyShopUser?share_id=' + this.userInfo.user_id
        }


        this.getInfo()
        this.getPlUS()
        this.getMoney()
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
                    this.getInfoMore()
                }
            }
        }
    },

    // 挂载前状态
    beforeMount() {},

    // 挂载结束状态
    mounted() {
        // this.wxRegister()
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
.MyShop {
    header {
        position: relative;
        overflow: hidden;
        background: linear-gradient(147deg, rgba(255, 102, 102, 1) 0%, rgba(255, 179, 137, 1) 100%);
        height: 3.7rem;

        .return {
            display: flex;
            justify-content: flex-start;
            padding-top: .3rem;
            padding-left: .1rem;

            span {
                overflow: hidden;
                width: 1rem;
                height: 1rem;
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    width: .27rem;
                }
            }
        }

        .shop_message {
            align-items: center;
            display: flex;
            padding-top: .3rem;

            .avatar {
                border-radius: 50%;
            }

            span {
                width: 1.36rem;
                height: 1.36rem;
                border-radius: 50%;
                border: .08rem solid #ff947b;
                margin-left: .8rem;
                margin-right: .28rem;
            }

            div {
                p {
                    display: flex;
                    padding-bottom: .1rem;

                    input {
                        background: none;
                        font-size: .28rem;
                        font-weight: bold;
                        width: 1.2rem;
                        color: #fff;
                    }

                    i {
                        overflow: hidden;
                        width: .26rem;
                    }
                }

                a {
                    font-size: .22rem;
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

    .vip_card {
        height: 4.66rem;
        background: url('../assets/VipEquity_card.png') center/100% no-repeat;
        border-radius: 10px;
        margin: 0 auto;
        overflow: hidden;
        display: flex;
        justify-content: center;
        background-size: 90% auto;
    }

    .share {
        display: flex;
        justify-content: center;

        p {
            margin-top: -0.24rem;
            // margin-top: 3.9rem;
            width: 3.84rem;
            height: .8rem;
            border-radius: 21px;
            text-align: center;
            color: #fff;
            font-size: .32rem;
            display: flex;
            background: #FF6666;
            align-items: center;
            justify-content: center;
            font-weight: bold;

            span {
                font-weight: bold;
            }

            a {
                font-weight: bold;
                color: #fff;
                font-size: .36rem;
            }
        }
    }

    .activity_list {
        h3 {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: .24rem;

            span {
                width: .32rem;
                overflow: hidden;
                margin-right: .08rem;
            }

            a {
                font-size: .28rem;
                color: #515C6F;
                font-weight: bold;
            }
        }

        ul {
            li {
                background: #fff;
                padding-top: .2rem;
                margin-bottom: .2rem;

                &.vip_price {
                    .img {
                        margin: 0 .2rem;
                        height: 3rem;
                        background: #ccc;
                        border-radius: 5px;
                        position: relative;

                        img {
                            display: block;
                            width: 100%;
                            height: 3rem;
                            object-fit: cover;
                            border-radius: .12rem;
                        }

                        span {
                            overflow: hidden;
                        }

                        div {
                            width: 2.48rem;
                            background: linear-gradient(269deg, rgba(255, 102, 102, 1) 0%, rgba(255, 179, 137, 1) 100%);
                            border-radius: 0px 20px 20px 0px;
                            position: absolute;
                            bottom: -.12rem;
                            display: flex;
                            align-items: center;
                            height: .62rem;
                            justify-content: center;
                            color: #fff;

                            p {
                                font-size: .28rem;
                            }

                            i {
                                font-size: .32rem;
                                font-style: normal;
                            }

                            a {
                                color: #fff;
                                font-size: .4rem;
                            }
                        }
                    }

                    .project {
                        display: flex;
                        padding: .3rem .2rem;
                        font-size: 0.3rem;

                        p {
                            flex: 1;
                            color: #515C6F;
                            padding-left: .28rem;
                        }

                        span {
                            font-size: 0.25rem;
                            color: #666;
                        }
                    }

                    // .price {
                    //     padding: .3rem .2rem;
                    //     display: flex;
                    //     height: 1.06rem;
                    //     align-items: center;
                    //     justify-content: space-between;
                    //     vertical-align: bottom;

                    //     b {
                    //         font-weight: normal;
                    //         font-size: .36rem;
                    //         padding-left: 2px;
                    //         padding-right: .2rem;
                    //     }

                    //     .btn {
                    //         box-sizing: border-box;
                    //         font-size: 0.24rem;
                    //         padding: 0.12rem 0.5rem;
                    //         color: #fff;
                    //         height: .8rem;
                    //         background: #FF6666;
                    //         border-radius: 50px;
                    //         box-shadow: 0px 5px 10px rgba(255, 128, 128, 0.6);
                    //         vertical-align: bottom;
                    //     }
                    // }

                    .share {
                        display: flex;
                        align-items: center;
                        padding-bottom: .38rem;
                        color: #515C6F;

                        .right {
                            display: flex;
                            align-items: center;

                            .btn {
                                box-sizing: border-box;
                                font-size: 0.24rem;
                                padding: 0.12rem 0.5rem;
                                color: #fff;
                                // height: .8rem;
                                background: #FF6666;
                                border-radius: 50px;
                                // box-shadow: 0px 5px 10px rgba(255, 128, 128, 0.6);
                                background: linear-gradient(269deg, #ffb389 0%, #ff6666 100%);
                                // vertical-align: bottom;
                                margin-right: 0.2rem;
                            }
                        }


                        .price {
                            flex: 1;
                            display: flex;
                            align-items: baseline;
                            // padding-bottom: .4rem;
                            justify-content: flex-start;
                            padding-left: .46rem;

                            span {
                                color: #515C6F;
                            }

                            b {
                                font-weight: normal;
                                font-size: .36rem;
                                padding-left: 2px;
                                padding-right: .2rem;
                            }

                            a {
                                text-decoration: line-through;
                            }


                        }

                        p {
                            background: linear-gradient(90deg, rgba(255, 102, 102, 1) 0%, rgba(255, 179, 137, 1) 100%);
                            width: 2rem;
                            height: .5rem;
                            line-height: .5rem;
                            border-radius: 20px;
                            text-align: center;
                            font-size: .22rem;
                            color: #fff;
                            margin-right: .22rem;

                            span {
                                font-size: .28rem;
                            }
                        }
                    }
                }
            }


        }
    }

    .click_share {
        position: fixed;
        bottom: .4rem;
        display: flex;
        justify-content: center;
        width: 100%;

        div {
            width: 5.6rem;
            height: .8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #FF6666;
            border-radius: 50px;
            box-shadow: 0px 5px 10px rgba(255, 128, 128, 0.6);

            span {
                width: .36rem;
                overflow: hidden;
            }

            p {
                font-size: .32rem;
                font-weight: bold;
                padding-left: .2rem;
                color: #fff;
            }
        }
    }
}
</style>