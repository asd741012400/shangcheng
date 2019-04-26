<template>
    <div>
        <van-dialog v-model="show" title="手机号绑定" :before-close="beforeCloseModel">
            <van-cell-group>
                <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
                <van-field v-model="sms" center clearable label="验证码" placeholder="请输入验证码">
                    <van-button slot="button" size="small" type="primary">发送验证码</van-button>
                </van-field>
            </van-cell-group>
        </van-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // show: '',
            phone: '',
            sms: '',
        }
    },
    props: {
        show:{
            default:false
        }
    },
    components: {},
    methods: {
        showBind() {
            this.show = false;
        },
        hideBind() {
            this.show = false;
        },
        //关闭填写手机号
        async beforeCloseModel(action, done) {
            let openid = this.$localstore.get('openid6')
            let res = await this.$postRequest('/user/saveMobile', { openid: openid, phone: this.phone, sms: this.sms })
            if (res.data.code == 1) {
                this.$localstore.set('userInfo', res.data.data)
                this.show = false
                window.location.reload()
                done()
            } else {
                this.$notify(res.data.msg);
                done(false)
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