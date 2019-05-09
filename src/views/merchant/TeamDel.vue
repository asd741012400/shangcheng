<template>
    <div class="TeamDel">
        <header>
            <span><img :src="user.wechat_img" alt=""></span>
            <div>
                <h3>
          <a>{{user.username}}</a>
          <!-- <i></i> -->
        </h3>
                <p>
                    <a>会员：{{refer_orders}}人</a>
                    <b>收益：￥{{user.getmoney}}</b>
                </p>
            </div>
        </header>
        <div class="tab_title">
            <p :class="table == 1 ? 'active' : ''" @click="tabkeChage(1)">团队成员</p>
            <p :class="table == 2 ? 'active' : ''" @click="tabkeChage(2)">团队销售</p>
        </div>
        <ul class="team_member" v-if="table == 1">
            <li v-for="(item,index) in team" @click="getDetail(item.user_id)">
                <i><img :src="item.wechat_img" alt=""></i>
                <div>
                    <p class="name">
                        <b>{{item.username}}</b>
                        <span>{{$dayjs.unix(item.bind_time).format('YYYY-MM-DD')}}成为会员</span>
                    </p>
                    <p>推广会员：{{item.count_nums}}人 </p>
                    <p>收益：￥{{item.getmoney}}</p>
                </div>
            </li>
        </ul>
        <div class="team_market" v-else>
            <div class="btns">
                <p :class="market == 1 ? 'active' : ''" @click="marketChage(1)">PLUS ({{plus_num}})</p>
                <p :class="market == 2 ? 'active' : ''" @click="marketChage(2)">商品 ({{goods_num}})</p>
            </div>
            <ul>
                <li v-for="item in teamSale">
                    <i><img :src="$imgUrl+item.goods_img"></i>
                    <div>
                        <p>
                            <span><img :src="item.wechat_img" alt=""></span>
                            <a>{{item.username}}</a>
                            <b v-if="item.get_status == 1">已结算</b>
                            <b v-else>未结算</b>
                        </p>
                        <h3>{{item.goods_title}}</h3>
                        <time>下单时间：{{$dayjs.unix(item.add_time).format('YYYY-MM-DD')}} </time>
                        <em>收益：<strong>￥{{item.get_money}}</strong></em>
                    </div>
                </li>
                <!--                 <li>
                    <i></i>
                    <div>
                        <p>
                            <span><img src="../../assets/head_portrait2.png" alt=""></span>
                            <a>于红乐</a>
                            <b>已结算</b>
                        </p>
                        <h3>游乐园亲子门票系列</h3>
                        <time>下单时间：2019-02-12</time>
                        <em>收益：<strong>￥800</strong></em>
                    </div>
                </li>
 -->
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TeamDel',
    data() {
        return {
            table: 1,
            market: 1,
            goods_type: 1,
            user: '',
            refer_orders: '',
            team: '',
            goods_num: '',
            plus_num: '',
            teamSale: '',
            page: 1,
            teamCurrSize: 0,
            teamPageSize: 10,
            teamSaleCurrSize: 0,
            teamSalePageSize: 10,
        }
    },
    components: {},
    methods: {
        tabkeChage(num) {
            const that = this;
            that.table = num;
            this.page = 1
            if (num == 1) {
                this.getTeam()
            } else {
                this.getTeamSale()
            }
        },
        marketChage(num) {
            const that = this;
            that.market = num;
            this.goods_type = num
            this.getTeamSale()
        },
        //成员详情
        async getDetail(id) {
            this.$router.push({ name: "MemberDel", query: { id: id } })
        },
        //获取成员详情
        async getInfo() {
            let res = await this.$getRequest('/store/Level2', { user_id: this.user_id, page: this.page })
            this.user = res.data.data.user_info
            this.refer_orders = res.data.data.refer_orders
        },
        //获取团队
        async getTeam() {
            let res = await this.$getRequest('/store/MyTeam2', { user_id: this.user_id, page: this.page })
            if (res.data.data.my_people) {
                this.team = res.data.data.my_people;
                this.teamCurrSize = res.data.data.my_people.length
                this.teamPageSize = res.data.data.count
            }
        },
        //获取团队更多
        async getTeamMore() {
            let res = await this.$getRequest('/store/MyTeam2', { user_id: this.user_id, page: this.page })
            if (res.data.data.my_people) {
                this.team = this.team.concat(res.data.data.my_people);
                this.teamCurrSize = res.data.data.my_people.length
            }
        },
        //获取团队销售
        async getTeamSale() {
            let res = await this.$getRequest('/store/MyTeamSale', { user_id: this.user_id, goods_type: this.goods_type, page: this.page })
            this.goods_num = res.data.data.goods_num
            this.plus_num = res.data.data.plus_num
            if (res.data.data.list) {
                this.teamSale = res.data.data.list;
                this.teamSaleCurrSize = res.data.data.list.length
                this.teamSalePageSize = res.data.data.count
            }
        },
        //获取团队销售更多
        async getTeamSaleMore() {
            let res = await this.$getRequest('/store/MyTeamSale', { user_id: this.user_id, goods_type: this.goods_type, page: this.page })
            if (res.data.data.list) {
                this.teamSale = this.teamSale.concat(res.data.data.list);
                this.teamSalecurrSize = res.data.data.list.length
            }
        },


    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.title = "团队详情"
        document.body.style.background = "#fff";
        this.user_id = this.$route.query.id
        this.getInfo()
        this.getTeam()
        this.getTeamSale()

        window.onscroll = () => {
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            //滚动条到底部的条件
            if (scrollTop + windowHeight == scrollHeight) {
                if (this.teamCurrSize >= this.teamPageSize) {
                    this.page++;
                    this.getTeamSaleMore()
                }
                if (this.teamSaleCurrSize >= this.teamSalePageSize) {
                    this.page++;
                    this.getTeamSaleMore()
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
.TeamDel {
    header {
        height: 2.4rem;
        background: #FF6C5F;
        display: flex;
        align-items: center;

        span {
            width: 1.32rem;
            height: 1.32rem;
            overflow: hidden;
            border: 5px solid #fff;
            border-radius: 50%;
            margin-left: 1.4rem;
        }

        div {
            padding-left: .4rem;
            color: #fff;

            h3 {
                display: flex;
                font-size: .36rem;
                align-items: center;

                a {
                    color: #fff;
                }

                i {
                    width: .26rem;
                    height: .26rem;
                    background: #ccc;
                    margin-left: .36rem;
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
                    padding-left: .4rem;
                }
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
                width: 1.32rem;
                height: 1.32rem;
                overflow: hidden;
                border-radius: 50%;
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
                        flex: 1;
                    }

                    span {
                        font-size: .24rem;
                    }
                }

                .name {
                    margin-bottom: .14rem;
                }
            }
        }
    }

    .team_market {
        .btns {
            display: flex;
            height: 1.04rem;
            background: #F0F0F0;
            align-items: center;
            justify-content: space-around;

            p {
                width: 3.3rem;
                height: .64rem;
                line-height: .64rem;
                text-align: center;
                background: #fff;
                border: 1px solid #fff;
                font-size: .28rem;
                color: #222222;
                border-radius: 7px;
            }

            .active {
                border: 1px solid #FF6C5F;
                color: #FF6C5F;
            }
        }

        ul {
            li {
                display: flex;
                padding: .3rem .3rem .48rem .36rem;
                border-bottom: 1px solid #F0F0F0;
                align-items: center;

                i {
                    width: 1.28rem;
                    height: 1.28rem;
                    border-radius: 5px;
                    overflow: hidden;
                    background: #ccc;
                }

                div {
                    flex: 1;
                    padding-left: .32rem;

                    p {
                        display: flex;
                        align-items: center;
                        padding-bottom: .2rem;
                        border-bottom: 1px dashed #F0F0F0;

                        span {
                            width: .64rem;
                            height: .64rem;
                            overflow: hidden;
                            border-radius: 50%;
                        }

                        a {
                            flex: 1;
                            padding-left: .22rem;
                            font-size: .28rem;
                            font-weight: bold;
                            color: #222222;
                        }

                        b {
                            font-size: .28rem;
                            color: #222222;

                            &.col1 {
                                color: #FF6C5F;
                            }
                        }
                    }

                    h3 {
                        font-size: .32rem;
                        color: #222222;
                        font-weight: bold;
                        padding-top: .12rem;
                    }

                    time {
                        font-size: .28rem;
                        color: #666666;
                        display: block;
                    }

                    em {
                        font-size: .28rem;
                        color: #666666;
                        display: block;
                        font-style: normal;

                        strong {
                            color: #222222;
                            font-weight: 500;
                        }
                    }
                }
            }
        }
    }
}
</style>