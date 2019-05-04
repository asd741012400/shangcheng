<template>
    <div class="Commodity">
        <i><img :src="$imgUrl + productInfo.thumb_img"></i>
        <p>{{productInfo.goods_name}}</p>
        <a class="sub_btn" @click="submit">确定</a>
    </div>
</template>
<script>
export default {
    name: 'Commodity',
    data() {
        return {
            code: '',
            checkInfo: {},
            productInfo: {}
        }
    },
    components: {},
    methods: {
        async submit() {
            let userInfo = this.$localstore.get('business_user')
            let data = {
                code: this.checkInfo.cancle_code,
                admin_id: userInfo.user_id,
                shop_id: userInfo.business_id
            }
            let res = await this.$postRequest('/cancle/CancleCode', data)
            if (res.data.code == 1) {
                setTimeout(() => {
                    this.$router.go(-1)
                }, 2000)
            }
            this.$message(res.data.msg);
        },
        //查询核销信息
        async getInfo() {
            let userInfo = this.$localstore.get('business_user')
            let data = {
                code: this.code,
                admin_id: userInfo.user_id,
                shop_id: userInfo.business_id
            }
            let res = await this.$postRequest('/cancle/CancleOne', data)
            if (res.data.code == 1) {
                this.checkInfo = res.data.data.card_info
                this.productInfo = res.data.data.product_info
            } else {
                this.$message(res.data.msg);
            }
        }

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.body.style.background = "#fff";
        document.title = "商品核销"
        let cehckGoods = this.$localstore.get('cehckGoods')
        this.code = this.$route.query.code
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
.Commodity {
    background: #f0f0f0;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

    img {
        height: 100%;
    }

    i {
        display: block;
        margin: .5rem .69rem 0;
        height: 6.12rem;
        background-color: #ffffff;
        border-radius: 0.34rem;
        overflow: hidden;
    }

    p {
        font-size: 0.36rem;
        text-align: center;
        margin-top: .36rem;
    }

    .sub_btn {
        margin: 1rem .69rem 0;
        height: 0.8rem;
        line-height: 0.8rem;
        background-color: #ff6c60;
        border-radius: 0.1rem;
        text-align: center;
        color: #fff;
        display: block;
        font-size: 0.32rem;
    }
}
</style>