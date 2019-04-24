<template>
    <div class="CommodityList">
        <header>
            <div class="return" @click="$router.go(-1)"><span><img src="../assets/icon_return_w.png" alt=""></span></div>
            <div class="shop_message">
                <span><img src="../assets/head_portrait.png" alt="" srcset=""></span>
                <div>
                    <p>小皮孩儿</p>
                    <a>ID：54335616</a>
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
                <div class="user_comment">
                    <div class="user">
                        <div class="user_message">
                            <i></i>
                            <div class="user_name">
                                <p>用户名称</p>
                                <span>商家</span>
                            </div>
                        </div>
                        <div class="grade">2019-07-02 12:00</div>
                    </div>
                    <div class="text">想参考自行车的路线，可以看看我的上一篇的游记： 熊本 人吉市 ｜寻访夏目友人帐的温柔治愈地</div>
                    <ul>
                        <li><span><img src="../assets/img1.png" alt=""></span></li>
                        <li><span><img src="../assets/img1.png" alt=""></span></li>
                        <li><span><img src="../assets/img1.png" alt=""></span></li>
                        <li><span><img src="../assets/img1.png" alt=""></span></li>
                        <li><span><img src="../assets/img1.png" alt=""></span></li>
                    </ul>
                </div>
                <div class="user_comment">
                    <div class="user">
                        <div class="user_message">
                            <i></i>
                            <div class="user_name">
                                <p>用户名称</p>
                                <span>商家</span>
                            </div>
                        </div>
                        <div class="grade">2019-07-02 12:00</div>
                    </div>
                    <div class="text">想参考自行车的路线，可以看看我的上一篇的游记： 熊本 人吉市 ｜寻访夏目友人帐的温柔治愈地</div>
                    <ul>
                        <li><span><img src="../assets/img1.png" alt=""></span></li>
                        <li><span><img src="../assets/img1.png" alt=""></span></li>
                        <li><span><img src="../assets/img1.png" alt=""></span></li>
                        <li><span><img src="../assets/img1.png" alt=""></span></li>
                        <li><span><img src="../assets/img1.png" alt=""></span></li>
                    </ul>
                </div>
            </div>
            <ul class="not_comment" v-else>
                <li class="not_comment_list">
                    <h3>商家名称</h3>
                    <div class="img">
                        <span><img src="../assets/img1.png" alt=""></span>
                        <div>
                            <p class="text1">
                                <a>龙湖时代天街悠游堂</a>
                                <i>￥199</i>
                            </p>
                            <p class="text2">
                                <a>两大一小</a>
                                <i>x1</i>
                            </p>
                        </div>
                    </div>
                    <div class="btns">
                        <span>查看订单</span>
                        <a>进行评价</a>
                    </div>
                </li>
                <li class="not_comment_list">
                    <h3>商家名称</h3>
                    <div class="img">
                        <span><img src="../assets/img1.png" alt=""></span>
                        <div>
                            <p class="text1">
                                <a>龙湖时代天街悠游堂</a>
                                <i>￥199</i>
                            </p>
                            <p class="text2">
                                <a>两大一小</a>
                                <i>x1</i>
                            </p>
                        </div>
                    </div>
                    <div class="btns">
                        <span>查看订单</span>
                        <a>进行评价</a>
                    </div>
                </li>
                <li class="not_comment_list">
                    <h3>商家名称</h3>
                    <div class="img">
                        <span><img src="../assets/img1.png" alt=""></span>
                        <div>
                            <p class="text1">
                                <a>龙湖时代天街悠游堂</a>
                                <i>￥199</i>
                            </p>
                            <p class="text2">
                                <a>两大一小</a>
                                <i>x1</i>
                            </p>
                        </div>
                    </div>
                    <div class="btns">
                        <span>查看订单</span>
                        <a>进行评价</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CommodityList',
    data() {
        return {
            commentState: 2
        }
    },
    components: {},
    methods: {
        commentStateChage(num) {
            const that = this;
            that.commentState = num;
        },
        async getList() {
            let user = this.$localstore.get('userInfo')
            let data = {
                user_id: user.user_id,
                status: this.commentState
            }
            let res = await this.$getRequest('/user/MyComments', data)
            console.log(res);
        }
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.body.style.background = "#fff";
        this.getList()
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
                    font-size: .24rem;
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

        .not_comment {
            li {
                padding: 0 .51rem .52rem;
                border-bottom: 10px solid #f6f6f6;

                h3 {
                    padding: .4rem 0 .14rem;
                    border-bottom: 1px solid #CCCCCC;
                }

                div.img {
                    display: flex;
                    padding-top: .24rem;

                    span {
                        width: 1.26rem;
                        height: 1.26rem;
                        overflow: hidden;
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
                                font-size: .28rem;
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