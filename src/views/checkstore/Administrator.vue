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
                <a><input type="text" v-model="name" placeholder="请输入姓名"></a>
            </p>
            <p>
                <span>手机号码</span>
                <a><input type="number" v-model="phone" placeholder="请输入正确的电话号码"></a>
            </p>
        </div>
        <a class="sub_btn" @click="register()">确定</a>
    </div>
</template>
<script>
export default {
    name: 'Administrator',
    data() {
        return {
            name: '',
            phone: ''
        }
    },
    components: {},
    methods: {
        //检测是否注册过
        async checkAuth() {
            let business_id = this.$localstore.get('business_id', business_id)
            let openid = this.$localstore.get('openid1', openid)
            let res = await this.$getRequest('/business/checkUser', { business_id: business_id, openid: openid })
            if (res.data.code == 1) {
                this.$localstore.set('business_user', res.data.data)
                this.$router.push({ name: 'CheckHome' })
            } else {
                if (!business_id) {
                    this.$router.push({ name: 'error403' })
                }
            }
        },
        //注册
        async register() {
            let business_id = this.$localstore.get('business_id')
            let openid = this.$localstore.get('openid1')
            let userInfo = this.$localstore.get('userInfo')
            let data = {
                business_id: business_id,
                openid: openid,
                user_nick: userInfo.username,
                name: this.name,
                phone: this.phone
            }
            let res = await this.$postRequest('/business/register', data)
            this.$message(res.data.msg)
            if (res.data.code == 1 || res.data.code == 2) {
                setTimeout(() => {
                    this.$router.push({ name: 'CheckHome' })
                }, 2000)
            }
        },

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.title = "绑定管理员"
        document.body.style.background = "#f0f0f0";
        let business_id = this.$route.query.business_id
        if (business_id) {
            this.$localstore.set('business_id', business_id)
        }
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
.Administrator {
    background: #f0f0f0;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

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

    .input_text {
        background: #fff;
        margin-top: .3rem;
        padding: .3rem;

        p {
            display: flex;
            align-items: center;

            span {
                width: 1.3rem;
                text-align: right;
                font-size: 0.28rem;
                color: #999999;
            }

            a {
                flex: 1;
                height: 0.7rem;
                margin-left: .3rem;
                padding-left: .2rem;
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
        }

        p:last-of-type {
            margin-top: .25rem;
        }
    }

    .sub_btn {
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