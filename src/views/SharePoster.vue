<template>
    <div class="SharePoster">
        <div class="share_poster">
            <i @click="$router.go(-1)"><img src="../assets/icon_close3.png" alt=""></i>
            <div class="share_poster_content">
                <img class="poster-img" ref="image" :src="imgUrl">
                <div class="Poster" ref="imageDom">
                    <div class="name">
                        <span><img :src="user.wechat_img"></span>
                        <b>{{user.username}}</b>
                    </div>
                    <div class="img"><img src="../assets/img2.png" alt=""></div>
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
import QRCode from 'qrcodejs2'
import html2canvas from "html2canvas"
// import Poster from '../components/Poster'

export default {
    name: 'SharePoster',
    data() {
        return {
            user: {},
            imgUrl: '',
            type: "",
            goods_id: "",
            title: "",
            price: "",
            poster_img: "",
        }
    },
    components: {
        // Poster
    },
    methods: {
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
        //导出图片
        handleJpeg() {
            // let table = this.$refs.imageDom;
            // html2canvas(table).then(canvas => {
            //     var url = canvas.toDataURL();
            //     let a = document.createElement("a");
            //     a.href = url;
            //     a.download = "未命名";
            //     document.body.appendChild(a);
            //     a.click();
            //     document.body.removeChild(a);
            // });
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
        },
        //获取商品
        async getGoods() {
            let that = this;
            if (this.type == 1) {
                let res = await this.$getRequest('/home/GetGoodsDetail', { id: this.goods_id })
                this.title = res.data.data.goods_name
                this.price = res.data.data.goods_price
                this.poster_img = res.data.data.dist_poster
            } else {
                let res = await this.$getRequest('/home/GetCardDetail', { id: this.goods_id })
                this.title = res.data.data.card_name
                this.price = res.data.data.card_price
                this.poster_img = res.data.data.dist_poster
            }

            //生成二维码
            let qrcode = new QRCode('qrcode', {
                width: 60,
                height: 60, // 高度  
                text: '56663159' // 二维码内容  
                // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
                // background: '#f0f'  
                // foreground: '#ff0'  
            })

            //合成分享图
            that.$nextTick(function() {
                html2canvas(that.$refs.imageDom,{useCORS: true}).then(function(canvas) {
                    that.imgUrl = URL.createObjectURL(that.base64ToBlob(canvas.toDataURL()))
                    // let dataURL = canvas.toDataURL("image/png");
                    // that.imgUrl = dataURL;
                });
            })

        },
        getBase64Image(img) {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
            var dataURL = canvas.toDataURL("image/" + ext);
            return dataURL;
        }
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        this.user = this.$localstore.get('userInfo')
        this.goods_id = this.$route.query.id
        this.type = this.$route.query.type
        this.getGoods()

        //头像转换base64
        // var image = new Image();
        // image.src = this.user.wechat_img;
        // image.crossOrigin = "Anonymous";
        // image.onload = () => {
        //     var base64 = this.getBase64Image(image);
        //     this.user.wechat_img = base64
        // }

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
</style>