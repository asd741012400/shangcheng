<template>
    <div class="DistributionTow">
        <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
        <header><span>我的推广</span></header>
        <div class="header">
            <div class="shop_message">
                <span><img :src="user.wechat_img" alt=""></span>
                <div>
                    <h3>
                    <b>{{user.username}}</b>
                    <i><img src="../assets/icon_vip2.png" alt=""></i>
                  </h3>
                    <p>{{user.tel_phone}}</p>
                </div>
                <router-link :to="{name:'MyShop',query:{user_id:user.user_id}}">
                    <em>我的店铺 ></em>
                </router-link>
            </div>
            <div class="message_show">
                <ul>
                    <li>
                        <p>￥{{info.history_money || '0.00'}}</p>
                        <a>历史收益</a>
                    </li>
                    <!--               <li>
                        <p>￥{{info.mymoney ||　'0.00'}}</p>
                        <a>已提现</a>
                    </li> -->
                    <li @click="goWidthdrew">
                        <p>￥{{info.get_money || '0.00'}}</p>
                        <a>可提现</a>
                    </li>
                    <li>
                        <p>￥{{info.freeze_money || '0.00'}}</p>
                        <a>待生效</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="project_nav">
            <ul>
                <li @click="goTeam">
                    <div>
                        <i><img src="../assets/icon_team.png" alt=""></i>
                        <template v-if="user.level == 2">
                            <p>我的成员<span>(<b>{{team_nums}}</b>）</span></p>
                        </template>
                        <template v-else-if="user.level == 3">
                            <p>我的团队<span>(<b>{{team_nums}}</b>）</span></p>
                        </template>
                    </div>
                </li>
                <li @click="goTuiGuang">
                    <div>
                        <i><img src="../assets/icon_generalize2.png" alt=""></i>
                        <p>我的推广</p>
                    </div>
                </li>
                <li @click="goWidthdrew">
                    <div>
                        <router-link :to="{name:'WithdrawDeposit'}">
                            <i><img src="../assets/icon_withdraw_deposit.png" alt=""></i>
                            <p>申请提现</p>
                        </router-link>
                    </div>
                </li>
                <li @click="goWidthdrewList">
                    <div>
                        <i><img src="../assets/icon_record2.png" alt=""></i>
                        <p>账单记录</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DistributionTow',
    data() {
        return {
            info: {},
            user: {},
            team_nums: 0,
        }
    },
    components: {},
    methods: {
        //去体现
        goWidthdrew() {
            this.$router.push({ name: 'WithdrawDeposit' })
        },
        //查看我的推广
        goTuiGuang() {
            this.$router.push({ name: 'TeamDelTow' })
        },
        //体现记录列表
        goWidthdrewList() {
            this.$router.push({ name: 'WithdrawList' })
        },
        //获取用户详情
        async getInfo() {
            let data = { user_id: this.user.user_id }
            let res = await this.$getRequest('/store/StoreHome', data)
            this.info = res.data.data
            if (this.user.level == 2) {
                let result = await this.$getRequest('/store/MyTeam2', data)
                this.team_nums = result.data.data.team_nums
            } else if (this.user.level == 3) {
                let result = await this.$getRequest('/store/MyTeam3', data)
                this.team_nums = result.data.data.count_teams
            }
        },
        //查看我的团队
        goTeam() {
            if (this.user.level == 2) {
                this.$router.push({ name: 'Generalize' })
            } else if (this.user.level == 3) {
                this.$router.push({ name: 'MyTeamTow' })
            }
        },
        //每次进入自动计算用户金额
        // async check(index) {
        //     let user = this.$localstore.get('wx_user')
        //     let union_id = ''
        //     if (user && user.union_id) {
        //         union_id = user.union_id
        //     }
        //     let res = await this.$getRequest('/home/AutoCount', { union_id: union_id })
        // },
        //检查以后是否登录
        async checkAuth() {
            let WxAuth = this.$localstore.get('wx')
            let union_id = ''
            if (WxAuth && WxAuth.unionid) {
                union_id = WxAuth.unionid
            }
            let res = await this.$getRequest('/wechat/GetUserInfo', { union_id: union_id })
            if (res.data.code == 1) {
                this.$localstore.set('wx_user', res.data.data)
                let user = res.data.data
                if (user.level < 2) {
                    this.$router.replace({ name: 'Login' })
                }
            } else {
                this.$router.replace({ name: 'Login' })
            }
        }
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        document.body.style.background = "#fff";
        let user = this.$localstore.get('wx_user')
        this.user = user
        if (!user) {
            this.$router.push({ name: 'Login' })
        }
        this.checkAuth()
        this.getInfo()
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
.DistributionTow {
    .icon_return {
        position: absolute;
        width: 1rem;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        top: .3rem;
        left: .2rem;

        span {
            width: .27rem;
            overflow: hidden;
        }
    }

    header {
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        padding-top: .3rem;
        background: #fff;
        background: #F6F6F6;

        span {
            font-size: .32rem;
            color: #515C6F;
            font-weight: bold;
        }
    }

    .header {
        background: url('../assets/distribution_bg.png')center top/ 100% no-repeat;
        height: 4rem;

        .shop_message {
            display: flex;
            align-items: center;
            height: 2.16rem;
            padding-left: .74rem;
            position: relative;

            span {
                width: 1.52rem;
                height: 1.52rem;
                overflow: hidden;
                border-radius: 50%;
            }

            div {
                padding-left: .36rem;

                h3 {
                    display: flex;
                    align-items: center;

                    b {
                        font-size: .28rem;
                        color: #fff;
                        padding-right: .12rem;
                    }

                    i {
                        width: .34rem;
                        overflow: hidden;
                    }
                }

                p {
                    font-size: .22rem;
                    color: #fff;
                    padding-top: 4px;
                }
            }

            em {
                font-style: normal;
                position: absolute;
                right: .3rem;
                font-size: .32rem;
                color: #fff;
                top: .32rem;
            }
        }

        .message_show {
            background: #fff;
            border-radius: 10px 10px 0 0;

            ul {
                width: 5.6rem;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 1.84rem;

                li {
                    text-align: center;

                    p {
                        font-size: .4rem;
                        color: #FF6666;
                    }

                    span {
                        font-size: .24rem;
                        color: #515C6F;
                    }
                }
            }
        }
    }

    .project_nav {
        border-top: 10px solid #F6F6F6;

        ul {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            padding-top: .6rem;

            li {
                width: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding-bottom: 1rem;

                div {
                    width: 2rem;
                    text-align: center;

                    i {
                        overflow: hidden;
                        width: 1.52rem;
                        height: 1.52rem;
                        display: block;
                        margin: 0 auto;
                    }

                    p {
                        font-size: .28rem;
                        color: #515C6F;
                        padding-top: .4rem;

                        b {
                            font-weight: normal;
                            color: #FF6666;
                        }
                    }
                }
            }
        }
    }
}
</style>