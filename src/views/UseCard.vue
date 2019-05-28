<template>
    <div class="UseCard">
        <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">使用卡片</div>
            <div class="add"></div>
        </header>
        <div class="header">
            <div class="use_card_message">
                <i><img :src="$imgUrl+card.head_img"></i>
                <div class="name">
                    <p>{{card.child_name}} {{card.age}}岁</p>
                    <!-- <sub>{{card.age}}岁</sub> -->
                </div>
                <span>{{card.tel_phone}}</span>
                <a v-if="!status" href="javascript:;" @click="apply">申请修改</a>
                <a v-else-if="status == 1" href="javascript:;">待审核</a>
            </div>
            <b><img src="../assets/PersonalCenter_headerBg3.png" alt="" srcset=""></b>
        </div>
        <div class="code">
            <div class="code_img">
                <i><img id="qrcode" src="" alt=""></i>
                <p>消费时请出示二维码进行核销</p>
            </div>
            <div class="code_text">
                <h3>核销码</h3>
                <b>{{card.cancle_code}}</b>
            </div>
        </div>
    </div>
</template>
<script>
import QRCode from 'qrcode'

export default {
    name: 'UseCard',
    data() {
        return {
            card: {},
            status: 0,
        }
    },
    components: {},
    methods: {
        //申请修改资料
        async apply() {
            let res = await this.$postRequest('/card/UpdateCard', { cd_id: this.card.cdid })
            this.$message(res.data.msg);
            if (res.data.code == 1) {
                this.status = 1
            }
        }
    },

    // 创建前状态
    beforeCreate() {

    },

    // 创建完毕状态 
    created() {
        document.title = "使用卡片"
        document.body.style.background = "#F6F6F6";
        let card = this.$localstore.get('usecard')
        this.card = card
        this.status = card.update_status
        if (!card) {
            this.$router.push({ name: "Index" })
        }

    },

    // 挂载前状态
    beforeMount() {},

    // 挂载结束状态
    mounted() {

        var opts = {
            width: 300,
            height: 300,
            errorCorrectionLevel: 'H',
            type: 'image/png',
            margin: 0
        }
        QRCode.toDataURL(this.card.cancle_code, opts)
            .then(url => {
                let img = new Image()
                img.src = url
                img.onload = () => {
                    document.getElementById('qrcode').setAttribute("src", url)
                }
            })
            .catch(err => {
                console.error(err)
            })
    },

    // 更新前状态
    beforeUpdate() {},

    // 更新完成状态
    updated() {},

    // 销毁前状态
    beforeDestroy() {},

    // 销毁完成状态
    destroyed() {

    }

}
</script>
<style lang="scss" scoped>
.UseCard {
    header {
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        padding-top: .3rem;
        padding-bottom: .2rem;
        background: #f6f6f6;
        position: relative;

        .icon_return {
            width: 1rem;
            height: 1rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            left: .4rem;

            span {
                overflow: hidden;
                width: .27rem;
            }
        }

        .tel {
            color: #515C6F;
            font-weight: bold;
            font-size: .32rem;
            text-align: center;
        }

    }

    .header {
        position: relative;
        overflow: hidden;
        background: url("../assets/UseCard_bg.png") center center /100% 100% no-repeat;
        height: 6rem;

        .use_card_message {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            position: relative;
            z-index: 999;

            img {
                height: 100%;
            }

            i {
                width: 3.52rem;
                height: 3.52rem;
                overflow: hidden;
                border-radius: 50%;
                border: 2px solid #fff;
                margin-bottom: .26rem;
            }

            .name {
                display: flex;
                justify-content: center;

                p {
                    font-size: .28rem;
                    color: #fff;
                    font-weight: bold;
                }

                sub {
                    position: relative;
                    top: -10px;
                    width: .5rem;
                    font-size: .22rem;
                    text-align: center;
                    color: #fff;
                    background: url("../assets/icon_age.png") left center /.47rem .35rem no-repeat;
                }
            }

            span {
                font-size: .28rem;
                color: #fff;
            }

            a {
                font-size: .24rem;
                color: #FFEEBE;
            }
        }

        b {
            position: absolute;
            width: 100%;
            height: .8rem;
            bottom: 0;
            overflow: hidden;
        }
    }

    .code {
        padding-top: .46rem;
        padding-bottom: .30rem;
        background: #fff;

        .code_img {
            display: flex;
            align-items: center;
            flex-direction: column;
            font-size: .28rem;
            color: #515C6F;

            i {
                width: 1.99rem;
                height: 1.99rem;
                overflow: hidden;
                margin-bottom: .2rem;
            }
        }

        .code_text {
            display: flex;
            flex-direction: column;
            color: #515C6F;
            align-items: center;
            padding-top: .32rem;

            h3 {
                font-weight: bold;
                font-size: .28rem;
            }

            b {
                font-size: .36rem;
            }
        }
    }
}
</style>