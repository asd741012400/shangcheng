<template>
    <div class="MyShop">
        <header>
            <div class="return" @click="goHome"><span><img src="../assets/icon_return_w.png" alt=""></span></div>
            <div class="shop_message">
                <span><img class="avatar" :src="user.wechat_img" alt="" srcset=""></span>
                <div>
                    <p>
                        <input type="text" :value="user.username +'的小店'">
                    </p>
                </div>
            </div>
            <b><img src="../assets/my_shopBg.png" alt="" srcset=""></b>
        </header>
        <div class="vip_card" @click="invitation">
            <p>
                <span>立即开通</span>
                <a>￥{{plus.price}}</a>
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
                <li class="vip_price" v-for="(item,index) in list">
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
                    <div class="price">
                        <div>
                            <span>现价</span>
                            <b>￥{{item.goods_price}}</b>&nbsp;&nbsp;
                            <del>￥{{item.mkt_price}}</del>
                        </div>
                    </div>
                    <div class="status" v-if="item.store <= 0"><span><img src="../assets/icon_null.png" alt=""></span></div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MyShopUser',
    data() {
        return {
            user: {},
            plus: {},
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

    },
    methods: {
        goGoods(item) {
            this.$router.push({ name: 'CommodityDetails', query: { id: item.goods_id, type: 1 } })
        },
        goHome() {
            this.$router.push({ name: "Index" })
        },
        invitation() {
            this.$router.push({ name: "VipEquity",query:{'share_id':this.share_id}})
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
        async getUser() {
            let res = await this.$getRequest('/wechat/GetUser', { uid: this.share_id })
            this.user = res.data.data
        },
        //获取PlUS
        async getPlUS() {
            let id = this.$route.query.id
            let res = await this.$getRequest('/home/GetPlus')
            this.plus = res.data.data
        },
        async getInfo() {
            let res = await this.$getRequest('/store/MyStore', { user_id: this.user_id, page: this.page })
            this.storeInfo = res.data.data.user_info
            this.list = res.data.data.goods_list
            this.currSize = res.data.data.goods_list.length
            this.pageSize = res.data.data.count
        },

        async getInfoMore() {
            let res = await this.$getRequest('/store/MyStore', { user_id: this.user_id, page: this.page })
            this.storeInfo = res.data.data.user_info
            this.list = this.list.concat(res.data.data.goods_list);
            this.currSize = res.data.data.goods_list.length
            this.pageSize = res.data.data.count
        },

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.body.style.background = "#F6F6F6";
        this.share_id = this.$route.query.share_id
        if (!this.share_id) {
            this.$router.push({ name: 'Index' })
        }
        this.getPlUS()
        this.getUser()
        this.getInfo()

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

        p {
            margin-top: 2.9rem;
            width: 3.84rem;
            height: .8rem;
            border-radius: 21px;
            text-align: center;
            color: #fff;
            font-size: .26rem;
            display: flex;
            background: #C1A06B;
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

                        p {
                            flex: 1;
                            color: #515C6F;
                            padding-left: .28rem;
                        }

                        span {
                            color: #FF6666;
                        }
                    }

                    .price {
                        padding: .3rem .2rem;
                        display: flex;
                        justify-content: space-between;

                        .btn {
                            padding: 0.12rem 0.5rem;
                            color: #fff;
                            height: .8rem;
                            background: #FF6666;
                            border-radius: 50px;
                            box-shadow: 0px 5px 10px rgba(255, 128, 128, 0.6);

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