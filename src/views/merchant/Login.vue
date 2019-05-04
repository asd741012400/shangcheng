<template>
    <div class="login">
        <!--        <div class="img">
            <i>img</i>
            <p>时光里</p>
        </div> -->
        <div class="input_text">
            <p><input v-model="phone" type="text" placeholder="手机号码"></p>
            <div>
                <a><input v-model="sms" type="text" placeholder="验证码"></a>
                <button @click="sendSMS" :disabled="disabled">{{msg}}</button>
            </div>
        </div>
        <a class="sub_btn" @click="submit">确定</a>
    </div>
</template>
<script>
export default {
    name: 'login',
    data() {
        return {
            phone: '',
            msg: '请求验证码',
            sms: '',
            disabled: false,
        }
    },
    components: {},
    methods: {
        //发送验证码
        async sendSMS() {
            let WxAuth = this.$localstore.get('wx_user')
            let res = await this.$postRequest('/user/SendMsg', { union_id: WxAuth.union_id, tel_phone: this.phone })
            this.$notify(res.data.msg);
            if (res.data.code == 1) {
                var num = 60
                var timer = setInterval(() => {
                    num--
                    this.msg = num + '秒后重新获取'
                    this.disabled = true
                    if (num === 0) {
                        this.disabled = false
                        this.msg = '获取验证码'
                        clearInterval(timer)
                    }
                }, 1000)
            }
        },
        //注册
        async submit() {
            let WxAuth = this.$localstore.get('wx_user')
            let res = await this.$postRequest('/user/saveMobile', { union_id: WxAuth.union_id, phone: this.phone, sms: this.sms })
            if (res.data.code == 1) {
                if (res.data.data.level < 2) {
                    this.$notify('你不是商家用户！');
                    return false
                }
                this.$localstore.set('wx_user', res.data.data)
                if (res.data.data.level > 1) {
                    this.$router.push({ name: 'DistributionTow' })
                }
            } else {
                this.$notify(res.data.msg);
            }
        },
        //检测是否登录
        async checkAuth() {
            let WxAuth = this.$localstore.get('wx')
            let union_id = ''
            if (WxAuth && WxAuth.unionid) {
                union_id = WxAuth.unionid
            }
            let res = await this.$getRequest('/wechat/GetUserInfo', { union_id: union_id })
            if (res.data.code == 1) {
                this.$localstore.set('wx_user', res.data.data)
                let user = res.data.data
                if (user && user.level > 1) {                
                     this.$router.push({ name: 'DistributionTow' })
                }
            }

        }
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        document.title = "登录"
        document.body.style.background = "#fff";

        this.checkAuth()
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

            button {
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