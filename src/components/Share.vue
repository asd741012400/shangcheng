<template>
    <div class="Share">
        <div class="share_bg" v-if="shareShow" @click="shareHideFn">
            <div class="share_div" @click.stop>
                <h3><span>分享赚</span><a>4.99</a>元</h3>
                <p>好友通过你的购买链接进行购买，你将获得至少<span>12</span>元的分享收益</p>
                <ul>
                    <li @click="maskingShowFn">
                        <span><img src="../assets/share_wx.png" alt=""></span>
                        <a>发送好友</a>
                    </li>
                    <li @click="maskingShowFn">
                        <span><img src="../assets/share_circle_of_friends.png" alt=""></span>
                        <a>朋友圈</a>
                    </li>
                    <template v-if="$route.name !== 'MyShop'">
                        <li @click="showPoster()">
                            <span><img src="../assets/share_code.png" alt=""></span>
                            <a>生成海报</a>
                        </li>
                    </template>
                    <li v-clipboard:copy="message">
                        <span><img src="../assets/share_copy.png" alt=""></span>
                        <a>复制链接</a>
                    </li>
                </ul>
                <b @click="shareHideFn">取 消</b>
            </div>
        </div>

        <div class="masking" v-if="maskingShow">
            <span @click="maskingHideFn"><img src="../assets/share_img2.png" alt=""></span>
            <div>
                <i><img src="../assets/share_img1.png" alt=""></i>
                <p>微信分享移到这里啦~</p>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
export default {
    name: 'Share',
    data() {
        return {
            message: "123",  
            shareShow: false,
            maskingShow:false
        }
    },
    props: [
        'goodsId',
        'type',
    ],
    components: {},
    methods: {
        showPoster() {
            this.$router.push({
                name: "SharePoster",
                query:{
                    id:this.goodsId,
                    type:this.type,
                }
            });
        },
        shareShowFn(ev) {
            this.shareShow = true;
        },
        shareHideFn() {
            this.shareShow = false;
        },
        maskingShowFn(ev) {
            this.maskingShow = true;
        },
        maskingHideFn() {
            this.maskingShow = false;
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
    mounted() {

    },

    // 更新前状态
    beforeUpdate() {},

    // 更新完成状态
    updated() {

    },

    // 销毁前状态
    beforeDestroy() {},

    // 销毁完成状态
    destroyed() {}

}
</script>
<style lang="scss" scoped>
.Share {
    .share_bg {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba($color: #000000, $alpha: 0.5);
        display: flex;
        align-items: flex-end;
        z-index: 999;

        .share_div {
            background: #fff;
            width: 100%;

            h3 {
                font-size: .32rem;
                color: #FF6867;
                text-align: center;
                padding-top: .42rem;
                display: flex;
                justify-content: center;

                a {
                    padding-left: .12rem;
                }
            }

            p {
                font-size: .24rem;
                color: #515C6F;
                padding: 0 .3rem .48rem;
                border-bottom: 1px solid #E2E2E2;
                text-align: center;

                span {
                    color: #FF6766;
                }
            }

            ul {
                display: flex;
                align-items: center;
                justify-content: space-around;
                padding: .5rem 0 .6rem;

                li {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    span {
                        width: 1rem;
                        overflow: hidden;
                    }

                    a {
                        font-size: .24rem;
                        color: #525D70;
                        padding-top: .14rem;
                    }
                }
            }

            b {
                line-height: 1.34rem;
                height: 1.34rem;
                background: #F6F6F6;
                text-align: center;
                font-size: .32rem;
                color: #525D70;
                display: block;
            }
        }
    }
    .masking{
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
        span{
            width: 3.48rem;
            overflow: hidden;
        }
        div{
            position: absolute;
            right: .5rem;
            top: 0;
            p{
                width: 2rem;
                font-size: .36rem;
                margin: 1.5rem .6rem 0 0;
                color: #fff;
                text-align: center;
            }
            i{
                width: 1.2rem;
                overflow: hidden;
                position: absolute;
                right: 0;
                top: 0;
            }
        }
    }
}
</style>