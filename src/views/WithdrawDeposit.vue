<template>
    <div class="WithdrawDeposit">
        <!--         <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">申请提现</div>
            <div class="add">
                <router-link :to="{name:'StoreList'}">
                    提现记录
                </router-link>
            </div>
        </header> -->
        <div class="shop">
            <div class="header">
                <div class="use_card_message">
                    <!-- <i><img src="../assets/money_img1.png" alt=""></i> -->
                    <p>可提现</p>
                    <h3>{{getmoney ||　'0'}} <span style="font-size:0.12rem">元</span></h3>
                    <div class="widthdrewlist" @click="goStoreList">
                        提现记录
                    </div>
                </div>
                <!-- <b><img src="../assets/PersonalCenter_headerBg4.png" alt="" srcset=""></b> -->
            </div>
        </div>
        <div class="withdraw_deposit_wx">
            <!-- <i><img src="../assets/icon_wx.png" alt="" srcset=""></i> -->
            <p>每月1日和15日支持申请提现，最低提现金额<span style="color:#FF6D69"> {{moneys}} 元</span> ，系统将
                按各银行提现费率扣除相应服务费</p>
        </div>
        <div v-if="subject_type == 1" class="withdraw_deposit_wx1">
            <p>发票类型：专用发票</p>
            <p>项目名称：咨询服务费</p>
            <p>名称：重庆小圆圈文化传播有限公司</p>
            <p>地址：重庆市九龙坡区经纬大道1601号3幢5-3号</p>
            <p>纳税号：91500107MA5U7T2R4T</p>
            <p>开户行：中国工商银行股份有限公司重庆袁家岗支行</p>
            <p>账号：3100023609000082866</p>
            <p>电话：400-003-8878<a class="call-tel" style="margin-left:20px;color:#FF6D69" href="tel:400-003-8878">拨打</a></p>
        </div>
        <div v-if="subject_type == 1" class="withdraw_deposit_wx1">
            <p>我们收到发票并审核通过后，将付款到以下账号：</p>
            <p>银行账号：{{user_account.bank_card}}</p>
            <p>开户银行：{{user_account.bank}}</p>
        </div>
        <template v-if="!$validatenull(user_account) && subject_type != 1">
            <!-- 未签署 -->
            <span v-if="$validatenull(user_account)" class="withdraw_deposit_btn" @click="goSigining">立即签署</span>
            <span v-if="!$validatenull(user_account) && user_account.status == 0" class="withdraw_deposit_btn false">签约处理中</span>
            <span v-if="!$validatenull(user_account) && user_account.status == -1" @click="goSigining" class="withdraw_deposit_btn false">签约失败(点击重新签约)</span>
            <!--已签署 -->
            <template v-if="!$validatenull(user_account) && user_account.status == 1">
                <span v-if="status" class="withdraw_deposit_btn false">审核中</span>
                <span v-if="!status && withdraw_status == 3" class="withdraw_deposit_btn" @click="confirmPopShow">重新提现</span>
                <span v-if="withdraw_status != 3 && can" class="withdraw_deposit_btn" @click="confirmPopShow">申请提现</span>
            </template>
            <div v-if="$validatenull(user_account)" class="withdraw_deposit_wx" style="background: transparent;">
                <p>
                    尊敬的会员：因您为首次提现，为保证资金安全，
                    需提供你的资料并签署《用户服务协议》
                </p>
            </div>
            <div v-if="!$validatenull(user_account) && user_account.status == 0" class="withdraw_deposit_wx" style="background: transparent;">
                <p>
                    提交签署后，系统将在1-3个工作日内处理，请耐心等待
                </p>
            </div>
            <div v-if="!$validatenull(user_account) && withdraw_status == 3" class="withdraw_deposit_wx" style="background: transparent;">
                <p>
                    {{remark}}
                </p>
            </div>
        </template>
        <template v-else>
            <span v-if="status" class="withdraw_deposit_btn false">审核中</span>
            <span v-if="!status && withdraw_status == 3" class="withdraw_deposit_btn" @click="confirmPopShow">重新提现</span>
            <span v-if="withdraw_status != 3 && can" class="withdraw_deposit_btn" @click="confirmPopShow">申请提现</span>
        </template>
        <div class="confirm_pop_bg" v-if="confirmPop">
            <div class="confirm_pop">
                <div class="boxs">
                    <h3>提现确认</h3>
                    <div class="detail">
                        <p>提现金额：{{getmoney}}</p>
                        <p v-if="subject_type != 1">实付金额：{{getPayMoney()}}</p>
                        <p>银行账号：{{user_account.bank_card}}</p>
                        <p>开户银行：{{user_account.bank}}</p>
                    </div>
                    <div class="btn">
                        <b @click="handleWidthdrew()">确 定</b>
                    </div>
                    <div class="colse" @click="confirmPopHide"><span><img src="../assets/icon_close.png" alt=""></span></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'WithdrawDeposit',
    data() {
        return {
            status: false,
            confirmPop: false,
            can: false,
            withdraw_status: 0,
            userInfo: {},
            getmoney: '',
            moneys: '',
            remark: '',
            user_account: '',
            subject_type: '',
        }
    },
    components: {},
    methods: {
        getPayMoney() {
            return (this.getmoney - this.getmoney * this.user_account.pay_money).toFixed(2)
        },
        //去签署
        goSigining() {
            this.$router.push({ name: "Sigining" })
        },
        //提现记录
        goStoreList() {
            this.$router.push({ name: "StoreList" })
        },
        confirmPopShow() {
            console.log(this.user_account);
            if (!this.getmoney || this.getmoney < this.moneys) {
                this.$message('可提现金额不足!')
                return false
            }
            this.confirmPop = true
        },
        confirmPopHide() {
            this.confirmPop = false
        },
        //提现
        async handleWidthdrew() {
            let res = await this.$postRequest('/withdraw/ApplyWithdrew', { user_id: this.userInfo.user_id })
            this.$message(res.data.msg);
            if (res.data.code == 1) {
                this.can = false
                this.confirmPop = false
                this.getWidthdrew()
            }
        },
        //查看是否有提现申请
        async getWidthdrew() {
            let res = await this.$postRequest('/user/GetWidthdrewStatus', { user_id: this.userInfo.user_id })
            if (res.data.code == 1) {
                this.status = true
            } else {
                this.can = true
            }
        },
        async getUserInfo() {
            let res = await this.$postRequest('/withdraw/WithdrawAccount', { user_id: this.userInfo.user_id })
            if (!this.$validatenull(res.data.data.user_account)) {
                this.user_account = res.data.data.user_account
            }
            this.getmoney = res.data.data.getmoney
            this.moneys = res.data.data.moneys
            this.remark = res.data.data.remark
            this.withdraw_status = res.data.data.withdraw_status
            this.subject_type = res.data.data.subject_type
        },

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        //申请提现
        document.title = "申请提现"
        document.body.style.background = "#F6F6F6";
        let userInfo = this.$localstore.get('wx_user')
        if (userInfo) {
            this.userInfo = userInfo
        }
        this.getWidthdrew()
        this.getUserInfo()
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
            background: linear-gradient(to bottom, #FFB389, #FF6666);

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
        // padding-left: .68rem;
        padding: 0.24rem .40rem;

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

    .withdraw_deposit_wx1 {
        background: #fff;
        margin-top: .1rem;
        padding: 0.24rem .40rem;

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

        &.false {
            background: #ccc;
        }
    }

}

.widthdrewlist {
    margin-top: .2rem;
    padding: .02rem .29rem;
    border: 1px solid #fff;
    border-radius: .8rem;
    color: #fff;
}


.confirm_pop_bg {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha:0.24);
    top: 0;
    left: 0;

    .confirm_pop {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 .4rem;

        .boxs {
            background: #fff;
            border-radius: 10px;
            position: relative;
            overflow: hidden;
            width: 95%;

            .detail {
                padding: 0.2rem .3rem;
                background: #fff;
                max-height: 250px;
                overflow-y: auto;
            }

            h3 {
                font-size: .32rem;
                color: #515C6F;
                padding: .74rem 0 .2rem;
                text-align: center;
            }

            ul {
                padding: 0 .2rem 0 .1rem;

                li {
                    padding-bottom: .2rem;

                    h4 {
                        display: flex;
                        align-items: center;
                        font-size: .24rem;
                        color: #FF6666;
                        padding-bottom: .1rem;

                        i {
                            width: .1rem;
                            margin-right: .18rem;
                        }
                    }

                    p {
                        font-size: .24rem;
                        color: #515C6F;
                        text-indent: 2em;
                    }

                }
            }

            .agreement {
                display: flex;
                align-items: center;
                padding: .16rem .5rem 0 .4rem;

                .song {
                    // text-align: center;
                    width: 100%;
                    border: 1px solid #ccc;
                    padding: 0.14rem 0.1rem;
                    border-radius: 0.4rem;
                }

                span {
                    width: .3rem;
                    margin-right: .18rem;
                }

                b {
                    font-size: .24rem;
                    color: #515C6F;
                }
            }

            .btn {
                display: flex;
                align-items: center;
                justify-content: center;
                padding-top: .6rem;

                a {
                    text-align: center;
                    flex: 1;
                    color: #fff;
                    background: #8A8A8A;
                    font-weight: bold;
                    line-height: 1.06rem;

                }

                b {
                    flex: 1;
                    text-align: center;
                    color: #fff;
                    background: #FF6666;
                    line-height: 1.06rem;
                }
            }

            .colse {
                position: absolute;
                right: .16rem;
                top: .16rem;
                width: 1rem;
                height: 1rem;
                display: flex;
                align-items: flex-start;
                justify-content: flex-end;

                span {
                    width: .48rem;
                    height: .48rem;
                }
            }
        }
    }
}
</style>