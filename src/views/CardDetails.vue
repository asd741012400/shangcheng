<template>
    <div class="CardDetails">
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
            <!-- <span><img :src="CardDetail.def_pic[0]" alt=""></span> -->
            <div class="text">
                <yd-countdown slot="right" :time="CardDetail.sale_etime">
                    <p>距离活动结束还有<em></em><b><em>{%d0}{%d1}{%d2}</em></b><em>天</em></b><b><em>{%h1}{%h2}</em></b><em>时</em><b><em>{%m1}{%m2}</em></b><em>分</em><b><em>{%s1}{%s2}</em></b><em>秒</em></p>
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
                    <b>现价￥{{CardDetail.card_price}}</b>
                    <p>市场价<span>￥{{CardDetail.mkt_price}}</span></p>
                </div>
            </div>
            <div class="attention">
                <h3>购买须知</h3>
                <div>
                    {{CardDetail.buy_things}}
                </div>
                <!--              <ul>
                    <li>
                        <div>
                            <i><img src="../assets/icon_yuan.png" alt=""></i>
                            <span>须知一</span>
                        </div>
                        <p>想参考自行车的路线，可以看看我的上一篇的游记： 熊本 人吉市 ｜寻访夏目友人帐的温柔治愈地</p>
                    </li>
                    <li>
                        <div>
                            <i><img src="../assets/icon_yuan.png" alt=""></i>
                            <span>须知一</span>
                        </div>
                        <p>想参考自行车的路线，可以看看我的上一篇的游记： 熊本 人吉市 ｜寻访夏目友人帐的温柔治愈地</p>
                    </li>
                    <li>
                        <div>
                            <i><img src="../assets/icon_yuan.png" alt=""></i>
                            <span>须知一</span>
                        </div>
                        <p>想参考自行车的路线，可以看看我的上一篇的游记： 熊本 人吉市 ｜寻访夏目友人帐的温柔治愈地</p>
                    </li>
                </ul> -->
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
                                <img :src="item.wechat_img" alt="" />
                            </i>
                            <div class="user_name">
                                <p>{{item.username}}</p>
                                <time>2019-07-02 12:00</time>
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
                <h3>
            <p :class="table == 1 ? 'active' : ''" @click="tabkeChage(1)">卡内商家</p>
            <p :class="table == 2 ? 'active' : ''" @click="tabkeChage(2)">卡片详情</p>
          </h3>
                <div v-if="table == 1">
                    <ul>
                        <li class="vip_price">
                            <div class="img">
                                <span></span>
                                <div>
                                    <p>会员价</p>
                                    <i>￥</i>
                                    <a>20</a>
                                </div>
                            </div>
                            <div class="project">
                                <p>悠游堂亲子嘉年华</p>
                                <span>报名　11/22</span>
                            </div>
                            <div class="share">
                                <div class="price">
                                    <span>现价</span>
                                    <b>￥45.0</b>
                                    <a>￥345</a>
                                </div>
                            </div>
                        </li>
                        <li class="vip_price">
                            <div class="img">
                                <span></span>
                                <div>
                                    <p>会员价</p>
                                    <i>￥</i>
                                    <a>20</a>
                                </div>
                            </div>
                            <div class="project">
                                <p>悠游堂亲子嘉年华</p>
                                <span>报名　11/22</span>
                            </div>
                            <div class="share">
                                <div class="price">
                                    <span>现价</span>
                                    <b>￥45.0</b>
                                    <a>￥345</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-if="table == 2" class="shop_del_div">
                    {{CardDetail.goods_info}}
                </div>
            </div>
        </div>
        <footer v-if="cardDetailsState == 1">
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
                <div class="share">
                    <span>￥10</span>
                    <p>分享赚</p>
                </div>
                <div class="buy" @click="ConfirmAnOrderPage"><span>立即购买</span></div>
            </div>
        </footer>
        <footer v-else-if="cardDetailsState == 2">
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
                <div class="buy_null"><span>已售罄</span></div>
            </div>
        </footer>
        <footer v-else-if="cardDetailsState == 3">
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
                <div class="buy_null"><span>已下架</span></div>
            </div>
        </footer>
        <footer v-if="cardDetailsState == 4">
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
                <div class="vip_share">分享</div>
                <div class="vip_buy"><span>了解会员</span>
                    <p>（限会员购买）</p>
                </div>
            </div>
        </footer>
    </div>
</template>
<script>
export default {
    name: 'CardDetails',
    data() {
        return {
            apiUrl: this.$common.ApiUrl(),
            cardDetailsState: 4,
            table: 1,
            CardDetail: {},
            comments: [],
            countDownNum: 0,
            countDownArr: "",
            id: '',
        }
    },
    components: {},
    methods: {

        tabkeChage(num) {
            const that = this;
            that.table = num;
        },
        //确认下单
        ConfirmAnOrderPage() {
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
        //获取详情
        async getDetail() {
            let res = await this.$getRequest('/home/GetCardDetail', { id: this.$route.query.id })
            if (res.data.code == 1) {
                const resData = res.data.data;
                this.CardDetail = resData;
                if (resData.store == 0) {
                    this.cardDetailsState = 2
                } else if (resData.is_online == 0) {
                    this.cardDetailsState = 3
                }
                // else if(resData.is_vip== 1)
                // {
                //   this.cardDetailsState = 4
                // }
                else {
                    this.cardDetailsState = 1
                }
            }
        },
        //获取评论
        async getComment() {
            let res = await this.$getRequest('/comment/GetComments', { goods_id: this.$route.query.id, type: 1 })
            this.comments = res.data.data.list;
        }

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        this.getDetail()
        this.getComment()
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
.van-rate__icon {
    font-size: 0.4rem !important;
}

.CardDetails {
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
                height: 5rem;
                background: #ccc;
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