<template>
    <div class="StoreList">
        <header>
            <div>
                <p>￥{{data.month_money || 0.00}}</p>
                <span>当月提现</span>
            </div>
            <div>
                <p>￥{{data.total_money || 0.00}}</p>
                <span>累计提现</span>
            </div>
        </header>
        <div class="titles">
            <p>全部记录</p>
            <div>
                <time>{{dateTime}}</time>
                <span><img src="../../assets/icon_pull_down.png" alt=""></span>
                <em @click="openPicker"></em>
            </div>
        </div>
        <div class="list">
            <ul>
                <li v-for="item in data.list">
                    <div>
                        <h3>
                            <span>金额：￥{{item.profit_money || 0.00}}</span>
                              <template v-if="item.status == 1">
                              <a>申请中</a>
                            </template>
                            <template v-else-if="item.status == 2">
                              <a>已提现</a>
                            </template>
                            <template v-else-if="item.status == 3">
                                  <a>已拒绝</a>
                            </template>                      
                        </h3>
                        <em>商户流水号：{{item.transaction_no}}</em>
                        <p>
                            <span>{{item.account_time}}</span>
                            <a @click="getDetail(item.s_id)">明细></a>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <mt-datetime-picker type="date" ref="picker" year-format="{value} 年" month-format="{value} 月" @confirm="handleConfirm" :startDate="startDate">
        </mt-datetime-picker>
    </div>
</template>
<script>
import { DatetimePicker } from 'mint-ui';
import Vue from "vue";

Vue.component(DatetimePicker.name, DatetimePicker);
export default {
    name: 'StoreList',
    data() {
        let date = this.$dayjs().format('YYYY-MM')
        return {
            startDate: new Date(date),
            dateTime: date,
            data: {},
            page: 1,
            currSize: 0,
            pageSize: 10,
        }
    },
    components: {},
    methods: {
        //开启时间选择器
        openPicker() {
            this.$refs.picker.open()
        },
        //点击确定按钮
        handleConfirm(data) {
            let date = this.$dayjs(data).format('YYYY-MM')
            this.dateTime = date;
            this.$refs.picker.close()
            this.getList()
            event.stopPropagation()
        },
        //获取提现记录
        async getList() {
            let data = {
                user_id: this.user.user_id,
                page: this.page,
                date: this.dateTime
            }
            let res = await this.$getRequest('/store/WidthdrewList', data)
            this.data = res.data.data
            this.currSize = res.data.data.list.length
            this.pageSize = res.data.data.count

        },
        async getListMore() {
            let data = {
                user_id: this.user.user_id,
                page: this.page,
                date: this.dateTime
            }
            let res = await this.$getRequest('/store/WidthdrewList', data)
            this.data.list = this.data.list.concat(res.data.data.list);
            this.currSize = res.data.data.list.length
        },

        async getDetail(id) {
            this.$router.push({ name: "WithdrawDepositDel", query: { id: id } })
        }

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.title = "提现记录"
        document.body.style.background = "#fff";
        let user = this.$localstore.get('userInfo')
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
.StoreList {
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

    .titles {
        height: 1.15rem;
        display: flex;
        align-items: center;
        padding-right: .5rem;

        p {
            flex: 1;
            font-size: 0.3rem;
            padding-left: .43rem;
        }

        div {
            position: relative;
            display: flex;
            align-items: center;
            height: 100%;
            width: 2rem;

            time {
                flex: 1;
                font-size: 0.3rem;
            }

            span {
                width: .3rem;
                overflow: hidden;
            }

            em {
                position: absolute;
                width: 100%;
                height: 100%;
            }
        }
    }

    .list {
        ul {
            li {
                padding: 0.33rem .43rem .42rem .51rem;
                border-top: 2px solid #f6f6f6;
                display: flex;
                align-items: center;

                div {
                    display: flex;
                    flex: 1;
                    height: 1.4rem;
                    flex-direction: column;
                    justify-content: space-between;

                    h3 {
                        font-size: 0.3rem;
                        display: flex;

                        span {
                            flex: 1;
                            font-weight: bold;
                        }

                        a {
                            font-weight: bold;
                        }
                    }

                    em {
                        font-size: 0.24rem;
                        color: #666666;
                        font-style: normal;
                    }

                    p {
                        font-size: 0.24rem;
                        display: flex;

                        span {
                            flex: 1;
                            color: #666666;
                        }

                        a {
                            text-decoration: underline;
                            font-size: 0.3rem;
                        }
                    }
                }
            }
        }
    }
}
</style>
<style>
.el-message-box {
    width: 80%;
}
</style>