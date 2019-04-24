<template>
    <div class="WithdrawDeposit">
        <div>
            <h3>可提现￥200</h3>
            <p><input type="number" placeholder="请输入提现金额"></p>
            <span>我们将收取X%的手续费</span>
            <a class="sub_btn">确定</a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'WithdrawDeposit',
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
        document.body.style.background = "rgb(246, 246, 246)";
        document.title = "申请提现"
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
.WithdrawDeposit{
    background: #f0f0f0;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top:0;
    div{
        margin: 0 .4rem;
        overflow: hidden;
        h3{
            padding-top: .5rem;
            font-size: 0.36rem;
        }
        p{
            display: flex;
            margin-top: .4rem;
			height: 0.7rem;
			padding-left: .4rem;
			background-image: linear-gradient(
				#fefefe, 
				#fefefe), 
			linear-gradient(
				#f75835, 
				#f75835);
			background-blend-mode: normal, 
				normal;
			border-radius: 0.12rem;
			border: solid 0.02rem #f0f0f0;
			input{
				width: 100%;
				height: 100%;
			}
        }
        span{
            font-size: 0.3rem;
            padding-top: .2rem;
            display: block;
        }
        .sub_btn{
            height: 0.8rem;
            margin-top: .6rem;
            line-height: 0.8rem;
            background-color: #ff6c60;
            border-radius: 0.1rem;
            text-align: center;
            color: #fff;
            display: block;
            font-size: 0.32rem;
        }
    }
}
</style>