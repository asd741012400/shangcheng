<template>
    <div class="PaySucceed">
        <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">支付成功</div>
            <div class="add"></div>
        </header>
        <div class="shop" v-if="PaySucceedState == 1">
            <div class="header">
                <div class="use_card_message">
                    <i><img src="../assets/PaySucceed_img1.png" alt=""></i>
                    <p>
                        <span><img src="../assets/PaySucceed_gou.png" alt=""></span>
                        <a>支付成功</a>
                    </p>
                </div>
                <b><img src="../assets/PersonalCenter_headerBg4.png" alt="" srcset=""></b>
            </div>
            <div class="btn">
                <div class="continue" @click="goHome">继续逛逛</div>
                <div class="employ">去使用</div>
            </div>
        </div>
        <div class="vip" v-else-if="PaySucceedState == 2">
            <div class="header">
                <div class="use_card_message">
                    <i class="vip_img"><img src="../assets/PaySucceed_img2.png" alt=""></i>
                </div>
                <b><img src="../assets/PersonalCenter_headerBg4.png" alt="" srcset=""></b>
            </div>
            <div class="vip_succeed_img"><span><img src="../assets/PaySucceed_logo.png" alt=""></span></div>
            <div class="vip_succeed_text">恭喜你获得属于自己的专属海报邀请好友成为会员再赚￥100</div>
            <div class="btn">
                <div class="continue" @click="goHome">继续逛逛</div>
                <div class="employ" @click="shareShowFn">分享赚￥100</div>
            </div>
        </div>
        <div class="card" v-else-if="PaySucceedState == 3">
            <div class="header">
                <div class="use_card_message">
                    <i><img src="../assets/PaySucceed_img3.png" alt=""></i>
                    <p>
                        <span><img src="../assets/PaySucceed_gou.png" alt=""></span>
                        <a>支付成功</a>
                    </p>
                </div>
                <b><img src="../assets/PersonalCenter_headerBg4.png" alt="" srcset=""></b>
            </div>
            <div class="btns">
                <div class="continue" @click="goHome">继续逛逛</div>
                <div class="turn" @click="confirmPopShow">转 赠</div>
                <router-link :to="{name:'CardActivate',query:{id:$route.query.id}}">
                    <div class="activate">去激活</div>
                </router-link>
            </div>
        </div>
        <!-- 转赠须知 -->
        <div class="confirm_pop_bg" v-if="confirmPop">
            <div class="confirm_pop">
                <div class="boxs">
                    <h3>转赠须知</h3>
                    <ul>
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
                    </ul>
                    <div class="agreement">
                        <input class="song" type="password" v-model="value" placeholder="请输入转赠密码" />
                    </div>
                    <div class="btn">
                        <a @click="confirmPopHide">取 消</a>
                        <b @click="submit">确 定</b>
                    </div>
                    <div class="colse" @click="confirmPopHide"><span><img src="../assets/icon_close.png" alt=""></span></div>
                </div>
            </div>
        </div>
        <!-- 转赠须知 -->
        <!-- plus专属 -->
        
        <!-- plus专属 -->
        <Share ref="myShare"></Share>
    </div>
</template>
<script>
import Share from '../components/Share'
export default {
    name: 'PaySucceed',
    data() {
        return {
            confirmPop: false,
            PaySucceedState: 3
        }
    },
    components: { Share },
    methods: {
        shareShowFn() {
            this.$refs.myShare.shareShowFn();
        },
        goHome() {
            this.$router.push({ name: 'Index' })
        },
        confirmPopShow() {
            this.confirmPop = true
        },
        confirmPopHide() {
            this.confirmPop = false
        },
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        this.PaySucceedState = this.$route.query.type
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
.PaySucceed {
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
        position: relative;
        overflow: hidden;
        background: url("../assets/PaySucceed_bg.png") center center /100% 100% no-repeat;
        height: 4rem;

        .use_card_message {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;

            i {
                width: 2.06rem;
                overflow: hidden;

                &.vip_img {
                    width: auto;
                }
            }

            p {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: .32rem;
                color: #fff;
                font-weight: bold;
                padding-top: .32rem;

                span {
                    width: .36rem;
                    overflow: hidden;
                    margin-right: 4px;
                }

                a {
                    color: #fff;
                }
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

    .vip_succeed_img {
        width: 1.8rem;
        height: .9rem;
        margin: 0 auto;
        position: relative;
        display: flex;

        span {
            position: absolute;
            width: 1.8rem;
            height: 1.8rem;
            overflow: hidden;
            border-radius: 50%;
            top: -.9rem;
        }
    }

    .vip_succeed_text {
        width: 3.48rem;
        text-align: center;
        color: #FF6666;
        font-size: .24rem;
        margin: .26rem auto 0;

    }

    .btn {
        display: flex;
        align-items: center;
        justify-content: space-around;
        // padding: .52rem 1.24rem 0;

        .continue {
            width: 2.06rem;
            height: .7rem;
            line-height: .7rem;
            text-align: center;
            color: #FF6666;
            border: 1px solid #FF6666;
            border-radius: 50px;
            font-size: .32rem;
        }

        .employ {
            width: 2.06rem;
            height: .7rem;
            line-height: .7rem;
            text-align: center;
            color: #fff;
            border: 1px solid #FF6666;
            background: #FF6666;
            border-radius: 50px;
            font-size: .32rem;
        }
    }

    .btns {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .52rem .62rem 0;

        .continue {
            width: 2.06rem;
            height: .7rem;
            line-height: .7rem;
            text-align: center;
            color: #FF6666;
            border: 1px solid #FF6666;
            border-radius: 50px;
            font-size: .32rem;
        }

        .turn {
            width: 1.58rem;
            height: .7rem;
            line-height: .7rem;
            text-align: center;
            color: #fff;
            border: 1px solid #66A1EC;
            background: #66A1EC;
            border-radius: 50px;
            font-size: .32rem;
        }

        .activate {
            width: 1.8rem;
            height: .7rem;
            line-height: .7rem;
            text-align: center;
            color: #fff;
            border: 1px solid #FF6666;
            background: #FF6666;
            border-radius: 50px;
            font-size: .32rem;
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

}
</style>