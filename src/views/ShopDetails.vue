<template>
    <div class="ShopDetails">
        <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">门店详情</div>
            <div class="add"></div>
        </header>
        <div class="shop_message">
            <div>
                <a>营业时间</a>：
                <p>
                    <span>{{shop.sale_time}}</span>
                    <span>{{shop.sale_time2}}</span>
                </p>
            </div>
            <div>
                <a>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址</a>：
                <p>
                    <span>{{shop.address}}</span>
                </p>
            </div>
            <div>
                <a>电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话</a>：
                <p>
                    <span>{{shop.tel_phone}}</span>
                </p>
            </div>
        </div>
        <div class="nav_list">
            <p>门店图片</p>
            <ul>
                <li v-for="(img,index) in shop.business_img" :key="index" @click="previewImg(index)">
                    <div>
                        <span><img :src="$imgUrl+img" alt=""></span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="introduce">
            <h3>介绍</h3>
            <div class="detail" v-html="shop.shop_des"></div>
        </div>
        <div class="address">
            <div>
                <p @click="goAddress"><span><img src="../assets/btn_navigation.png" alt=""></span></p>
                <p>
                    <a :href="'tel:'+shop.tel_phone">
                        <span><img src="../assets/btn_relation.png" alt=""></span>
                    </a>
                </p>
            </div>
        </div>
        <van-image-preview v-model="show" :start-position="index" :images="images" @change="onChange" @close="onClose">
        </van-image-preview>
    </div>
</template>
<script>
import VueJsonp from 'vue-jsonp'

export default {
    name: 'ShopDetails',
    data() {
        return {
            instance: '',
            shop: {},
            show: false,
            index: 1,
            images: []
        }
    },
    components: {},
    methods: {
        onChange(index) {
            this.index = index;
        },
        onClose() {
            this.show = false
        },
        //跳转地图
        goAddress() {
            if (!this.shop && !this.shop.address) {
                return false
            }
            this.instance = this.$message({
                message: '地图正在获取中，请耐心等待。。。',
                duration: 3000
            });
            let data = {
                output: 'jsonp',
                callback: 'function1',
                address: this.shop.address,
                key: 'QPGBZ-LJFCX-AAG4W-TD3HL-VTJR3-ZUB3K'
            }
            let url = 'https://apis.map.qq.com/ws/geocoder/v1/'

            this.$jsonp(url, data).then(res => {
                if (res.status < 1) {
                    this.instance.close();
                    let map = `https://apis.map.qq.com/tools/poimarker?type=1&keyword=${res.result.title}&center=${res.result.location.lat},${res.result.location.lng}&radius=100&key=QPGBZ-LJFCX-AAG4W-TD3HL-VTJR3-ZUB3K&referer=myapp`
                    window.location.href = map
                } else {
                    this.instance.close();
                    this.$message('未查找到该地址！');
                }
                // Success.
            }).catch(err => {
                this.instance.close();
                // Failed.
            })
        },
        //获取门店
        async getShop() {
            let res = await this.$getRequest('/home/GetStoreDetail', { store_id: this.$route.query.store_id })
            this.shop = res.data.data;
            let arr = res.data.data.business_img.map(item => {
                return item = this.$imgUrl + item
            })
            this.images = arr
        },
        //图片预览
        previewImg(index) {
            this.index = index
            this.show = true
        },
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.body.style.background = "#F6F6F6";
        this.getShop()
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
        if (this.instance) {
            this.instance.close();
        }
    },

    // 销毁完成状态
    destroyed() {}

}
</script>
<style lang="scss" scoped>
.ShopDetails {
    header {
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        padding-top: .3rem;
        padding-bottom: .2rem;
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

    .shop_message {
        padding: .28rem .4rem .28rem .8rem;
        background: #fff;

        div {
            display: flex;
            padding-top: .1rem;
            font-size: .28rem;
            color: #535D70;

            a {
                display: inline-block;

                &:after {}
            }

            p {
                display: flex;
                flex-direction: column;
                vertical-align: bottom;
            }
        }
    }

    .nav_list {
        margin: .1rem 0;
        background: #fff;
        padding: .3rem 0 .68rem .8rem;

        p {
            font-size: .28rem;
            color: #535D70;
        }

        ul {
            white-space: nowrap;
            padding-top: .42rem;
            width: auto;
            overflow-x: scroll;

            li {
                background: #fff;
                margin-right: .2rem;
                display: inline-block;
                color: #515C6F;
                font-size: .28rem;

                div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    span {
                        overflow: hidden;
                        width: 1.2rem;
                        height: 1.2rem;

                        img {
                            width: 1.2rem;
                            height: 1.2rem;
                        }
                    }
                }
            }
        }
    }

    .introduce {
        background: #fff;
        padding: .26rem .16rem;

        .detail {
            padding: 0.2rem .6rem;
            background: #fff;
            overflow: hidden;
            display: inherit;
            margin-bottom: 20px;

            img {
                margin: 5px 0;
            }
        }

        h3 {
            font-size: .28rem;
            color: #535D70;
            padding-left: .64rem;
            padding-bottom: .22rem;
        }

        div {
            // height: 5rem;
            background: #DFE6EC;
        }
    }

    .address {
        position: fixed;
        bottom: .76rem;
        width: 100%;
        height: .8rem;

        div {
            padding: 0 .58rem;
            display: flex;

            p {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;

                span {
                    overflow: hidden;
                }
            }
        }
    }
}
</style>