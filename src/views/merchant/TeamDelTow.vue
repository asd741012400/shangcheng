<template>
    <div class="TeamDelTow">
        <header>
            <div>
                <p>{{team.get_money || '0.00'}}</p>
                <span>累计金额</span>
            </div>
            <div>
                <p>{{team.total_order || 0}}</p>
                <span>累计订单</span>
            </div>
        </header>
        <div class="tab_title">
            <p :class="table == 1 ? 'active' : ''" @click="tabkeChage(1)">全部订单</p>
            <p :class="table == 2 ? 'active' : ''" @click="tabkeChage(2)">未结算</p>
            <p :class="table == 3 ? 'active' : ''" @click="tabkeChage(3)">已结算</p>
        </div>
        <ul class="team_member">
            <li v-for="item in list">
                <i><img :src="$imgUrl+item.goods_img" alt=""></i>
                <div>
                    <p class="name">
                        <b>{{item.goods_title}}</b>
                        <span v-if="item.get_status == 0">未结算</span>
                        <span v-else>已结算</span>
                    </p>
                    <p>下单时间：{{$dayjs.unix(item.add_time).format('YYYY-MM-DD')}} </p>
                    <p>收益：￥{{item.get_money}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'TeamDelTow',
    data() {
        return {
            table: 1,
            page: 1,
            user: {},
            team: {},
            list: {},
            get_status: 3,
            currSize: 0,
            pageSize: 10,

        }
    },
    components: {},
    methods: {
        tabkeChage(num) {
            const that = this;
            that.table = num;
            that.page = 1;
            if (num == 1) {
                that.get_status = -1;
            } else if (num == 2) {
                that.get_status = 0;
            } else if (num == 3) {
                that.get_status = 1;
            }
            this.getMyTeam()
        },
        //获取推广金额
        async getMyTeamAmount() {
            let res = await this.$getRequest('/user/MyExtensionAmountAndNum', { user_id: this.user.user_id })
            this.team = res.data.data
        },
        //获取推广
        async getMyTeam() {
            let res = await this.$getRequest('/user/MyExtension', { user_id: this.user.user_id, get_status: this.get_status, page: this.page })
            this.list = res.data.data.list;
            this.currSize = res.data.data.list.length
            this.pageSize = res.data.data.count
        },
        //获取更多推广
        async getMyTeamMore() {
            let res = await this.$getRequest('/user/MyExtension', { user_id: this.user.user_id, get_status: this.get_status, page: this.page })
            this.list = this.list.concat(res.data.data.list);
            this.currSize = res.data.data.list.length
        },

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        document.title = "我的推广"
        document.body.style.background = "#fff";

        let user = this.$localstore.get('wx_user')
        if (user) {
            this.user = user
        }
        this.getMyTeam()
        this.getMyTeamAmount()
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
                    this.getMyTeamMore(this.cid)
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
.TeamDelTow {
    header {
        height: 2.4rem;
        background: #FF6C5F;
        display: flex;
        align-items: center;
        justify-content: center;

        div {
            width: 2.6rem;
            color: #fff;
            display: flex;
            align-items: center;
            flex-direction: column;
            font-size: .28rem;

            p {
                font-size: .48rem;
                padding-bottom: .1rem;
            }
        }
    }

    .tab_title {
        display: flex;
        height: 1.4rem;

        p {
            flex: 1;
            text-align: center;
            font-size: .32rem;
            line-height: 1.4rem;
            color: #222222;
            border-bottom: 2px solid #F0F0F0;
        }

        .active {
            border-bottom: 2px solid #000000;
            font-weight: bold;
        }
    }

    .team_member {
        li {
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

                img {
                    display: block;
                    width: 100%;
                    height: 1.28rem;
                    object-fit: cover
                }
            }

            div {
                padding-left: .4rem;
                flex: 1;

                p {
                    font-size: .28rem;
                    color: #666666;
                    display: flex;

                    b {
                        font-size: .32rem;
                        color: #222222;
                        width: 4.1rem;
                        font-weight: 400;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    span {
                        font-size: .32rem;
                        color: #222222;
                        font-weight: 400;
                        text-align: right;
                        flex: 1;

                        &.col1 {
                            color: #FF6C5F;
                        }
                    }
                }

                .name {
                    padding-bottom: .1rem;
                }
            }
        }
    }
}
</style>