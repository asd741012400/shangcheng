<template>
    <div class="MerchantShop">
        <div class="shop_message">
            <div class="shop_img">
                <span></span>
                <i v-if="vip == 1"><img src="../../assets/merchant/vip1.png" alt=""></i>
                <i v-else-if="vip == 2"><img src="../../assets/merchant/vip2.png" alt=""></i>
                <i v-else-if="vip == 3"><img src="../../assets/merchant/vip3.png" alt=""></i>
            </div>
            <h3>万达广场LUCA店</h3>
            <p>185 3226 6666</p>
            <router-link :to="{name:'PersonalStores'}">
                我的店铺
            </router-link>
        </div>
        <ul class="money">
            <li>
                <h3>21806</h3>
                <p>历史收益(元)</p>
            </li>
            <li>
                <h3>21806</h3>
                <p>可提现(元)</p>
            </li>
            <li>
                <h3>21806</h3>
                <p>历史收益(元)</p>
            </li>
        </ul>
        <div class="menu">
            <router-link :to="{name:'TeamDel'}">
                <p>
                    <span><img src="../../assets/merchant/icon_img1.png" alt=""></span>
                    <em>我的成员</em>
                </p>
            </router-link>
            <router-link :to="{name:'Generalize'}">
                <p>
                    <span><img src="../../assets/merchant/icon_img2.png" alt=""></span>
                    <em>我的推广</em>
                </p>
            </router-link>
            <router-link :to="{name:'WithdrawDeposit'}">
                <p>
                    <span><img src="../../assets/merchant/icon_img3.png" alt=""></span>
                    <em>申请提现</em>
                </p>
            </router-link>
            <router-link :to="{name:'WithdrawList'}">
                <p>
                    <span><img src="../../assets/merchant/icon_img4.png" alt=""></span>
                    <em>提现记录</em>
                </p>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MerchantShop',
    data() {
        return {
            vip: 1
        }
    },
    components: {},
    methods: {},

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.title = "我的店铺"
        document.body.style.background = "#fff";
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
.MerchantShop {
    .shop_message {
        .shop_img {
            position: relative;
            width: 1.76rem;
            height: 1.76rem;
            margin: .58rem auto 0;

            span {
                width: 1.76rem;
                height: 1.76rem;
                border-radius: 5px;
                overflow: hidden;
                background: #ccc;
                display: block;
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

        p {
            color: #666666;
            font-size: .28rem;
            text-align: center;
        }

        a {
            display: block;
            width: 1.76rem;
            height: .6rem;
            line-height: .6rem;
            text-align: center;
            margin: .22rem auto 0;
            background: #333333;
            border-radius: 3px;
            overflow: hidden;
            color: #fff;
            font-size: .28rem;
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
        a{
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
        a:nth-of-type(1) p{
            background: #FF6C60;
        }

        a:nth-of-type(2) p{
            background: #806CF6;
        }

        a:nth-of-type(3) p{
            background: #F6AE42;
        }

        a:nth-of-type(4) p{
            background: #3498F7;
        }
    }
}
</style>