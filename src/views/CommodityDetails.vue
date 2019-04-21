<template>
    <div class="CommodityDetails">
        <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
        <header>
            <p class="active">
                <span>宝贝</span>
                <em></em>
            </p>
            <p>
                <span>评价</span>
                <em></em>
            </p>
            <p>
                <span>详情</span>
                <em></em>
            </p>
        </header>
        <div class="banner">
            <span><img src="../assets/img2.png" alt=""></span>
            <div class="text">
                <yd-countdown slot="right" :time="changeTime(GoodsDetail.sale_etime)">
                    <p>距离活动结束还有<em></em><b><em>{%d0}{%d1}{%d2}</em></b><em>天</em></b><b><em>{%h1}{%h2}</em></b><em>时</em><b><em>{%m1}{%m2}</em></b><em>分</em><b><em>{%s1}{%s2}</em></b><em>秒</em></p>
                </yd-countdown>
            </div>
        </div>
        <div class="main">
            <div class="project_title">
                <h3>加勒比儿童票一大一小加勒比</h3>
                <div class="price">
                    <div class="vip_price">
                        <em>会员价</em>
                        <i>￥</i>
                        <a>20</a>
                    </div>
                    <b>现价￥90</b>
                    <p>市场价<span>￥200</span></p>
                </div>
                <div class="purchase_limitation">限购一份</div>
                <!--                 <div class="option">
                    <span class="active">一大一小</span>
                    <span>两大一小</span>
                </div> -->
            </div>
            <div class="attention">
                <h3>购买须知</h3>
                <div class="detail" v-html="GoodsDetail.buy_things">
                </div>
            </div>
            <div class="shop">
                <h3>使用门店</h3>
                <ul>
                    <li v-for="(item,index) in storeList" :key="index">
                        <div class="del">
                            <router-link :to="{name:'ShopDetails',query:{store_id:item.business_id}}">
                                <div class="tle">
                                    <h4>{{item.business_name}}</h4>
                                    <div>
                                        <span><img src="../assets/icon_enshrineA.png" alt=""></span>
                                        <span><img src="../assets/icon_enshrineA.png" alt=""></span>
                                        <span><img src="../assets/icon_enshrineA.png" alt=""></span>
                                        <span><img src="../assets/icon_enshrineB.png" alt=""></span>
                                        <span><img src="../assets/icon_enshrineB.png" alt=""></span>
                                    </div>
                                </div>
                                <div class="timer">营业时间：{{item.sale_time}}、{{item.sale_time2}}</div>
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
                </ul>
            </div>
            <div class="comment">
                <h3>
            <p>用户评价</p>
                          <router-link :to="{name:'CommentMore',query:{id:$route.query.id,type:1}}">
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
                            <van-rate v-model="item.star_level" readonly />
                        </div>
                    </div>
                    <div class="text">{{item.content}}</div>
                    <ul>
                        <li v-for="img in item.thumb">
                            <span><img :src="img" alt=""></span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="shop_del">
                <h3>商品详情</h3>
                <div class="detail" v-html="GoodsDetail.goods_info">
                </div>
            </div>
        </div>
        <footer>
            <ul>
                <li>
                    <span><img src="../assets/icon_shopA.png" alt=""></span>
                    <p>商城</p>
                </li>
                <li>
                    <span><img src="../assets/icon_collectA.png" alt=""></span>
                    <p>收藏</p>
                </li>
            </ul>
            <div class="btn">
                <div class="share" @click="shareShowFn">
                    <span>￥10</span>
                    <p>分享赚</p>
                </div>
                <div class="buy" @click="ConfirmAnOrderPage"><span>立即购买</span></div>
            </div>
        </footer>
        <Share ref="myShare"></Share>
    </div>
</template>
<script>
import Share from '../components/Share'
export default {
    name: 'CommodityDetails',
    data() {
        return {
            GoodsDetailsState: 1,
            GoodsDetail: {},
            comments: [],
            storeList: [],
        }
    },
    components: {
        Share
    },
    methods: {
        changeTime(date) {
            return this.$dayjs(date).format('YYYY/MM/DD HH:mm:ss')
        },
        shareShowFn() {
            this.$refs.myShare.shareShowFn();
        },
        //确认下单
        ConfirmAnOrderPage() {
            const that = this;
            that.$router.push({
                name: "ConfirmAnOrder",
                query: {
                    id: this.$route.query.id,
                    order_type: 1,
                    arrival: "GoodsDetails",
                }
            });
        },
        //获取详情
        async getDetail() {
            let res = await this.$getRequest('/home/GetGoodsDetail', { id: this.$route.query.id })
            if (res.data.code == 1) {
                const resData = res.data.data;
                this.GoodsDetail = resData;
                if (resData.store == 0) {
                    this.GoodsDetailsState = 2
                } else if (resData.is_online == 0) {
                    this.GoodsDetailsState = 3
                }
                // else if(resData.is_vip== 1)
                // {
                //   this.GoodsDetailsState = 4
                // }
                else {
                    this.GoodsDetailsState = 1
                }
            }
        },
        //获取评论
        async getComment() {
            let res = await this.$getRequest('/comment/GetComments', { goods_id: this.$route.query.id, type: 1 })
            this.comments = res.data.data.list;
        },
        //获取门店
        async getStore() {
            let res = await this.$getRequest('/home/GetGoodsStore', { goods_id: this.$route.query.id })
            this.storeList = res.data.data;
        },

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        this.getDetail()
        this.getComment()
        this.getStore()
        document.body.style.background = "#fff";

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
.CommodityDetails {
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

    header {
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
            }

            .option {
                height: 1.04rem;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                background: #f6f6f6;

                span {
                    width: 2.12rem;
                    height: .82rem;
                    text-align: center;
                    line-height: .82rem;
                    text-align: center;
                    background: #fff;
                    color: #515C6F;
                    margin-left: .2rem;

                    &.active {
                        color: #FF6666;
                        box-sizing: border-box;
                        border: 2px solid #FF6666;
                    }
                }
            }
        }

        .attention {
            h3 {
                line-height: .8rem;
                font-size: .28rem;
                color: #515C6F;
                padding-left: .6rem;
                border-bottom: 1px solid #f6f6f6;
            }

            .detail {
                padding: 0.2rem .6rem;
                background: #fff;
                display: flex;

                img {
                    margin: 5px 0;
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

                        .timer {
                            font-size: .24rem;
                            color: #999999;
                            padding-top: .12rem;
                        }

                        .site {
                            display: flex;
                            align-items: center;
                            padding-bottom: .16rem;

                            i {
                                overflow: hidden;
                                width: .18rem;
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

            div {
                height: 4.6rem;
                background: #C8C8C8;
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