<template>
    <div class="SharePlus">
        <div class="share_poster">
            <i @click="$router.go(-1)"><img src="../assets/icon_close3.png" alt=""></i>
            <div class="share_poster_content">
                <Poster ref="myPoster"></Poster>
            </div>
            <ul class="share_type">
                <li @click="wxShare()">
                    <span><img src="../assets/share_wx.png" alt=""></span>
                    <p>微信</p>
                </li>
                <li @click="wxFriendShare()">
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
import wxapi from '@/lib/wx.js'

import Poster from '../components/Poster'

export default {
    name: 'SharePlus',
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
        wxShare() {
            // 用于微信JS-SDK回调            
            wxapi.wxRegister(this.wxShareTimeline)
            // this.wxShareAppMessage()
        },

        wxFriendShare() {
            // 用于微信JS-SDK回调            
            wxapi.wxRegister(this.wxShareAppMessage)
            // this.wxShareAppMessage()
        },
        wxShareTimeline() {
            // 微信自定义分享到朋友圈
            let option = {
                title: '限时团购周 挑战最低价', // 分享标题, 请自行替换
                link: window.location.href.split('#')[0], // 分享链接，根据自身项目决定是否需要split
                imgUrl: 'http://yuouimg.shizuyx.com/201904/21/1555823185712683.jpg', // 分享图标, 请自行替换，需要绝对路径
                success: () => {
                    alert('分享成功')
                },
                error: () => {
                    alert('已取消分享')
                }
            }
            // 将配置注入通用方法
            wxapi.ShareTimeline(option)
        },
        wxShareAppMessage() {
            // 微信自定义分享给朋友
            let option = {
                title: '限时团购周 挑战最低价', // 分享标题, 请自行替换
                desc: '限时团购周 挑战最低价', // 分享描述, 请自行替换
                link: window.location.href.split('#')[0], // 分享链接，根据自身项目决定是否需要split
                imgUrl: 'http://yuouimg.shizuyx.com/201904/21/1555823185712683.jpg', // 分享图标, 请自行替换，需要绝对路径
                success: () => {
                    alert('分享成功')
                },
                error: () => {
                    alert('已取消分享')
                }
            }
            // 将配置注入通用方法
            wxapi.ShareAppMessage(option)
        }
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.body.style.background = "#fff";
    },

    // 挂载前状态
    beforeMount() {},

    // 挂载结束状态
    mounted() {
        // wxapi.wxRegister(this.wxRegCallback)
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
.SharePlus {
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