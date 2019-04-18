<template>
    <div class="warp-box">
        <van-nav-bar fixed title="商家核销" />
        <div class="top-box">
            <div class="change-store">
                <router-link :to="{name:'StoreList'}">
                    <p>切换门店</p>
                </router-link>
            </div>
            <div class="top">
                <div>
                    <div class="img-box">
                        <img src="../../assets/img1.png">
                        </div>
                        <p>悠游堂南坪店</p>
                    </div>
                </div>
                <div class="bottom">
                    <div>
                        <p>100</p>
                        <p>今日核销</p>
                    </div>
                    <div>
                        <p>100</p>
                        <p>总核销</p>
                    </div>
                    <div>
                        <p>100</p>
                        <p>预约人数</p>
                    </div>
                </div>
            </div>
            <div class="list-box">
                <div>
                    <router-link :to="{name:'CheckCode'}">
                        <p>扫码核销</p>
                    </router-link>
                </div>
                <div>
                    <router-link :to="{name:'CheckCode'}">
                        <p>核销码核销</p>
                    </router-link>
                </div>
                <div>
                    <router-link :to="{name:'StoreList'}">
                        <p>核销记录</p>
                    </router-link>
                </div>
                <div>
                    <router-link :to="{name:'CheckList'}">
                        <p>预约记录</p>
                    </router-link>
                </div>
            </div>
        </div>
</template>
<script>
export default {

    data() {
        return {}
    },
    components: {},
    methods: {},

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.title = "商家核销"
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
body {
    .warp-box {
        height: 100vh;
        background: #eee;
    }
}


.van-nav-bar__title {
    font-weight: bold;
}

.top-box {
    position: relative;
    margin-top: 65px;
    padding: 0 0.1rem 0.1rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    background: #fff;

    .change-store {
        position: absolute;
        right: -10px;
        border: 1px solid #ccc;
        padding: 0px 10px;
        border-radius: 15px;
    }

    .img-box {
        line-height: 2em;
        text-align: center;
        padding: 0 2rem;
        display: flex;
        flex-direction: column;

        img {
            border-radius: 15px;
            width: 100%;
        }
    }

    p {
        margin: 5px 0;
    }

    .bottom {
        margin-top: 10px;
        display: flex;

        div {
            flex: 1;
            line-height: 1.5em;
        }
    }
}

.list-box {
    margin-top: 10px;
    padding: 0.1rem 0.1rem;
    background: #fff;
    overflow: hidden;

    div {
        border: 1px solid #ccc;
        width: 30%;
        margin: 5px;
        padding: 0.5rem;
        float: left;
        box-sizing: border-box;
        white-space: nowrap;
        text-align: center;
    }
}
</style>