<template>
    <div class="VipPlus">
        <img class="poster-img" ref="image" :src="imgUrl">
        <div ref="imageDom" class="imageDom">
            <div class="head_portrait"><img :src="avatar" alt=""></div>
                <div class="code" id="qrcode">
                </div>
                <div class="img"><img :src="poster_img" alt=""></div>
                </div>
                <!--            <div class="masking" v-if="maskingShow">
                    <span @click="maskingHideFn"><img src="../assets/share_img2.png" alt=""></span>
                    <div>
                        <i><img src="../assets/share_img1.png" alt=""></i>
                        <p>微信分享移到这里啦~</p>
                    </div>
                </div> -->
            </div>
</template>
<script>
import wx from 'weixin-js-sdk'
import QRCode from 'qrcodejs2'
import html2canvas from "html2canvas"

export default {
    name: 'SharePoster',
    data() {
        return {
            user: {},
            imgUrl: '',
            type: "",
            goods_id: "",
            money: "",
            plus: "",
            title: "",
            price: "",
            avatar: "",
            instance: "",
            wechat_img: "",
            poster_img: "",
            maskingShow: false,
        }
    },
    components: {
        // Poster
    },
    methods: {
        maskingShowFn(ev) {
            this.maskingShow = true;
        },
        maskingHideFn() {
            this.maskingShow = false;
        },
        async toBase64(img) {
            let res = await this.$postRequest('/upload/Tobase64', { img: img })
            return res.data.data
        },
        //获取PlUS
        async getPlUS() {
            let id = this.$route.query.id
            let res = await this.$getRequest('/home/GetPlus')
            this.plus = res.data.data
            this.poster_img = await this.toBase64(this.$imgUrl + this.plus.poster)
            this.wxRegister()

            //生成二维码
            let qrcode = new QRCode('qrcode', {
                width: 80,
                height: 80, // 高度
                text: this.$HOME_URL + '/#/VipEquity?share_id=' + this.user.user_id +
                    '&type=2', // 二维码内容
                // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                // background: '#f0f',
                // foreground: '#ff0'
            })


            //判断图片是否加载完成
            let timer = setInterval(() => {
                if (this.poster_img) {
                    this.instance.close();
                    this.$message('海报制作完成，长按海报分享给朋友吧！');
                    this.getPoster()
                    // this.maskingShow = true
                    clearInterval(timer)
                }
            }, 100)
        },
        //海报生成
        getPoster() {
            let that = this
            html2canvas(that.$refs.imageDom, {
                useCORS: true, //（图片跨域相关）
                allowTaint: false
            }).then((canvas) => {
                // that.imgUrl = URL.createObjectURL(that.base64ToBlob(canvas.toDataURL()))
                let dataURL = canvas.toDataURL("image/jpeg");
                that.imgUrl = dataURL;
            });
        },
        /**
         *
         * @param url 图片路径
         * @param ext 图片格式
         * @param callback 结果回调
         */
        getUrlBase64(url) {
            var canvas = document.createElement("canvas"); //创建canvas DOM元素
            var ctx = canvas.getContext("2d");
            var img = new Image;
            img.crossOrigin = 'Anonymous';
            img.src = url + '?number=' + Math.random();
            img.onload = function() {
                canvas.height = 60; //指定画板的高度,自定义
                canvas.width = 85; //指定画板的宽度，自定义
                ctx.drawImage(img, 0, 0, 60, 85); //参数可自定义
                var dataURL = canvas.toDataURL("image/png");
                canvas = null;
                return dataURL //回掉函数获取Base64编码
            };
        },
        //base64转blob
        base64ToBlob(code) {
            let parts = code.split(';base64,');
            let contentType = parts[0].split(':')[1];
            let raw = window.atob(parts[1]);
            let rawLength = raw.length;

            let uInt8Array = new Uint8Array(rawLength);

            for (let i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }
            return new Blob([uInt8Array], { type: contentType });
        },
        downloadImg() {
            this.$refs.myPoster.clickGeneratePicture();
        },
        // 用于微信JS-SDK回调
        async wxRegister() {
            //获取微信jssdk
            let res = await this.$getRequest('/wechat/GetWxJSSDK', { url: window.location.href })
            let config = res.data.data
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: config.appId, // 必填，公众号的唯一标识
                timestamp: config.timestamp, // 必填，生成签名的时间戳
                nonceStr: config.nonceStr, // 必填，生成签名的随机串
                signature: config.signature, // 必填，签名
                jsApiList: config.jsApiList // 必填，需要使用的JS接口列表
            })
            wx.ready(() => {
                let url = this.$HOME_URL + '/#/VipEquity?share_id=' + this.user.user_id +
                    '&type=2'
                //微信分享到朋友圈
                wx.onMenuShareTimeline({
                    title: this.plus.title, // 分享标题, 请自行替换
                    link: url, // 分享链接，根据自身项目决定是否需要split
                    imgUrl: this.poster_img, // 分享图标, 请自行替换，需要绝对路径
                    success() {
                        // 用户成功分享后执行的回调函数

                    },
                    cancel() {
                        // 用户取消分享后执行的回调函数

                    }
                });
                wx.onMenuShareAppMessage({
                    title: this.plus.title, // 分享标题, 请自行替换
                    desc: this.plus.desc, // 分享描述, 请自行替换
                    link: url, // 分享链接，根据自身项目决定是否需要split
                    imgUrl: this.poster_img, // 分享图标, 请自行替换，需要绝对路径
                    success() {
                        // 用户成功分享后执行的回调函数

                    },
                    cancel() {
                        // 用户取消分享后执行的回调函数

                    }
                })
            })

        },
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        document.body.style.background = "#fff";

        this.instance = this.$message({
            message: '海报正在生成中。。。',
            duration: 30000
        });

        this.getPlUS()
        let that = this
        document.title = "PLUS会员"
        this.user = this.$localstore.get('wx_user')
        var url = this.user.wechat_img;
        this.avatar = this.$imgUrl + '/wechat_image' + url.substring(23)

        this.goods_id = this.$route.query.id
        this.type = this.$route.query.type

    },

    watch: {
        imgUrl(val, oldval) {
            //监听到imgUrl有变化以后 说明新图片已经生成 隐藏DOM
            this.$refs.imageDom.style.display = "none";
            this.$refs.image.style.display = "block";
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
    beforeDestroy() {
        this.instance.close();
    },

    // 销毁完成状态
    destroyed() {}

}
</script>
<style lang="scss" scoped>
.VipPlus {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #000;

    .imageDom {
        height: 100%;
    }

    .poster-img {
        width: 100%;
        height: 100%;
        display: none;
    }

    .head_portrait {
        width: 1.5rem;
        height: 1.5rem;
        background: #fff;
        border-radius: 50%;
        right: .24rem;
        position: absolute;
        top: .24rem;
        overflow: hidden;
    }

    .code {
        width: 2rem;
        height: 2rem;
        overflow: hidden;
        position: absolute;
        bottom: .8rem;
        left: 50%;
        margin-left: -1rem;
    }

    .img {
        width: 100%;
        height: 100%;
        overflow: hidden;

        img {
            height: 100%;
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