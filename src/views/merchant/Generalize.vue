<template>
    <div class="Generalize">
        <header>
            <p>{{team_nums}}</p>
            <span>团队总人数</span>
        </header>
        <ul class="team_member">
            <li v-for="item in list">
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
    name: 'Generalize',
    data() {
        return {
            table: 1,
            data: {},
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
        },
        //获取列表
        async getList() {
            let data = {
                user_id: this.user.user_id,
                page: this.page
            }
            let res = await this.$getRequest('/store/MyTeam2', data)
            this.data = res.data.data
            this.list = res.data.data.my_people
            this.currSize = res.data.data.my_people.length
            this.pageSize = res.data.data.count
            this.team_nums = res.data.data.team_nums
        },
        //获取更多列表
        async getListMore() {
            let data = {
                user_id: this.user.user_id,
                page: this.page
            }
            let res = await this.$getRequest('/store/MyTeam2', data)
            this.list = this.list.concat(res.data.data.my_people);
            this.currSize = res.data.data.my_people.length
        },
        async getDetail(id) {
            this.$router.push({ name: "WithdrawDepositDel", query: { id: id } })
        }

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        document.title = "我的团队（二级）"
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
    beforeDestroy() {},

    // 销毁完成状态
    destroyed() {}

}
</script>
<style lang="scss" scoped>
.Generalize {
    header {
        height: 2.4rem;
        background: #FF6C5F;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #fff;
        font-size: .28rem;

        p {
            font-size: .48rem;
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
                        font-weight: 400;
                        flex: 1;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    span {
                        font-weight: 300;
                        text-align: right;
                        font-size: .24rem;
                    }
                }

                .name {
                    margin-bottom: .1rem;
                }
            }
        }
    }
}
</style>