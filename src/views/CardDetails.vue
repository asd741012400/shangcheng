<template>
    <div class="CardDetails" id="goods">
        <div class="top">
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
        <div class="banner">
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item,index) in CardDetail.def_pic" :key="index">
                    <img :src="$imgUrl+item" alt="">
                  </van-swipe-item>
            </van-swipe>
            <!-- <span><img src="../assets/img2.png" alt=""></span> -->
            <!-- <span><img :src="CardDetail.def_pic[0]" alt=""></span> -->
            <div class="text" v-show="cardDetailsState == 1">
                <yd-countdown slot="right" :time="changeTime(CardDetail.sale_etime)">
                    <p>距离活动结束还有<em></em><b><em>{%d0}{%d1}{%d2}</em></b><em>天</em></b><b><em>{%h1}{%h2}</em></b><em>时</em><b><em>{%m1}{%m2}</em></b><em>分</em><b><em>{%s1}{%s2}</em></b><em>秒</em></p>
                </yd-countdown>
            </div>
            <div class="text" v-show="cardDetailsState == 5">
                <yd-countdown slot="right" :time="changeTime(CardDetail.sale_stime)">
                    <p>距离活动开始还有<em></em><b><em>{%d0}{%d1}{%d2}</em></b><em>天</em></b><b><em>{%h1}{%h2}</em></b><em>时</em><b><em>{%m1}{%m2}</em></b><em>分</em><b><em>{%s1}{%s2}</em></b><em>秒</em></p>
                </yd-countdown>
            </div>
        </div>
        <div class="main">
            <div class="project_title">
                <h3>{{CardDetail.card_name}}</h3>
                <div class="price">
                    <div class="vip_price">
                        <em>会员价</em>
                        <i>￥</i>
                        <a>{{CardDetail.cost_price}}</a>
                    </div>
                    <b>非会员价￥{{CardDetail.card_price}}</b>
                    <p>市场价<span>￥{{CardDetail.mkt_price}}</span></p>
                </div>
            </div>
            <div class="attention">
                <h3>购买须知</h3>
                <div class="detail" v-html="CardDetail.buy_things">
                </div>
            </div>
            <div class="comment" id="comments">
                <h3>
            <p>用户评价</p>
                 <router-link :to="{name:'CommentMore',query:{id:$route.query.id,type:3}}">
            查看全部 &gt;
        </router-link>
          </h3>
                <div class="user_comment" v-for="item in comments">
                    <div class="user">
                        <div class="user_message">
                            <i>
                               <template v-if="item.anonymous == 0">
                                <img :src="item.wechat_img" alt="" />
                                </template>
                            </i>
                            <div class="user_name">
                                <template v-if="item.anonymous == 1">
                                    <p>匿名</p>
                                </template>
                                <template v-else>
                                    <p>{{item.username}}</p>
                                </template>
                                <time>{{item.add_time}}</time>
                            </div>
                        </div>
                        <div class="grade">
                            <van-rate v-model="item.star_level - 0" readonly />
                        </div>
                    </div>
                    <div class="text">{{item.content}}</div>
                    <ul>
                        <li v-for="img in item.thumb">
                            <span><img :src="$imgUrl+img" alt=""></span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="shop_del" id="details">
                <h3>
            <p :class="table == 1 ? 'active' : ''" @click="tabkeChage(1)">卡内商家</p>
            <p :class="table == 2 ? 'active' : ''" @click="tabkeChage(2)">卡片详情</p>
          </h3>
                <div v-if="table == 1">
                    <ul>
                        <li class="vip_price" v-for="item in projects" @click="goProject(item)">
                            <div class="img">
                                <span><img :src="$imgUrl +item.thumb_img" alt="" /></span>
                                <!--              <div>
                                    <p>会员价</p>
                                    <i>￥</i>
                                    <a>{{item.project_price}}</a>
                                </div> -->
                            </div>
                            <div class="project">
                                <p>{{item.project_name}}</p>
                                <!--            <span>报名　11/22</span> -->
                            </div>
                            <div class="share">
                                <div class="price">
                                    <span>价值</span>
                                    <b>￥{{item.project_price}}</b>
                                </div>
                                <div class="right">
                                    <span>畅玩</span>
                                    <b>多店通用</b>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-if="table == 2" class="shop_del_div">
                    <div v-html="CardDetail.goods_info">
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <ul>
                <li @click="goHome">
                    <span><img src="../assets/icon_shopA.png" alt=""></span>
                    <p>商城首页</p>
                </li>
                <!--          <li @click="collectGoods()">
                    <template v-if="isCollect">
                        <span><img src="../assets/icon_collectB.png" alt=""></span>
                    </template>
                    <template v-else>
                        <span><img src="../assets/icon_collectA.png" alt=""></span>
                    </template>
                    <p>我要收藏</p>
                </li> -->
            </ul>
            <!-- <div class="btn"> -->
            <!-- 可购买状态 -->
            <div class="btn" v-show="cardDetailsState == 1">
                <div class="share" @click="shareShowFn" v-if="this.CardDetail.is_dist == 1">
                    <span>分享好友</span>
                    <!-- <p>分享赚</p> -->
                </div>
                <div class="buy" @click="ConfirmAnOrderPage"><span>立即购买</span></div>
            </div>
            <div class="btn" v-show="cardDetailsState == 2">
                <div class="buy_null"><span>已售罄</span></div>
            </div>
            <div class="btn" v-show="cardDetailsState == 3">
                <div class="buy_null"><span>已下架</span></div>
            </div>
            <div class="btn" v-show="cardDetailsState == 4">
                <div class="vip_share" @click="shareShowFn">分享</div>
                <div class="vip_buy" @click="goPlus"><span>了解会员</span>
                    <p>（限会员购买）</p>
                </div>
            </div>
            <div class="btn" v-show="cardDetailsState == 5">
                <div class="buy_null"><span>等待开售</span></div>
            </div>
            <div class="btn" v-show="cardDetailsState == 6">
                <div class="buy_null"><span>售卖截止</span></div>
            </div>
            <!-- </div> -->
        </footer>
        <Share :goods-id="CardDetail.card_id" type="3" :money="CardDetail.dist_money" :shareurl="url" ref="myShare"></Share>
        <BindPhone :show="show" ref="bindPhone"></BindPhone>
    </div>
</template>
<script>
import Share from '../components/Share'
import wx from 'weixin-js-sdk'

export default {
    name: 'CardDetails',
    data() {
        return {
            apiUrl: this.$common.ApiUrl(),
            cardDetailsState: 1, //状态 1正常 2已售罄 3已下架 4会员购买 5还未开售 6售卖截止
            user: '',
            active: 1,
            table: 1,
            show: false,
            isCollect: false,
            CardDetail: '',
            comments: [],
            projects: [],
            countDownNum: 0,
            countDownArr: "",
            id: '',
            url: '',
        }
    },
    components: { Share },
    methods: {
        goProject(item) {
            this.$router.push({ name: 'CardProjectDetails', query: { project_id: item.project_id, card_id: this.id } })
        },
        async collectGoods() {
            let data = {
                user_id: this.user.user_id,
                product_id: this.id,
                product_type: 2,
            }
            let res = await this.$postRequest('/user/AddCollect', data)
            this.isCollect = !this.isCollect
        },
        goHome() {
            this.$router.push({ name: 'Index' })
        },
        goPlus() {
            this.$router.push({ name: 'VipEquity' })
        },
        handleActive(index) {
            this.active = index
            if (index == 1) {
                document.getElementById("goods").scrollIntoView();
            } else if (index == 2) {
                document.getElementById("comments").scrollIntoView();
            } else {
                this.table = 2
                document.getElementById("details").scrollIntoView();
            }
        },
        shareShowFn() {
            this.$refs.myShare.shareShowFn();
        },
        changeTime(date) {
            return this.$dayjs(date).format('YYYY/MM/DD HH:mm:ss')
        },
        tabkeChage(num) {
            const that = this;
            that.table = num;
        },
        //确认下单
        async ConfirmAnOrderPage() {
            let WxAuth = this.$localstore.get('wx_user')
            if (!WxAuth.tel_phone) {
                this.show = true
                return false
            }

            if (!this.CardDetail) {
                return false
            }

            const that = this;
            that.$router.push({
                name: "ConfirmAnOrder",
                query: {
                    id: that.id,
                    order_type: 3,
                    arrival: "CardDetails",
                }
            });
        },
        //定时器判断 商品是否截止销售
        timer() {
            let that = this
            setInterval(() => {
                let start_time = this.$dayjs().isBefore(this.$dayjs(this.CardDetail.sale_stime).format('YYYY/MM/DD HH:mm:ss'));
                if (start_time) {
                    that.cardDetailsState = 5
                }
                let end_time = this.$dayjs().isAfter(this.$dayjs(this.CardDetail.sale_etime).format('YYYY/MM/DD HH:mm:ss'));
                if (end_time) {
                    that.cardDetailsState = 6
                }

                if (!start_time && !end_time) {
                    if (that.CardDetail.store == 0) {
                        that.cardDetailsState = 2
                    } else if (that.CardDetail.is_online == 0) {
                        that.cardDetailsState = 3
                    } else if (that.CardDetail.is_vip == 1 && that.user.status == 0) {
                        that.cardDetailsState = 4
                    } else {
                        that.cardDetailsState = 1
                    }
                }

            }, 1000)
        },
        //获取卡片详情
        async getDetail() {
            let data = { id: this.$route.query.id }
            let res = await this.$getRequest('/home/GetCardDetail', data)
            if (res.data.code == 1) {
                this.CardDetail = res.data.data;
                this.isCollect = Boolean(res.data.data.is_coolect);
                if (this.CardDetail.is_dist == 1) {
                    this.wxRegister()
                }

                this.timer()
            }
        },
        //获取评论
        async getComment() {
            let res = await this.$getRequest('/comment/GetComments', { goods_id: this.$route.query.id, type: 3 })
            this.comments = res.data.data.list;
        },
        //获取卡片项目
        async GetCardProject() {
            let res = await this.$getRequest('/home/GetCardProject', { card_id: this.$route.query.id })
            this.projects = res.data.data;

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
                    title: this.cardDetailsState.share_title, // 分享标题, 请自行替换
                    link: this.url, // 分享链接，根据自身项目决定是否需要split
                    imgUrl: this.$imgUrl + this.cardDetailsState.dist_poster, // 分享图标, 请自行替换，需要绝对路径
                    success() {
                        // 用户成功分享后执行的回调函数

                    },
                    cancel() {
                        // 用户取消分享后执行的回调函数

                    }
                });
                wx.onMenuShareAppMessage({
                    title: this.cardDetailsState.share_title, // 分享标题, 请自行替换
                    desc: this.cardDetailsState.share_desc, // 分享描述, 请自行替换
                    link: this.url, // 分享链接，根据自身项目决定是否需要split
                    imgUrl: this.$imgUrl + this.cardDetailsState.dist_poster, // 分享图标, 请自行替换，需要绝对路径
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
        if (user) {
            this.user = user
        }
        this.id = this.$route.query.id
        this.url = 'http://' + window.location.host + '/#/CardDetails?share_id=' + this.user.user_id +
            '&type=3&id=' + this.$route.query.id

        this.getComment()
        this.getDetail()
        this.GetCardProject()
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
.van-rate__icon {
    font-size: 0.4rem !important;
}

.CardDetails {
    padding-top: 1.3rem;

    .icon_return {
        position: absolute;
        width: 1rem;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        top: .3rem;
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
        // position:fixed;
        // top:0;
        height: 1rem;
        display: flex;
        align-items: center;
        width: 3.5rem;
        justify-content: space-between;
        margin: 0 auto;
        padding-top: .3rem;
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
            color: #fff;
            // height: 6.16rem;
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

        .project_title {
            border-top: 10px solid #f6f6f6;
            padding-bottom: .32rem;

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
                    width: 2.48rem;
                    background: linear-gradient(269deg, rgba(255, 102, 102, 1) 0%, rgba(255, 179, 137, 1) 100%);
                    border-radius: 0px 20px 20px 0px;
                    display: flex;
                    align-items: center;
                    height: .62rem;
                    justify-content: center;
                    color: #fff;

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
                        font-size: .4rem;
                    }
                }

                b {
                    font-weight: normal;
                    color: #515C6F;
                    font-size: .28rem;
                    padding: 0 .28rem;
                }

                p {
                    color: #999;
                    font-size: .24rem;

                    span {
                        text-decoration: line-through;
                    }
                }
            }
        }

        .attention {
            border-top: 10px solid #f6f6f6;

            .detail {
                padding: 0.2rem .6rem;
                background: #fff;
                display: flex;

                img {
                    margin: 5px 0;
                }
            }

            h3 {
                line-height: .8rem;
                font-size: .28rem;
                color: #515C6F;
                padding-left: .6rem;
                border-bottom: 1px solid #f6f6f6;
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

                p {
                    font-size: .28rem;
                    color: #515C6F;
                    flex: 1;
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
                            overflow: hidden;
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
            margin-bottom: 2.5rem;

            h3 {
                font-size: .28rem;
                color: #515C6F;
                display: flex;
                align-items: center;
                justify-content: center;
                height: .82rem;
                border-bottom: .1rem solid #f6f6f6;

                p {
                    flex: 1;
                    text-align: center;
                    font-weight: bold;

                    &.active {
                        color: #FF6666;
                    }
                }
            }

            .shop_del_div {
                padding: 0.2rem .6rem;
                background: #fff;
            }

            div {
                ul {
                    li {
                        background: #fff;
                        padding-top: .2rem;
                        border-bottom: .22rem solid #F6F6F6;

                        &.vip_price {
                            .img {
                                margin: 0 .2rem;
                                height: 3rem;
                                background: #ccc;
                                border-radius: 5px;
                                position: relative;

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
                                        color: #FFF;
                                        font-size: .4rem;
                                    }
                                }
                            }

                            .project {
                                display: flex;
                                padding: .3rem .2rem;

                                p {
                                    flex: 1;
                                    color: #515C6F;
                                    padding-left: .28rem;
                                }

                                span {
                                    color: #FF6666;
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

                                .right {
                                    display: flex;
                                    flex-direction: column;
                                    text-align: right;
                                    margin-right: 10px;

                                    span {
                                        color: rgb(255, 102, 102)
                                    }

                                    b {
                                        color: #666;
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
        }
    }

    footer {
        position: fixed;
        bottom: 0;
        height: 1.16rem;
        display: flex;
        background: #fff;
        width: 100%;

        ul {
            display: flex;
            align-items: center;
            justify-content: space-around;
            flex: 1;

            li {
                display: flex;
                flex-direction: column;
                align-items: center;

                span {
                    overflow: hidden;
                    width: .5rem;
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
            width: 4.6rem;
            height: 100%;

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