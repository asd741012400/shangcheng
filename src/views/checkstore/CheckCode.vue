<template>
    <div class="CheckCode">
        <div>
            <p><input type="number" v-model="code" placeholder="请输入"></p>
            <a class="sub_btn" @click="submit">确定</a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CheckCode',
    data() {
        return {
            code: ''
        }
    },
    components: {},
    methods: {
        //核销提交
        async submit() {
            if (this.code == '') {
                this.$message('请输入核销码！');
                return false
            }
            this.$localstore.set('cehckGoods', '')
            let userInfo = this.$localstore.get('business_user')
            console.log(userInfo);
            let data = {
                code: this.code,
                admin_id: userInfo.user_id,
                shop_id: userInfo.business_id
            }
            let res = await this.$postRequest('/cancle/CancleOne', data)
            if (res.data.code == 1) {
                this.$localstore.set('cehckGoods', res.data.data)
                if (res.data.data.card_info.type == 1) {
                    this.$router.push({ name: 'Commodity', query: { code: this.code } })
                } else {
                    this.$router.push({ name: 'CardCheck', query: { code: this.code } })
                }
            } else {
                this.$message(res.data.msg);
            }
        }
    },

    // 创建前状态
    beforeCreate() {

    },

    // 创建完毕状态 
    created() {
        document.body.style.background = "#F0F0F0";
        document.title = "核销码核销"
        if (!this.$localstore.get('business_id') && !this.$localstore.get('business_user')) {
            this.$router.push({ name: 'Administrator' })
        }
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
.CheckCode {
    div {
        margin: 0 .4rem;
        overflow: hidden;

        p {
            margin-top: .42rem;
            display: flex;
            height: 0.7rem;
            padding-left: .4rem;
            background-image: linear-gradient(#fefefe,
                #fefefe),
                linear-gradient(#f75835,
                #f75835);
            background-blend-mode: normal,
                normal;
            border-radius: 0.12rem;
            border: solid 0.02rem #f0f0f0;

            input {
                font-size: 0.3rem;
                width: 100%;
                height: 100%;
            }
        }

        .sub_btn {
            margin-top: .37rem;
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
}
</style>