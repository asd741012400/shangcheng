<template>
    <div class="VipEquity">
        <!--         <header>
            <div class="icon_return" @click="goBack"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">会员权益</div>
            <div class="add"></div>
        </header> -->
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
                        <ul class="tab" ref="tab">
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
                                    <!-- <span class="tip"><i></i><span>{{item.name}}</span></span> -->
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
                                            <p class="clip">{{item.goods_name}}</p>
                                            <span>已售　{{item.sale_num}}/{{parseInt(item.store)}}</span>
                                        </div>
                                        <div class="share">
                                            <div class="price">
                                                <span v-if="item.is_vip == 0">现价</span>
                                                <b v-if="item.is_vip == 0">￥{{item.goods_price}}</b>
                                                <a>￥{{item.mkt_price}}</a>
                                            </div>
                                        </div>
                                    </router-link>
                                </li>
                            </ul>
                            <loadMore ref="loadMore"></loadMore>
                        </div>
                        <div class="buyVip">
                            <template v-if="user.status >= 1">
                                <router-link :to="{name:'VipPlus'}">
                                    <van-button round block type="info">邀请好友赚 ￥{{money || 0}}</van-button>
                                </router-link>
                            </template>
                            <template v-else>
                                <template v-if="share_id">
                                    <van-button round block type="info" @click="BuyPlus">立即开通 ￥{{plus.sale_price}}</van-button>
                                </template>
                            </template>
                        </div>
                        <BindPhone :type="type" ref="bindPhone"></BindPhone>
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
            type: 2,
            show: false,
            firstEnter: false,
            user: {
                user_id: '',
                tel_phone: '',
                status: 0
            },
            index: 0,
            money: '',
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
            mySwiper: '',
            scroll: '',
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

                let WxAuth = this.$localstore.get('wx_user')
                let postData = {
                    order_type: 2,
                    share_id: this.share_id,
                    goods_id: this.plus.setting_id,
                    // goods_title: this.plus.name,
                    // goods_img: this.plus.thumb,
                    union_id: WxAuth.union_id,
                    is_wechat: 1,
                    order_num: 1,
                    // amount: this.plus.sale_price,
                    // total_amount: this.plus.sale_price
                }

                let result = await this.$postRequest('/order/AddOrder', postData)
                if (result.data.code == 1) {
                    this.$router.replace({ name: 'VipOrder', query: { id: result.data.data } })
                } else {
                    this.$message(result.data.msg)
                }

            } else {
                this.$refs.bindPhone.showBind(true)
            }
        },
        //推广赚
        async getMoney() {
            let res = await this.$postRequest('/store/GetLevel', { user_id: this.user.user_id })
            this.money = res.data.data
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
            let NavList = this.$localstore.session.get('NavList')
            let AllCate = this.$localstore.session.get('AllCate')
            if (NavList && AllCate) {
                this.AllCate = AllCate
            } else {
                const id = this.$route.query.id;
                let res = await this.$getRequest('home/GetAllCate')
                let resData = res.data.data
                this.AllCate = [{
                    c_id: 0,
                    c_name: "全部"
                }]
                this.AllCate = this.AllCate.concat(resData);
                this.$localstore.session('AllCate', this.AllCate)
            }
            this.getGoodsList()
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
            this.currVip = this.vip[0]
        },
        //获取当前权益
        getVip(index) {
            this.currVip = this.vip[index]
            this.vipIndex = index
            this.mySwiper.slideTo(index, 1000)
            if (this.vipIndex > 3) {
                this.$refs.tab.scrollLeft = 500;
            } else {
                this.$refs.tab.scrollLeft = 0;
            }
        },
        //获取分类下的商品
        async getGoodsList(index) {
            this.$Indicator.open({ spinnerType: 'fading-circle' });
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
            this.currSize = res.data.data.list.length
            this.pageSize = res.data.data.count
            this.$Indicator.close();
        },
        //获取更多商品
        async getGoodsListMore(cid) {
            this.$Indicator.open({ spinnerType: 'fading-circle' });
            let res = await this.$getRequest('/plus/PlusGoods', { cid: cid, page: this.page })
            let data = res.data.data.list
            this.goodsList = this.goodsList.concat(data);
            this.currSize = res.data.data.list.length
            if (this.currSize >= this.pageSize) {
                this.$refs.loadMore.hideTip()
            } else {
                this.$refs.loadMore.showTip()
            }
            this.$Indicator.close();
        },
        //获取PlUS
        async getPlUS() {
            if (this.user.status > 0) {
                this.wxRegister()
            }
            let plus = this.$localstore.session.get('plus')
            if (plus) {
                this.plus = plus
            } else {
                let res = await this.$getRequest('/home/GetPlus')
                this.plus = res.data.data
                this.$localstore.session('plus', this.plus)
            }
        },
        // 用于微信JS-SDK回调
        async wxRegister() {
            wx.ready(() => {
                let url = this.$HOME_URL + '/?#/VipEquity?share_id=' + this.user.user_id +
                    '&type=2'
                // url = this.$HOME_URL + '/redirect.html?app3Redirect=' + encodeURIComponent(url)
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
        //每次进入自动计算用户金额
        async check(index) {
            let user = this.$localstore.get('wx_user')
            let union_id = ''
            if (user && user.union_id) {
                union_id = user.union_id
            }
            let res = await this.$getRequest('/home/AutoCount', { union_id: union_id })
        },
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        document.title = "会员权益"
        document.body.style.background = "#FBF9F2";
        let user = this.$localstore.get('wx_user')
        if (user) {
            this.user = user
        }
        let has_share = this.$localstore.session.get('has_share')
        this.share_id = this.$route.query.share_id
        //用户分享
        if (has_share && has_share.query.share_id && has_share.name == "VipEquity") {
            this.share_id = has_share.query.share_id
        }
        //店铺分享
        if (has_share && has_share.query.type == 4) {
            this.share_id = has_share.query.share_id
        }

        this.getPlUS()
        this.getMoney()
        this.getVipList()
        this.getAllCate()
        //每次进入自动计算用户金额
        this.check()


    },

    // 挂载前状态
    beforeMount() {},

    // 挂载结束状态
    mounted() {

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

        var _this = this
        this.mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            // loop: true,
            autoplay: 5000,
            slidesPerView: 1.35,
            // spaceBetween: 0.1,
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
                    /*滑动到指定索引的导航节点，并将其显示在可视区*/
                    if (_this.vipIndex > 3) {
                        _this.$refs.tab.scrollLeft = 500;
                    } else {
                        _this.$refs.tab.scrollLeft = 0;
                    }
                }
            }
        });


    },

    // 更新前状态
    beforeUpdate() {},

    // 更新完成状态
    updated() {},

    // 销毁前状态
    beforeDestroy() {
        this.$refs.loadMore.hideTip()
        window.onscroll = null
    },

    // 销毁完成状态
    destroyed() {}

}
</script>
<style lang="scss" scoped>
.buyVip {
    position: fixed;
    // bottom: 100px;
    bottom: 1.65rem;
    padding: 0 0.8rem;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;

    .van-button--info {
        background: #FF6666;
        border: 1px solid #FF6666;
    }

    .van-button--block {
        width: 100%;

        span {
            font-size: 0.32rem;
            font-weight: bold;
        }
    }
}

// header {
//     height: .6rem;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin: 0 auto;
//     padding-top: .3rem;
//     padding-bottom: .2rem;
//     background: #FFFFFF;

//     // position: fixed;
//     // top: 0;
//     // left: 0;
//     // width: 100%;
//     .icon_return {
//         width: 1rem;
//         height: 1rem;
//         display: flex;
//         align-items: center;
//         justify-content: flex-start;
//         position: absolute;
//         left: .4rem;
//         z-index: 100;

//         span {
//             overflow: hidden;
//             width: .27rem;
//         }
//     }

//     .tel {
//         color: #515C6F;
//         font-weight: bold;
//         font-size: .32rem;
//         text-align: center;
//     }

// }

.VipEquity {
    padding-bottom: 55px;
    min-height: 1200px;
    -webkit-overflow-scrolling: touch;
}

.top {
    position: relative;

    .top-box {
        // position: relative;
        // top: -44px;
        z-index: -1;
        padding-bottom: 0.20rem;

        >img {
            position: absolute;
            top: -0.94rem;
            z-index: -1;
        }

        .center-box {
            padding: .1rem .4rem;
            // position: absolute;
            // top: 20px;

            .vip-icon {
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    position: relative;
                    top: 0.4rem;
                    width: 1rem;
                }
            }

            .card {
                width: 100%;
                height: auto;
                border-radius: 10px;
            }
        }
    }
}

.title {
    position: relative;
    // top: 0.73rem;
    margin-top: 0.2rem;
    width: 100%;
    // height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 2.43rem;
    }
}

.tab-box {
    width: 100%;
    -webkit-overflow-scrolling: touch;
    overflow-x: auto;

    .tab {
        width: 100%;
        margin-top: 0.2rem;
        white-space: nowrap;
        width: auto;
        box-sizing: border-box;
        padding-left: .5rem;
        -webkit-overflow-scrolling: touch;
        overflow-y: hidden;
        overflow-x: auto;
        transition: .3s all;

        &::-webkit-scrollbar {
            display: none;
        }

        li {
            display: inline-block;
            margin-right: 0.15rem;

            &.active:after {
                content: '';
                display: block;
                width: .5rem;
                margin: 0 auto;
                height: 2px;
                background: #FFD524;
                margin-top: -5px;
            }

            .item {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: .2rem;

                img {
                    width: 1rem;
                    float: none;
                    margin-bottom: 0.1rem;
                }

                p {
                    font-size: 0.24rem;
                    color: #6B400D;
                }
            }

        }

    }
}

.tab-list {
    white-space: nowrap;
    width: 100%;
    overflow-x: scroll;
    margin: .2rem .33rem 0 .55rem;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
        display: none;
    }


    li {
        display: inline-block;
        margin-right: .3rem;
        height: .6rem;

        span {
            margin-top: 0.05rem;
            overflow: hidden;
            height: 2px;
            background-color: #ffe29f;
            border-radius: 2px;
            display: block;
            opacity: 0;
        }

        p {
            font-size: 0.24rem;
            color: #6B400D;
            padding-top: .1rem;
        }
    }

    .active {
        span {
            opacity: 1;
        }

        p {
            // color: #ffe29f;
        }
    }
}

.activity_list {
    margin-top: 0.2rem;
    padding-bottom: 0.6rem;

    ul {
        -webkit-overflow-scrolling: touch;

        li {
            background: #fff;
            padding-top: .2rem;
            margin-bottom: .2rem;
            padding-bottom: .2rem;

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

                div {
                    // width: 2.48rem;
                    background: linear-gradient(269deg, rgba(255, 102, 102, 1) 0%, rgba(255, 179, 137, 1) 100%);
                    border-radius: 0px 20px 20px 0px;
                    position: absolute;
                    bottom: -.12rem;
                    display: flex;
                    align-items: center;
                    height: .62rem;
                    // justify-content: center;
                    color: #fff;
                    padding: 0 0.3rem 0 0.28rem;

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
                padding: .3rem .2rem 0.1rem;
                font-size: 0.3rem;

                p {
                    flex: 1;
                    width: 3rem;
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
                    display: flex;
                    align-items: baseline;
                    // padding-bottom: .2rem;
                    justify-content: flex-start;
                    padding-left: .46rem;
                    color: #515C6F;

                    span {
                        color: #515C6F;
                    }

                    b {
                        font-weight: normal;
                        font-size: .32rem;
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
    padding-right: 1.8rem;
}

#swiper .swiper-slide {
    background: #fff;
    transition: 300ms;
    // padding: .2rem .1rem;
    color: #333;
    box-shadow: 0 7px 8px 0 rgba(7, 17, 27, 0.15);
    margin-bottom: 10px;

}

#swiper .swiper-wrapper {
    position: static;
    margin-left: -20px;
}

#swiper .swiper-container .swiper-wrapper .swiper-slide {
    // width: 6.62rem;
    border-radius: 10px;
    background-color: #fff;

}

#swiper .swiper-slide:not(.swiper-slide-active) {
    transform: scale(0.8);
}
</style>