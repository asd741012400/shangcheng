<template>
    <div class="ChageShop">
        <div>
            <h3>当前门店</h3>
            <ul class="team_member">
                <li>
                    <i><img :src="getImg(defaultStore.business_img)"></i>
                    <div>
                        <p class="name">
                            <b>{{defaultStore.business_name}}</b>
                        </p>
                        <p>
                            <b>{{defaultStore.address}}</b>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <div>
            <h3>其他门店</h3>
            <ul class="team_member">
                <li v-for="item in store" @click="changeStore(item)">
                    <i><img :src="getImg(item.business_img)"></i>
                    <div>
                        <p class="name">
                            <b>{{item.business_name}}</b>
                        </p>
                        <p>
                            <b>{{item.address}}</b>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ChageShop',
    data() {
        return {
            defaultStore: '',
            store: ''
        }
    },
    components: {},
    methods: {
        getImg(str) {
            if (str) {
                let img = str.split(',')
                return this.$imgUrl + img[0]
            } else {
                return str
            }
        },
        //获取门店信息
        async getStore() {
            let userInfo = this.$localstore.get('wx')
            let res = await this.$getRequest('/business/getUserStoreList', { union_id: userInfo.unionid })
            this.store = res.data.data
            let arr = []
            this.store.map(item => {
                if (item.is_default == 1) {
                    this.defaultStore = item
                } else {
                    arr.push(item)
                }
            })
            this.store = arr
        },
        //切换门店
        async changeStore(item) {
            this.$dialog.alert({
                showCancelButton: true,
                message: '你确定要切换至该门店吗？'
            }).then(async () => {
                let business_id = item.business_id
                let wx = this.$localstore.get('wx')
                let res = await this.$getRequest('/business/changeStore', { union_id: wx.unionid, business_id: business_id })
                if (res.data.code == 1) {
                    this.$localstore.set('business_user', res.data.data)
                    this.$localstore.set('business_id', business_id)
                    this.$router.push({ name: 'CheckHome', query: { id: business_id } })
                } else {
                    this.$message('切换失败！')
                }
            }).catch(() => {

            });
        },

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        document.title = "切换门店"
        document.body.style.background = "#fff";
        this.getStore()
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
.ChageShop {
    div {
        h3 {
            height: 1rem;
            background: #f0f0f0;
            padding-left: .3rem;
            font-size: .3rem;
            line-height: 1rem;
        }

        .team_member {
            li {
                padding: .4rem .3rem;
                border-bottom: 1px solid #F0F0F0;
                display: flex;
                align-items: center;

                i {
                    width: 1.28rem;
                    height: 1.28rem;
                    overflow: hidden;
                    border-radius: 5px;
                    background: #ccc;
                }

                img {
                    height: 100%;
                }

                div {
                    padding-left: .4rem;
                    flex: 1;

                    p {
                        font-size: .28rem;
                        color: #666666;
                        display: flex;

                        b {
                            font-size: .32rem;
                            color: #222222;
                            width: 5.1rem;
                            font-weight: 400;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }

                    .name {
                        padding-bottom: .1rem;
                    }
                }
            }
        }
    }
}
</style>