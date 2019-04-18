<template>
    <div class="Administrator">
		<div class="shop_message">
            <div class="shop_img">
                <span>img</span>
            </div>
            <h3>万达广场LUCA店</h3>
        </div>
        <div class="input_text">
            <p>
                <span>姓名</span>
                <a><input type="text" placeholder="请输入姓名"></a>
            </p>
            <p>
                <span>手机号码</span>
                <a><input type="number" placeholder="请输入正确的电话号码"></a>
            </p>
        </div>
		<a class="sub_btn">确定</a>
    </div>
</template>
<script>
export default {
    name: 'Administrator',
    data() {
        return {}
    },
    components: {},
    methods: {},

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.title = "绑定管理员"
        document.body.style.background = "#f0f0f0";
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
.Administrator {
    background: #f0f0f0;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top:0;
    .shop_message {
		overflow: hidden;
        background: #fff;
        .shop_img {
            position: relative;
            width: 2.14rem;
            height: 2.14rem;
            margin: .84rem auto 0;

            span {
                width: 2.14rem;
                height: 2.14rem;
                border-radius: 5px;
                overflow: hidden;
                background: #ccc;
                display: block;
            }

            i {
                width: .92rem;
                height: .8rem;
                position: absolute;
                right: -.46rem;
                bottom: -.4rem;
                overflow: hidden;
            }
        }

        h3 {
            font-size: .36rem;
            color: #333333;
            text-align: center;
            padding-top: .4rem;
            padding-bottom: .46rem;
        }
    }
    .input_text{
        background: #fff;
        margin-top: .3rem;
        padding: .3rem;
        p{
            display: flex;
            align-items: center;
            span{
                width: 1.3rem;
                text-align: right;
                font-size: 0.28rem;
                color: #999999;
            }
            a{
                flex: 1;
                height: 0.7rem;
                margin-left: .3rem;
                padding-left: .2rem;
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
        }
        p:last-of-type{
            margin-top: .25rem;
        }
    }
    .sub_btn{
		height: 0.8rem;
		line-height: 0.8rem;
		background-color: #ff6c60;
		border-radius: 0.1rem;
		margin: 0.4rem .3rem 0;
		text-align: center;
		color: #fff;
		display: block;
		font-size: 0.32rem;
	}
}
</style>