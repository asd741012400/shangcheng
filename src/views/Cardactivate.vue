<template>
    <div class="CardActivate">
        <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">卡片激活</div>
            <div class="add"></div>
        </header>
        <div class="header">
            <div class="image">
                <template v-if="imgUrl == ''">
                    <img src="../assets/head_portrait2.png" alt="">
                        </template>
                    <template v-else>
                        <img :src="$imgUrl + imgUrl" alt="">
                    </template>
            </div>
            <div class="text">
                <i> <img src="../assets/icon_warning_b.png" alt=""></i>
                <p>请按照左边范例上传激活照片</p>
            </div>
        </div>
        <div class="add_image">
            <input type="file" id="upload-ele" name="image" accept=“image/*” @change='handleInputChange'>
            <div class="default_img">
                <i><img src="../assets/icon_add.png" alt=""></i>
                <p>点击上传图片</p>
            </div>
            <!-- <div class="images" v-else><img :src="imgUrl" alt=""></div> -->
        </div>
        <div class="user_message">
            <div class="user_name box">
                <label>孩子姓名</label>
                <div class="boxs">
                    <input type="text" v-model="child_name">
                </div>
            </div>
            <div class="user_sex box">
                <label>性别</label>
                <div class="boxs">
                    <van-radio-group v-model="sex">
                        <van-radio name="1">王子</van-radio>
                        <van-radio name="2">公主</van-radio>
                    </van-radio-group>
                </div>
            </div>
            <div class="user_date box">
                <label>出生日期</label>
                <div class="datePicker boxs" @click="openPicker">
                    <!--                     <mt-datetime-picker type="date" ref="picker" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm" :startDate="startDate" v-model="birthday">
                    </mt-datetime-picker> -->
                    <span>{{birthday}}</span>
                    <p></p>
                    <i><img src="../assets/icon_pull_down.png" alt=""></i>
                </div>
            </div>
            <div class="user_phone box">
                <label>手机号</label>
                <div class="boxs">
                    <input type="text" v-model="tel_phone">
                </div>
            </div>
            <div class="user_stature box">
                <label>身高</label>
                <div class="boxs">
                    <span :class="tall == '1m以下' ? 'active' : ''" @click="getTall('1m以下')">1m以下</span>
                    <span :class="tall == '1.0-1.2m' ? 'active' : ''" @click="getTall('1.0-1.2m')">1.0-1.2m</span>
                    <span :class="tall == '1.2-1.4m' ? 'active' : ''" @click="getTall('1.2-1.4m')">1.2-1.4m</span>
                    <span :class="tall == '1.4m以上' ? 'active' : ''" @click="getTall('1.4m以上')">1.4m以上</span>
                </div>
            </div>
        </div>
        <div class="sub_btn" @click="confirmPopShow"><span>提交激活</span></div>
        <div class="confirm_pop_bg" v-if="confirmPop">
            <div class="confirm_pop">
                <div class="boxs">
                    <h3>激活须知</h3>
                    <div class="detail" v-html="card.activation_things"></div>
                    <div class="agreement">
                        <van-checkbox v-model="agreementStuats">同意激活协议</van-checkbox>
                    </div>
                    <div class="btn">
                        <a @click="confirmPopHide">取 消</a>
                        <b @click="submit">确 定</b>
                    </div>
                    <div class="colse" @click="confirmPopHide"><span><img src="../assets/icon_close.png" alt=""></span></div>
                </div>
            </div>
        </div>
        <van-popup v-model="datePicker" position="bottom" :overlay="false">
            <van-datetime-picker v-model="startDate" type="date" :min-date="minDate" :maxDate="maxDate" @cancel="closeDatepicter" @confirm="handleConfirm" />
        </van-popup>
    </div>
</template>
<script>
import { DatetimePicker } from 'mint-ui';
import { postRequest } from '@/lib/axios'
// import Vue from "vue";
import lrz from 'lrz'


// Vue.component(DatetimePicker.name, DatetimePicker);
export default {
    name: 'CardActivate',
    data() {
        let date = this.$dayjs().format('YYYY-MM-DD');
        return {
            card: {},
            cd_id: '',
            imgUrl: '',
            child_name: '',
            sex: '1',
            birthday: '2000-01-01',
            tel_phone: '',
            tall: '1m以下',
            minDate: new Date('2000-01-01'),
            maxDate: new Date(),
            startDate: new Date('2000-01-01'),
            datePicker: false,
            closeOnClickModalS: true,
            agreementStuats: false,
            confirmPop: false,
            dateTime: ""
        }
    },
    components: {},
    methods: {
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
        handleInputChange(ev) {
            let fil = document.getElementById('upload-ele').files[0];
            if (fil.size > 5 * 1024 * 1024) {
                this.$message('上传文件大小不能超过 5MB!');
                return false;
            }
            const that = this;

            // let instance = that.$message({
            //     message: '图片正在上传中',
            //     duration: 30000
            // });

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
                            // instance.close();
                        })
                        .catch(function(error) {
                            // instance.close();
                            console.log(error);
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
            this.datePicker = true
            // this.$refs.picker.open()
        },
        closeDatepicter() {
            this.datePicker = false
            // this.$refs.picker.open()
        },
        //点击确定按钮
        handleConfirm(data) {
            let date = this.$dayjs(data).format('YYYY-MM-DD')
            this.birthday = date;
            this.datePicker = false
            // this.$refs.picker.close()
            event.stopPropagation()
        },
        confirmPopShow() {
            this.confirmPop = true
        },
        confirmPopHide() {
            this.confirmPop = false
        },
        //提交
        async submit() {
            if (!this.agreementStuats) {
                this.$message('你未同意激活协议！');
                return false;
            }
            let userInfo = this.$localstore.get('wx_user')
            let data = {
                user_id: userInfo.user_id,
                cancle_id: this.$route.query.id,
                child_name: this.child_name,
                birthday: this.birthday,
                tel_phone: this.tel_phone,
                sex: this.sex,
                tall: this.tall,
                head_img: this.imgUrl
            }

            let res = await this.$postRequest('/card/ActivityCard', data)
            this.$message(res.data.msg);
            if (res.data.code == 1) {
                setTimeout(() => {
                    this.$router.push({ name: "MyCardBag" })
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
        // if (!card) {
        //     this.$router.push({ name: "Index" })
        // }
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

        .confirm_pop {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 1.02rem;
            z-index: 999;

            .boxs {
                background: #fff;
                border-radius: 10px;
                position: relative;
                overflow: hidden;
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
</style>
<style>
.el-message-box {
    width: 80%;
}
</style>