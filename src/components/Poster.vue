<template>
<<<<<<< HEAD
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
        <p>扫码立享限时优惠</p>
      </div>
    </div>
  </div>
=======
    <div class="Poster" ref="imageDom">
        <div class="name">
            <span><img src="../assets/head_portrait.png" alt=""></span>
            <b>小皮孩儿</b>
        </div>
        <div id="qrcode">二维码位置</div>   
        <div class="img" ><img src="../assets/img2.png" alt=""></div>
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
>>>>>>> a4883becbb6dfbee27585eb1d55aa3a040dd7a08
</template>
<script>
import QRCode from 'qrcodejs2'
import html2canvas from "html2canvas"
export default {
    name: 'Poster',
    data() {
        return {
            imgUrl: ""
        }
    },
    components: {},
    methods: {
        //导出图片
        handleJpeg() {

                      let qrcode = new QRCode('qrcode', {
                width: 100,
                height: 100, // 高度  
                text: '56663159' // 二维码内容  
                // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
                // background: '#f0f'  
                // foreground: '#ff0'  
            })
            console.log(qrcode)

            let vm = this;
            // let table = this.$refs.crud.$el;
            let table = this.$refs.imageDom;
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
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        let that = this;
        that.$nextTick(function() {
            //生成二维码
            let qrcode = new QRCode('qrcode', {
                width: 100,
                height: 100, // 高度  
                text: '56663159' // 二维码内容  
                // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
                // background: '#f0f'  
                // foreground: '#ff0'  
            })
            console.log(qrcode)

            //合成分享图

            html2canvas(that.$refs.imageDom).then(function(canvas) {
                that.imgUrl = URL.createObjectURL(that.base64ToBlob(canvas.toDataURL()))
                setTimeout(() => {
                    console.log(111111111);

                }, 2000)
            });
        })
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