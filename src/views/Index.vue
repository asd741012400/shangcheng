<template>
    <div class="Index">
        <header>
            <div class="header_top">
                <div class="header">
                    <div class="site"><i class="iconfont icon-alldizhi"></i></div>
                    <div class="search">
                        <input type="text"  @keyup.enter="searchGoods" v-model="keywords" placeholder="亲子卡">
                        <span @click="searchGoods"><img src="../assets/icon_search.png" alt=""></span>
                    </div>
                    <div class="more" @click="skipPages('ClassifyList')"><i class="iconfont icon-allgengduo"></i></div>
                </div>
            </div>
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in banner" @click="goUrl(item)">
                        <img :src="$imgUrl + item.pic_url" />
                    </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
        </header>
        <div class="nav">
            <ul>
                <li v-for="(item ,index) in NavList">
                    <router-link :to="{name:'ClassifyList',query:{id:item.c_id}}">
                        <span><img :src="$imgUrl+item.thumb_img" alt=""></span>
                        <p>{{item.c_name}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- <div class="activity_img"><img src="../assets/activity_img1.png" alt=""></div> -->
        <div class="play_freely">
            <h3>
                <span><img src="../assets/icon_play_freely.png" alt=""></span>
                <a>宝贝计划</a>
            </h3>
            <div class="play_freely_box">
                <ul>
                    <li v-for="(item , index) in Cardlist">
                        <router-link :to="{name:'CardDetails',query:{id:item.card_id,type:3}}">
                            <div class="img">
                                <span><img :src="$imgUrl+item.thumb_img" alt=""></span>
                                <div>
                                    <p>会员价</p>
                                    <i>￥</i>
                                    <a>{{item.cost_price}}</a>
                                </div>
                            </div>
                            <div class="project">
                                <p>{{item.card_name}}</p>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="activity_list" id="goods">
            <h3>
                <span><img src="../assets/icon_recommend.png" alt=""></span>
                <a>爆款推荐</a>
            </h3>
            <ul>
                <li class="vip_price" v-for="(item,index) in GoodsList">
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
                            <!-- <span>已售　{{item.sale_num}}/{{parseInt(item.sale_num) + parseInt(item.store)}}</span> -->
                        </div>
                        <div class="price">
                            <span>现价</span>
                            <b>￥{{item.goods_price}}</b>
                            <a>￥{{item.mkt_price}}</a>
                        </div>
                        <div class="status" v-if="item.store <= 0"><span><img src="../assets/icon_null.png" alt=""></span></div>
                    </router-link>
                </li>
            </ul>
        </div>
        <MyFooter></MyFooter>
    </div>
</template>
<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
import '../components/iconfont/iconfont.css'
export default {
    name: 'Index',
    data() {
        return {
            apiUrl: this.$common.ApiUrl(),
            Cardlist: [],
            keywords: '',
            banner: [],
            NavList: [],
            pages: 1,
            GoodsList: [],
            goodsListSum: 0,
            goodsListLength: 0,
            show: false,
        }
    },
    components: {

    },
    methods: {
        goUrl(item) {
            window.location.href = item.to_url
        },
        skipPages(str) {
            this.$router.push({
                name: str,
            });
        },
        //获取banner
        async getBanner() {
            let res = await this.$getRequest('/home/getad')
            this.banner = res.data.data
        },
        //获取商品列表
        async getGoodsList() {
            let res = await this.$getRequest('/home/GetGoodsList', { page: this.pages, keyword: this.keywords })
            const resData = res.data.data
            this.GoodsList = resData.list
            this.goodsListLength = resData.list.length;
            this.goodsListSum = resData.count;
        },

        async GoodsListPush() {
            let res = await this.$getRequest('/home/GetGoodsList', { page: this.pages, keyword: this.keywords })
            const resData = res.data.data
            this.GoodsList = this.GoodsList.concat(resData.list);
            this.goodsListLength = resData.list.length;
            this.goodsListSum = resData.count;
        },
        cardlistSkip(id) {
            const that = this;
            that.$router.push({
                name: "CardDetails",
                query: {
                    id: id
                }
            });
        },
        //商品搜索
        async searchGoods() {
            this.pages = 1
            let res = await this.$getRequest('/home/GetGoodsList', { page: this.pages, keyword: this.keywords })
            if (res.data.code == 1) {
                const resData = res.data.data
                this.goodsListLength = resData.list.length;
                if (this.goodsListLength > 0) {
                    this.GoodsList = resData.list
                    this.goodsListSum = resData.count;
                    document.getElementById("goods").scrollIntoView();
                } else {
                    this.$notify('未找到相关商品，请重新输入！');
                }
            }
        }
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        let userInfo = this.$localstore.get('wx_user')
        document.body.style.background = "#F6F6F6";
        const that = this;
        that.$http.get('/home/getcardlist')
            .then(response => {
                var data = JSON.parse(JSON.stringify(response.data))
                if (data.code == 1) {
                    const resData = data.data;
                    that.Cardlist = resData;
                }

            })
            .catch(function(error) {
                console.log(error);
            });

        that.$http.get('/home/GetNavList')
            .then(response => {
                var data = JSON.parse(JSON.stringify(response.data))
                if (data.code == 1) {
                    const resData = data.data;
                    that.NavList = resData;
                }

            })
            .catch(function(error) {
                console.log(error);
            });

        this.getBanner()
        this.getGoodsList()

        window.onscroll = function() {
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            //滚动条到底部的条件
            if (scrollTop + windowHeight == scrollHeight) {
                if (that.goodsListLength >= that.goodsListSum) {
                    that.pages++;
                    that.GoodsListPush()
                }
            }
        }

    },

    // 挂载前状态
    beforeMount() {},

    // 挂载结束状态
    mounted() {
        new Swiper('.swiper-container', {
            paginationClickable: true,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            // loop: true, // 循环模式选项
            autoplay: {
                delay: 3000, //1秒切换一次
            },
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
                bulletActiveClass: 'swiper-pagination-active',
                bulletClass: 'swiper-pagination-bullet',
            }
        })
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
.Index {
    header {
        height: 4.4rem;

        .header_top {
            height: 2.84rem;
            background: linear-gradient(90deg, rgba(255, 102, 102, 1) 0%, rgba(255, 179, 137, 1) 100%);

            .header {
                height: .7rem;
                padding: .52rem .16rem;
                display: flex;
                justify-content: center;
                font-size: .28rem;
                align-items: center;

                .site {
                    width: .64rem;

                    i {
                        font-size: .6rem;
                        color: #fff;
                    }
                }

                .search {
                    flex: 1;
                    background: rgba(86, 84, 82, .2);
                    border-radius: 18px;
                    margin-right: .2rem;
                    padding-left: 0.3rem;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    overflow: hidden;

                    span {
                        width: .22rem;
                        padding: 0 .3rem;
                    }

                    input {
                        flex: 1;
                        height: 100%;
                        outline: medium;
                        background: none;
                        border: none;
                        color: #fff;
                    }

                    input::-webkit-input-placeholder {
                        color: #eee;
                    }
                }

                .more {
                    width: .64rem;

                    i {
                        font-size: .6rem;
                        color: #fff;
                    }
                }
            }
        }
    }

    .nav {
        // padding: .4rem .76rem .24rem;
        padding: .4rem .24rem;

        ul {
            display: flex;
            align-items: center;
            justify-content: space-between;

            li {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 20%;
                text-align: center;

                a {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    span {
                        width: 1rem;
                        overflow: hidden;
                    }

                    p {
                        font-size: .24rem;
                        color: #515C6F;
                        padding-top: .08rem;

                    }
                }
            }
        }
    }

    .activity_img {
        overflow: hidden;
    }

    .play_freely {
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

        .play_freely_box {
            margin-left: .46rem;

            ul {
                white-space: nowrap;
                width: auto;
                overflow-x: scroll;
                -webkit-overflow-scrolling: touch;

                li {
                    background: #fff;
                    width: 5.6rem;
                    margin-right: .4rem;
                    display: inline-block;

                    .img {
                        height: 2.04rem;
                        background: #ccc;
                        border-radius: 5px;
                        position: relative;

                        span {
                            height: 2.04rem;
                            overflow: hidden;
                            display: block;
                            border-radius: 5px;
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
                            font-size:.3rem
                        }

                        span {
                            color: #FF6666;
                        }
                    }
                }
            }
        }
    }

    .activity_list {
        padding-top: .6rem;
        padding-bottom: 1.8rem;

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
                position: relative;

                &.shopping {
                    .img {
                        margin: 0 .2rem;
                        height: 2.04rem;
                        background: #ccc;
                        border-radius: 5px 5px 0 0;
                        overflow: hidden;
                    }

                    .vip {
                        display: flex;
                        justify-content: space-around;
                        box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
                        height: 1.9rem;

                        .shop {
                            display: flex;
                            flex-direction: column;
                            align-items: center;

                            span {
                                width: 1.2rem;
                                height: 1.2rem;
                                overflow: hidden;
                                display: flex;
                                align-items: center;
                                justify-content: center;

                                a {
                                    width: .6rem;
                                }
                            }

                            p {
                                font-size: .28rem;
                                color: #727C8E;
                            }
                        }

                        .icon_vip {
                            display: flex;
                            flex-direction: column;
                            align-items: center;

                            span {
                                width: .92rem;
                                padding: .14rem;
                                overflow: hidden;
                                position: relative;
                                top: -.26rem;
                                background: #fff;
                                border-radius: 50%;
                                box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
                            }

                            p {
                                font-size: .28rem;
                                color: #727C8E;
                            }
                        }

                        .personage {
                            display: flex;
                            flex-direction: column;
                            align-items: center;

                            span {
                                width: 1.2rem;
                                height: 1.2rem;
                                overflow: hidden;
                                display: flex;
                                align-items: center;
                                justify-content: center;

                                a {
                                    width: .5rem;
                                }
                            }

                            p {
                                font-size: .28rem;
                                color: #727C8E;
                            }
                        }
                    }

                    .price {
                        display: flex;
                        align-items: center;
                        height: 1.06rem;
                        justify-content: flex-start;
                        padding-left: .46rem;

                        span {
                            font-size: .28rem;
                            color: #515C6F;
                        }

                        b {
                            font-weight: normal;
                            font-size: .38rem;
                            padding-left: 2px;
                            padding-right: .2rem;
                        }

                        a {
                            text-decoration: line-through;
                        }
                    }
                }

                &.vip_price {
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

                    .price {
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
                }

                .status {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba($color: #000000, $alpha: 0.33);
                    display: flex;
                    justify-content: center;

                    span {
                        width: 1.73rem;
                        overflow: hidden;
                        padding-top: 1rem;
                    }
                }
            }
        }
    }
}
</style>
<style>
.swiper-container {
    margin: 0 .16rem;
    height: 2.76rem;
    background: #ccc;
    top: -1.2rem;
    border-radius: 5px;
}

.swiper-pagination-bullets .swiper-pagination-bullet.swiper-pagination-active {
    background: #fff !important;
}

.swiper-slide img {
    width: 100%;
    height: 100%;
}
</style>