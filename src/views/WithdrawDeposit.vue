<template>
    <div class="WithdrawDeposit">
        <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">申请提现</div>
            <div class="add">
                <router-link :to="{name:'StoreList'}">
                    提现记录
                </router-link>
            </div>
        </header>
        <div class="shop">
            <div class="header">
                <div class="use_card_message">
                    <i><img src="../assets/money_img1.png" alt=""></i>
                    <p>可提现</p>
                    <h3>￥{{userInfo.getmoney ||　0.00}}</h3>
                </div>
                <b><img src="../assets/PersonalCenter_headerBg4.png" alt="" srcset=""></b>
            </div>
        </div>
        <div class="withdraw_deposit_wx">
            <i><img src="../assets/icon_wx.png" alt="" srcset=""></i>
            <p>提现到微信钱包</p>
        </div>
        <span v-if="status" class="withdraw_deposit_btn false">审核中</span>
        <span v-if="can" class="withdraw_deposit_btn" @click="handleWidthdrew">申请提现</span>


<!--         <div class="withdraw_deposit_money">
            <div class="withdraw_deposit_money_content">
                <div>
                    <span>提现金额</span>
                    <i>￥</i>
                    <p><input type="text"></p>
                </div>
                <div>
                    <span>　</span>
                    <i>　</i>
                    <a>我们将收取0.6%的服务费</a>
                </div>
            </div>
        </div> -->



    </div>
</template>
<script>
export default {
    name: 'WithdrawDeposit',
    data() {
        return {
            status: false,
            can: false,
            userInfo: {},
        }
    },
    components: {},
    methods: {
        //提现
        async handleWidthdrew() {
            let res = await this.$postRequest('/user/ApplyWidthdrew', { user_id: this.userInfo.user_id })
            this.$message(res.data.msg);
            if (res.data.code == 1) {
               setTimeout(()=>{
                  this.$router.go(-1)
               },2000)
            }
        },
        //查看是否有提现申请
        async getWidthdrew() {
            let res = await this.$postRequest('/user/GetWidthdrewStatus', { user_id: this.userInfo.user_id })
            if (res.data.code == 1) {
                this.status = true
            }else{                
                this.can = true
            }
        },

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        document.body.style.background = "#F6F6F6";
        let userInfo = this.$localstore.get('wx_user')
        if (userInfo) {
            this.userInfo = userInfo
        }
        this.getWidthdrew()
    },

    // 挂载前状态
    beforeMount() {},

    // 挂载结束状态
    mounted() {

    },

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
.WithdrawDeposit {
    header {
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
        padding: .3rem .42rem .2rem;
        background: #f6f6f6;

        .icon_return {
            width: 1.2rem;
            height: 1rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            span {
                overflow: hidden;
                width: .27rem;
            }
        }

        .tel {
            color: #515C6F;
            font-weight: bold;
            font-size: .32rem;
            text-align: center;
            flex: 1;
        }

        .add {
            width: 1.2rem;
            color: #515C6F;
            font-size: .24rem;
            text-align: right;
        }

    }

    .header {
        position: relative;
        overflow: hidden;
        background: url("../assets/PaySucceed_bg.png") center center /100% 100% no-repeat;
        height: 3.14rem;

        .use_card_message {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;

            i {
                width: .95rem;
                overflow: hidden;

                &.vip_img {
                    width: auto;
                }
            }

            p {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: .24rem;
                color: #fff;
            }

            h3 {
                font-size: .48rem;
                font-weight: bold;
                color: #fff;
            }
        }

        b {
            position: absolute;
            width: 100%;
            height: .8rem;
            bottom: 0;
            overflow: hidden;
        }
    }

    .withdraw_deposit_money {
        background: #fff;
        display: flex;
        justify-content: center;
        height: 3.74rem;
        align-items: center;

        .withdraw_deposit_money_content {
            div {
                display: flex;
                justify-content: center;
                align-items: center;

                span {
                    font-size: .32rem;
                    color: #515C6F;
                    width: 1.28rem;
                }

                i {
                    font-style: normal;
                    font-size: .32rem;
                    color: #515C6F;
                    padding-left: 6px;
                    padding-right: 2px;
                    width: .32rem;
                }

                p {
                    width: 3.68rem;
                    height: .7rem;
                    background: #EEEEEF;
                    border-radius: 5px;

                    input {
                        width: 100%;
                        height: 100%;
                        padding-left: .2rem;
                        outline: medium;
                        background: none;
                    }
                }

                a {
                    flex: 1;
                    padding-top: .24rem;
                    font-size: .24rem;
                    color: #999999;
                }
            }
        }
    }

    .withdraw_deposit_wx {
        background: #fff;
        margin-top: .1rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: .68rem;
        padding-left: .68rem;

        i {
            width: .4rem;
            overflow: hidden;
        }

        p {
            font-size: .24rem;
            color: #515C6F;
            padding-left: .12rem;
        }
    }

    .withdraw_deposit_btn {
        margin: .72rem .71rem 0;
        background: #FF6666;
        text-align: center;
        line-height: .8rem;
        color: #fff;
        display: block;
        font-weight: bold;
        border-radius: 50px;
        font-size: .32rem;
        &.false{
            background: #ccc;
        }
    }



}
</style>