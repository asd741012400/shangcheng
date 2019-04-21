<template>
    <div class="list">
        <div class="top-box">
            <div>
                <p>9999</p>
                <p>累积提现</p>
            </div>
            <div>
                <p>66</p>
                <p>月提现金额</p>
            </div>
        </div>
        <div class="select">
            <div>全部</div>
            <div>2018-8-9</div>
        </div>

        <div class="list-box">
            <div class="top">
                <span>商户流水号：000000</span>
                <span>已提现</span>
            </div>
            <div class="mid">
                <span>金额：￥500</span>
                <span>
               <router-link :to="{name:'WithdrawDepositDel'}">
                明细&gt;
              </router-link>
              </span>
            </div>
            <div class="date">2019-02-02 10:00</div>
        </div>

        <div class="list-box">
            <div class="top">
                <span>商户流水号：000000</span>
                <span>已提现</span>
            </div>
            <div class="mid">
                <span>金额：￥500</span>
                <span>
               <router-link :to="{name:'WithdrawDepositDel'}">
                明细&gt;
              </router-link>
              </span>
            </div>
            <div class="date">2019-02-02 10:00</div>
        </div>

        <div class="list-box">
            <div class="top">
                <span>商户流水号：000000</span>
                <span>已提现</span>
            </div>
            <div class="mid">
                <span>金额：￥500</span>
                <span>
               <router-link :to="{name:'WithdrawDepositDel'}">
                明细&gt;
              </router-link>
              </span>
            </div>
            <div class="date">2019-02-02 10:00</div>
        </div>


    </div>
</template>
<script>
export default {
    name: 'WithdrawList',
    data() {
        return {}
    },
    components: {},
    methods: {},

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.title = "提现明细"
        document.body.style.background = "#fff";
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
.list {
    height: 100vh;
    background: #eee;
}

.top-box {
    padding: 1rem 0;
    background: rgb(22, 155, 213);
    color: #fff;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    width: 100%;

    &>div {
        display: flex;
        flex: 1;
        flex-direction: column;
        text-align: center;

        &>p {
            margin-top: 10px;
        }
    }
}

.select {
    padding: .5rem .6rem;
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
}

.list-box {
    padding: .1rem .2rem;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    background: #fff;
    line-height: 2em;

    .top {
        display: flex;
        justify-content: space-between;
    }

    .mid {
        border-top: 1px solid #eee;
        display: flex;
        justify-content: space-between;
    }
}
</style>