<template>
    <div class="ClassifyList">
        <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">分类列表</div>
            <div class="add"></div>
        </header>
        <div class="nav_list">
            <van-tabs @change="getGoodsList" v-model="active">
                <van-tab v-for="(item,index) in AllCate" :title="item.c_name" :key="index">
                </van-tab>
            </van-tabs>
        </div>
        <div class="activity_list">
            <ul>
                <li v-for="(item,index) in goodsList" :key="index" v-if="item.store > 0">
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
                                <span>现价</span>
                                <b>￥{{item.mkt_price}}</b>
                                <a>￥{{item.goods_price}}</a>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
            <loadMore ref="loadMore"></loadMore>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ClassifyList',
    data() {
        return {
            apiUrl: this.$common.ApiUrl(),
            AllCate: [],
            goodsList: [],
            cid: 0,
            page: 1,
            currSize: 0,
            pageSize: 10,
            active: 0,
        }
    },
    components: {},
    methods: {

        //获取所有分类
        async getAllCate() {
            //导航列表
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
        },

        //获取分类下的商品
        async getGoodsList(index) {
            if (this.$refs.loadMore) {
                this.$refs.loadMore.hideTip()
            }
            this.$Indicator.open({ spinnerType: 'fading-circle' });
            this.goodsList = []
            if (index) {
                var id = this.AllCate[index].c_id
            } else {
                var id = 0
            }
            this.cid = id
            let res = await this.$getRequest('home/GetGoodsListByCid', { cid: id, page: this.page })
            this.goodsList = res.data.data.list
            // if (res.data.data.list) {
            this.currSize = res.data.data.list.length
            // }
            this.$Indicator.close();
        },

        //获取更多商品
        async getGoodsListMore(cid) {
            this.$Indicator.open({ spinnerType: 'fading-circle' });
            let res = await this.$getRequest('home/GetGoodsListByCid', { cid: cid, page: this.page })
            let data = res.data.data.list
            this.goodsList = this.goodsList.concat(data);
            this.currSize = res.data.data.list.length
            this.$Indicator.close();
            if (this.currSize >= this.pageSize) {
                this.$refs.loadMore.hideTip()
            } else {
                this.$refs.loadMore.showTip()
            }
        },
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.body.style.background = "#F6F6F6";
        this.getAllCate()

        setTimeout(() => {
            const id = this.$route.query.id;
            if (id) {
                this.cid = id
                this.AllCate.map((item, index) => {
                    if (id == item.c_id) {
                        this.active = index
                        // this.$forceUpdate(); //重绘
                        this.getGoodsList(index)
                    }
                })
            } else {
                this.getGoodsList()
            }
        }, 300)

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
.ClassifyList {
    header {
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        padding-top: .3rem;
        padding-bottom: .2rem;
        background: #FFFFFF;
        position: relative;

        .icon_return {
            width: 1rem;
            height: 1rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            left: .4rem;

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

    .nav_list {
        margin: .1rem 0;
        background: #fff;

        ul {
            white-space: nowrap;
            padding: 0 .32rem;
            width: auto;
            overflow-x: scroll;

            li {
                background: #fff;
                margin-right: .3rem;
                display: inline-block;
                color: #515C6F;
                font-size: .28rem;

                div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: .82rem;
                    position: relative;

                    span {
                        width: 1.08rem;
                        height: 4px;
                        background: #FF6666;
                        position: absolute;
                        bottom: 0;
                        display: none;
                        border-radius: 5px;
                    }
                }
            }

            li.active {
                div {
                    span {
                        display: block;
                    }
                }
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

                .share {
                    display: flex;

                    .price {
                        display: flex;
                        align-items: baseline;
                        padding-bottom: .2rem;
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
</style>