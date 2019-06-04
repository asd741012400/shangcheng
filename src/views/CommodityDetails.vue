<template>
    <div class="CommodityDetails" id="goods">
        <div class="top" v-show="toFixed">
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <header>
                <p :class="active == 1 ? 'active' : ''" @click="handleActive(1)">
                    <span>产品</span>
                    <em></em>
                </p>
                <p :class="active == 2 ? 'active' : ''" @click="handleActive(2)">
                    <span>评价</span>
                    <em></em>
                </p>
                <p :class="active == 3 ? 'active' : ''" @click="handleActive(3)">
                    <span>详情</span>
                    <em></em>
                </p>
            </header>
        </div>
        <div class="banner" id="main">
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item,index) in GoodsDetail.def_pic" :key="index">
                    <img :src="$imgUrl+item" alt="">
                </van-swipe-item>
            </van-swipe>
            <!--             <span></span>
            <div class="text" v-show="GoodsDetailsState == 1">
                <yd-countdown slot="right" :time="changeTime(GoodsDetail.sale_etime)">
                    <p>距离活动结束还有<em></em><b><em>{%d0}{%d1}{%d2}</em></b><em>天</em></b><b><em>{%h1}{%h2}</em></b><em>时</em><b><em>{%m1}{%m2}</em></b><em>分</em><b><em>{%s1}{%s2}</em></b><em>秒</em></p>
                </yd-countdown>
            </div>
            <div class="text" v-show="GoodsDetailsState == 5">
                <yd-countdown slot="right" :time="changeTime(GoodsDetail.sale_stime)">
                    <p>距离活动开始还有<em></em><b><em>{%d0}{%d1}{%d2}</em></b><em>天</em></b><b><em>{%h1}{%h2}</em></b><em>时</em><b><em>{%m1}{%m2}</em></b><em>分</em><b><em>{%s1}{%s2}</em></b><em>秒</em></p>
                </yd-countdown>
            </div> -->
        </div>
        <div class="main">
            <div class="project_title">
                <h3>{{GoodsDetail.goods_name}}</h3>
                <div class="price">
                    <div class="vip_price">
                        <em>会员价</em>
                        <i>￥</i>
                        <a>{{cost_price}}</a>
                    </div>
                    <b v-if="GoodsDetail.is_vip == 0">现价￥{{goods_price}}</b>
                    <p>市场价<span>￥{{mkt_price}}</span></p>
                </div>
                <div v-show="limit_num >= 1" class="purchase_limitation">限购{{limit_num}}份</div>
                <div class="select">
                    <div class="select-item" :class="attrActive == ii ? 'active' : ''" @click="changeAttr(ii)" v-for="(vv,ii) in  GoodsDetail.goods_attr" :key="ii">
                        <h4>{{vv.attr_name}}</h4>
                        <div class="footer-box">
                            <div class="left">
                                <span class="price1">会员价￥{{vv.attr_vip_price}}</span>
                                <span v-if="GoodsDetail.is_vip == 0" class="price2">现价￥{{vv.attr_price}}</span>
                                <!-- <del class="price3">￥{{mkt_price}}</del> -->
                            </div>
                            <div class="right">
                                <!-- <span class="btn">选择</span> -->
                            </div>
                        </div>
                    </div>
                    <!-- <span @click="changeAttr(ii)" v-for="(vv,ii) in  GoodsDetail.goods_attr" :key="ii" :class="attrActive == ii ? 'active' : ''">{{vv.attr_name}}</span> -->
                </div>
            </div>
            <div class="attention">
                <h3>购买须知</h3>
                <div class="detail" ref="detail" v-html="GoodsDetail.buy_things">
                </div>
            </div>
            <div class="shop">
                <h3>使用门店</h3>
                <ul>
                    <li v-for="(item,index) in storeList" :key="index" v-if="index<2">
                        <div class="del">
                            <router-link :to="{name:'ShopDetails',query:{store_id:item.business_id}}">
                                <div class="tle">
                                    <h4>{{item.business_name}}</h4>
                                    <div>
                                        <span v-for="(item,index) in getLevel(item)"><img src="../assets/icon_enshrineA.png" alt=""></span>
                                        <span v-for="(item,index) in 5-getLevel(item)"><img src="../assets/icon_enshrineB.png" alt=""></span>
                                    </div>
                                </div>
                                <div class="timer">
                                    <!--                          <p>营业时间：{{item.sale_time}}</p>
                                        <p>{{item.sale_time2}}</p> -->
                                    <a>营业时间</a>：
                                    <p>
                                        <span>{{item.sale_time}}</span>
                                        <span>{{item.sale_time2}}</span>
                                    </p>
                                </div>
                                <div class="site">
                                    <i><img src="../assets/icon_site.png" alt=""></i>
                                    <p>地点：{{item.address}}</p>
                                </div>
                                <div class="tel"><span><img src="../assets/icon_tel.png" alt=""></span></div>
                            </router-link>
                        </div>
                        <div class="advance">
                            <span>
                                    <router-link :to="{name:'ShopDetails',query:{store_id:item.business_id}}">
                                        <img src="../assets/icon_advance.png" alt="">
                                    </router-link>
                                </span>
                        </div>
                    </li>
                    <li v-for="(item,index) in storeList" :key="index" v-if="index >= 2 && showMore">
                        <div class="del">
                            <router-link :to="{name:'ShopDetails',query:{store_id:item.business_id}}">
                                <div class="tle">
                                    <h4>{{item.business_name}}</h4>
                                    <div>
                                        <span v-for="(item,index) in getLevel(item)"><img src="../assets/icon_enshrineA.png" alt=""></span>
                                        <span v-for="(item,index) in 5-getLevel(item)"><img src="../assets/icon_enshrineB.png" alt=""></span>
                                    </div>
                                </div>
                                <div class="timer">
                                    <a>营业时间：</a>
                                    <p>
                                        <span>{{item.sale_time}}</span>
                                        <span>{{item.sale_time2}}</span>
                                    </p>
                                </div>
                                <div class="site">
                                    <i><img src="../assets/icon_site.png" alt=""></i>
                                    <p>地点：{{item.address}}</p>
                                </div>
                                <div class="tel"><span><img src="../assets/icon_tel.png" alt=""></span></div>
                            </router-link>
                        </div>
                        <div class="advance">
                            <span>
                                    <router-link :to="{name:'ShopDetails',query:{store_id:item.business_id}}">
                                        <img src="../assets/icon_advance.png" alt="">
                                    </router-link>
                                </span>
                        </div>
                    </li>
                    <li class="more" v-if="!$validatenull(storeList) && storeList.length > 2" @click="handlwMore">
                        <van-icon v-if="!showMore" name="arrow-down" />
                        <van-icon v-else name="arrow-up" />
                    </li>
                </ul>
            </div>
            <div class="comment" id="comments">
                <h3>
                        <p>用户评价</p>
                        <router-link :to="{name:'CommentMore',query:{id:$route.query.id,type:1}}">
                            查看全部 &gt;
                        </router-link>
                    </h3>
                <div class="user_comment" v-for="(item,index) in comments" v-if="index < 3">
                    <div class="user">
                        <div class="user_message">
                            <i>
                                 <template v-if="item.anonymous == 0">
                                    <img :src="item.wechat_img" alt="" />
                                </template>
                            </i>
                            <div class="user_name">
                                <p v-if="item.anonymous == 1">匿名</p>
                                <p v-else>{{item.user_name}}</p>
                                <time>{{item.add_time}}</time>
                            </div>
                        </div>
                        <div class="grade">
                            <span v-for="(item,index) in Number(item.star_level)"><img src="../assets/icon_enshrineA.png" alt=""></span>
                            <span v-for="(item,index) in 5-Number(item.star_level)"><img src="../assets/icon_enshrineB.png" alt=""></span>
                        </div>
                    </div>
                    <div class="text">{{item.content}}</div>
                    <ul v-if="item.thumb[0] !== ''">
                        <li v-for="img in item.thumb">
                            <span><img :src="$imgUrl+img" alt=""></span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="shop_del" id="details">
                <h3>商品详情</h3>
                <div class="detail" ref="detail" v-html="GoodsDetail.goods_info">
                </div>
                <div v-if="GoodsDetail.goods_info" style="text-align: center;margin: 5px 0;background: #fff;">
                    <p>没有更多了</p>
                </div>
            </div>
        </div>
        <footer>
            <ul>
                <li @click="goHome">
                    <span><img src="../assets/1.png" alt=""></span>
                    <p>商城首页</p>
                </li>
                <li @click="collectGoods()">
                    <template v-if="isCollect">
                        <span><img src="../assets/collect1.png" alt=""></span>
                    </template>
                    <template v-else>
                        <span><img src="../assets/collect.png" alt=""></span>
                    </template>
                    <p>我要收藏</p>
                </li>
            </ul>
            <!-- 可购买状态 -->
            <div class="btn" v-show="GoodsDetailsState == 1">
                <div class="share" @click="shareShowFn">
                    <span>分享好友</span>
                    <!-- <p>分享赚</p> -->
                </div>
                <div class="buy" @click="ConfirmAnOrderPage"><span>立即购买</span></div>
            </div>
            <div class="btn" v-show="GoodsDetailsState == 7">
                <div class="share" @click="shareShowFn">
                    <span>分享好友</span>
                    <!-- <p>分享</p> -->
                </div>
                <div class="buy" @click="ConfirmAnOrderPage"><span>立即领取</span></div>
            </div>
            <div class="btn" v-show="GoodsDetailsState == 2">
                <div class="buy_null"><span>已售罄</span></div>
            </div>
            <div class="btn" v-show="GoodsDetailsState == 3">
                <div class="buy_null"><span>已下架</span></div>
            </div>
            <div class="btn" v-show="GoodsDetailsState == 4">
                <div class="vip_share" @click="shareShowFn">分享</div>
                <div class="vip_buy" @click="goPlus"><span>了解会员</span>
                    <p>（限会员购买）</p>
                </div>
            </div>
            <div class="btn" v-show="GoodsDetailsState == 5">
                <div class="buy_null">
                    <span>等待开售</span>
                    <yd-countdown slot="right" :time="changeTime(GoodsDetail.sale_stime)">
                        <p><b>{%d0}{%d1}{%d2}</b>天</b><b>{%h1}{%h2}</b>时<b>{%m1}{%m2}</b>分<b>{%s1}{%s2}</b>秒</p>
                    </yd-countdown>
                </div>
            </div>
            <div class="btn" v-show="GoodsDetailsState == 6">
                <div class="buy_null"><span>售卖截止</span></div>
            </div>
            <!-- </div> -->
        </footer>
        <Share :goods-id="GoodsDetail.goods_id" type="1" :money="GoodsDetail.dist_money" :shareurl="url" ref="myShare"></Share>
        <BindPhone :id="id" :type="type" :attr="attr_id" ref="bindPhone"></BindPhone>
    </div>
</template>
<script>
import Share from '../components/Share'
import wx from 'weixin-js-sdk'

export default {
    name: 'CommodityDetails',
    data() {
        return {
            url: '',
            GoodsDetailsState: 1,
            GoodsDetail: '',
            user: {
                status: 0
            },
            goods_price: 0,
            cost_price: 0,
            mkt_price: 0,
            limit_num: 0,
            attrActive: 0,
            store: '',
            attr_id: '',
            share_id: '',
            active: 1,
            table: 1,
            show: false,
            toFixed: false,
            showMore: false,
            isCollect: false,
            comments: [],
            storeList: [],
            type: '',
            id: '',
        }
    },
    components: {
        Share
    },
    methods: {
        handlwMore() {
            this.showMore = !this.showMore
        },
        //获取评分等级
        getLevel(item) {
            let num = item.star_level / item.comment_num
            if (num > 5) {
                return 5
            } else {
                return Math.ceil(num)
            }

        },
        //切换规格选择
        changeAttr(index) {
            this.attrActive = index
            this.attr_id = this.GoodsDetail.goods_attr[index].attr_id
            this.cost_price = this.GoodsDetail.goods_attr[index].attr_vip_price
            this.goods_price = this.GoodsDetail.goods_attr[index].attr_price
            // this.mkt_price = this.GoodsDetail.goods_attr[index].attr_dist_money
            this.limit_num = this.GoodsDetail.goods_attr[index].attr_limit_num
            this.store = this.GoodsDetail.goods_attr[index].attr_store
            this.calcStatus()
        },
        async collectGoods() {
            let data = {
                user_id: this.user.user_id,
                product_id: this.id,
                product_type: 1,
            }
            let res = await this.$postRequest('/user/AddCollect', data)
            this.isCollect = !this.isCollect
        },
        goHome() {
            this.$router.push({ name: 'Index' })
        },
        //切换顶部导航
        handleActive(index) {
            this.active = index
            if (index == 1) {
                document.getElementById("goods").scrollIntoView();
            } else if (index == 2) {
                this.$ScrollTop(0, 10)
                document.getElementById("comments").scrollIntoView();
                // 距离顶部距离
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                this.$ScrollTop(scrollTop - 20, 30)
            } else {
                this.table = 2
                this.$ScrollTop(0, 10)
                document.getElementById("details").scrollIntoView();
                // 距离顶部距离
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                this.$ScrollTop(scrollTop - 20, 30)
            }
        },
        goPlus() {
            this.$router.push({ name: 'VipEquity' })
        },
        changeTime(date) {
            return this.$dayjs(date).format('YYYY/MM/DD HH:mm:ss')
        },
        shareShowFn() {
            this.$refs.myShare.shareShowFn();
        },
        //确认下单
        async ConfirmAnOrderPage() {
            let WxAuth = this.$localstore.get('wx_user')
            if (!WxAuth.tel_phone) {
                this.$refs.bindPhone.showBind(true)
                return false
            }

            if (!this.GoodsDetail) {
                return false
            }

            if (this.store == 0) {
                this.$message('该商品库存不足！')
                return false
            }

            if (!this.attr_id) {
                if (!this.$validatenull(this.GoodsDetail.goods_attr) && this.GoodsDetail.goods_attr.length > 0) {
                    this.attr_id = this.GoodsDetail.goods_attr[0].attr_id
                }
            }


            this.$router.push({
                path: 'ConfirmAnOrder',
                query: {
                    id: this.$route.query.id,
                    order_type: 1,
                    attr_id: this.attr_id
                }
            })

        },
        //定时器判断 商品是否截止销售
        timer() {
            let that = this
            setInterval(() => {
                this.calcStatus()
                this.$Indicator.close();
            }, 1000)
        },
        //计算状态
        calcStatus() {
            let that = this
            let start_time = this.$dayjs().isBefore(this.$dayjs(this.GoodsDetail.sale_stime).format('YYYY/MM/DD HH:mm:ss'));
            if (start_time) {
                that.GoodsDetailsState = 5
            }
            let end_time = this.$dayjs().isAfter(this.$dayjs(this.GoodsDetail.sale_etime).format('YYYY/MM/DD HH:mm:ss'));
            if (end_time) {
                that.GoodsDetailsState = 6
            }

            if (!start_time && !end_time) {
                if (that.store == 0) {
                    that.GoodsDetailsState = 2
                } else if (that.GoodsDetail.is_online == 0) {
                    that.GoodsDetailsState = 3
                } else if (that.GoodsDetail.is_vip == 1 && that.user.status == 0) {
                    that.GoodsDetailsState = 4
                } else {
                    that.GoodsDetailsState = 1
                }
            }
        },
        //获取详情
        async getDetail() {
            this.$Indicator.open({ spinnerType: 'fading-circle' });
            let data = { id: this.$route.query.id, user_id: this.user.user_id }
            let res = await this.$getRequest('/home/GetGoodsDetail', data)
            if (res.data.code == 1) {
                this.GoodsDetail = res.data.data;
                document.title = this.GoodsDetail.goods_name
                this.cost_price = this.GoodsDetail.cost_price
                this.goods_price = this.GoodsDetail.goods_price
                this.mkt_price = this.GoodsDetail.mkt_price
                this.limit_num = this.GoodsDetail.limit_num
                this.store = this.GoodsDetail.store

                if (!this.$validatenull(this.GoodsDetail.goods_attr) && this.GoodsDetail.goods_attr.length > 0) {
                    this.attr_id = this.GoodsDetail.goods_attr[0].attr_id
                    this.cost_price = this.GoodsDetail.goods_attr[0].attr_vip_price
                    this.goods_price = this.GoodsDetail.goods_attr[0].attr_price
                    this.limit_num = this.GoodsDetail.goods_attr[0].attr_limit_num
                    this.store = this.GoodsDetail.goods_attr[0].attr_store
                }

                this.isCollect = Boolean(res.data.data.is_coolect);

                //文章详情表格处理
                this.$nextTick(() => {
                    if (this.$validatenull(this.$refs.detail.children)) {
                        return false
                    }
                    let arr = Array.from(this.$refs.detail.children)
                    if (!this.$validatenull(arr)) {
                        arr.forEach(item => {
                            if (item.nodeName == 'TABLE') {
                                item.style.width = '100%'
                            }
                        })
                    }
                })


                this.wxRegister()
                this.$Indicator.close();
                //动态计算商品过期时间
                this.calcStatus()
                this.timer();

            }
        },
        //获取评论
        async getComment() {
            let res = await this.$getRequest('/comment/GetComments', { goods_id: this.$route.query.id, type: 1, user_id: this.user.user_id })
            this.comments = res.data.data.list;
        },
        //获取门店
        async getStore() {
            let res = await this.$getRequest('/home/GetGoodsStore', { goods_id: this.$route.query.id })
            this.storeList = res.data.data;
        },

        // 用于微信JS-SDK回调
        async wxRegister() {
            let user = this.$localstore.get('wx_user')
            if (user) {
                this.user = user
            }
            wx.ready(() => {
                this.url = this.$HOME_URL + '/?#/CommodityDetails?share_id=' + this.user.user_id +
                    '&type=1&id=' + this.id
                let img = this.GoodsDetail.dist_poster || this.GoodsDetail.def_pic[0]
                // this.url = this.$HOME_URL + '/redirect.html?app3Redirect=' + encodeURIComponent(this.url)

                //微信分享到朋友圈
                wx.onMenuShareTimeline({
                    title: this.GoodsDetail.goods_name, // 分享标题, 请自行替换
                    link: this.url, // 分享链接，根据自身项目决定是否需要split
                    imgUrl: this.$imgUrl + img, // 分享图标, 请自行替换，需要绝对路径
                    success() {
                        // 用户成功分享后执行的回调函数

                    },
                    cancel() {
                        // 用户取消分享后执行的回调函数

                    }
                });

                var text = this.GoodsDetail.goods_info.replace(/<[^<>]+>/g, "");
                wx.onMenuShareAppMessage({
                    title: this.GoodsDetail.goods_name, // 分享标题, 请自行替换
                    desc: text, // 分享描述, 请自行替换
                    link: this.url, // 分享链接，根据自身项目决定是否需要split
                    imgUrl: this.$imgUrl + img, // 分享图标, 请自行替换，需要绝对路径
                    success() {
                        // 用户成功分享后执行的回调函数

                    },
                    cancel() {
                        // 用户取消分享后执行的回调函数

                    }
                })
            })

        },

        //滚动吸顶
        handleScroll() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            if (scrollTop > 320) {
                this.toFixed = true
            } else {
                this.toFixed = false
            }
        },

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        let user = this.$localstore.get('wx_user')
        if (user) {
            this.user = user
        }
        this.timeSatrt = 0
        this.id = this.$route.query.id
        this.type = this.$route.query.type



        this.getDetail()
        this.getComment()
        this.getStore()

        document.body.style.background = '#fff'

    },

    // 挂载前状态
    beforeMount() {},

    // 挂载结束状态
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },

    // 更新前状态
    beforeUpdate() {},

    // 更新完成状态
    updated() {},

    // 销毁前状态
    beforeDestroy() {
        document.title = "圈豆商城"
        // window.removeEventListener('scroll', null)
    },

    // 销毁完成状态
    destroyed() {}

}
</script>
<style lang="scss" scoped>
.CommodityDetails {
    // padding-top: 1.3rem;

    .icon_return {
        position: absolute;
        width: 1rem;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        // top: .3rem;
        top: 0;
        left: .2rem;

        span {
            width: .27rem;
            overflow: hidden;
        }
    }

    .top {
        position: fixed;
        top: 0;
        width: 100%;
        background: #fff;
        z-index: 999;
    }

    header {
        height: 1rem;
        display: flex;
        align-items: center;
        width: 3.5rem;
        justify-content: space-between;
        margin: 0 auto;
        // padding-top: .3rem;
        background: #fff;

        p {
            height: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
            justify-content: center;

            span {
                font-size: .28rem;
                color: #515C6F;
            }

            em {
                width: 100%;
                background: #FF6666;
                border-radius: 5px;
                height: .08rem;
                position: absolute;
                bottom: 0;
                display: none;
            }

            &.active {
                span {
                    color: #FF6666;
                }

                em {
                    display: block;
                }
            }
        }
    }

    .banner {
        position: relative;

        span {
            overflow: hidden;
            display: block;
        }

        .text {
            position: absolute;
            width: 100%;
            height: 1.04rem;
            background: rgba(0, 0, 0, 0.28);
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;

            p {
                font-size: .28rem;
                color: #fff;
                display: flex;
                align-items: center;

                em {
                    padding: 0 .12rem;
                    font-style: normal;
                }

                b {
                    font-weight: normal;
                    background: #fff;
                    color: #FF6666;
                    width: .7rem;
                    height: .44rem;
                    line-height: .44rem;
                    text-align: center;
                }
            }
        }
    }

    .main {
        padding-bottom: 1.16rem;
        background: #fff;

        .project_title {
            border-top: 10px solid #f6f6f6;

            h3 {
                padding-left: .56rem;
                padding-top: .26rem;
                font-size: .36rem;
                color: #515C6F;
                font-weight: bold;
            }

            .price {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding-top: .2rem;

                .vip_price {
                    padding-left: 0.56rem;
                    // width: 2.48rem;
                    background: linear-gradient(269deg, rgba(255, 102, 102, 1) 0%, rgba(255, 179, 137, 1) 100%);
                    border-radius: 0px 20px 20px 0px;
                    display: flex;
                    align-items: center;
                    // padding-left:0.15rem;
                    height: .62rem;
                    justify-content: center;
                    color: #fff;
                    padding-right: 0.2rem;

                    em {
                        font-size: .28rem;
                        font-style: normal;
                    }

                    i {
                        font-size: .32rem;
                        font-style: normal;
                    }

                    a {
                        color: #fff;
                        font-size: .34rem;
                    }
                }

                b {
                    font-weight: normal;
                    color: #515C6F;
                    font-size: .26rem;
                    margin-left: .26rem;
                }

                p {
                    color: #999;
                    font-size: .24rem;
                    margin-left: .26rem;

                    span {
                        text-decoration: line-through;
                    }
                }
            }

            .purchase_limitation {
                margin-left: .56rem;
                margin-top: .22rem;
                margin-bottom: .32rem;
                line-height: .46rem;
                border: 1px solid #FFB389;
                color: #FFB389;
                text-align: center;
                width: 1.34rem;
                text-align: center;
                border-radius: 15px;
                font-size: 0.24rem;
            }

            .select {
                padding: 0.1rem .2rem;
                background: #f6f6f6;

                .select-item {
                    margin: 5px 0;
                    padding: 0.1rem .38rem;
                    display: flex;
                    flex-direction: column;
                    // border: 1px solid #ddd;
                    width: 100%;
                    box-sizing: border-box;
                    background: #fff;

                    &.active {
                        border: 1px solid red;
                    }

                    h4 {
                        font-size: .32rem;
                        font-weight: 600;
                        word-break: break-all;
                        color: #515C6F;
                        // overflow: hidden;
                        // text-overflow: ellipsis;
                        // white-space: nowrap;
                        margin-bottom: 10px;
                    }

                    .footer-box {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;

                        .price1 {
                            color: red;
                            font-size: .3rem;
                            margin-right: 5px;
                        }

                        .price2 {
                            color: #666;
                            font-size: .26rem;
                            margin-right: 15px;
                        }

                        .price3 {
                            color: #666;
                            font-size: .25rem;
                            margin-right: 5px;
                        }

                        .btn {
                            display: block;
                            padding: .1rem .2rem;
                            border-radius: 10px;
                            color: #fff;
                            background: red;
                        }

                    }
                }
            }

        }

        .attention {
            h3 {
                line-height: .8rem;
                font-size: .28rem;
                color: #515C6F;
                font-weight: bold;
                padding-left: .6rem;
                border-bottom: 1px solid #f6f6f6;
            }

            .detail {
                padding: 0.2rem .6rem;
                background: #fff;
                display: inherit;
                opacity: 0.8;

                table {
                    width: 100% !important;
                }

                p {
                    display: block;
                    margin: 5px 0 !important;
                    -webkit-margin-before: 1em;
                    -webkit-margin-after: 1em;
                    -webkit-margin-start: 0px;
                    -webkit-margin-end: 0px;
                }


                img {
                    height: auto !important;
                    // margin: 5px 0;
                }
            }

            ul {
                padding: 0 .44rem .4rem .64rem;

                li {
                    padding-top: .2rem;

                    div {
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;

                        i {
                            width: .1rem;
                        }

                        span {
                            font-size: .24rem;
                            color: #FF6666;
                            padding-left: .14rem;
                        }
                    }

                    p {
                        font-size: .24rem;
                        color: #515C6F;
                        text-indent: 2em;
                        padding-top: .1rem;
                    }
                }
            }
        }

        .shop {
            border-top: 10px solid #f6f6f6;
            background: #fff;

            h3 {
                line-height: .8rem;
                font-size: .28rem;
                color: #515C6F;
                font-weight: bold;
                padding-left: .6rem;
                border-bottom: 1px solid #f6f6f6;
            }

            ul {
                padding: .22rem .2rem .52rem;

                li {
                    background: #f6f6f6;
                    border-radius: 5px;
                    display: flex;
                    overflow: hidden;
                    padding-left: .42rem;
                    margin-bottom: .1rem;
                    position: relative;

                    &.more {
                        display: flex;
                        justify-content: center;
                        background: #fff;

                        .van-icon {
                            font-size: .5rem;
                            color: #666;
                        }
                    }

                    .del {
                        flex: 1;
                        padding-top: .32rem;

                        .tle {
                            display: flex;
                            align-items: center;

                            h4 {
                                font-size: .24rem;
                                color: #515C6F;
                                font-weight: bold;
                            }

                            div {
                                display: flex;
                                padding-left: .2rem;

                                span {
                                    width: .23rem;
                                    overflow: hidden;
                                    padding-right: .12rem;
                                }
                            }
                        }

                        // .timer {
                        //     font-size: .24rem;
                        //     color: #999999;
                        //     padding-top: .12rem;
                        // }
                        .timer {
                            display: flex;
                            padding-top: .1rem;
                            font-size: .24rem;
                            color: #999999;

                            a {
                                // width: 1.2rem;
                                color: #999999;
                                display: inline-block;
                            }

                            p {
                                display: flex;
                                flex-direction: column;
                                vertical-align: bottom;
                            }
                        }

                        .site {
                            display: flex;
                            // align-items: center;
                            padding-bottom: .16rem;

                            i {
                                display: inline-block;
                                // overflow: hidden;
                                width: .18rem;

                                img {
                                    display: block;
                                    width: .18rem;
                                }
                            }

                            p {
                                padding-left: .12rem;
                                color: #999999;
                            }
                        }
                    }

                    .advance {
                        width: .58rem;
                        background: #c8c8c8;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        span {
                            width: .18rem;
                        }
                    }

                    .tel {
                        width: .8rem;
                        height: .8rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: absolute;
                        right: .6rem;
                        top: 0;

                        span {
                            overflow: hidden;
                            width: .3rem;
                        }
                    }
                }
            }
        }

        .comment {
            border-top: 10px solid #f6f6f6;
            background: #fff;

            h3 {
                height: .8rem;
                padding-left: .6rem;
                padding-right: .52rem;
                border-bottom: 1px solid #f6f6f6;
                display: flex;
                align-items: center;
                font-size: .28rem;
                color: #515C6F;
                font-weight: bold;

                p {
                    flex: 1;
                    font-size: .28rem;
                    color: #515C6F;
                    font-weight: bold;
                }

                a {
                    font-size: .24rem;
                    color: #999;
                }
            }

            .user_comment {
                padding: .2rem .66rem .34rem;
                border-bottom: 1px solid #f6f6f6;

                .user {
                    display: flex;


                    .user_message {
                        display: flex;
                        align-items: center;
                        flex: 1;

                        i {
                            overflow: hidden;
                            width: .68rem;
                            height: .68rem;
                            background: #C8C8C8;
                            border-radius: 50%;
                        }

                        .user_name {
                            padding-left: .2rem;

                            p {
                                font-size: .24rem;
                                color: #515C6F;
                            }

                            time {
                                font-size: .22rem;
                                color: #999999;
                            }
                        }
                    }

                    .grade {
                        display: flex;

                        span {
                            overflow: hidden;
                            width: .23rem;
                            padding-left: .1rem;
                        }
                    }
                }

                .text {
                    font-size: .24rem;
                    color: #515C6F;
                    padding: .3rem 0 .2rem;
                    display: -webkit-box;
                    word-break: break-all;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }

                ul {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;

                    li {
                        display: flex;
                        padding-right: .2rem;

                        span {
                            width: .88rem;
                            height: .88rem;
                            overflow: hidden;

                            img {
                                display: block;
                                width: 100%;
                                height: .88rem;
                                object-fit: cover
                            }
                        }
                    }

                    li:last-of-type {
                        padding-right: 0;
                    }
                }
            }

            .user_comment:last-of-type {
                border-bottom: 0;
            }
        }

        .shop_del {
            border-top: 10px solid #f6f6f6;
            background: #fff;

            .detail {
                padding: 0.2rem .3rem;
                background: #fff;
                display: inherit;
                // margin-bottom: 3.5rem;
                overflow: hidden;

                table {
                    width: 100% !important;
                }

                p {
                    display: block;
                    margin: 5px 0;
                    -webkit-margin-before: 1em;
                    -webkit-margin-after: 1em;
                    -webkit-margin-start: 0px;
                    -webkit-margin-end: 0px;

                    img {
                        height: auto !important;
                    }
                }

            }

            h3 {
                font-size: .28rem;
                color: #515C6F;
                font-weight: bold;
                line-height: .8rem;
                color: #515C6F;
                padding-left: .6rem;
                border-bottom: 1px solid #f6f6f6;
            }

            div {
                // height: 4.6rem;
                background: #C8C8C8;
            }
        }
    }

    footer {
        position: fixed;
        bottom: 0;
        // height: 1.16rem;
        height: 1rem;
        display: flex;
        background: #fff;
        width: 100%;

        ul {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 2.8rem;

            // flex: 1;
            li {
                display: flex;
                flex-direction: column;
                align-items: center;

                span {
                    // overflow: hidden;
                    display: block;

                    img {
                        width: .6rem;
                    }
                }

                p {
                    font-size: .24rem;
                    color: #727C8E;
                    padding-top: .08rem;
                }
            }
        }

        .btn {
            display: flex;
            align-items: center;
            justify-content: center;
            // width: 100%;
            // width: 4.6rem;
            height: 100%;
            flex: 1;

            .share {
                background: #FFB389;
            }

            .buy {
                background: #FF6666;
            }

            .vip_share {
                background: #FFB389;
                font-size: .32rem;
                font-weight: bold;
            }

            .vip_buy {
                background: #FF6666;

                p {
                    font-size: .24rem;
                }
            }

            .buy_null {
                background: #999999;
            }

            div {
                flex: 1;
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: center;
                height: 100%;
                color: #fff;

                span {
                    font-size: .32rem;
                    font-weight: bold
                }

                p {
                    font-size: .28rem;
                }
            }
        }
    }
}
</style>