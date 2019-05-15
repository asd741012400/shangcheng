<template>
    <div class="MyCardBag">
        <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">我的卡包</div>
            <div class="add" @click="cardAddPopShow">添加</div>
        </header>
        <template v-for="(item,index) in cardList">
            <!-- 是否过期 days < 0 过期 -->
            <template v-if="item.days < 0">
                <div class="expired card_commonality">
                    <div class="image">
                        <i><img :src="$imgUrl + item.thumb_img" alt=""></i>
                        <div>
                            <p>卡号：{{item.card_sn}}</p>
                            <span class="color_hei">已过期</span>
                            <em><img src="../assets/icon_close.png" alt=""></em>
                        </div>
                    </div>
                    <div class="content">
                        <div class="text">
                            <p>{{item.card_name}}</p>
                            <!-- <span>剩余{{item.days}}天</span> -->
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <!--  'ac_status 0 未激活 1已激活 2作废 -->
                <template v-if="item.ac_status == 0">
                    <div class="to_activate card_commonality">
                        <div class="image">
                            <i><img :src="$imgUrl + item.thumb_img" alt=""></i>
                            <div>
                                <p>卡号：{{item.card_sn}}</p>
                                <span @click="activeCard(index)">去激活</span>
                            </div>
                        </div>
                        <div class="content">
                            <div class="text">
                                <p>{{item.card_name}}</p>
                                <span>剩余{{item.days}}天</span>
                            </div>
                            <!--           <div class="btn" @click="confirmPopShow(index)">
                            <span>转赠</span>
                        </div> -->
                        </div>
                    </div>
                </template>
                <template v-else-if="item.ac_status == 1">
                    <div class="to_be_used" @click="goCardDetail(index)">
                        <div class="sn">
                            <p>卡号：{{item.card_sn}}</p>
                        </div>
                        <i><img :src="$imgUrl + item.thumb_img" alt=""></i>
                        <div class="user">
                            <span><img :src="$imgUrl+item.head_img" alt=""></span>
                            <p>{{item.child_name}}</p>
                        </div>
                        <div class="content">
                            <div class="text">
                                <p>{{item.card_name}}</p>
                                <span>剩余{{item.days}}天</span>
                            </div>
                            <div class="btn">
                                <span @click.stop="useCard(index)">去使用</span>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else-if="item.ac_status == 2">
                    <div class="expired card_commonality">
                        <div class="image">
                            <i><img :src="$imgUrl + item.thumb_img" alt=""></i>
                            <div>
                                <p>卡号：{{item.card_sn}}</p>
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
        </template>
        <!-- 兑换码 -->
        <div class="card_add_pop" v-if="cardAddPop">
            <div class="card_add">
                <div>
                    <span class="close" @click="cardAddPopHide"><em><img src="../assets/icon_close.png" alt=""></em></span>
                    <h3>兑换码</h3>
                    <p>
                        <input  v-model="getCode">
                        <!-- <i><img src="../assets/icon_close2.png" alt=""></i> -->
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
                    <div class="agreement">
                        <input class="song"  v-model="value" placeholder="请输入转赠密码" />
                    </div>
                    <div class="btn">
                        <a @click="confirmPopHide">取 消</a>
                        <b @click="handleGive()">确 定</b>
                    </div>
                    <div class="colse" @click="confirmPopHide"><span><img src="../assets/icon_close.png" alt=""></span></div>
                </div>
            </div>
        </div>
        <!-- 转赠须知 -->
        <!-- 分享 -->
        <div class="masking" v-if="maskingShow">
            <span @click="maskingHideFn"><img src="../assets/share_img2.png" alt=""></span>
            <div>
                <i><img src="../assets/share_img1.png" alt=""></i>
                <p>点击上方分享此卡片给好友吧,让好友领取吧~</p>
            </div>
        </div>
        <!-- 分享 -->
    </div>
</template>
<script>
import wxapi from '@/lib/wx.js'

export default {
    name: 'MyCardBag',
    data() {
        return {
            user_id: '',
            cdid: '',
            value: '',
            getCode: '',
            share_url: '',
            cardList: [],
            page: 1,
            desc: '',
            user: {},
            card: {},
            currSize: 0,
            pageSize: 10,
            confirmPop: false,
            maskingShow: false,
            cardAddPop: false
        }
    },
    components: {},
    methods: {
        //删除卡片
        async delCard(item) {
            this.$dialog.alert({
                showCancelButton: true,
                message: '你确定删除该卡片吗？'
            }).then(async () => {
                let res = await this.$getRequest('/card/delcard', { user_id: this.user.user_id, card_id: item.card_id })
                this.$message(res.data.msg)
                if (res.data.code == 1) {
                    setTimeout(() => {
                        this.getCardList();
                    }, 2000)
                }
            }).catch(() => {

            });
        },
        maskingHideFn() {
            this.maskingShow = false;
        },
        useCard(index) {
            let card = this.cardList[index]
            this.$localstore.set('usecard', card)
            this.$router.push({ name: 'UseCard' })
        },
        //激活
        activeCard(index) {
            let card = this.cardList[index]
            this.$localstore.set('usecard', card)
            this.$router.push({ name: 'CardActivate', query: { id: card.cgid } })
        },
        //转赠
        confirmPopShow(index) {
            this.desc = this.cardList[index].give_other
            this.cdid = this.cardList[index].cdid
            this.card = this.cardList[index]
            this.share_url = 'http://' + window.location.host + '/#/GiveCard?give_id=' + this.user_id + '&title=' + this.card.card_name
            wxapi.wxRegister(this.wxRegCallback)
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
            let data = { code: this.code, user_id: this.user.user_id }
            let res = await this.$postRequest('/user/GetThings', data)
            this.$message(res.data.msg);
            if (res.data.code == 1) {
                this.code == ''
                this.cardAddPop = false;
                this.getCardList()
            }
        },
        //赠送卡片
        async handleGive() {
            if (this.value == '') {
                this.$message('转赠码不能为空！')
                return false
            }
            let data = {
                cdid: this.cdid,
                card_password: this.value
            }
            let res = await this.$postRequest('/card/GiveCard', data)
            this.$message(res.data.msg);
            if (res.data.code == 1) {
                this.confirmPop = false
                this.maskingShow = true;
                this.value = ''
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
            if (res.data.data.list) {
                this.cardList = res.data.data.list
                this.currSize = res.data.data.list.length
                this.pageSize = res.data.data.count
            }

        },
        //获取更多卡包
        async getCardListMore() {
            let res = await this.$getRequest('card/GetMyCardList', { user_id: this.user_id, page: this.page })
            let data = res.data.data.list
            this.cardList = this.cardList.concat(data);
            this.currSize = res.data.data.list.length
        },
        // 用于微信JS-SDK回调
        wxRegCallback() {
            this.wxShareTimeline()
            this.wxShareAppMessage()
        },
        // 微信自定义分享到朋友圈
        wxShareTimeline() {
            let option = {
                title: this.card.card_name, // 分享标题, 请自行替换
                link: this.share_url, // 分享链接，根据自身项目决定是否需要split
                imgUrl: this.$imgUrl + this.card.thumb_img, // 分享图标, 请自行替换，需要绝对路径
                success: () => {
                    // alert('分享成功')
                },
                error: () => {
                    // alert('已取消分享')
                }
            }
            // 将配置注入通用方法
            wxapi.ShareTimeline(option)
        },
        // 微信自定义分享给朋友
        wxShareAppMessage() {
            let option = {
                title: this.card.card_name, // 分享标题, 请自行替换
                desc: '你的好友' + this.user.username + '赠送了你一张' + this.card.card_name + '卡片,快来领取吧！', // 分享描述, 请自行替换
                link: this.share_url, // 分享链接，根据自身项目决定是否需要split
                imgUrl: this.$imgUrl + this.card.thumb_img, // 分享图标, 请自行替换，需要绝对路径
                success: () => {
                    // alert('分享成功')
                },
                error: () => {
                    // alert('已取消分享')
                }
            }
            // 将配置注入通用方法
            wxapi.ShareAppMessage(option)
        },
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        let user = this.$localstore.get('wx_user')
        this.user = user
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
            if (scrollTop + windowHeight >= scrollHeight / 1.5) {
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
        position: relative;

        .sn {
            position: absolute;                         
            left: .28rem;
            top: .18rem;
            color: #fff;
        }

        i {
            overflow: hidden;
            display: block;
            height: 2.4rem;
              
            img {
                display: block;
                width: 100%;
                height: 2.4rem;
                object-fit: cover;
            }
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
                    font-size: .26rem;
                    color: #535D70;
                }

                span {
                    font-size: .26rem;
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
                font-size: 0.24rem;

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

                img {
                    display: block;
                    width: 100%;
                    height: 2.4rem;
                    object-fit: cover;
                }
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
                    font-size: .24rem;
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
                font-size: 0.24rem;

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
                    font-weight: bold;
                    font-size: 0.32rem;
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

.masking {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.5);
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
        width: 3.48rem;
        overflow: hidden;
    }

    div {
        position: absolute;
        right: .5rem;
        top: 0;

        p {
            width: 2rem;
            font-size: .36rem;
            margin: 1.5rem .6rem 0 0;
            color: #fff;
            text-align: center;
        }

        i {
            width: 1.2rem;
            overflow: hidden;
            position: absolute;
            right: 0;
            top: 0;
        }
    }
}
</style>