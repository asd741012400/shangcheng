<template>
    <div class="CommodityList">
        <header>
            <div class="return" @click="$router.go(-1)"><span><img src="../assets/icon_return_w.png" alt=""></span></div>
            <div class="shop_message">
                <span class="avatar"><img :src="user.wechat_img" alt="" srcset=""></span>
                <div>
                    <p>{{user.username}}</p>
                    <a>ID：{{user.user_id}}</a>
                </div>
            </div>
        </header>
        <div class="commodity_list_tab">
            <p :class="commentState == 1 ? 'active' : ''" @click="commentStateChage(1)">
                <span>已评价</span>
                <em></em>
            </p>
            <p :class="commentState == 2 ? 'active' : ''" @click="commentStateChage(2)">
                <span>待评价</span>
                <em></em>
            </p>
        </div>
        <div class="main">
            <div class="already_comment" v-if="commentState == 1">
                <div class="user_comment" v-for="item in list">
                    <div class="user">
                        <div class="user_message">
                            <i><img :src="user.wechat_img" alt=""></i>
                            <div class="user_name">
                                <p>{{user.username}}</p>
                                <!-- <span>商家</span> -->
                            </div>
                        </div>
                        <div class="grade">{{toTime(item.add_time)}}</div>
                    </div>
                    <div class="text">{{item.content}}</div>
                    <ul v-if="strToArr(item.thumb)[0] !== ''">
                        <li v-for="(img,index) in strToArr(item.thumb)" @click="previewImg(item,index)">
                            <span><img :src="$imgUrl+img" alt=""></span>
                        </li>
                    </ul>
                </div>
            </div>
            <ul class="not_comment" v-else>
                <li class="not_comment_list" v-for="item in list">
                    <h3>商品名称</h3>
                    <div class="img">
                        <span><img :src="$imgUrl+item.goods_img" alt=""></span>
                        <div>
                            <p class="text1">
                                <a>{{item.goods_title}}</a>
                                <i>￥{{item.amount}}</i>
                            </p>
                            <p class="text2">
                                <!-- <a>两大一小</a> -->
                                <i>x{{item.order_num}}</i>
                            </p>
                        </div>
                    </div>
                    <div class="btns">
                        <span @click="getOrder(item.order_id,item.order_type)">查看订单</span>
                        <a @click="handleComment(item.order_id,item.order_type,item.goods_id)">进行评价</a>
                    </div>
                </li>
            </ul>
        </div>
        <van-image-preview v-model="show" :start-position="index" :images="images" @change="onChange" @close="onClose">
        </van-image-preview>
    </div>
</template>
<script>
export default {
    name: 'CommodityList',
    data() {
        return {
            user: {},
            commentState: 2,
            list: [],
            images: [],
            show: false,
            index: 1,
            page: 1,
            currSize: 0,
            pageSize: 10,
        }
    },
    components: {},
    methods: {
        //查看订单
        getOrder(id, type) {
            this.$router.push({ name: 'OrderDetail', query: { id: id, type: type } })
        },
        //预览图片
        previewImg(item, index) {
            this.images = []
            let arr = this.strToArr(item.thumb)
            arr.map(item => {
                this.images.push(this.$imgUrl + item)
            })
            this.index = index
            this.show = true
        },
        onChange(index) {
            this.index = index;
        },
        onClose() {
            this.show = false
        },
        //评价订单
        async handleComment(id, type, goods_id) {
            this.$router.push({
                name: "Comment",
                query: {
                    id: id,
                    type: type,
                    goods_id: goods_id,
                }
            });
        },
        toTime(time) {
            return this.$dayjs.unix(time).format('YYYY-MM-DD')
        },
        strToArr(str) {
            return str.split(',')
        },
        commentStateChage(num) {
            const that = this;
            that.commentState = num;
            this.list = []
            this.getList()
        },
        //获取评论
        async getList() {
            let user = this.$localstore.get('wx_user')

            let data = {
                user_id: user.user_id,
                status: this.commentState,
                page: this.page
            }
            let url = '/user/MyComments'
            if (this.commentState == 2) {
                url = '/user/MyComments2'
            }

            let res = await this.$getRequest(url, data)
            this.list = res.data.data.list
            this.currSize = res.data.data.list.length
            this.pageSize = res.data.data.count
        },
        //获取评论更多
        async getListMore() {
            let data = {
                user_id: user.user_id,
                status: this.commentState,
                page: this.page
            }
            let url = '/user/MyComments'
            if (this.commentState == 2) {
                url = '/user/MyComments2'
            }

            let res = await this.$getRequest(url, data)
            this.list = this.list.concat(res.data.data.list);
            this.currSize = res.data.data.res.length
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
        this.getList()
        var that = this
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
                    that.page++;
                    that.getListMore()
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
    beforeDestroy() {
        window.onscroll = null
    },

    // 销毁完成状态
    destroyed() {}

}
</script>
<style lang="scss" scoped>
.CommodityList {
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

            span {
                width: 1.36rem;
                height: 1.36rem;
                border-radius: 50%;
                border: .08rem solid #ff947b;
                margin-left: .8rem;
                margin-right: .28rem;
                display: block;

                img {
                    border-radius: 50%;
                }
            }

            div {
                p {
                    display: flex;
                    padding-bottom: .1rem;
                    font-size: .28rem;
                    color: #fff;
                    font-weight: bold;
                }

                a {
                    font-size: .22rem;
                    color: #fff;
                }
            }
        }
    }

    .commodity_list_tab {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 10px solid #f6f6f6;

        p {
            display: flex;
            position: relative;
            height: .94rem;
            align-items: center;
            justify-content: center;
            flex: 1;
            font-size: .28rem;
            color: #515C6F;

            em {
                position: absolute;
                bottom: 0;
                width: .86rem;
                height: 4px;
                background: #FF6666;
                border-radius: 5px;
                left: 50%;
                margin-left: -.43rem;
                display: none;
            }

            &.active {
                em {
                    display: block;
                }
            }
        }
    }

    .main {
        .already_comment {
            background: #fff;
            padding-top: .3rem;

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

                            span {
                                font-size: .22rem;
                                color: #999999;
                            }
                        }
                    }

                    .grade {
                        font-size: .22rem;
                        color: #999999;
                    }
                }

                .text {
                    word-break: break-all;
                    font-size: .32rem;
                    color: #515C6F;
                    padding: .3rem 0 .2rem;
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

        .not_comment {
            li {
                padding: 0 .51rem .52rem;
                border-bottom: 10px solid #f6f6f6;

                h3 {
                    padding: .4rem 0 .14rem;
                    border-bottom: 1px solid #CCCCCC;
                    font-size: 0.3rem;
                }

                div.img {
                    display: flex;
                    padding-top: .24rem;


                    span {
                        width: 1.26rem;
                        height: 1.26rem;
                        overflow: hidden;

                        img {
                            display: block;
                            width: 100%;
                            height: 1.26rem;
                            object-fit: cover
                        }
                    }

                    div {
                        padding-left: .32rem;
                        flex: 1;

                        p {
                            display: flex;

                            a {
                                flex: 1;
                            }

                            i {
                                font-style: normal;
                            }
                        }

                        p.text1 {
                            a {
                                font-size: .32rem;
                                color: #535D70;
                            }

                            i {
                                font-size: .28rem;
                                color: #535D70;
                                font-weight: bold;
                            }
                        }

                        p.text2 {
                            a {
                                font-size: .24rem;
                                color: #999999;
                            }

                            i {
                                font-size: .22rem;
                                color: #999999;
                            }
                        }
                    }
                }

                .btns {
                    display: flex;
                    justify-content: flex-end;
                    padding-top: .16rem;

                    span {
                        width: 1.42rem;
                        line-height: .52rem;
                        height: .52rem;
                        border-radius: 50px;
                        border: 1px solid #FF6666;
                        text-align: center;
                        font-size: .24rem;
                        color: #FF6666;
                    }

                    a {
                        width: 1.42rem;
                        line-height: .52rem;
                        height: .52rem;
                        border-radius: 50px;
                        border: 1px solid #FF6666;
                        text-align: center;
                        font-size: .24rem;
                        color: #fff;
                        background: #FF6666;
                        margin-left: .32rem;
                    }
                }
            }

            li:last-of-type {
                border-bottom: 0;
            }

        }


    }

}
</style>