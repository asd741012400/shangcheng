<template>
    <div class="CardActivate">
        <div class="user_message" style="margin-top:20px">
            <div class="user_name box">
                <div class="boxs">
                    <van-field v-model="real_name" placeholder="请输入姓名" />
                </div>
            </div>
            <div class="user_name box">
                <div class="boxs">
                    <van-field v-model="id_card" placeholder="请输入身份号" />
                </div>
            </div>
            <div class="user_name box">
                <div class="boxs">
                    <van-field v-model="bank_card" placeholder="请输入银行卡号" />
                </div>
            </div>
            <div class="user_name box">
                <div class="boxs">
                    <van-field v-model="cellphone" placeholder="请输入银行预留手机号" />
                </div>
            </div>
        </div>
        <div class="withdraw_deposit_wx">
            <div class="agreement">
                <span @click="changeAgree" v-if="agreementState"><img src="../assets/icon_schedule.png" alt=""></span>
                <span @click="changeAgree" v-else><img src="../assets/icon_unselected.png" alt=""></span>
                <p @click="changeAgree">我同意签署</p>&nbsp;&nbsp;
                <a herf="javascript:;" @click="confirmPopShow">《用户服务协议》</a>
            </div>
        </div>
        <div class="sub_btn" @click="submit"><span>确定签署</span></div>
        <div class="withdraw_deposit_wx">
            提交签署后，系统将在1-3个工作日内处理，请耐心等待
        </div>
        <div class="confirm_pop_bg" v-if="confirmPop">
            <div class="confirm_pop">
                <div class="boxs">
                    <h3>用户服务协议</h3>
                    <div class="detail">
                        乙方：北京阿拉钉科技有限公司
                        法定代表人：胡宝兰
                        根据《中华人民共和国合同法》的有关规定，甲乙双方经友好协商，达成以下协议：
                        1、甲方系具有完全民事行为能力且具备相应专业技能及许可（如有）的个人，即自由职业者，可与第三方建立业务关系并提供生产经营活动。
                        2、乙方是一家领先的互联网信息技术服务公司，具有丰富的技术服务经验。阿拉钉平台是由乙方自主研发及运营维护的一套综合云服务平台，具备电子协议签署、电子数据存证、账户管理、交易管理、订单管理与查询等各项技术服务能力。
                        3、甲方保证遵守国家相关法律法规及行
                    </div>
                    <div class="colse" @click="confirmPopHide"><span><img src="../assets/icon_close.png" alt=""></span></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { DatetimePicker } from 'mint-ui';
import { postRequest } from '@/lib/axios'
import Vue from "vue";
import lrz from 'lrz'
Vue.component(DatetimePicker.name, DatetimePicker);

export default {
    name: 'Sigining',
    data() {
        let date = this.$dayjs().format('YYYY-MM-DD');
        return {
            card: {},
            real_name: '',
            id_card: '',
            bank_card: '',
            cellphone: '',
            agreementStuats: true,
            confirmPop: false,
            status: '',
            agreementState: true,
            changeStatus: true,
            dateTime: ""
        }
    },
    components: {},
    methods: {
        changeAgree() {
            this.agreementState = !this.agreementState
        },
        //兼容性处理
        goTop() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },
        changeSex() {
            if (this.sex == 1) {
                this.sex == 2
            } else {
                this.sex == 1
            }
        },
        getTall(tall) {
            this.tall = tall
        },
        //上传头像
        handleInputChange(ev) {
            let fil = document.getElementById('upload-ele').files[0];
            if (fil.size > 5 * 1024 * 1024) {
                this.$message('上传文件大小不能超过 5MB!');
                return false;
            }
            const that = this;

            let instance = that.$message({
                message: '图片正在上传中',
                duration: 5000
            });

            lrz(fil, {
                    width: 200,
                    quality: 0.6,
                })
                .then(function(rst) {
                    postRequest('/upload/UpBase64Image', { img: rst.base64 })
                        .then(res => {
                            // that.$message(res.data.msg);
                            if (res.data.code == 1) {
                                that.imgUrl = res.data.data
                            } else {
                                that.$message(res.data.msg);
                            }
                            instance.close();
                        })
                        .catch(function(error) {
                            instance.close();
                        });
                    //成功时执行

                }).catch(function(error) {
                    //失败时执行
                    that.$message('图片上传失败');
                }).always(function() {
                    //不管成功或失败，都会执行
                    // instance.close();
                })

        },
        //开启时间选择器
        openPicker() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            // this.datePicker = true
            this.$refs.picker.open()
        },
        closeDatepicter() {
            let date = this.$dayjs(this.birthday).format('YYYY-MM-DD')
            this.birthday = date
        },
        confirmPopShow() {
            this.confirmPop = true
        },
        confirmPopHide() {
            this.confirmPop = false
        },
        //提交
        async submit() {
            // document.body.scrollTop = document.documentElement.scrollTop = 0;

            if (!/^[\u4e00-\u9fa5]{2,4}$/.test(this.real_name)) {
                this.$message('真实姓名填写有误');
                return false;
            }

            var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (!reg.test(this.id_card)) {
                this.$message('身份证号码输入有误');
                return false;
            }

            var regex = /^([1-9]{1})(\d{15}|\d{18})$/;
            if (!regex.test(this.bank_card)) {
                this.$message('请填写真实银行卡号');
                return false;
            }

            var rephone = /^1[3|4|5|6|7|8|9]\d{9}$/;
            if (!rephone.test(this.cellphone)) {
                this.$message('手机号码有误，请重填');
                return false;
            }

            if (!this.agreementStuats) {
                this.$message('你未同意签署协议！');
                return false;
            }

            let userInfo = this.$localstore.get('wx_user')
            let data = {
                user_id: userInfo.user_id,
                real_name: this.real_name,
                id_card: this.id_card,
                bank_card: this.bank_card,
                cellphone: this.cellphone,
            }

            let res = await this.$postRequest('/withdraw/SetAccount', data)
            this.$message(res.data.msg);
            if (res.data.code == 1) {
                setTimeout(() => {
                    this.$router.replace({ name: "WithdrawDeposit" })
                }, 2000);
            }

        }

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        document.body.style.background = '#fff'
        let card = this.$localstore.get('usecard')
        this.card = card
        this.status = this.$route.query.update_status
        document.title = "签署资料填写"

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
.user_name {
    margin-bottom: 20px;
}


.withdraw_deposit_wx {
    background: #fff;
    margin-top: .1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: .68rem;
    // padding-left: .68rem;
    padding: 0.24rem .68rem;

    i {
        width: .4rem;
        overflow: hidden;
    }

    p {
        font-size: .24rem;
        color: #515C6F;
        padding-left: .12rem;
    }

    .agreement {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 .4rem;
        height: 1.2rem;
        font-size: .32rem;

        span {
            width: .34rem;
            height: .34rem;

            // overflow: hidden;
            img {
                width: .34rem;
                height: .34rem;
                vertical-align: baseline;
            }
        }

        p {
            padding-left: .2rem;
        }

        a {
            color: #FF6666;
        }
    }

}

.CardActivate {
    padding-bottom: 55px;

    header {
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        padding-top: .3rem;
        padding-bottom: .2rem;
        background: #f6f6f6;
        position: relative;

        .icon_return {
            width: 1rem;
            height: 1rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            left: .4rem;

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
        }

    }

    .header {
        display: flex;
        align-items: center;
        margin: .4rem .41rem 0;
        justify-content: flex-end;
        height: 2.06rem;
        position: relative;

        .image {
            width: 2.06rem;
            height: 2.06rem;
            overflow: hidden;
            border-radius: 50%;
            border: 2px solid #fff;
            position: absolute;
            left: 0;
        }

        .text {
            width: 4.7rem;
            height: 1.24rem;
            background: #FF6666;
            border-radius: 0 10px 10px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: .24rem;
            color: #fff;

            i {
                width: .3rem;
                margin-right: .06rem;
            }
        }
    }

    .add_image {
        margin: .12rem .41rem 0;
        display: flex;
        position: relative;

        #upload-ele {
            position: absolute;
            height: 1.24rem;
            width: 100%;
            opacity: 0;
        }

        .default_img {
            height: 1.24rem;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #D5D8DC;
            border-radius: 10px;
            font-size: .24rem;
            color: #818DA2;

            i {
                width: .3rem;
                margin-bottom: .08rem;
            }
        }

        .images {
            width: 100%;
        }
    }

    .user_message {
        margin: .1rem .41rem 0;
        background: #EEEEEF;
        border-radius: 10px;
        padding: .4rem 0;
        font-size: 0.3rem;

        .box {
            display: flex;
            align-items: center;
            padding: 0 .29rem;
            height: .7rem;

            label {
                width: 1.2rem;
                text-align: right;
                padding-right: .24rem;
            }

            div.boxs {
                background: #fff;
                flex: 1;
                margin-right: .4rem;
                border-radius: 5px;
                height: .7rem;
                padding: 0 .16rem;

                input {
                    height: 100%;
                    width: 100%;
                    font-size: 0.24rem;
                }
            }
        }

        .user_phone {
            padding-top: .28rem;
        }

        .user_date {
            padding-top: 0;

            div.boxs {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                position: relative;

                p {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }

                span {
                    flex: 1;
                }

                i {
                    width: .24rem;
                }
            }
        }

        .user_sex {
            margin: 10px 0;
            padding-top: 0;

            div.boxs {
                background: none;
                display: flex;
                align-items: center;
                flex-direction: row;
                justify-content: space-around;

                .van-radio-group {
                    display: flex;
                    flex-direction: row;

                    .van-radio {
                        margin-right: 15px;
                    }
                }

                p {
                    display: flex;
                    align-items: center;
                    font-size: .24rem;
                    color: #515C6F;

                    i {
                        width: .3rem;
                        margin-right: .08rem;
                    }
                }
            }
        }

        .user_stature {
            padding-top: .52rem;
            height: auto;
            align-items: flex-start;

            div.boxs {
                background: none;
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                height: auto;
                padding: 0;

                span {
                    background: #fff;
                    margin-right: .14rem;
                    line-height: .52rem;
                    padding: 0 .12rem;
                    border: 1px solid #fff;
                    margin-bottom: .14rem;
                    font-size: .3rem;

                    &.active {
                        border: 1px solid #FF6666;
                    }
                }
            }
        }
    }

    .sub_btn {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: .38rem .96rem 0;

        span {
            background: #FF6666;
            font-weight: bold;
            color: #fff;
            width: 100%;
            text-align: center;
            line-height: .8rem;
            border-radius: 50px;
        }
    }

    .confirm_pop_bg {
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha:0.24);
        top: 0;
        left: 0;
        z-index: 77;

        .confirm_pop {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 1.02rem;
            position: relative;
            z-index: 99;

            .boxs {
                background: #fff;
                border-radius: 10px;
                position: relative;
                overflow: hidden;
                position: relative;
                z-index: 999;

                .detail {
                    padding: 0.2rem .6rem;
                    background: #fff;
                    max-height: 250px;
                    overflow-y: auto;
                    opacity: 0.8;
                }

                h3 {
                    font-size: .32rem;
                    color: #515C6F;
                    padding: .74rem 0 .2rem;
                    text-align: center;
                }

                ul {
                    padding: 0 .5rem 0 .4rem;

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
                    margin-top: .6rem;

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
}

.van-cell {
    font-size: inherit;
    line-height: .7rem;
    height: .7rem;
    padding: 0;
}
</style>
<style>
.van-picker .van-picker__toolbar {
    height: 0.99rem;
    line-height: 0.99rem;
}

.van-picker .van-picker__cancel,
.van-picker .van-picker__confirm {
    box-sizing: border-box;
    width: 2rem;
    text-align: center;
}

.el-message-box {
    width: 80%;
}
</style>