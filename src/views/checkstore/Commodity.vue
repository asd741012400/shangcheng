<template>
    <div class="Commodity">
        <i>img</i>
        <p>悠游堂南坪店</p>
        <a class="sub_btn">确定</a>
    </div>
</template>
<script>
export default {
    name: 'Commodity',
    data() {
        return {
       
        }
    },
    components: {},
    methods: {
    
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.title = "商品核销"
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
.Commodity{
    background: #f0f0f0;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top:0;
    i{
        display: block;
        margin: .5rem .69rem 0;
        height: 6.12rem;
        background-color: #ffffff;
        border-radius: 0.34rem;
        overflow: hidden;
    }
    p{
        font-size: 0.36rem;
        text-align: center;
        margin-top: .36rem;
    }
    .sub_btn{
        margin: 1rem .69rem 0;
        height: 0.8rem;
        line-height: 0.8rem;
        background-color: #ff6c60;
        border-radius: 0.1rem;
        text-align: center;
        color: #fff;
        display: block;
        font-size: 0.32rem;
    }
}
</style>