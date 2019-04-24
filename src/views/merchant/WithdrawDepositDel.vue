<template>
    <div class="WithdrawDepositDel">
        <div class="money">
            <p>金额</p>
            <span>{{detail.real_money || 0.00}}</span>
        </div>
        <ul>
            <li>
                <p>当前状态</p>
                <span class="col1">{{detail.status}}</span>
            </li>
            <li>
                <p>提现金额</p>
                <span>{{detail.profit_money || 0.00}}</span>
            </li>
            <li>
                <p>服 务 费</p>
                <span>{{detail.service_fee || 0.00}}</span>
            </li>
            <li>
                <p>申请时间</p>
                <span>{{detail.apply_time}}</span>
            </li>
            <li>
                <p>提现时间</p>
                <span>{{detail.arrive_time}}</span>
            </li>
            <li>
                <p>提现去向</p>
                <span>微信零钱</span>
            </li>
            <li>
                <p>提现单号</p>
                <span>{{detail.transaction_no}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'WithdrawDepositDel',
    data() {
        return {
            id: '',
            detail: '',
        }
    },
    components: {},
    methods: {
        async getDetail() {
            let res = await this.$getRequest('/store/WidthdrewDetail', { id: this.id })
            this.detail= res.data.data
        }
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.title = "提现明细"
        document.body.style.background = "#fff";
        this.id = this.$route.query.id
        this.getDetail()
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
.WithdrawDepositDel {
    .money {
        margin: .2rem .6rem 0;
        border-bottom: 1px solid #CECECE;
        height: 1rem;
        display: flex;
        align-items: center;

        p {
            flex: 1;
            font-size: .28rem;
            color: #666666;
        }

        span {
            font-size: .36rem;
            color: #FF6C60;
        }
    }

    ul {
        padding: .08rem .6rem 0;

        li {
            display: flex;
            padding-top: .24rem;
            font-size: .28rem;
            color: #999999;

            span {
                flex: 1;
                text-align: right;
                color: #222222;

                &.col1 {
                    color: #999999;
                }

                &.col2 {
                    color: #FF6C60;
                }
            }
        }
    }
}
</style>