<template>
    <div class="ConfirmAnOrder">
        <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">确认订单</div>
            <div class="add"></div>
        </header>
        <div class="mian">
            <div class="commodity">
                <i><img :src="$imgUrl + goods.thumb_img" alt=""></i>
                <ul>
                    <li>
                        <strong>{{title}}</strong>
                    </li>
                    <li>
                        <span v-if="attr_name">{{attr_name}}</span>
                    </li>
                    <li>
                        <p>
                            <b>￥{{price}}</b>
                            <em>×{{num}}</em>
                        </p>
                    </li>
                </ul>
            </div>
            <div class="number">
                <b>数 量</b>
                <div>
                    <span @click="numChage('-')">-</span>
                    <p>{{num}}</p>
                    <a @click="numChage('+')">+</a>
                </div>
            </div>
            <!--             <div class="discounts">
                <b>使用优惠</b>
                <span>国庆卷</span>
            </div> -->
            <div class="message" v-if="form_table.length > 0 && form_table[0]">
                <ul>
                    <li v-if="is_inArrary('3')">
                        <label>孩子姓名</label>
                        <p><input type="text" v-model="real_name" placeholder="请输入姓名" @blur="goTop"></p>
                    </li>
                    <li v-if="is_inArrary('4')">
                        <label>监护人手机号</label>
                        <p><input type="text" v-model="tel" placeholder="请输入正确的手机号码" @blur="goTop"></p>
                    </li>
                    <li v-if="is_inArrary('1')">
                        <label>监护人身份证</label>
                        <p><input type="text" v-model="card_ID" placeholder="请输入正确的身份证号码" @blur="goTop"></p>
                    </li>
                    <li v-if="is_inArrary('2')">
                        <label>游玩日期</label>
                        <p>
                            <b>
                                {{play_time}}
                                <mt-datetime-picker
                                  type="date"
                                  ref="picker"
                                  year-format="{value} 年"
                                  month-format="{value} 月"
                                  date-format="{value} 日"
                                  @confirm="handleConfirm"
                                  :startDate="startDate">
                                </mt-datetime-picker>
                              </b>
                            <a @click="openPicker"></a>
                            <span><img src="../assets/icon_pull_down.png" alt=""></span>
                        </p>
                    </li>
                </ul>
            </div>
            <!--             <div class="describe">
                <span>已优惠:￥10</span>
                <span>合计:￥188</span>
            </div> -->
        </div>
        <div class="btns">
            <span>合计:￥{{total}}</span>
            <b @click="addOrder">提交订单</b>
        </div>
        <BindPhone :show="show"></BindPhone>
    </div>
</template>
<script>
import { DatetimePicker } from 'mint-ui';

import Vue from "vue";

Vue.component(DatetimePicker.name, DatetimePicker);
export default {
    name: 'ConfirmAnOrder',
    data() {
        let date = this.$dayjs().format('YYYY-MM-DD')
        return {
            apiUrl: this.$common.ApiUrl(),
            real_name: '',
            title: '',
            price: '',
            limit_num: 0,
            store: 0,
            tel: '',
            form_table: [],
            goods: '',
            attr_name: '',
            id: '',
            type: '',
            attr_id: '',
            share_id: '',
            card_ID: '',
            num: 1,
            show: false,
            is_wechat: 1,
            play_time: date,
            startDate: new Date(date),
        }
    },
    components: {

    },
    methods: {
        //兼容性处理
        goTop() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },
        is_inArrary(num) {
            if (this.form_table.indexOf(num) > -1) {
                return true
            } else {
                return false
            }
        },
        //开启时间选择器
        openPicker() {
            this.$refs.picker.open()
        },

        //点击确定按钮
        handleConfirm(data) {
            let date = this.$dayjs(data).format('YYYY-MM-DD')
            this.play_time = date;
            this.$refs.picker.close()
            event.stopPropagation()
        },

        //添加订单
        async addOrder() {

            document.body.scrollTop = document.documentElement.scrollTop = 0;

            if (!this.userInfo.tel_phone) {
                this.show = true
                return false
            }

            if (this.form_table.indexOf('1') > -1) {
                var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if (!regIdNo.test(this.card_ID)) {
                    this.$message('身份证号填写有误');
                    return false;
                }
            }
            if (this.form_table.indexOf('3') > -1) {
                var regName = /^[\u4e00-\u9fa5]{2,4}$/;
                if (!regName.test(this.real_name)) {
                    this.$message('真实姓名填写有误');
                    return false;
                }
            }
            if (this.form_table.indexOf('4') > -1) {
                if (!(/^1(3|4|5|6|9|7|8)\d{9}$/.test(this.tel))) {
                    this.$message("手机号码有误，请重填");
                    return false;
                }
            }

            if (!this.goods) {
                return false;
            }

            let WxAuth = this.$localstore.get('wx_user')
            let postData = {
                order_type: this.$route.query.order_type,
                goods_id: this.$route.query.id,
                // goods_title: this.title,
                // goods_img: this.goods.thumb_img,
                real_name: this.real_name,
                share_id: this.share_id,
                play_time: this.play_time,
                is_wechat: this.is_wechat,
                attr_id: this.$route.query.attr_id,
                // attr_name: this.attr_name,
                tel: this.tel,
                union_id: WxAuth.union_id,
                order_num: this.num,
                // amount: this.price,
                // total_amount: this.total,
                card_ID: this.card_ID,
            }

            let instance = this.$message({
                message: '正在提交订单中,请耐心等待。。。。',
                duration: 5000
            });

            let res = await this.$postRequest('/order/AddOrder', postData)
            this.$message(res.data.msg)
            if (res.data.code == 1) {
                this.$router.replace({ name: 'ConfirmPay', query: { id: res.data.data } })
                instance.close();
            } else {
                instance.close();
            }

        },
        //加减商品
        numChage(str) {
            let that = this;

            if (str == "-") {
                if (that.num <= 1) {
                    that.num = 1
                } else {
                    that.num = --that.num
                }
            } else {

                if (that.num >= that.limit_num) {
                    that.$message('已到最大限购数量')
                    return false
                }

                if (that.num >= that.store) {
                    that.$message('库存不足')
                    return false
                }


                that.num = ++that.num
            }
        },
        //获取详情
        async getCard() {
            const id = this.$route.query.id;
            let type = this.$route.query.order_type
            if (type == 1) {
                let res = await this.$getRequest('home/GetGoodsDetail', { id: id })
                this.goods = res.data.data
                this.title = this.goods.goods_name
                if (this.goods.limit_num == 0) {
                    this.limit_num = 99999999999
                } else {
                    this.limit_num = this.goods.limit_num
                }
                this.form_table = res.data.data.form_table.split(',');


                this.store = this.goods.store
                if (this.userInfo.status == 0) {
                    this.price = this.goods.goods_price
                } else {
                    this.price = this.goods.cost_price
                }

                if (this.goods.goods_attr && this.goods.goods_attr.length > 0) {
                    this.goods.goods_attr.map(item => {
                        if (item.attr_id == this.attr_id) {
                            this.attr_name = item.attr_name
                            this.limit_num = item.attr_limit_num
                            if (item.attr_limit_num == 0) {
                                this.limit_num = 99999999999
                            } else {
                                this.limit_num = item.attr_limit_num
                            }
                            this.store = item.attr_store
                            if (this.userInfo.status == 0) {
                                this.price = item.attr_price
                            } else {
                                this.price = item.attr_vip_price
                            }

                        }
                    })
                }

                // if (this.goods.is_free) {
                //     this.limit_num = 0
                //     this.price = 0
                //     this.is_wechat = 0
                // }


            } else if (type == 3) {
                let res = await this.$getRequest('home/GetCardDetail', { id: id })
                this.goods = res.data.data
                this.title = this.goods.card_name
                this.form_table = res.data.data.form_table.split(',');


                if (this.userInfo.status == 0) {
                    this.price = this.goods.card_price
                } else {
                    this.price = this.goods.cost_price
                }
            }
        }

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        document.title = "添加订单"
        document.body.style.background = "#F6F6F6";
        let userInfo = this.$localstore.get('wx_user')
        if (userInfo) {
            this.userInfo = userInfo
        }
        this.id = this.$route.query.id;
        this.type = this.$route.query.order_type
        this.attr_id = this.$route.query.attr_id
        let has_share = this.$localstore.session.get('has_share')
        if (has_share && has_share.query.share_id) {
            if (has_share.query.id == this.id && has_share.query.type == this.type) {
                this.share_id = has_share.query.share_id
            }
        }
        if (has_share && has_share.query.type == 4) {
            this.share_id = has_share.query.share_id
        }
        this.getCard()
    },

    computed: {
        total() {
            let total = this.num * this.price
            return Math.floor(total * 100) / 100
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
.ConfirmAnOrder {
    header {
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        padding-top: .3rem;
        padding-bottom: .2rem;
        background: #f6f6f6;
        // position: relative;

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

    .mian {
        padding-bottom: 1.2rem;

        .commodity {
            display: flex;
            padding: .28rem .6rem .32rem .46rem;
            background: #fff;

            i {
                width: 2.04rem;
                height: 2.04rem;
                overflow: hidden;

                img {
                    display: block;
                    width: 100%;
                    height: 2.04rem;
                    object-fit: cover
                }
            }

            ul {
                padding-left: .26rem;
                flex: 1;

                li {
                    strong {
                        font-size: .3rem;
                        color: #535D70;
                        font-weight: normal;
                    }

                    span {
                        font-size: .24rem;
                        color: #999999;
                    }

                    p {
                        display: flex;
                        padding-top: .6rem;

                        b {
                            font-weight: normal;
                            flex: 1;
                            font-size: .28rem;
                            color: #535D70;
                        }

                        em {
                            font-style: normal;
                            font-size: .24rem;
                            color: #999999;
                        }
                    }
                }
            }
        }

        .number {
            display: flex;
            background: #fff;
            margin-top: 10px;
            align-items: center;
            height: .8rem;
            padding: 0 .6rem 0 .46rem;

            b {
                font-size: .28rem;
                color: #515C6F;
                flex: 1;
            }

            div {
                display: flex;
                width: 2.26rem;
                height: .42rem;
                border-radius: 50px;
                overflow: hidden;

                span {
                    width: .62rem;
                    height: .46rem;
                    background: #c8c8c8;
                    text-align: center;
                    line-height: .35rem;
                    font-size: .6rem;
                    color: #fff;
                }

                p {
                    flex: 1;
                    background: #f6f6f6;
                    text-align: center;
                    height: .46rem;
                    line-height: .46rem;
                    color: #515C6F;
                    font-size: .32rem;
                }

                a {
                    width: .62rem;
                    height: .46rem;
                    background: #999999;
                    text-align: center;
                    line-height: .37rem;
                    font-size: .4rem;
                    color: #fff;
                }
            }
        }

        .discounts {
            display: flex;
            background: #fff;
            margin-top: 10px;
            align-items: center;
            height: .8rem;
            padding: 0 .6rem 0 .46rem;

            b {
                font-size: .28rem;
                color: #515C6F;
                flex: 1;
            }

            span {
                font-size: .28rem;
                color: #FF6666;
            }
        }

        .message {
            margin-top: 10px;
            background: #fff;

            ul {
                padding: .28rem .5rem .66rem;

                li {
                    display: flex;
                    align-items: center;
                    margin-bottom: .2rem;

                    label {
                        width: 1.8rem;
                        text-align: right;
                        padding-right: .24rem;
                        font-size: .3rem;
                    }

                    p {
                        height: .8rem;
                        border: 1px solid #C8C8C8;
                        border-radius: 5px;
                        flex: 1;
                        padding-left: .34rem;
                        display: flex;
                        align-items: center;
                        position: relative;
                        overflow: hidden;

                        span {
                            width: .14rem;
                            overflow: hidden;
                            padding-right: .26rem;
                        }

                        input {
                            height: 100%;
                            width: 100%;
                            font-size: .32rem;
                        }

                        b {
                            flex: 1;
                            font-weight: normal;
                            font-size: .3rem;
                        }

                        a {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }

        .describe {
            margin-top: .4rem;

            span {
                padding: 0 .89rem;
                height: .8rem;
                line-height: .8rem;
                text-align: right;
                display: block;
                background: #fff;
                margin-bottom: 2px;
            }
        }
    }

    .btns {
        display: flex;
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #fff;
        z-index: 999;

        span {
            flex: 1;
            text-align: right;
            height: 1.16rem;
            line-height: 1.16rem;
            font-size: .4rem;
            color: #515C6F;
            padding-right: .34rem;
        }

        b {
            width: 3.4rem;
            line-height: 1.16rem;
            height: 1.16rem;
            text-align: center;
            font-size: .32rem;
            color: #FFFFFF;
            background: #FF6666;
        }
    }
}
</style>