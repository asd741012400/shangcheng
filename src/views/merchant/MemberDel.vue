<template>
    <div class="MemberDel">
        <header>
            <span><img :src="user.wechat_img" alt=""></span>
            <div>
                <h3>
          <a>{{user.username}}</a>
          <i>{{$dayjs.unix(user.bind_time).format('YYYY-MM-DD')}}成为会员</i>
        </h3>
                <p>
                    <a>推广订单：{{refer_orders}}笔</a>
                    <b>收益：￥{{user.history_money}}</b>
                </p>
            </div>
        </header>
        <ul class="team_member">
            <li v-for="item in list">
                <i></i>
                <div>
                    <p class="name">
                        <b>{{item.goods_title}}</b>
                        <span>已结算</span>
                    </p>
                    <p>下单时间：{{$dayjs.unix(item.add_time).format('YYYY-MM-DD')}} </p>
                    <p>收益：￥{{item.get_money || '0.00'}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'MemberDel',
    data() {
        return {
            user_id: '',
            user: '',
            list: '',
            refer_orders: '',
        }
    },
    components: {},
    methods: {
        //获取成员详情
        async getInfo() {
            let res = await this.$getRequest('/store/MyTeamUserSale', { user_id: this.user_id })
            this.user = res.data.data.user_info
            this.list = res.data.data.order_list
            this.refer_orders = res.data.data.refer_orders
        }
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.title = "成员详情"
        document.body.style.background = "#fff";
        this.user_id = this.$route.query.id
        if (!this.user_id) {
            this.$router.go(-1)
        }
        this.getInfo()
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
.MemberDel {
    header {
        height: 2.4rem;
        background: #FF6C5F;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
            width: 1.32rem;
            height: 1.32rem;
            overflow: hidden;
            border: 5px solid #fff;
            border-radius: 50%;
        }

        div {
            padding-left: .4rem;
            color: #fff;

            h3 {
                display: flex;
                font-size: .36rem;
                align-items: flex-end;

                a {
                    color: #fff;
                }

                i {
                    margin-left: .24rem;
                    font-size: .28rem;
                    font-style: normal;
                    font-weight: 300;
                }
            }

            p {
                padding-top: .24rem;
                display: flex;
                align-items: center;
                font-size: .28rem;

                a {
                    color: #fff;
                }

                b {
                    font-weight: normal;
                    padding-left: .36rem;
                }
            }
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
            }

            div {
                padding-left: .4rem;
                flex: 1;

                p {
                    font-size: .28rem;
                    color: #666666;
                    display: flex;

                    a {
                        color: #fff;
                    }

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