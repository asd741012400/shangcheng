<template>
    <div class="CardProjectDetails">
        <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
        <header>
        </header>
        <div class="banner">
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item,index) in imgList" :key="index">
                    <img :src="$imgUrl+item" alt="">
                  </van-swipe-item>
            </van-swipe>
        </div>
        <div class="main">
            <div class="titles">
                <p>价值￥{{info.project_price}}</p>
                <b>{{info.project_name}}</b>
                <span>项目详情</span>
            </div>
            <div class="message">
                <p>
                    <a>有效期</a>
                    <span>{{info.limit_stime}} 至 {{info.limit_etime}}</span>
                </p>
                <p>
                    <a>适合年龄</a>
                    <span>{{info.age_start}} 至 {{info.age_end}} 岁</span>
                </p>
                <p>
                    <a>是否预约</a>
                    <span>是</span>
                </p>
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
                                        <span><img src="../assets/icon_enshrineA.png" alt=""></span>
                                        <span><img src="../assets/icon_enshrineA.png" alt=""></span>
                                    </div>
                                </div>
                                <div class="timer">
                                    <!-- 营业时间：{{item.sale_time}}、{{item.sale_time2}} -->
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
                            </router-link>
                        </div>
                        <!--                   <div class="advance">
                            <span>
                            <router-link :to="{name:'ShopDetails',query:{store_id:item.business_id}}">
                                    <img src="../assets/icon_advance.png" alt="">
                            </router-link>
                                </span>
                        </div> -->
                    </li>
                </ul>
            </div>
            <div class="shop_del">
                <h3>商品详情</h3>
                <div class="detail" v-html="info.project_info"></div>
            </div>
        </div>
        <!--         <footer v-if="state">
            <div>
                <p><span><img src="../assets/btn_navigation.png" alt=""></span></p>
                <p><span @click="goTel(info.tel_phone)">
                    <img src="../assets/btn_relation.png" alt="">
                </span></p>
            </div>
        </footer> -->
        <footer v-if="!state">
            <template v-if="cardDetailsState == 1">
                <a @click="$router.go(-1)">￥{{card.card_price}}立即购卡</a>
            </template>
            <template v-else-if="cardDetailsState == 2">
                <a href="javascript:;">已售罄</a>
            </template>
            <template v-else-if="cardDetailsState == 3">
                <a href="javascript:;">已下架</a>
            </template>
            <template v-else-if="cardDetailsState == 4">
                <a href="javascript:;">限会员购买</a>
            </template>
            <template v-else-if="cardDetailsState == 5">
                <a href="javascript:;">等待开售</a>
            </template>
            <template v-else-if="cardDetailsState == 6">
                <a href="javascript:;">售卖截止</a>
            </template>
        </footer>
    </div>
</template>
<script>
export default {
    name: 'CardProjectDetails',
    data() {
        return {
            cardDetailsState: 4,
            state: false,
            user: '',
            info: '',
            imgList: '',
            storeList: '',
            card: '',
            type: '',
            card_id: '',
            project_id: '',
        }
    },
    components: {},
    methods: {
        goTel(tel) {
            window.location.href = 'tel://' + tel;
        },
        goPlus() {
            this.$router.push({ name: 'VipEquity' })
        },
        //获取项目详情
        async getDetail() {
            let data = { project_id: this.project_id }
            let res = await this.$getRequest('/home/GetCardProjectDetail', data)
            this.info = res.data.data
            this.imgList = this.info.def_pic.split(',')
        },
        //获取门店
        async getStore() {
            let res = await this.$getRequest('/home/GetProjectStore', { project_id: this.project_id })
            this.storeList = res.data.data;
        },
        //获取卡片详情
        async getCardDetail() {
            let data = { id: this.card_id }
            let res = await this.$getRequest('/home/GetCardDetail', data)
            this.card = res.data.data;


            let start_time = this.$dayjs().isBefore(this.$dayjs(this.card.sale_stime).format('YYYY/MM/DD HH:mm:ss'));
            if (start_time) {
                this.cardDetailsState = 5
            }
            let end_time = this.$dayjs().isAfter(this.$dayjs(this.card.sale_etime).format('YYYY/MM/DD HH:mm:ss'));
            if (end_time) {
                this.cardDetailsState = 6
            }

            if (!start_time && !end_time) {
                if (this.card.store == 0) {
                    this.cardDetailsState = 2
                } else if (this.card.is_online == 0) {
                    this.cardDetailsState = 3
                } else if (this.card.is_vip == 1 && this.user.status == 0) {
                    this.cardDetailsState = 4
                } else {
                    this.cardDetailsState = 1
                }
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
        document.body.style.background = '#fff'
        this.card_id = this.$route.query.card_id
        this.project_id = this.$route.query.project_id
        this.type = this.$route.query.type
        if (this.type) {
            this.state = true
        }
        this.getDetail()
        this.getStore()
        this.getCardDetail()
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
.CardProjectDetails {
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
    }

    .main {
        padding-bottom: 1.16rem;

        .titles {
            border-top: 10px solid #f6f6f6;
            background: #fff;
            padding: .44rem .54rem;

            p {
                font-size: .32rem;
                color: #FF6666;
            }

            b {
                display: block;
                font-size: .28rem;
                color: #515C6F;
            }

            span {
                font-size: .24rem;
                color: #999999;
            }
        }

        .message {
            border-top: 10px solid #f6f6f6;
            background: #fff;
            padding: .34rem .54rem .42rem;

            p {
                display: flex;
                align-items: center;
                height: .46rem;
                font-size: .24rem;
                color: #515C6F;

                a {
                    width: 1.3rem;
                    color: #FF6666;
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
                                width: 1.2rem;
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
                                overflow: hidden;
                                width: .18rem;
                            }

                            p {
                                padding-left: .12rem;
                                color: #999999;
                            }
                        }
                    }

                }
            }
        }

        .shop_del {
            border-top: 10px solid #f6f6f6;
            background: #fff;
            overflow: hidden;

            .detail {
                padding: 0.2rem .6rem;
                background: #fff;
                // display: flex;

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
        bottom: .76rem;
        width: 100%;
        height: .8rem;
        background: transparent;
        box-shadow: none;

        a {
            width: 5rem;
            box-shadow: 0px 5px 10px rgba(255, 128, 128, 0.6);
            border-radius: 50px;
            height: .8rem;
            line-height: .8rem;
            text-align: center;
            color: #fff;
            margin: 0 auto;
            display: block;
            background: #FF8080;
            font-size: .32rem;
            font-weight: bold;
        }

        div {
            padding: 0 .58rem;
            display: flex;

            p {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;

                span {
                    overflow: hidden;
                }
            }
        }
    }

}
</style>