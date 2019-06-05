<template>
    <div class="Index">
        <header>
            <div class="header_top">
                <div class="header">
                    <div class="site"><i class="iconfont icon-alldizhi"></i></div>
                    <div class="search">
                        <span @click="searchGoods"><img src="../assets/icon_search.png" alt=""></span>
                        <input type="text" @keyup.enter="searchGoods" @blur="searchGoods" v-model="keywords" placeholder="亲子卡">
                    </div>
                    <div class="more" @click="searchGoods">
                        搜索
                    </div>
                    <!-- <div class="more" @click="skipPages('ClassifyList')"><i class="iconfont icon-allgengduo"></i></div> -->
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
                        <span><img :src="$imgUrl+item.thumb_img+'?time='+$dayjs().format('YYYY-MM-DD HH')" alt=""></span>
                        <p>{{item.c_name}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- <div class="activity_img"><img src="../assets/activity_img1.png" alt=""></div> -->
        <div class="play_freely" v-if="!$validatenull(Cardlist)">
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
                                <p class="clip">{{item.card_name}}</p>
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
                <li class="vip_price" v-for="(item,index) in GoodsList" @click="goGoods(item)">
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
                        <!-- <span>已售　{{item.sale_num}}/{{parseInt(item.sale_num) + parseInt(item.store)}}</span> -->
                    </div>
                    <div class="price">
                        <span v-if="item.is_vip == 0">现价</span>
                        <b v-if="item.is_vip == 0">￥{{item.goods_price}}</b>
                        <a>￥{{item.mkt_price}}</a>
                    </div>
                    <div class="status" v-if="item.store <= 0"><span><img src="../assets/icon_null.png" alt=""></span></div>
                </li>
            </ul>
            <loadMore ref="loadMore"></loadMore>
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
            currSize: 0,
            pageSize: 10,
            show: false,
        }
    },
    components: {

    },
    methods: {
        goGoods(item) {
            if (item.store > 0) {
                this.$router.push({ name: 'CommodityDetails', query: { id: item.goods_id, type: 1 } });
            }
        },
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
            let banner = this.$localstore.session.get('banner')
            if (banner) {
                this.banner = banner
            } else {
                let res = await this.$getRequest('/home/getad')
                this.banner = res.data.data
                this.$localstore.session('banner', res.data.data)
            }
        },
        //获取商品列表
        async getGoodsList() {
            let GoodsList = this.$localstore.session.get('GoodsList')
            let currSize = this.$localstore.session.get('currSize')
            let pageSize = this.$localstore.session.get('pageSize')

            if (GoodsList && currSize && pageSize) {
                this.GoodsList = GoodsList
                this.currSize = currSize
                this.pageSize = pageSize
            } else {
                let res = await this.$getRequest('/home/GetGoodsList', { page: this.pages, keyword: this.keywords })
                const resData = res.data.data
                this.GoodsList = resData.list
                this.currSize = resData.list.length;
                this.pageSize = resData.count;
                this.$localstore.session('GoodsList', resData.list)
                this.$localstore.session('currSize', resData.list.length)
                this.$localstore.session('pageSize', resData.count)
            }


        },
        //更多商品
        async GoodsListPush() {
            this.$Indicator.open({ spinnerType: 'fading-circle' });
            let res = await this.$getRequest('/home/GetGoodsList', { page: this.pages, keyword: this.keywords })
            const resData = res.data.data
            this.GoodsList = this.GoodsList.concat(resData.list);
            this.currSize = resData.list.length;
            this.pageSize = resData.count;
            this.$Indicator.close();
            if (this.currSize >= this.pageSize) {
                this.$refs.loadMore.hideTip()
            } else {
                this.$refs.loadMore.showTip()
            }
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
            if (!this.keywords) {
                this.$message('请输入搜索商品！');
                return false
            }
            this.pages = 1
            let res = await this.$getRequest('/home/GetGoodsList', { page: this.pages, keyword: this.keywords })
            if (res.data.code == 1) {
                const resData = res.data.data
                this.currSize = resData.list.length;
                if (this.currSize > 0) {
                    this.GoodsList = resData.list
                    this.pageSize = resData.count;
                    document.getElementById("goods").scrollIntoView();
                } else {
                    this.$notify('未找到相关商品，请重新输入！');
                }
            }
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
        //清除缓存
        clearCahe() {
            let num = 0
            let timer = setInterval(() => {
                let plus = this.$localstore.session.get('plus')
                let banner = this.$localstore.session.get('banner')
                let NavList = this.$localstore.session.get('NavList')
                let Cardlist = this.$localstore.session.get('Cardlist')
                let GoodsList = this.$localstore.session.get('GoodsList')
                if (!this.$validatenull(banner) || !this.$validatenull(NavList) || !this.$validatenull(Cardlist) || !this.$validatenull(GoodsList) || !this.$validatenull(plus)) {
                    this.$localstore.session.remove('banner')
                    this.$localstore.session.remove('NavList')
                    this.$localstore.session.remove('Cardlist')
                    this.$localstore.session.remove('GoodsList')
                    this.$localstore.session.remove('plus')
                } else {
                    clearInterval(timer)
                }
            }, 1000 * 60 * 2)
        }

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        let userInfo = this.$localstore.get('wx_user')
        document.body.style.background = "#F6F6F6";
        document.title = "圈豆商城"
        const that = this;

        //卡片列表
        let Cardlist = that.$localstore.session.get('Cardlist')
        if (Cardlist) {
            that.Cardlist = Cardlist
        } else {
            that.$http.get('/home/getcardlist')
                .then(response => {
                    var data = JSON.parse(JSON.stringify(response.data))
                    if (data.code == 1) {
                        const resData = data.data;
                        that.Cardlist = resData;
                        that.$localstore.session('Cardlist', resData)
                    }

                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        //导航列表
        let NavList = that.$localstore.session.get('NavList')
        if (NavList) {
            that.NavList = NavList
        } else {
            that.$http.get('/home/GetNavList')
                .then(response => {
                    var data = JSON.parse(JSON.stringify(response.data))
                    if (data.code == 1) {
                        const resData = data.data;
                        that.NavList = resData;
                        that.$localstore.session('NavList', resData)
                    }

                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        this.getBanner()
        this.clearCahe()
        this.getGoodsList()


    },

    // 挂载前状态
    beforeMount() {},

    // 挂载结束状态
    mounted() {
        const that = this;
        window.onscroll = function() {
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            //滚动条到底部的条件
            if (scrollTop + windowHeight == scrollHeight) {
                if (that.currSize >= that.pageSize) {
                    that.pages++;
                    that.GoodsListPush()
                }
            }
        }

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
    beforeDestroy() {
        this.$refs.loadMore.hideTip()
        window.onscroll = null
    },

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
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: linear-gradient(90deg, #ff6666 0%, #ffb389 100%);
                z-index: 999;
                height: .7rem;
                padding: .16rem 0.1rem;
                display: flex;
                justify-content: center;
                font-size: .28rem;
                align-items: center;
                // box-sizing:border-box;

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
                        margin-right: 0.22rem;
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
                    color: #fff;

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
        padding: .1rem .24rem 0.2rem;

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

                        img {
                            width: 1rem;
                        }
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
                overflow-y: hidden;
                -webkit-overflow-scrolling: touch;

                &::-webkit-scrollbar {
                    display: none;
                }

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

                            img {
                                display: block;
                                width: 100%;
                                height: 2.04rem;
                                object-fit: cover
                            }
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
                            // justify-content: center;
                            color: #fff;
                            padding-left: 0.2rem;


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
                        padding: .3rem .2rem .1rem;

                        p {
                            flex: 1;
                            width: 3rem;
                            color: #515C6F;
                            font-size: .3rem
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
        padding-top: .1rem;
        padding-bottom: 2.1rem;

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
                padding-bottom: .2rem;

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
                        align-items: baseline;
                        height: 1.06rem;
                        justify-content: flex-start;
                        padding-left: .46rem;

                        span {
                            font-size: .28rem;
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
                }

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
                        align-items: baseline;
                        justify-content: flex-start;
                        padding-left: .46rem;
                        color: #515C6F;


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
    height: 3rem;
    background: #ccc;
    top: -1.7rem;
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