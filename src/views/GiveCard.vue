<template>
    <div class="MyCardBag">
        <header>
            <div class="icon_return" @click="goHome"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">领取卡片</div>
            <div class="add"></div>
        </header>
        <!-- 兑换码 -->
        <div class="confirm_pop_bg" v-if="confirmPop">
            <div class="confirm_pop">
                <div class="boxs">
                    <h3>卡片领取</h3>
                    <div class="detail">
                        <p>亲爱的<i style="color: red">{{user.username}}</i>，你的好友赠送你一张<i style="color: red">{{title}}</i>，请输入密码领取<i style="color: red">{{title}}</i></p>
                    </div>
                    <div class="agreement">
                        <input class="song" v-model="value" placeholder="请输入转赠时设置的密码" />
                    </div>
                    <div class="btn">
                        <b @click="handleGive()">立即领取</b>
                    </div>
                    <div class="colse" @click="confirmPopHide"><span><img src="../assets/icon_close.png" alt=""></span></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import wxapi from '@/lib/wx.js'

export default {
    name: 'GiveCard',
    data() {
        return {
            user_id: '',
            cdid: '',
            give_id: '',
            exchange_id: '',
            title: '',
            getCode: '',
            share_url: '',
            cardList: [],
            page: 1,
            desc: '',
            user: {},
            card: {},
            currSize: 0,
            pageSize: 10,
            confirmPop: true,
            cardAddPop: true
        }
    },
    components: {},
    methods: {
        goHome(){
            this.$router.push({name:"Index"})
        },
        maskingHideFn() {
            this.maskingShow = false;
        },
        useCard(index) {
            let card = this.cardList[index]
            this.$localstore.set('usecard', card)
            this.$router.push({ name: 'UseCard' })
        },
        confirmPopHide() {
            this.confirmPop = false
        },
        cardAddPopShow() {
            this.cardAddPop = true;
        },
        cardAddPopHide() {
            this.cardAddPop = false;
        },
        //卡片详情
        goCardDetail(index) {
            let card = this.cardList[index]
            this.$localstore.set('usecard', card)
            this.$router.push({ name: 'CardDetailsTow' })
        },
        //领取卡片
        async getCard() {
            if (this.getCode == '') {
                this.$message('兑换码不能为空！')
                return false
            }
            let data = { user_id: this.user_id,exchange_id:this.exchange_id,redeem_code: this.getCode }
            let res = await this.$postRequest('/card/GetGiveCard', data)
            this.$message(res.data.msg);
            if (res.data.code == 1) {
                this.cardAddPop = false;
                this.getCardList()
            }
        },


    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.body.style.background = "#F6F6F6";
        let user = this.$localstore.get('userInfo')
        this.user = user
        this.user_id = user.user_id
        this.give_id = this.$route.query.give_id
        this.exchange_id = this.$route.query.exchange_id
        this.title = this.$route.query.title

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
.MyCardBag {
    header {
        height: 1rem;
        display: flex;
        align-items: center;
        width: 6.6rem;
        justify-content: space-between;
        margin: 0 auto;
        padding-top: .3rem;
        margin-bottom: .2rem;

        .icon_return {
            width: 1rem;
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
        }

        .add {
            width: 1rem;
            text-align: right;
            font-size: .28rem;
            color: #FF6D69;
        }
    }

    .to_be_used {
        width: 6.6rem;
        margin: 0 auto;
        border-radius: 10px;
        overflow: hidden;
        background: #fff;
        margin-bottom: .2rem;

        i {
            overflow: hidden;
            display: block;
            height: 2.4rem;
        }

        .user {
            display: flex;
            padding-left: .4rem;
            height: .6rem;
            position: relative;

            span {
                width: .88rem;
                height: .88rem;
                border-radius: 50%;
                overflow: hidden;
                position: absolute;
                top: -.44rem;
            }

            p {
                padding-left: 1.1rem;
                font-size: .28rem;
                color: #515C6F;
            }
        }

        .content {
            display: flex;
            padding: 0 .28rem .2rem .4rem;
            align-items: flex-end;

            .text {
                display: flex;
                align-items: flex-start;
                flex: 1;
                flex-direction: column;
                justify-content: flex-start;

                p {
                    font-size: .24rem;
                    color: #535D70;
                }

                span {
                    font-size: .22rem;
                    color: #FFB389;
                    padding-top: .1rem;
                }
            }

            .btn {
                width: 1.4rem;
                height: .52rem;
                line-height: .52rem;
                text-align: center;
                color: #fff;
                background: #FF6666;
                border-radius: 50px;

                a {
                    color: #fff;
                }
            }
        }
    }

    .card_commonality {
        width: 6.6rem;
        margin: 0 auto;
        border-radius: 10px;
        overflow: hidden;
        background: #fff;
        margin-bottom: .2rem;

        .image {
            height: 2.4rem;
            position: relative;
            overflow: hidden;

            i {
                overflow: hidden;
                display: block;
            }

            div {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(4, 4, 4, 0.4);
                display: flex;
                align-items: center;
                justify-content: center;

                p {
                    position: absolute;
                    left: .28rem;
                    top: .18rem;
                    color: #fff;
                }

                em {
                    position: absolute;
                    right: .18rem;
                    width: .48rem;
                    height: .48rem;
                    top: .18rem;
                }

                span {
                    width: 1.72rem;
                    height: 1.72rem;
                    line-height: 1.72rem;
                    text-align: center;
                    color: #FF6666;
                    font-size: .28rem;
                    background: #fff;
                    border-radius: 50%;
                    overflow: hidden;

                    &.color_hei {
                        color: #515C6F;
                    }
                }

            }
        }

        .content {
            display: flex;
            padding: .16rem .28rem .2rem .4rem;
            align-items: flex-end;

            .text {
                display: flex;
                align-items: flex-start;
                flex: 1;
                flex-direction: column;
                justify-content: flex-start;

                p {
                    font-size: .24rem;
                    color: #535D70;
                }

                span {
                    font-size: .22rem;
                    color: #FFB389;
                    padding-top: .1rem;
                }
            }

            .btn {
                width: 1.4rem;
                height: .52rem;
                line-height: .52rem;
                text-align: center;
                color: #fff;
                background: #FF6666;
                border-radius: 50px;

                a {
                    color: #fff;
                }
            }
        }
    }

    .card_add_pop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: .5);

        .card_add {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .detail {
                display: block;
            }

            div {
                background: #fff;
                border-radius: 10px;
                width: 6.32rem;
                position: relative;
                padding-bottom: .74rem;

                span {
                    width: 1rem;
                    height: 1rem;
                    display: flex;
                    justify-content: flex-end;
                    position: absolute;
                    top: .24rem;
                    right: .24rem;

                    em {
                        width: .49rem;
                        height: .49rem;
                        overflow: hidden;
                        border-radius: 50%;
                    }
                }

                h3 {
                    font-size: .32rem;
                    color: #515C6F;
                    text-align: center;
                    padding-top: 1rem;
                }

                p {
                    width: 5.26rem;
                    height: .82rem;
                    display: flex;
                    align-items: center;
                    margin: .28rem auto .46rem;
                    background: #EEEEEF;
                    border-radius: 5px;

                    input {
                        flex: 1;
                        outline: medium;
                        height: 100%;
                        background: none;
                        padding-left: .3rem;
                    }

                    i {
                        width: .36rem;
                        height: .36rem;
                        overflow: hidden;
                        margin-right: .26rem;
                    }
                }

                a {
                    width: 3.7rem;
                    height: .8rem;
                    line-height: .8rem;
                    text-align: center;
                    font-weight: bold;
                    color: #fff;
                    border-radius: 50px;
                    background: #FF6666;
                    display: block;
                    margin: 0 auto;
                }
            }
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

                    input{
                        border: 1px solid #ccc;
                        padding: 0.1rem 0.2rem;
                        border-radius:6px;
                        width:100%;
                        font-size:14px;
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