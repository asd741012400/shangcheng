<template>
    <div class="VipEquity">
        <header>
            <div class="icon_return" @click="goBack"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">会员权益</div>
            <div class="add"></div>
        </header>
        <!-- top -->
        <div class="top">
            <div class="top-box">
                <img src="@/assets/vip_top.png">
                <div class="center-box">
                    <div class="vip-icon"><img src="@/assets/vip.png"></div>
                        <img class="card" :src="$imgUrl+plus.photo">
                </div>
                    </div>
                </div>
                <!-- title -->
                <div class="title">
                    <img src="@/assets/vip1.png">
                </div>
                    <!-- tab -->
                    <div class="tab-box">
                        <ul class="tab">
                            <li :class="ii == vipIndex ? 'active' : ''" v-for="(item,ii) in vip" :key="ii" @click="getVip(ii)">
                                <div class="item">
                                    <img :src="$imgUrl+item.thumb" alt="">
                                    <p>{{item.name}}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- swiper -->
                    <div class="detail" id="swiper">
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="(item,ii) in vip">
                                    <span class="tip"><i></i><span>{{item.name}}</span></span>
                                    <div class="detail" v-html="item.desc">
                                    </div>
                                </div>
                            </div>
                            <!-- Add Pagination -->
                            <!-- <div class="swiper-pagination"></div> -->
                        </div>
                    </div>
                    <!-- title -->
                    <div class="title" style="top:0">
                        <img src="@/assets/vip2.png">
                </div>
                        <ul class="tab-list" id="product">
                            <li :class="ii == index ? 'active' : ''" v-for="(item,ii) in AllCate" :key="ii" @click="getGoodsList(ii)">
                                <p>{{item.c_name}}</p>
                                <span></span>
                            </li>
                        </ul>
                        <!-- 会员推荐 -->
                        <div class="activity_list">
                            <ul>
                                <li v-for="(item,index) in goodsList" :key="index">
                                    <router-link :to="{name:'CommodityDetails',query:{id:item.goods_id,type:1}}">
                                        <div class="img">
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
                                                <b>￥{{item.mkt_price}}</b>
                                                <a>￥{{item.goods_price}}</a>
                                            </div>
                                        </div>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                                <div class="buyVip">
            <template v-if="share_id &&　!user.user_id">
                <van-button round block type="info" @click="BuyPlus">立即开通 ￥{{plus.sale_price}}</van-button>
            </template>
            <template v-else-if="share_id &&　user.status < 1">
                <van-button round block type="info" @click="BuyPlus">立即开通 ￥{{plus.sale_price}}</van-button>
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
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
import wx from 'weixin-js-sdk'

export default {
    name: 'VipEquity',
    data() {
        return {
            active: 1,
            show: false,
            firstEnter: false,
            user: {
                user_id: '',
                tel_phone: '',
                status: 0
            },
            index: 0,
            share_id: '',
            vip: [],
            currVip: {
                name: '',
                desc: '',
                detail: '',
            },
            vipIndex: 0,
            AllCate: [],
            goodsList: [],
            plus: {},
            page: 1,
            currSize: 0,
            pageSize: 10,
        }
    },
    components: {},
    methods: {
        //购买Plus
        async BuyPlus() {
            let WxAuth = this.$localstore.get('wx_user')
            let res = await this.$getRequest('/wechat/GetUserInfo', { union_id: WxAuth.union_id })
            if (res.data.code == 1 && res.data.data.tel_phone) {
                this.userInfo = res.data.data
                this.$localstore.set('wx_user', this.userInfo)
                this.$router.push({ name: 'VipOrder', query: { type: 2 } })
            } else {
                this.show = true
            }
        },
        goGoodsDetail(item) {
            this.$router.push({ name: 'CommodityDetails', query: { id: item.goods_id, type: 1 } })
        },
        goBack() {
            let from_url = this.$localstore.get('from_url')
            if (!from_url) {
                this.$router.push({ name: 'Index' })
            } else {
                this.$router.go(-1)
            }
        },
        //获取所有分类
        async getAllCate() {
            let res = await this.$getRequest('/home/GetAllCate')
            this.AllCate = res.data.data
            this.getGoodsList()
        },
        //获取所有权益
        async getVipList() {
            let res = await this.$getRequest('/plus/PlusEquityList')
            this.vip = res.data.data
            this.currVip = this.vip[0]
        },
        getVip(index) {
            this.currVip = this.vip[index]
            this.vipIndex = index
        },

        //获取分类下的商品
        async getGoodsList(index) {
            if (index) {
                this.index = index
            } else {
                this.index = 0
            }

            if (index) {
                var id = this.AllCate[index].c_id
            } else {
                var id = this.AllCate[0].c_id
            }
            this.cid = id
            let res = await this.$getRequest('/plus/PlusGoods', { cid: id, page: this.page })
            this.goodsList = res.data.data.list
            if (res.data.data.list) {
                this.currSize = res.data.data.list.length
            }
        },
        //获取更多商品
        async getGoodsListMore(cid) {
            let res = await this.$getRequest('/plus/PlusGoods', { cid: cid, page: this.page })
            let data = res.data.data.list
            this.goodsList = this.goodsList.concat(data);
            this.currSize = res.data.data.list.length
        },

        //获取PlUS
        async getPlUS() {
            let id = this.$route.query.id
            let res = await this.$getRequest('/home/GetPlus')
            this.plus = res.data.data
            if (this.user.status > 0) {
                this.wxRegister()
            }
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
                let url = 'http://' + window.location.host + '/#/VipEquity?share_id=' + this.user.user_id +
                    '&type=2'
                //微信分享到朋友圈
                wx.onMenuShareTimeline({
                    title: this.plus.title, // 分享标题, 请自行替换
                    link: url, // 分享链接，根据自身项目决定是否需要split
                    imgUrl: this.$imgUrl + this.plus.thumb, // 分享图标, 请自行替换，需要绝对路径
                    success() {
                        // 用户成功分享后执行的回调函数

                    },
                    cancel() {
                        // 用户取消分享后执行的回调函数

                    }
                });
                wx.onMenuShareAppMessage({
                    title: this.plus.title, // 分享标题, 请自行替换
                    desc: this.plus.desc, // 分享描述, 请自行替换
                    link: url, // 分享链接，根据自身项目决定是否需要split
                    imgUrl: this.$imgUrl + this.plus.thumb, // 分享图标, 请自行替换，需要绝对路径
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
        document.body.style.background = "#FBF9F2";
        let user = this.$localstore.get('wx_user')
        if (user) {
            this.user = user
        }
        let has_share = this.$localstore.session.get('has_share')
        this.share_id = this.$route.query.share_id
        if (has_share && has_share.query.share_id && has_share.name == "VipEquity") {
            this.share_id = has_share.query.share_id
        }
        this.getPlUS()
        this.getVipList()
        this.getAllCate()


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
                    this.getGoodsListMore(this.cid)
                }
            }
        }

    },

    // 挂载前状态
    beforeMount() {},

    // 挂载结束状态
    mounted() {
        var _this = this
        new Swiper('.swiper-container', {
            direction: 'horizontal',
            loop: true,
            autoplay: 5000,
            slidesPerView: 2,
            spaceBetween: 0.3,
            paginationClickable: true,
            centeredSlides: true,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            on: {
                slideChangeTransitionEnd: function() {
                    _this.vipIndex = this.realIndex;
                }
            }
        });
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
        background: #FF6666;
        border: 1px solid #FF6666;
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

.VipEquity {
    padding-bottom: 55px;
    height: 1000px;
}

.top {
    position: relative;

    .top-box {
        position: relative;
        top: -44px;
        z-index: -1;
        padding-bottom: 20px;

        .center-box {
            padding: .3rem .4rem;
            position: absolute;

            .vip-icon {
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    position: relative;
                    top: 30px;
                    width: 1rem;
                }
            }

            .card {
                width: 100%;
                height: 150px;
                border-radius: 10px;
            }
        }
    }
}

.title {
    position: relative;
    top: 40px;
    margin-top: 30px;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 160px;
    }
}

.tab-box {
    width: 100%;
    overflow-x: scroll;

    .tab {
        margin-top: 50px;
        white-space: nowrap;
        width: auto;
        box-sizing: border-box;

        li {
            display: inline-block;

            &.active {
                border-bottom: 2px solid #7C5628;
            }

            .item {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: .2rem;

                img {
                    width: 55px;
                }

                p {
                    color: #7C5628;
                }
            }



        }

    }
}

.tab-list {
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

.activity_list {
    ul {
        li {
            background: #fff;
            padding-top: .2rem;
            margin-bottom: .2rem;

            .img {
                margin: 0 .2rem;
                height: 3rem;
                background: #ccc;
                border-radius: 5px;
                position: relative;

                img {
                    height: 3rem;
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

            .share {
                display: flex;

                .price {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    padding-bottom: .4rem;
                    justify-content: flex-start;
                    padding-left: .46rem;

                    span {
                        color: #515C6F;
                        font-size: .28rem;
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
</style>
<style lang="scss">
#swiper .swiper-container {
    margin-top: 20px;
    width: 100%;
    height: 100%;
    position: static;
    background: none;
}

#swiper .swiper-slide {
    background: #fff;
    transition: 300ms;
    padding: .2rem .1rem;
    color:#333;
    .tip {
        margin-left:5px;
        i {
            display:inline-block;
            width: 2px;
            height: 2px;
            padding:2px;
            margin-right:8px;
            border-radius: 50%;
            background: #FFD524;

        }

    }

}

#swiper .swiper-wrapper {
    position: static;
}

#swiper .swiper-container .swiper-wrapper .swiper-slide {
    width: 6.62rem;
    height: 240px;
    border-radius: 10px;
    background-color: #fff;

}

#swiper .swiper-slide:not(.swiper-slide-active) {
    transform: scale(0.8);
}
</style>