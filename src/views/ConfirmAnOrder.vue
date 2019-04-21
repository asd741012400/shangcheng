<template>
    <div class="ConfirmAnOrder">
        <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">确认订单</div>
            <div class="add"></div>
        </header>
        <div class="mian">
            <div class="commodity">
                <i><img src="../assets/img1.png" alt=""></i>
                <ul>
                    <li>
                        <strong>{{title}}</strong>
                    </li>
                    <li>
                        <!-- <span>一大一小</span> -->
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
            <div class="discounts">
                <b>使用优惠</b>
                <span>国庆卷</span>
            </div>
            <div class="message">
                <ul>
                    <li>
                        <label>孩子姓名</label>
                        <p><input type="text" v-model="real_name" placeholder="请输入姓名"></p>
                    </li>
                    <li>
                        <label>手机号</label>
                        <p><input type="text" v-model="tel" placeholder="请输入正确的手机号码"></p>
                    </li>
                    <li>
                        <label>身份证</label>
                        <p><input type="text" v-model="card_ID" placeholder="请输入正确的身份证号码"></p>
                    </li>
                    <li>
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
    </div>
</template>
<script>
import { DatetimePicker } from 'mint-ui';
import moment from 'moment'
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
            tel: '',
            goods: '',
            card_ID: '',
            num: 1,
            play_time: date,
            startDate: new Date(date),
        }
    },
    components: {

    },
    methods: {
        //开启时间选择器
        openPicker() {
            this.$refs.picker.open()
        },

        //点击确定按钮
        handleConfirm(data) {
            let date = moment(data).format('YYYY-MM-DD')
            this.play_time = date;
            this.$refs.picker.close()
            event.stopPropagation()
        },

        //添加订单
        async addOrder() {
            let postData = {
                order_type: this.$route.query.order_type,
                goods_id: this.$route.query.id,
                goods_title: this.title,
                goods_img: this.goods.thumb_img,
                real_name: this.real_name,
                play_time: this.play_time,
                attr_id: this.$route.query.attr_id,
                tel: this.tel,
                openid: this.$localstore.get('openid1'),
                order_num: this.num,
                amount: this.price,
                total_amount: this.total,
                card_ID: this.card_ID,
            }
            let res = await this.$postRequest('/order/AddOrder', postData)
            this.$message(res.data.msg)
            if (res.data.code == 1) {
                this.$router.push({ name: 'ConfirmPay', query: { id: res.data.data } })
            }
        },

        numChage(str) {
            const that = this;
            if (str == "-") {
                if (that.num <= 1) {
                    that.num = 1
                } else {
                    that.num = --that.num
                }
            } else {
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
                this.price = this.goods.goods_price
            } else if (type == 3) {
                let res = await this.$getRequest('home/GetCardDetail', { id: id })
                this.goods = res.data.data
                this.title = this.goods.card_name
                this.price = this.goods.card_price
            }
        }

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        this.getCard()
        document.body.style.background = "#fff";

    },

    computed: {
        total() {
            let total = this.num * this.price
            return total
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
            }

            ul {
                padding-left: .26rem;
                flex: 1;

                li {
                    strong {
                        font-size: .28rem;
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
                padding: .28rem .89rem .66rem;

                li {
                    display: flex;
                    align-items: center;
                    margin-bottom: .08rem;

                    label {
                        width: 1rem;
                        text-align: right;
                        padding-right: .24rem;
                    }

                    p {
                        height: .6rem;
                        border: 1px solid #C8C8C8;
                        border-radius: 5px;
                        flex: 1;
                        padding-left: .34rem;
                        display: flex;
                        align-items: center;
                        position: relative;

                        span {
                            width: .14rem;
                            overflow: hidden;
                            padding-right: .26rem;
                        }

                        input {
                            height: 100%;
                            width: 100%;
                        }

                        b {
                            flex: 1;
                            font-weight: normal;
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