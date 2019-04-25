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
                        <img :src="imgUrl" alt="">
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
                    <p>
                        <i v-if="sex != 1"><img src="../assets/icon_unselected.png" alt=""></i>
                        <i v-else><img src="../assets/icon_pitch_on.png" alt=""></i>
                        <span>王子</span>
                    </p>
                    <p>
                        <i v-if="sex != 2"><img src="../assets/icon_unselected.png" alt=""></i>
                        <i v-else><img src="../assets/icon_pitch_on.png" alt=""></i>
                        <span>公主</span>
                    </p>
                </div>
            </div>
            <div class="user_date box">
                <label>出生日期</label>
                <div class="datePicker boxs">
                    <mt-datetime-picker type="date" ref="picker" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm" :startDate="startDate" v-model="birthday">
                    </mt-datetime-picker>
                    <span>{{birthday}}</span>
                    <p @click="openPicker"></p>
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
                    <!--                   <ul>
                        <li>
                            <h4>
                                    <i><img src="../assets/icon_yuan.png" alt=""></i>
                                    <span>须知一</span>
                                  </h4>
                            <p>想参考自行车的路线，可以看看我的上一篇的游记： 熊本 人吉市 ｜寻访夏目友人帐的温柔治愈地</p>
                        </li>
                        <li>
                            <h4>
                                        <i><img src="../assets/icon_yuan.png" alt=""></i>
                                        <span>须知二</span>
                                      </h4>
                            <p>想参考自行车的路线，可以看看我的上一篇的游记： 熊本 人吉市 ｜寻访夏目友人帐的温柔治愈地</p>
                        </li>
                        <li>
                            <h4>
                                        <i><img src="../assets/icon_yuan.png" alt=""></i>
                                        <span>须知三</span>
                                      </h4>
                            <p>想参考自行车的路线，可以看看我的上一篇的游记： 熊本 人吉市 ｜寻访夏目友人帐的温柔治愈地</p>
                        </li>
                    </ul> -->
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
    </div>
</template>
<script>
import { DatetimePicker } from 'mint-ui';

import Vue from "vue";

Vue.component(DatetimePicker.name, DatetimePicker);
export default {
    name: 'CardActivate',
    data() {
        let date = this.$dayjs().format('YYYY-MM-DD');
        return {
            card: {},
            imgUrl: '',
            child_name: '',
            sex: 1,
            birthday: '2000-01-01',
            tel_phone: '',
            tall: '1m以下',
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
            var reader = new FileReader();
            reader.readAsDataURL(fil);
            reader.onload = async function(event) {
                let url = event.target.result;
                let res = await that.$postRequest('/upload/UpBase64Image', { img: url })
                if (res.data.code == 1) {
                    that.imgUrl = res.data.data
                } else {
                    this.$message(res.data.msg);
                }
            }

        },
        //开启时间选择器
        openPicker() {
            this.$refs.picker.open()
        },

        //点击确定按钮
        handleConfirm(data) {
            let date = this.$dayjs(data).format('YYYY-MM-DD')
            this.birthday = date;
            this.$refs.picker.close()
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
            let userInfo = this.$localstore.get('userInfo')
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
                    this.$router.go(-1)
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
        if (!card) {
            this.$router.push({ name: "Index" })
        }
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
            padding-top: 0;

            div.boxs {
                background: none;
                display: flex;
                align-items: center;
                justify-content: space-around;

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

            .boxs {
                background: #fff;
                border-radius: 10px;
                position: relative;
                overflow: hidden;

                .detail {
                    padding: 0.2rem .6rem;
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
}
</style>
<style>
.el-message-box {
    width: 80%;
}
</style>