<template>
    <div class="login">
        <div class="img">
            <i>img</i>
            <p>时光里</p>
        </div>
        <div class="input_text">
            <p><input type="text" placeholder="手机号码"></p>
            <div>
                <a><input type="text" placeholder="验证码"></a>
                <span>获取验证码</span>
            </div>
        </div>
        <a class="sub_btn">确定</a>
    </div>
</template>
<script>
export default {
    name: 'login',
    data() {
        return {}
    },
    components: {},
    methods: {

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.title = "登录"

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
.login {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: url('../../assets/merchant/login_bg.png') top/100% no-repeat;

    .img {
        i {
            display: block;
            width: 2.14rem;
            height: 2.14rem;
            background-color: #ebebeb;
            border-radius: 0.12rem;
            margin: 1.61rem auto 0;
            overflow: hidden;
        }

        p {
            font-size: 0.36rem;
            color: #fff;
            text-align: center;
            padding-top: .33rem;
        }
    }

    .input_text {
        padding: 1.1rem .4rem 0;

        p {
            display: flex;
            height: 0.7rem;
            padding-left: .4rem;
            background-image: linear-gradient(#fefefe,
                #fefefe),
                linear-gradient(#f75835,
                #f75835);
            background-blend-mode: normal,
                normal;
            border-radius: 0.12rem;
            border: solid 0.02rem #f0f0f0;

            input {
                width: 100%;
                height: 100%;
            }
        }

        div {
            display: flex;
            align-items: center;
            padding-top: .25rem;

            a {
                padding-left: .4rem;
                height: 0.7rem;
                flex: 1;
                background-image: linear-gradient(#fefefe,
                    #fefefe),
                    linear-gradient(#f75835,
                    #f75835);
                background-blend-mode: normal,
                    normal;
                border-radius: 0.12rem;
                border: solid 0.02rem #f0f0f0;

                input {
                    width: 100%;
                    height: 100%;
                }
            }

            span {
                width: 1.97rem;
                height: 0.68rem;
                line-height: 0.68rem;
                text-align: center;
                font-size: 0.28rem;
                background-color: #f3f1f1;
                border-radius: 0.13rem;
                margin-left: .13rem;
            }
        }
    }

    .sub_btn {
        height: 0.8rem;
        line-height: 0.8rem;
        background-color: #ff6c60;
        border-radius: 0.1rem;
        margin: 0.72rem .4rem 0;
        text-align: center;
        color: #fff;
        display: block;
        font-size: 0.32rem;
    }
}
</style>