<template>
    <div class="SharePoster">
        <div class="share_poster">
            <i @click="$router.go(-1)"><img src="../assets/icon_close3.png" alt=""></i>
            <div class="share_poster_content">
                <img class="poster-img" ref="image" :src="imgUrl">
                <div class="Poster" ref="imageDom">
                    <div class="name">
                        <span><img :src="wechat_img +'?'+ new Date().getTime()"></span>
                        <b>{{user.username}}</b>
                    </div>
                    <div class="img"><img :src="poster_img" alt=""></div>
                        <!-- <div class="img"><img :src="$imgUrl +goods.share_img" alt=""></div> -->
                        <div class="code">
                            <div class="code_text">
                                <h3>{{title}}</h3>
                                <!-- <a>限购一份</a> -->
                                <p><span>￥{{price}}</span></p>
                            </div>
                            <div class="code_img">
                                <span id="qrcode"></span>
                                <p>扫码立享批发价</p>
                            </div>
                        </div>
                    </div>
                </div>
                <ul class="share_type">
                    <li @click="maskingShowFn">
                        <span><img src="../assets/share_wx.png" alt=""></span>
                        <p>微信</p>
                    </li>
                    <li @click="maskingShowFn">
                        <span><img src="../assets/share_circle_of_friends.png" alt=""></span>
                        <p>朋友圈</p>
                    </li>
                    <li @click="saveImg()">
                        <span><img src="../assets/share_download.png" alt=""></span>
                        <p>保存图片</p>
                    </li>
                </ul>
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
import wx from 'weixin-js-sdk'
import QRCode from 'qrcodejs2'
import html2canvas from "html2canvas"
// import Poster from '../components/Poster'

export default {
    name: 'SharePoster',
    data() {
        return {
            user: {},
            url: '', //分享url
            imgUrl: '',
            type: "",
            goods_id: "",
            goods: "",
            title: "",
            price: "",
            desc: "",
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
                //微信分享到朋友圈
                wx.onMenuShareTimeline({
                    title: this.title, // 分享标题, 请自行替换
                    link: this.url, // 分享链接，根据自身项目决定是否需要split
                    imgUrl: this.imgUrl, // 分享图标, 请自行替换，需要绝对路径
                    success() {
                        // 用户成功分享后执行的回调函数

                    },
                    cancel() {
                        // 用户取消分享后执行的回调函数

                    }
                });
                wx.onMenuShareAppMessage({
                    title: this.title, // 分享标题, 请自行替换
                    desc: '', // 分享描述, 请自行替换
                    link: this.url, // 分享链接，根据自身项目决定是否需要split
                    imgUrl: this.imgUrl, // 分享图标, 请自行替换，需要绝对路径
                    success() {
                        // 用户成功分享后执行的回调函数

                    },
                    cancel() {
                        // 用户取消分享后执行的回调函数

                    }
                })
            })
        },

        //下载图片
        saveImg() {
            this.$message('请长按海报保存至本地！')
        },

        async toBase64(img) {
            let res = await this.$postRequest('/upload/Tobase64', { img: img })
            return res.data.data
        },

        //下载
        downloadFile(fileName, content) {
            let aLink = document.createElement('a');
            let blob = this.base64ToBlob(content); //new Blob([content]);

            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
            aLink.download = fileName;
            aLink.href = URL.createObjectURL(blob);
            aLink.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window })); //兼容火狐
        },

        //获取商品
        async getGoods() {
            let that = this;

            if (this.type == 1) {
                let res = await this.$getRequest('/home/GetGoodsDetail', { id: this.goods_id })
                this.goods = res.data.data
                this.price = res.data.data.goods_price
                this.title = res.data.data.goods_name
                this.desc = res.data.data.goods_info
                // this.poster_img = res.data.data.dist_poster
                this.poster_img = await this.toBase64(this.$imgUrl + res.data.data.dist_poster)
            } else {
                let res = await this.$getRequest('/home/GetCardDetail', { id: this.goods_id })
                this.goods = res.data.data
                this.price = res.data.data.card_price
                this.title = res.data.data.share_title
                this.desc = res.data.data.share_desc
                // this.poster_img = res.data.data.share_img
                this.poster_img = await this.toBase64(this.$imgUrl + res.data.data.share_img)
            }

            this.wxRegister()

            let qrcode = new QRCode('qrcode', {
                // width: 60,
                // height: 60, // 高度
                text: this.url, // 二维码内容
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

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    async created() {
        document.body.style.background = "#fff";
        this.user = this.$localstore.get('wx_user')
        this.goods_id = this.$route.query.id
        this.type = this.$route.query.type

        if (this.type == 1) {
            this.url = 'http://' + window.location.host + '/#/CommodityDetails?share_id=' + this.user.user_id +
                '&type=1&id=' + this.goods_id
        } else if (this.type == 3) {
            this.url = 'http://' + window.location.host + '/#/CardDetails?share_id=' + this.user.user_id +
                '&type=3&id=' + this.goods_id
        }
        this.wechat_img = this.user.wechat_img
        var url = this.user.wechat_img;
        this.wechat_img = this.$imgUrl + '/wechat_image' + url.substring(23)

        this.instance = this.$message({
            message: '海报正在生成中。。。',
            duration: 30000
        });

        this.getGoods()


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

            .poster-img {
                width: 100%;
                height: 100%;
                display: none;
            }
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
            display: block;
        }

        img {
            display: block;
            width: 100%;
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