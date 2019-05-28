<template>
    <div class="common-footer">
        <div class="footer-bar">
            <div class="personal_center" @click="goLink('Index')">
                <!-- <router-link :to="{name:'Index'}"> -->
                <template v-if="$route.name == 'Index' || $route.name == 'Home'">
                    <span><a><img src="@/assets/1-1.png" alt=""></a></span>
                </template>
                <template v-else>
                    <span><a><img src="@/assets/1.png" alt=""></a></span>
                </template>
                <p :class="($route.name == 'Index' || $route.name == 'Home') ? 'active' : ''">商城</p>
                <!-- </router-link> -->
            </div>
            <div class="personal_center" @click="goLink('VipEquity')">
                <!--               <router-link :to="{name:'VipEquity'}">
                    <b><img src="@/assets/icon_vip_imgA.png" alt=""></b>
                    <template v-if="$route.name == 'VipEquity'">
                        <b><img src="@/assets/2-2.png" alt=""></b>
                    </template>
                    <template v-else>
                        <b><img src="@/assets/2.png" alt=""></b>
                    </template>
                    <span></span>
                    <p :class="($route.name == 'VipEquity') ? 'active' : ''">会员</p>
                </router-link> -->
                <!-- <router-link :to="{name:'VipEquity'}"> -->
                <template v-if="$route.name == 'VipEquity'">
                    <span><a><img src="@/assets/2-2.png" alt=""></a></span>
                </template>
                <template v-else>
                    <span><a><img src="@/assets/2.png" alt=""></a></span>
                </template>
                <p :class="($route.name == 'VipEquity') ? 'active' : ''">会员</p>
                <!-- </router-link> -->
            </div>
            <div class="personal_center" @click="goLink('PersonalCenter')">
                <!-- <router-link :to="{name:'PersonalCenter'}"> -->
                <template v-if="$route.name == 'PersonalCenter'">
                    <span><a><img src="@/assets/3-3.png" alt=""></a></span>
                </template>
                <template v-else>
                    <span><a><img src="@/assets/3.png" alt=""></a></span>
                </template>
                <p :class="($route.name == 'PersonalCenter') ? 'active' : ''">个人中心</p>
                <!-- </router-link> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Footer',
    data() {
        return {

        }
    },
    components: {},
    methods: {
        goLink(link) {
            this.$router.push({ name: link })
        }
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {

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
<style lang="scss">
.common-footer {
    position: fixed;
    bottom: 0;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
    height: auto;
    width: 100%;
    // padding: 0.1rem 0.2rem;
    // padding: 0.05rem 0;
    background: #fff;

    .footer-bar {
        // padding: 0 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        text-align: center;
        padding: 0.05rem 0;

        .shop {
            display: flex;
            flex-direction: column;
            align-items: center;

            span {
                // width: 1.2rem;
                // height: .9rem;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;

                a {
                    width: .6rem;
                }
            }
        }

        .member {
            display: flex;
            flex-direction: column;
            align-items: center;
            // position: relative;

            // b {
            //     width: .92rem;            //     padding: .14rem;
            //     overflow: hidden;
            //     position: absolute;
            //     top: -1.2rem;
            //     left: -.55rem;
            //     background: #fff;
            //     border-radius: 50%;
            //     box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
            // }

            // p {
            //     position: absolute;
            //     top: .3rem;
            //     left: -.4rem;
            //     width: .92rem;
            // }

            // span {
            //     width: 1.2rem;
            //     height: .9rem;
            // }

            span {
                // width: 1.2rem;
                // height: .9rem;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;

                a {
                    width: .6rem;
                }
            }


        }

        .personal_center {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 33.33%;

            &.a> {
                display: block;
            }

            span {
                // width: 1.2rem;
                // height: .9rem;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;

                a {
                    display: block;
                    img {
                        width: 0.50rem;
                    }
                }
            }

            p {
                font-size: 0.24rem;

                &.active {
                    font-weight: bold;
                    font-size: 0.26rem;
                    color: #515C6F;
                }
            }
        }
    }


}
</style>