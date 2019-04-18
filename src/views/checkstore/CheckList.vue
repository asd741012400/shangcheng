<template>
    <div class="list">
        <van-nav-bar @click-left="onClickLeft"  left-arrow fixed title="核销记录" />
        <div class="top-box">
            <div>
                <p>9999</p>
                <p>总核销</p>
            </div>
            <div>
                <p>66</p>
                <p>核销数</p>
            </div>
        </div>
        <div class="select">
            <div>核销记录</div>
            <div>2018-8-9</div>
        </div>
        <ul class="check_list">
            <li>
                <div class="mid">
                    <div class="img-box">
                        <img src="../../assets/img1.png">
                    </div>
                        <div class="content-box">
                            <div>商品名称商品名称商品名称</div>
                            <div class="center">
                                <div>可可</div>
                                <div>15283008371</div>
                            </div>
                            <div class="right">
                                <div>核销人：乐乐</div>
                                <div>2018-5-6 10:00</div>
                            </div>
                        </div>
                    </div>
            </li>
            <li>
                <div class="mid">
                    <div class="img-box">
                        <img src="../../assets/img1.png">
                    </div>
                        <div class="content-box">
                            <div>商品名称商品名称商品名称</div>
                            <div class="center">
                                <div>可可</div>
                                <div>15283008371</div>
                            </div>
                            <div class="right">
                                <div>核销人：乐乐</div>
                                <div>2018-5-6 10:00</div>
                            </div>
                        </div>
                    </div>
            </li>
            <li>
                <div class="mid">
                    <div class="img-box">
                        <img src="../../assets/img1.png">
                    </div>
                        <div class="content-box">
                            <div>商品名称商品名称商品名称</div>
                            <div class="center">
                                <div>可可</div>
                                <div>15283008371</div>
                            </div>
                            <div class="right">
                                <div>核销人：乐乐</div>
                                <div>2018-5-6 10:00</div>
                            </div>
                        </div>
                    </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'WithdrawList',
    data() {
        return {}
    },
    components: {},
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        }
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.title = "提现明细"
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

.check_list {
    padding: 0.1rem 0.1rem;
    background: #eee;

    li {
        margin-top: 5px;
        display: flex;
        flex-direction: column;
        background: #fff;
        padding: 0.2rem 0.2rem;

        .mid {
            margin-top: 0.2rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .img-box {
                width: 20%;
            }

            .center {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }

            .right {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
        }

        .content-box {
            display: flex;
            flex: 1;
            margin-left: 5px;
            color: #666;
            flex-direction: column;
            justify-content: space-between;
        }

    }
}
</style>