<template>
    <div class="Collect">
        <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">收藏</div>
            <div class="add"><span><img src="../assets/icon_search2.png" alt=""></span></div>
        </header>
        <!--         <div class="sort">
            <p @click="sortOneFn">
                <span>全部</span>
                <i v-if="sortOne"><img src="../assets/icon_up.png" alt=""></i>
                <i v-else><img src="../assets/icon_pull_down.png" alt=""></i>
            </p>
            <p @click="sortTowFn">
                <span>失效</span>
                <i v-if="sortTow"><img src="../assets/icon_up.png" alt=""></i>
                <i v-else><img src="../assets/icon_pull_down.png" alt=""></i>
            </p>
        </div> -->
        <van-tabs v-model="active" @change="changeTabs">
            <van-tab title="全部">
                <ul class="team_member">
                    <li class="disabled" v-for="item in list">
                        <i><img :src="$imgUrl + item.img"></i>
                        <div class="right">
                            <div>
                                <p class="name">
                                    <b>{{item.names}}</b>
                                </p>
                                <p>
                                    <a>￥{{item.price || "0.00"}}</a>
                                    <!-- <em>￥{{item.name}}</em>/ -->
                                </p>
                            </div>
                            <span @click="delCollect(item.rec_id)">删除</span>
                        </div>
                    </li>
                </ul>
            </van-tab>
            <van-tab title="已失效">
                <ul class="team_member">
                    <li class="disabled" v-for="item in list">
                        <i></i>
                        <div class="right">
                            <div>
                                <p class="name">
                                    <b>{{item.names}}</b>
                                </p>
                                <p>
                                    <a>失效</a>
                                </p>
                            </div>
                            <span @click="delCollect(item.rec_id)">删除</span>
                        </div>
                    </li>
                </ul>
         <!--        <div class="empty" v-if="empty">
                    <span @click="delCollectAll">清空失效商品</span>
                </div> -->
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
export default {
    name: 'Collect',
    data() {
        return {
            list: [],
            active: 1,
            sortOne: true,
            sortTow: true,
            status: 0,
            page: 1,
            currSize: 0,
            pageSize: 10,
            empty: true
        }
    },
    components: {},
    methods: {
        sortOneFn() {
            this.sortOne = !this.sortOne
        },
        sortTowFn() {
            this.sortTow = !this.sortTow
        },
        changeTabs() {
            this.getList()
        },
        //删除收藏        
        async delCollect(id) {
            let res = await this.$getRequest('/user/DelCollectById', { id: id })
            this.$message(res.data.msg)
            if (res.data.code == 1) {
                this.getList()
            }
        },
        //情空
        async delCollectAll(id) {
 
        },

        async getList() {
            if (this.active == 1) {
                this.status = 0
            } else {
                this.status = 2
            }
            let data = {
                user_id: this.user.user_id,
                status: this.status,
                page: this.page,
            }
            let res = await this.$getRequest('/user/GetMyCollect', data)
            if (res.data.data.res) {
                this.list = res.data.data.res
                this.currSize = res.data.data.res.length
                this.pageSize = res.data.data.count
            }

        },
        async getListMore() {
            let data = {
                user_id: this.user.user_id,
                status: this.status,
                page: this.page,
            }
            let res = await this.$getRequest('/user/GetMyCollect', data)
            if (res.data.data.res) {
                this.list = this.list.concat(res.data.data.res);
                this.currSize = res.data.data.res.length
            }

        },
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        let user = this.$localstore.get('userInfo')
        if (user) {
            this.user = user
        }
        this.getList()
        document.body.style.background = "#f0f0f0";

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
.Collect {
    header {
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        padding-top: .3rem;
        padding-bottom: .2rem;
        background: #f6f6f6;
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

        .add {
            position: absolute;
            right: .4rem;
            width: 1rem;
            height: 1rem;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            span {
                overflow: hidden;
                width: .4rem;
            }
        }

    }

    .sort {
        display: flex;
        align-items: center;
        height: 1rem;
        background: #fff;

        p {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;

            span {
                font-size: .3rem;
                color: #000;
            }

            i {
                width: .3rem;
                margin-left: .1rem;
            }
        }
    }

    .team_member {
        background: #fff;
        margin: .2rem 0;

        .normal {
            padding: .4rem .3rem;
            border-bottom: 1px solid #F0F0F0;
            display: flex;
            align-items: center;

            i {
                width: 1.28rem;
                height: 1.28rem;
                overflow: hidden;
                border-radius: 5px;
                background: #ccc;
            }

            div {
                padding-left: .4rem;
                flex: 1;

                p {
                    font-size: .28rem;
                    color: #666666;
                    display: flex;
                    align-items: flex-end;

                    b {
                        font-size: .32rem;
                        color: #222222;
                        width: 5.1rem;
                        font-weight: 400;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    a {
                        font-size: .36rem;
                        color: #000;
                    }

                    em {
                        font-style: normal;
                        font-size: .24rem;
                        color: #999;
                        padding-left: .2rem;
                    }
                }

                .name {
                    padding-bottom: .1rem;
                }
            }
        }

        .disabled {
            padding: .4rem .3rem;
            border-bottom: 1px solid #F0F0F0;
            display: flex;
            align-items: center;

            i {
                width: 1.28rem;
                height: 1.28rem;
                overflow: hidden;
                border-radius: 5px;
                background: #ccc;
            }

            .right {
                height: 1.2rem;
                display: flex;
                align-items: flex-end;
                flex: 1;

                div {
                    padding-left: .4rem;
                    flex: 1;
                    height: 100%;

                    p {
                        font-size: .28rem;
                        color: #666666;
                        display: flex;
                        align-items: center;

                        b {
                            font-size: .32rem;
                            color: #222222;
                            width: 4.1rem;
                            font-weight: 400;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }

                        a {
                            font-size: .24rem;
                            color: #000;
                            background: #FF6C5F;
                            color: #fff;
                            width: 1rem;
                            text-align: center;
                            line-height: .4rem;
                        }
                    }

                    .name {
                        padding-bottom: .1rem;
                    }
                }

                span {
                    border: 1px solid #ccc;
                    width: 1rem;
                    line-height: .4rem;
                    text-align: center;
                    margin-top: .2rem;
                    border-radius: 5px;
                }
            }
        }
    }

    .empty {
        margin-top: .4rem;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
            width: 3rem;
            height: 1rem;
            border-radius: 5px;
            border: 1px solid #ccc;
            text-align: center;
            color: #000;
            line-height: 1rem;
        }
    }
}
</style>