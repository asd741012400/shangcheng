<template>
    <div class="VipPlus">
        <img class="poster-img" ref="image" :src="imgUrl">
        <div ref="imageDom" class="imageDom">
            <div class="head_portrait"><img :src="wechat_img" alt=""></div>
                <div class="code" id="qrcode">
                </div>
                <div class="img"><img src="../assets/VipPuls.jpg" alt=""></div>
                </div>
            </div>
</template>
<script>
import wxapi from '@/lib/wx.js'
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
            plus: "",
            title: "",
            price: "",
            wechat_img: "",
            poster_img: "",
        }
    },
    components: {
        // Poster
    },
    methods: {
        //获取PlUS
        async getPlUS() {
            let id = this.$route.query.id
            let res = await this.$getRequest('/home/GetPlus')
            this.plus = res.data.data
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
        wxRegCallback() {
            this.wxShareTimeline()
            this.wxShareAppMessage()
        },
        // 微信自定义分享到朋友圈
        wxShareTimeline() {
            let option = {
                title: this.plus.title, // 分享标题, 请自行替换
                link: 'http://' + window.location.host + '/#/VipEquity?share_id=' + this.user.user_id +
                    '&type=2', // 分享链接，根据自身项目决定是否需要split
                imgUrl: this.$imgUrl + this.plus.thumb, // 分享图标, 请自行替换，需要绝对路径
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
                title: this.plus.title, // 分享标题, 请自行替换
                desc: this.plus.desc, // 分享描述, 请自行替换
                link: 'http://' + window.location.host + '/#/VipEquity?share_id=' + this.user.user_id +
                    '&type=2', // 分享链接，根据自身项目决定是否需要split
                imgUrl: this.$imgUrl + this.plus.thumb, // 分享图标, 请自行替换，需要绝对路径
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
        document.body.style.background = "#fff";
        this.getPlUS()
        let that = this
        document.title = "PLUS会员"
        this.user = this.$localstore.get('userInfo')
        this.goods_id = this.$route.query.id
        this.type = this.$route.query.type
        //头像转换base64
        var image = new Image();
        image.src = this.user.wechat_img;
        this.wechat_img = this.user.wechat_img;
        image.onload = async () => {
            var base64 = this.getBase64Image(image);
            this.wechat_img = base64
            // let res = await this.$postRequest('/upload/UpBase64Image', { img: base64 })
            // if (res.data.code == 1) {
            //     this.wechat_img = res.data.data
            // }
        }

        //合成分享图
        that.$nextTick(function() {
            //生成二维码
            let qrcode = new QRCode('qrcode', {
                width: 80,
                height: 80, // 高度  
                text: 'http://' + window.location.host + '/#/VipEquity?share_id=' + this.user.user_id +
                    '&type=2', // 二维码内容  
                // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
                // background: '#f0f',  
                // foreground: '#ff0'  
            })

            html2canvas(that.$refs.imageDom).then((canvas) => {
                //海报生成
                // that.imgUrl = URL.createObjectURL(that.base64ToBlob(canvas.toDataURL()))
                let dataURL = canvas.toDataURL("image/png");
                that.imgUrl = dataURL;
            });
        })
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
        wxapi.wxRegister(this.wxRegCallback)
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
</style>