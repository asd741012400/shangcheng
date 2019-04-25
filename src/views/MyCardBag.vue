<template>
    <div class="MyCardBag">
        <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">我的卡包</div>
            <div class="add" @click="cardAddPopShow">添加</div>
        </header>
        <template v-for="(item,index) in cardList">
            <!--  'ac_status 0 未激活 1已激活 2作废 -->
            <template v-if="item.ac_status == 0">
                <div class="to_activate card_commonality">
                    <div class="image">
                        <i><img src="../assets/img3.png" alt=""></i>
                        <router-link :to="{name:'CardActivate',query:{id:item.card_id}}">
                            <div>
                                <p>卡号：{{item.card_sn}}</p>
                                <span>去激活</span>
                            </div>
                        </router-link>
                    </div>
                    <div class="content">
                        <div class="text">
                            <p>{{item.card_name}}</p>
                            <!-- <span>剩余20天</span> -->
                        </div>
                        <div class="btn">
                            <span @click="confirmPopShow(index)">转赠</span>
                        </div>
                    </div>
                </div>
            </template>
            <!-- 正常 -->
            <template v-else-if="item.ac_status == 1">
                <div class="to_be_used">
                    <i><img src="../assets/img3.png" alt=""></i>
                    <div class="user">
                        <span><img src="../assets/img1.png" alt=""></span>
                        <p>小宝</p>
                    </div>
                    <div class="content">
                        <div class="text">
                            <p>{{item.card_name}}</p>
                            <span>剩余{{getLimitDay(item.limit_etime)}}20天</span>
                        </div>
                        <div class="btn">
                            <router-link :to="{name:'UseCard',query:{id:id}}">
                                <span>去使用</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </template>
            <!-- 过期 -->
            <template v-else>
                <div class="expired card_commonality">
                    <div class="image">
                        <i><img src="../assets/img3.png" alt=""></i>
                        <div>
                            <p>卡号：00000000</p>
                            <span class="color_hei">已过期</span>
                            <em><img src="../assets/icon_close.png" alt=""></em>
                        </div>
                    </div>
                    <div class="content">
                        <div class="text">
                            <p>{{item.card_name}}</p>
                        </div>
                    </div>
                </div>
            </template>
        </template>
        <!--  -->
        <div class="card_add_pop" v-if="cardAddPop">
            <div class="card_add">
                <div>
                    <span class="close" @click="cardAddPopHide"><em><img src="../assets/icon_close.png" alt=""></em></span>
                    <h3>兑换码</h3>
                    <p>
                        <input type="text" v-model="getCode">
                        <i><img src="../assets/icon_close2.png" alt=""></i>
                    </p>
                    <a @click="getCard">提 交</a>
                </div>
            </div>
        </div>
        <!-- 转赠须知 -->
        <div class="confirm_pop_bg" v-if="confirmPop">
            <div class="confirm_pop">
                <div class="boxs">
                    <h3>转赠须知</h3>
                    <div class="detail" v-html="desc">
                    </div>
                    <!--                    <ul>
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
                        <input class="song" type="password" v-model="value" placeholder="请输入转赠密码" />
                    </div>
                    <div class="btn">
                        <a @click="confirmPopHide">取 消</a>
                        <b @click="handleGive(item.exchange_id)">确 定</b>
                    </div>
                    <div class="colse" @click="confirmPopHide"><span><img src="../assets/icon_close.png" alt=""></span></div>
                </div>
            </div>
        </div>
        <!-- 转赠须知 -->
    </div>
</template>
<script>
export default {
    name: 'MyCardBag',
    data() {
        return {
            user_id: '',
            value: '',
            getCode: '',
            cardList: [],
            page: 1,
            desc: '',
            user: {},
            currSize: 0,
            pageSize: 10,
            confirmPop: false,
            cardAddPop: false
        }
    },
    components: {},
    methods: {
        confirmPopShow(index) {
            this.desc = this.cardList[index].give_other
            this.confirmPop = true
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
        //获取卡片
        async getCard() {
            let res = await this.$postRequest('/card/GetGiveCard', { user_id: this.user_id, redeem_code: this.getCode })
            this.$message(res.data.msg);
            if (res.data.code == 1) {
                // this.getCardList()
            }
        },
        //赠送卡片
        async handleGive(id) {
            let res = await this.$postRequest('/card/GiveCard', { user_id: this.user_id, exchange_id: id, redeem_code: this.value })
            this.$message(res.data.msg);
            if (res.data.code == 1) {
                // this.getCardList()
            }
        },
        getLimitDay(day) {
            let now = this.$dayjs().format('YYYY-MM-DD')
            const date1 = this.$dayjs(now)
            const date2 = this.$dayjs(day)
            let num = date1.diff(date2, 'day')
            if (num <= 0) {
                return false
            } else {
                return num
            }

        },
        //获取卡包
        async getCardList(index) {
            this.cardList = []
            let res = await this.$getRequest('card/GetMyCardList', { user_id: this.user_id, page: this.page })
            this.cardList = res.data.data.list
            this.currSize = res.data.data.list.length
            this.pageSize = res.data.data.count
        },

        //获取更多卡包
        async getCardListMore() {
            let res = await this.$getRequest('card/GetMyCardList', { user_id: this.user_id, page: this.page })
            let data = res.data.data.list
            this.cardList = this.cardList.concat(data);
            this.currSize = res.data.data.list.length
        },
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        let user = this.$localstore.get('userInfo')
        this.user_id = user.user_id
        this.getCardList()
        document.body.style.background = "#F6F6F6";

        window.onscroll = () => {
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            //滚动条到底部的条件
            if (scrollTop + windowHeight == scrollHeight) {
                if (this.currSize >= this.pageSize) {
                    this.page++;
                    this.getCardListMore()
                }
            }
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