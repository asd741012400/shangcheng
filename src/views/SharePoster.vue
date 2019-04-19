<template>
    <div class="SharePoster">
        <div class="share_poster">
            <i @click="$router.go(-1)"><img src="../assets/icon_close3.png" alt=""></i>
            <div class="share_poster_content">
                <Poster ref="myPoster"></Poster>
            </div>
            <ul class="share_type">
                <li @click="shareBtn()">
                    <span><img src="../assets/share_wx.png" alt=""></span>
                    <p>微信</p>
                </li>
                <li>
                    <span><img src="../assets/share_circle_of_friends.png" alt=""></span>
                    <p>朋友圈</p>
                </li>
                <li @click="downloadImg">
                    <span><img src="../assets/share_download.png" alt=""></span>
                    <p>保存图片</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import wx from 'weixin-js-sdk' //微信sdk依赖

import Poster from '../components/Poster'

export default {
    name: 'SharePoster',
    data() {
        return {}
    },
    components: {
        Poster
    },
    methods: {
        downloadImg() {
            this.$refs.myPoster.clickGeneratePicture();
        },
        async shareBtn() {
            let url = window.location.href
            let res = await this.$getRequest('/wechat/GetWxJSSDK', { url: url })
            let config = res.data.data
            wx.config({
                debug: config.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: config.appId, // 必填，公众号的唯一标识
                timestamp: config.timestamp, // 必填，生成签名的时间戳
                nonceStr: config.nonceStr, // 必填，生成签名的随机串
                signature: config.signature, // 必填，签名
                jsApiList: config.jsApiList // 必填，需要使用的JS接口列表
            })
            //获取微信jssdk
            wx.ready(function() {
                wx.onMenuShareAppMessage({
                    title: '2222222222',
                    desc: '3333333333',
                    link: url,
                    imgUrl: 'http://xjz.cqjlp.com.cn/public/thumb/article/article_sub_thumb_191988_550_550.jpeg',
                    trigger: function trigger(res) {
                        console.log(res);
                    },
                    success: function success(res) {
                        console.log('已分享');
                    },
                    cancel: function cancel(res) {
                        console.log('已取消');
                    },
                    fail: function fail(res) {
                        alert(JSON.stringify(res));
                    }
                })
            });

        }
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {

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
.SharePoster {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(255, 102, 102, 1) 0%, rgba(255, 179, 137, 1) 100%);
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: scroll;

    .share_poster {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        overflow-y: scroll;
        height: 100%;
        background: rgba($color: #2E2E2E, $alpha: 0.44);

        i {
            position: absolute;
            right: .48rem;
            top: .48rem;
            overflow: hidden;
            width: .49rem;
        }

        .share_poster_content {
            width: 5.36rem;
            margin: 1.36rem auto 0;
            height: 9.54rem;
        }

        .share_type {
            width: 5.36rem;
            margin: .44rem auto;
            display: flex;
            align-items: center;
            justify-content: space-around;

            li {
                display: flex;
                align-items: center;
                flex-direction: column;

                span {
                    width: 1rem;
                    overflow: hidden;
                }

                p {
                    font-size: .24rem;
                    color: #FFFFFF;
                    padding-top: .14rem;
                }
            }
        }
    }
}
</style>