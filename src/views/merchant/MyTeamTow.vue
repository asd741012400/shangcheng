<template>
    <div class="MyTeamTow">
        <header>
            <div>
                <p>{{team.count_nums || 0}}</p>
                <span>团队总人数</span>
            </div>
            <div>
                <p>{{team.count_teams || 0}}</p>
                <span>团队</span>
            </div>
            <div>
                <p>{{team.my_peoples || 0}}</p>
                <span>会员</span>
            </div>
        </header>
        <div class="tab_title">
            <p :class="table == 1 ? 'active' : ''" @click="tabkeChage(1)">团队成员</p>
            <p :class="table == 2 ? 'active' : ''" @click="tabkeChage(2)">直属会员</p>
        </div>
        <ul class="team_member">
            <li v-for="item in list" @click="getDetail(item.user_id)">
                <i><img :src="item.wechat_img"></i>
                <div>
                    <p class="name">
                        <b>{{item.username}}</b>
                        <span>{{toTime(item.bind_time)}}成为会员</span>
                    </p>
                    <p>推广会员：{{item.count_nums || 0}}人 </p>
                    <p>收益：￥{{item.total_money || '0.00'}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'MyTeamTow',
    data() {
        return {
            table: 1,
            team: {},
            user: {},
            list: [],
            team_nums: 0,
            page: 1,
            currSize: 0,
            pageSize: 10,
        }
    },
    components: {},
    methods: {
        toTime(time) {
            return this.$dayjs.unix(time).format('YYYY-MM-DD')
        },
        tabkeChage(num) {
            const that = this;
            that.table = num;
            this.page = 1
            this.getList()
        },
        //获取列表
        async getNum() {
            let data = {
                user_id: this.user.user_id,
                page: this.page
            }
            let res = await this.$getRequest('/store/MyTeam3', data)
            this.team = res.data.data
        },
        //获取列表
        async getList() {
            let data = {
                user_id: this.user.user_id,
                page: this.page
            }
            let url = '/store/MyTeam2';
            if (this.table == 1) {
                url = '/store/MyTeam2';
            } else {
                url = '/store/MySubMember';
            }
            let res = await this.$getRequest(url, data)
            if (this.table == 1) {
                this.data = res.data.data
                this.list = res.data.data.my_people
                this.currSize = res.data.data.my_people.length
            } else {
                this.data = res.data.data
                this.list = res.data.data
                this.currSize = res.data.data.length
            }
            this.team_nums = res.data.data.team_nums
            this.pageSize = res.data.data.count

        },

        //获取更多列表
        async getListMore() {
            let data = {
                user_id: this.user.user_id,
                page: this.page
            }

            let url = '/store/MyTeam2';
            if (this.table == 1) {
                url = '/store/MyTeam2';
            } else {
                url = '/store/MySubMember';
            }
            let res = await this.$getRequest(url, data)
            if (this.table == 1) {
                this.list = this.list.concat(res.data.data.my_people);
                this.currSize = res.data.data.my_people.length
            } else {
                this.list = this.list.concat(res.data.data);
                this.currSize = res.data.data.length
            }
        },
        //成员详情
        async getDetail(id) {
            if (this.table == 1) {
                // this.$router.push({ name: "TeamDel", query: { id: id } })
            } else {
                this.$router.push({ name: "MemberDel", query: { id: id } })
            }

        }

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        document.body.style.background = "#fff";
        let user = this.$localstore.get('wx_user')
        if (user) {
            this.user = user
            document.title = "我的团队（三级）"
        } else {
            this.$router.psuh({ name: "Login" })
        }
        this.getNum()
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
        document.title = ""
    },

    // 销毁完成状态
    destroyed() {}

}
</script>
<style lang="scss" scoped>
.MyTeamTow {
    header {
        height: 2.4rem;
        background: #FF6C5F;
        display: flex;
        align-items: center;
        justify-content: space-around;

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

}
</style>