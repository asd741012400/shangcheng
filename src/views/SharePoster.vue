<template>
    <div class="SharePoster">
        <div class="share_poster">
            <i @click="$router.go(-1)"><img src="../assets/icon_close3.png" alt=""></i>
            <div class="share_poster_content">
                <div class="Poster" ref="imageDom">
                    <div class="name">
                        <span><img src="../assets/head_portrait.png" alt=""></span>
                        <b>小皮孩儿</b>
                    </div>
                    <div class="img"><img src="../assets/img2.png" alt=""></div>
                        <div class="code">
                            <div class="code_text">
                                <h3>加勒比儿童票一大一小加勒比</h3>
                                <a>限购一份</a>
                                <p><i>￥</i><span>100</span></p>
                            </div>
                            <div class="code_img">
                                <span><img src="../assets/code2.png" alt=""></span>
                                <p>扫码立享批发价</p>
                            </div>
                        </div>
                    </div>
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
                    <li @click="handleJpeg()">
                        <span><img src="../assets/share_download.png" alt=""></span>
                        <p>保存图片</p>
                    </li>
                </ul>
            </div>
        </div>
</template>
<script>
import wxapi from '@/lib/wx.js'
import html2canvas from "html2canvas"
// import Poster from '../components/Poster'

export default {
    name: 'SharePoster',
    data() {
        return {}
    },
    components: {
        // Poster
    },
    methods: {
                //导出图片
        handleJpeg() {
            let vm = this;
            // let table = this.$refs.crud.$el;
            let table = this.$refs.imageDom1;
            html2canvas(table).then(canvas => {
                var url = canvas.toDataURL();
                let a = document.createElement("a");
                a.href = url;
                a.download = "未命名";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
        },
        clickGeneratePicture() {
            html2canvas(this.$refs.imageDom).then(canvas => {
                // 转成图片，生成图片地址
                this.imgUrl = canvas.toDataURL("image/png");
                var eleLink = document.createElement("a");
                eleLink.href = this.imgUrl; // 转换后的图片地址
                eleLink.download = "pictureName";
                // 触发点击
                document.body.appendChild(eleLink);
                eleLink.click();
                // 然后移除
                document.body.removeChild(eleLink);

            });
        },
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
            // let option = {
            //     title: '限时团购周 挑战最低价', // 分享标题, 请自行替换
            //     link: window.location.href.split('#')[0], // 分享链接，根据自身项目决定是否需要split
            //     imgUrl: 'http://yuouimg.shizuyx.com/201904/21/1555823185712683.jpg', // 分享图标, 请自行替换，需要绝对路径
            //     success: () => {
            //         alert('分享成功')
            //     },
            //     error: () => {
            //         alert('已取消分享')
            //     }
            // }
            // // 将配置注入通用方法
            // wxapi.ShareTimeline(option)
        },
        wxShareAppMessage() {
            // 微信自定义分享给朋友
            // let option = {
            //     title: '限时团购周 挑战最低价', // 分享标题, 请自行替换
            //     desc: '限时团购周 挑战最低价', // 分享描述, 请自行替换
            //     link: window.location.href.split('#')[0], // 分享链接，根据自身项目决定是否需要split
            //     imgUrl: 'http://yuouimg.shizuyx.com/201904/21/1555823185712683.jpg', // 分享图标, 请自行替换，需要绝对路径
            //     success: () => {
            //         alert('分享成功')
            //     },
            //     error: () => {
            //         alert('已取消分享')
            //     }
            // }
            // // 将配置注入通用方法
            // wxapi.ShareAppMessage(option)
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

.Poster {
    height: 100%;
    background: linear-gradient(180deg, rgba(255, 102, 102, 1) 0%, rgba(255, 179, 137, 1) 100%);

    .name {
        display: flex;
        align-items: center;
        padding: .28rem .18rem .14rem;

        span {
            width: 1rem;
            height: 1rem;
            overflow: hidden;
            border: 4px solid #FF947B;
            border-radius: 50%;
            margin-left: .26rem;
        }

        b {
            font-size: .2rem;
            color: #fff;
            padding-left: .18rem;
        }
    }

    .img {
        overflow: hidden;
        margin: 0 .18rem;
        height: 5rem;
        border-radius: 5px;
    }

    .code {
        display: flex;
        background: #fff;
        align-items: center;
        border-radius: 5px;
        margin: .1rem .18rem 0;
        overflow: hidden;
        padding: .26rem .2rem .24rem .26rem;

        .code_text {
            flex: 1;

            h3 {
                font-size: .28rem;
                font-weight: bold;
                color: #515C6F;

            }

            a {
                display: block;
                width: 1.2rem;
                height: .32rem;
                line-height: .32rem;
                text-align: center;
                color: #FFB389;
                border-radius: 15px;
                border: 1px solid #FFB389;
            }

            p {
                display: flex;
                align-items: flex-end;
                color: #FF6967;
                padding-top: .2rem;

                i {
                    font-size: .2rem;
                    font-weight: bold;
                    font-style: normal;
                }

                span {
                    font-size: .3rem;
                    font-weight: bold;
                }
            }
        }

        .code_img {
            width: 1.68rem;
            display: flex;
            align-items: center;
            flex-direction: column;

            span {
                width: 1.38rem;
                overflow: hidden;
            }

            p {
                color: #515C6F;
                font-size: .2rem;
            }
        }
    }
}
</style>