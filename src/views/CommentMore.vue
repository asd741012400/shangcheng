<template>
    <div class="CardDetails">
        <van-nav-bar title="更多评论" left-arrow fixed @click-left="goBack()">
        </van-nav-bar>
        <div class="main">
            <div class="comment">
                <div class="user_comment" v-for="item in comments">
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
                            <!-- <van-rate v-model="item.star_level - 0" readonly /> -->
                        </div>
                    </div>
                    <div class="text">{{item.content}}</div>
                    <ul v-if="item.thumb[0] !== ''">
                        <li v-for="(img,ii) in item.thumb" @click="previewImg(item,ii)">
                            <span><img :src="$imgUrl+img" alt=""></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <van-image-preview v-model="show" :start-position="index" :images="images" @change="onChange" @close="onClose">
        </van-image-preview>
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
            page: 1,
            index: 1,
            images: [],
            show: false,
            currSize: 0,
            pageSize: 10,
            countDownNum: 0,
            countDownArr: "",
            id: '',
        }
    },
    components: {},
    methods: {
        onChange(index) {
            this.index = index;
        },
        onClose() {
            this.show = false
        },
        //预览图片
        previewImg(item, index) {
            this.images = []
            let arr = item.thumb
            arr.map(item => {
                this.images.push(this.$imgUrl + item)
            })

            this.index = index
            this.show = true
        },
        goBack() {
            this.$router.go(-1)
        },
        //获取评论
        async getComment() {
            this.comments = []
            let res = await this.$getRequest('/comment/GetComments', { goods_id: this.$route.query.id, type: this.$route.query.type, page: this.page })
            if (res.data.data.list) {
                this.comments = res.data.data.list;
                this.currSize = res.data.data.list.length
                this.pageSize = res.data.data.count
            }

        },
        //获取更多评论
        async getCommentMore() {
            let res = await this.$getRequest('/comment/GetComments', { goods_id: this.$route.query.id, type: this.$route.query.type, page: this.page })
            if (res.data.data.list) {
                this.comments = this.comments.concat(res.data.data.list);
                this.currSize = res.data.data.list.length
            }

        },
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.title = "更多评论"
        this.getComment()
        document.body.style.background = "#fff";

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
                    this.getCommentMore(this.cid)
                }
            }
        }

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

    .main {
        padding-bottom: 1.16rem;
        margin-top: 40px;

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

    }

}
</style>