<template>
    <div class="Home">
        <div class="shop_message">
            <div class="shop_img">
                <span><img :src="$imgUrl + thumb_img"></span>
            </div>
            <h3>{{store.business_name}}</h3>
            <router-link :to="{name:'ChageShop'}">
                切换门店
            </router-link>
        </div>
        <ul class="money">
            <li>
                <h3>{{today_num}}</h3>
                <p>今日核销</p>
            </li>
            <li>
                <h3>{{total}}</h3>
                <p>总核销</p>
            </li>
            <!--        <li>
                <h3>21806</h3>
                <p>预约人数</p>
            </li> -->
        </ul>
        <div class="menu">
            <a href="javascript:;" @click="sacnCode">
                <p>
                    <span><img src="../../assets/merchant/icon_img1.png" alt=""></span>
                    <em>扫码核销</em>
                </p>
            </a>
            <router-link :to="{name:'CheckCode'}">
                <p>
                    <span><img src="../../assets/merchant/icon_img2.png" alt=""></span>
                    <em>核销码核销</em>
                </p>
            </router-link>
            <router-link :to="{name:'CheckList'}">
                <p>
                    <span><img src="../../assets/merchant/icon_img3.png" alt=""></span>
                    <em>核销记录</em>
                </p>
            </router-link>
            <!--             <router-link :to="{name:'Appointment'}">
                <p>
                    <span><img src="../../assets/merchant/icon_img4.png" alt=""></span>
                    <em>预约记录</em>
                </p>
            </router-link> -->
        </div>
    </div>
</template>
<script>
import wx from 'weixin-js-sdk'
// import wxapi from '@/lib/wx.js'

export default {
    name: 'Home',
    data() {
        return {
            store: {},
            thumb_img: '',
            shop: {
                thumb_img: '',
                business_name: '',
            },
            today_num: 0,
            total: 0,
        }
    },
    components: {},
    methods: {
        //获取门店信息
        async getStore() {
            let business_id = this.$localstore.get('business_id') || this.$route.query.id
            let res = await this.$getRequest('/home/GetStoreDetail', { store_id: business_id })
            this.store = res.data.data
            this.thumb_img = this.store.thumb_img || this.store.business_img[0]
        },
        //获取店铺信息 及核销信息
        async getShop() {
            let userInfo = this.$localstore.get('business_user')
            let res = await this.$getRequest('/cancle/ShopInfo', { business_id: userInfo.business_id })
            this.shop = res.data.data.shopinfo
            this.today_num = res.data.data.cur_nums.nums
            this.total = res.data.data.all_nums.nums

        },
        //切换当前门店
        async changeStore(item) {
            let business_id = this.$localstore.get('business_id') || this.$route.query.id
            let wx = this.$localstore.get('wx')
            if (business_id) {
                let res = await this.$getRequest('/business/changeStore', { union_id: wx.unionid, business_id: business_id })
                if (res.data.code == 1) {
                    this.$localstore.set('business_user', res.data.data)
                }
            }

        },
        //扫码核销
        sacnCode() {
            wx.ready(() => {
                wx.scanQRCode({ // 微信扫一扫接口
                    desc: 'scanQRCode desc',
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
                    success: async (result) => {
                        let code = result.resultStr
                        this.$localstore.set('cehckGoods', '')
                        let userInfo = this.$localstore.get('business_user')
                        let data = {
                            code: code,
                            admin_id: userInfo.user_id,
                            shop_id: userInfo.business_id,
                        }
                        let res = await this.$postRequest('/cancle/CancleOne', data)
                        if (res.data.code == 1) {
                            this.$localstore.set('cehckGoods', res.data.data)
                            if (res.data.data.card_info.type == 1) {
                                this.$router.push({ name: 'Commodity', query: { code: code } })
                            } else {
                                this.$router.push({ name: 'CardCheck', query: { code: code } })
                            }
                        } else {
                            this.$message(res.data.msg);
                        }
                    }
                })
            })
        }
    },

    // 创建前状态
    beforeCreate() {

    },

    // 创建完毕状态 
    created() {
        document.title = "主页"
        document.body.style.background = "#fff"

        this.getShop()
        this.getStore()
        this.changeStore()
    },

    // 挂载前状态
    beforeMount() {},

    // 挂载结束状态
    mounted() {
        // 用于微信JS-SDK回调    
        // wxapi.wxRegister()
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
body {
    background: #fff !important;
}

.Home {
    .shop_message {
        .shop_img {
            position: relative;
            width: 2.14rem;
            height: 2.14rem;
            margin: .58rem auto 0;

            span {
                width: 2.14rem;
                height: 2.14rem;
                border-radius: 5px;
                overflow: hidden;
                background: #ccc;
                display: block;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            i {
                width: .92rem;
                height: .8rem;
                position: absolute;
                right: -.46rem;
                bottom: -.4rem;
                overflow: hidden;
            }
        }

        h3 {
            font-size: .36rem;
            color: #333333;
            text-align: center;
            padding-top: .4rem;
        }


        a {
            display: block;
            width: 1.76rem;
            height: .6rem;
            line-height: .6rem;
            text-align: center;
            margin: .22rem auto 0;
            border-radius: 3px;
            overflow: hidden;
            color: #fff;
            font-size: .28rem;
            background-color: #000000;
        }
    }

    .money {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top: .6rem;

        li {
            color: #333333;
            text-align: center;

            h3 {
                font-size: .36rem;
            }

            p {
                font-size: .24rem;
                padding-top: .1rem;
            }
        }
    }

    .menu {
        margin-top: .78rem;
        border-top: .16rem solid #F0F0F0;
        padding: .4rem .6rem 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        a {
            p {
                width: 1.9rem;
                height: 1.9rem;
                border-radius: 8px;
                margin-bottom: .4rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                span {
                    width: .6rem;
                    overflow: hidden;
                }

                em {
                    color: #fff;
                    font-size: .28rem;
                    padding-top: .1rem;
                    font-style: normal;
                }
            }


        }

        a:nth-of-type(1) p {
            background: #FF6C60;
        }

        a:nth-of-type(2) p {
            background: #806CF6;
        }

        a:nth-of-type(3) p {
            background: #F6AE42;
        }

        a:nth-of-type(4) p {
            background: #3498F7;
        }
    }
}
</style>