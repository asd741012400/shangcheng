<template>
    <div class="SharePoster">
        <div class="share_poster">
            <i @click="$router.go(-1)"><img src="../assets/icon_close3.png" alt=""></i>
            <!-- swiper -->
            <div class="poster-warp" id="swiper">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" :class="ready ? 'no-touch' : ''" v-for="(item,index) in poster">
                            <img class="poster-img" style="width:100%;" :id="'image'+index" ref="image" src="">
                            <div ref="imageDom" :id="'imageDom'+index" class="imageDom">
                                <div class="head_portrait"><img :src="wechat_img" alt=""></div>
                                    <div class="code">
                                        <img :id="'qrcode'+index" ref="qrcodes"  src="" alt="" />
                                    </div>
                                        <div class="img"><img  :src="$imgUrl+item" alt=""></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
</template>
<script>
import wx from 'weixin-js-sdk'
import QRCode from 'qrcode'
import html2canvas from "html2canvas"
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';


export default {
    name: 'SharePoster',
    data() {
        return {
            user: {},
            url: '', //分享url
            imgUrl: [],
            type: "",
            goods_id: "",
            goods: "",
            title: "",
            price: "",
            desc: "",
            plus: "",
            poster: "",
            instance: "",
            wechat_img: "",
            poster_img: "",
            share_img: "",
            ready: true,
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
        //获取PlUS
        async getPlUS() {
            let id = this.$route.query.id
            let plus = this.$localstore.session.get('plus')
            if (plus) {
                this.plus = plus
            } else {
                let res = await this.$getRequest('/home/GetPlus')
                this.plus = res.data.data
                this.$localstore.session('plus', this.plus)
            }
            this.wxRegister()

            this.poster = this.plus.poster.split(',')
            this.poster_img = this.$imgUrl + this.plus.poster

            this.$nextTick(() => {
                let new_arr = []
                let arr = this.$refs.qrcodes
                arr && arr.map((item, index) => {

                    var opts = {
                        width: 300,
                        height: 300,
                        errorCorrectionLevel: 'H',
                        type: 'image/png',
                        margin: 0
                    }
                    QRCode.toDataURL(this.$HOME_URL + '/#/VipEquity?share_id=' + this.user.user_id +
                            '&type=2', opts)
                        .then(url => {
                            let img = new Image()
                            img.src = url
                            img.onload = () => {
                                new_arr.push(url)
                                document.getElementById(item.id).setAttribute("src", url)
                            }
                        })
                        .catch(err => {
                            console.error(err)
                        })

                })

                let timer = setInterval(() => {
                    if (new_arr.length == arr.length) {
                        clearInterval(timer)
                        setTimeout(() => {
                            this.getPoster()
                        }, 1000)
                    }
                }, 50)
            })

        },
        //海报生成
        getPoster(index) {
            let that = this
            let arr = this.$refs.imageDom
            let mulitImg = []

            let flag = 0
            arr && arr.map((item, index) => {
                html2canvas(item, {
                    scale: 2,
                    dpi: window.devicePixelRatio,
                    useCORS: true, //（图片跨域相关）
                    allowTaint: false
                }).then((canvas) => {
                    let dataURL = canvas.toDataURL("image/jpeg");
                    document.querySelector(`#image${index}`).setAttribute('src', dataURL)
                    let img = new Image()
                    img.src = dataURL
                    img.onload = () => {
                        mulitImg.push(dataURL)
                        // document.querySelector(`#imageDom${index}`).style.display = 'none'
                        // document.querySelector(`#image${index}`).style.display = 'block'
                    }
                });
            })

            let timer = setInterval(() => {
                let imgTotal = mulitImg.length;
                if (imgTotal == arr.length) {

                    //隐藏原来的图片 显示海报图
                    arr && arr.map((item, index) => {
                        document.querySelector(`#imageDom${index}`).style.display = 'none'
                        document.querySelector(`#image${index}`).style.display = 'block'
                    })


                    //全部加载完成
                    this.instance.close();
                    this.ready = false
                    clearInterval(timer)
                    this.$message('海报制作完成，长按海报分享给朋友吧！');
                }
            }, 50)


        },
        // 用于微信JS-SDK回调
        wxRegister() {
            wx.ready(() => {
                let url = this.$HOME_URL + '/#/VipEquity?share_id=' + this.user.user_id + '&type=2'
                url = this.$HOME_URL + '/redirect.html?app3Redirect=' + encodeURIComponent(url)
                //微信分享到朋友圈
                wx.onMenuShareTimeline({
                    title: this.plus.title, // 分享标题, 请自行替换
                    link: url, // 分享链接，根据自身项目决定是否需要split
                    imgUrl: this.$imgUrl + this.plus.thumb, // 分享图标, 请自行替换，需要绝对路径
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
                    imgUrl: this.$imgUrl + this.plus.thumb, // 分享图标, 请自行替换，需要绝对路径
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
    async created() {
        document.body.style.background = "#fff";
        document.title = "PLUS会员"
        this.user = this.$localstore.get('wx_user')
        var url = this.user.wechat_img;
        this.wechat_img = 'http://' + window.location.host + '/upload/wechat_image' + url.substring(23)
        // this.wechat_img = this.$imgUrl + '/wechat_image' + url.substring(23)

        this.instance = this.$message({
            message: '海报正在生成中。。。',
            duration: 30000
        });

        this.getPlUS()

    },

    watch: {

    },

    // 挂载前状态
    beforeMount() {},

    // 挂载结束状态
    mounted() {
        var _this = this
        this.mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            // loop: true,
            // autoplay: 5000,
            slidesPerView: 1.35,
            // spaceBetween: 0.1,
            paginationClickable: true,
            centeredSlides: true,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            on: {
                slideChangeTransitionEnd: function() {
                    _this.vipIndex = this.realIndex;
                }
            }
        });

    },

    // 更新前状态
    beforeUpdate() {},

    // 更新完成状态
    updated() {},

    // 销毁前状态
    beforeDestroy() {
        this.instance.close();
        // wx.ready(() => {
        //     wx.showOptionMenu();
        // })
    },

    // 销毁完成状态
    destroyed() {}

}
</script>
<style lang="scss" scoped>
.SharePoster {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #ff6666 0%, #ffb389 100%);
    // background: rgba(0, 0, 0, .5);
    top: 0;
    left: 0;
    z-index: 9999;

    .share_poster {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
        background: linear-gradient(180deg, #ff6666 0%, #ffb389 100%);

        i {
            position: absolute;
            right: .48rem;
            top: .48rem;
            overflow: hidden;
            width: .49rem;
        }

        .share_poster_content {
            // width: 5.36rem;
            // margin: 1.36rem auto 0;
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

    // .img {
    //     overflow: hidden;
    //     margin: 0 .18rem;
    //     height: 5rem;
    //     border-radius: 5px;
    // }

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


.head_portrait {
    width: 0.8rem;
    height: 0.8rem;
    background: #fff;
    border-radius: 50%;
    right: .36rem;
    position: absolute;
    top: .20rem;
    overflow: hidden;
}

.code {
    width: 1.6rem;
    height: 1.6rem;
    overflow: hidden;
    position: absolute;
    bottom: .5rem;
    left: 50%;
    margin-left: -0.8rem;

    img {
        width: 1.6rem !important;
        height: 1.6rem !important;
    }
}

.no-touch {
    //元素不能成为鼠标事件的target
    pointer-events: none;
    -webkit-pointer-events: none;
    -ms-pointer-events: none;
    -moz-pointer-events: none;
}
</style>
<style lang="scss">
.poster-img {
    width: 100%;
    // height: 8rem;
    display: none;
}

.imageDom {
    // display: none;
}

.poster-warp {
    margin-top: 1.5rem;
}

#swiper .swiper-container {
    width: 100%;
    height: 100%;
    position: static;
    background: none;
    padding-right: 1.8rem;
}

#swiper .swiper-slide {
    // background: #fff;
    transition: 300ms;
    // padding: .2rem .1rem;
    color: #333;
    box-shadow: 0 7px 8px 0 rgba(7, 17, 27, 0.15);
    // margin-bottom: 10px;
    background: none;

    /* overflow: hidden; */
    // margin: 0 .18rem;
    // height: 8rem;
    border-radius: 5px;

    .img {
        width: 100%;
        // height: 8rem;
        // overflow: hidden;

        img {
            width: 100%;
            // height: 100%;
        }
    }

    .code {
        width: 1.6rem;
        height: 1.6rem;
        overflow: hidden;
        position: absolute;
        bottom: .6rem;
        left: 50%;
        margin-left: -0.8rem;

        img {
            width: 1.6rem !important;
            height: 1.6rem !important;
        }
    }
}

#swiper .swiper-wrapper {
    position: static;
    margin-left: -20px;
}

#swiper .swiper-container .swiper-wrapper .swiper-slide {
    // width: 6.62rem;
    border-radius: 10px;
    // background-color: #fff;

}

#swiper .swiper-slide:not(.swiper-slide-active) {
    transform: scale(0.8);
}
</style>