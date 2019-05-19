<template>
    <div>
        <van-dialog v-model="status" show-cancel-button title="手机号绑定" @cancel="hideBind" :before-close="beforeClose" @confirm="submit">
            <van-cell-group>
                <van-cell-group>
                    <van-field v-model="phone" label="手机号" type="tel" placeholder="请输入手机号" />
                    <van-field v-model="sms" center clearable label="验证码" placeholder="请输入验证码">
                        <van-button :disabled="disabled" slot="button" size="small" type="primary" @click.stop="sendSMS">{{msg}}</van-button>
                    </van-field>
                </van-cell-group>
            </van-cell-group>
        </van-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            status: false,
            phone: '',
            // msg: '请求验证码',
            msg: '验证码',
            sms: '',
            disabled: false,
        }
    },
    props: {
        id: {
            default: ''
        },
        type: {
            default: ''
        },
        attr: {
            default: ''
        },
    },
    computed: {

    },
    components: {},
    methods: {
        async sendSMS() {
            let WxAuth = this.$localstore.get('wx_user')
            let res = await this.$postRequest('/user/SendMsg', { union_id: WxAuth.union_id, tel_phone: this.phone })
            this.$notify(res.data.msg);
            if (res.data.code == 1) {
                var num = 60
                var timer = setInterval(() => {
                    num--
                    // this.msg = num + '秒后重新获取'
                    this.msg = num + '秒'
                    this.disabled = true
                    if (num === 0) {
                        this.disabled = false
                        // this.msg = '获取验证码'
                        this.msg = '验证码'
                        clearInterval(timer)
                    }
                }, 1000)
            }
        },
        showBind(val) {
            this.status = val;
        },
        hideBind() {
            this.status = false;
        },
        //提交
        async submit() {
            this.status = true
            let WxAuth = this.$localstore.get('wx_user')
            let res = await this.$postRequest('/user/saveMobile', { union_id: WxAuth.union_id, phone: this.phone, sms: this.sms })
            if (res.data.code == 1) {
                this.$localstore.set('wx_user', res.data.data)
                this.status = false
                if (this.type == 2) {
                    this.$router.push({ name: 'VipOrder', query: { type: 2 } })
                } else {
                    this.$router.push({
                        path: 'ConfirmAnOrder',
                        query: {
                            id: this.id,
                            order_type: this.type,
                            attr_id: this.attr
                        }
                    })
                }
            } else {
                this.$notify(res.data.msg);
            }
        },
        async beforeClose(action, done) {
            if (action == 'confirm') {
                done(false)
            } else {
                done()
            }
        },

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {

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
<style lang="scss">
.van-field__control {
    font-size: 0.32rem;
}

footer {
    position: fixed;
    bottom: 0;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
    height: 1.64rem;
    width: 100%;
    background: #fff;

    .footer {
        padding: 0 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        text-align: center;

        .shop {
            display: flex;
            flex-direction: column;
            align-items: center;

            span {
                width: 1.2rem;
                height: .9rem;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;

                a {
                    width: .6rem;
                }
            }
        }

        .member {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;

            b {
                width: .92rem;
                padding: .14rem;
                overflow: hidden;
                position: absolute;
                top: -1.2rem;
                left: -.55rem;
                background: #fff;
                border-radius: 50%;
                box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
            }

            p {
                position: absolute;
                top: .3rem;
                left: -.4rem;
                width: .92rem;
            }

            span {
                width: 1.2rem;
                height: .9rem;
            }
        }

        .personal_center {
            display: flex;
            flex-direction: column;
            align-items: center;

            span {
                width: 1.2rem;
                height: .9rem;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;

                a {
                    width: .6rem;
                }
            }
        }
    }
}
</style>