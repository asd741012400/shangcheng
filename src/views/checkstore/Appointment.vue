<template>
    <div class="Appointment">
        <header>
            <div>
                <p>999</p>
                <span>今日预约</span>
            </div>
            <div>
                <p>999</p>
                <span>总预约</span>
            </div>
        </header>
        <div class="titles">
            <p>核销记录</p>
            <div>
                <time>{{dateTime}}</time>
                <span><img src="../../assets/icon_pull_down.png" alt=""></span>
                <em @click="openPicker"></em>
            </div>
        </div>
        <div class="tab">
            <p :class="tab == 1 ? 'active' : ''" @click="tabFn(1)">全部</p>
            <p :class="tab == 2 ? 'active' : ''" @click="tabFn(2)">未核销</p>
            <p :class="tab == 3 ? 'active' : ''" @click="tabFn(3)">已核销</p>
        </div>
        <div class="product">
            <ul>
                <li>
                    <i>img</i>
                    <div>
                        <h3>游乐园亲子门票系列280元张</h3>
                        <p>
                            <span>用户：可可</span>
                            <a>15283008371</a>
                        </p>
                        <p>
                            <span>核销人：张大宏</span>
                            <a>2018-5-6 10:00</a>
                        </p>
                    </div>
                </li>
                <li>
                    <i>img</i>
                    <div>
                        <h3>游乐园亲子门票系列280元张</h3>
                        <p>
                            <span>用户：可可</span>
                            <a>15283008371</a>
                        </p>
                        <p>
                            <span>核销人：张大宏</span>
                            <a>2018-5-6 10:00</a>
                        </p>
                    </div>
                </li>
                <li>
                    <i>img</i>
                    <div>
                        <h3>游乐园亲子门票系列280元张</h3>
                        <p>
                            <span>用户：可可</span>
                            <a>15283008371</a>
                        </p>
                        <p>
                            <span>核销人：张大宏</span>
                            <a>2018-5-6 10:00</a>
                        </p>
                    </div>
                </li>
                <li>
                    <i>img</i>
                    <div>
                        <h3>游乐园亲子门票系列280元张</h3>
                        <p>
                            <span>用户：可可</span>
                            <a>15283008371</a>
                        </p>
                        <p>
                            <span>核销人：张大宏</span>
                            <a>2018-5-6 10:00</a>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <mt-datetime-picker type="date" ref="picker" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm" :startDate="startDate">
        </mt-datetime-picker>
    </div>
</template>
<script>
import { DatetimePicker } from 'mint-ui';

import Vue from "vue";

Vue.component(DatetimePicker.name, DatetimePicker);
export default {
    name: 'Appointment',
    data() {
        return {
            startDate: new Date('2019-01-01'),
            dateTime: '请选择时间',
            tab: 1
        }
    },
    components: {},
    methods: {
        //开启时间选择器
        openPicker() {
            this.$refs.picker.open()
        },
        //点击确定按钮
        handleConfirm(data) {
            let date = this.$dayjs().format('YYYY-MM-DD')
            this.dateTime = date;
            this.$refs.picker.close()
            event.stopPropagation()
        },
        tabFn(num) {
            this.tab = num;
        }

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.body.style.background = "#fff";
        document.title = "预约记录"
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
.Appointment {
    header {
        height: 2.4rem;
        background: #FF6C5F;
        display: flex;
        align-items: center;
        justify-content: center;

        div {
            width: 2.6rem;
            color: #fff;
            display: flex;
            align-items: center;
            flex-direction: column;
            font-size: .28rem;

            p {
                font-size: .48rem;
                padding-bottom: .1rem;
            }

        }
    }

    .titles {
        height: 1.15rem;
        display: flex;
        align-items: center;
        padding-right: .5rem;

        p {
            flex: 1;
            font-size: 0.3rem;
            padding-left: .43rem;
        }

        div {
            position: relative;
            display: flex;
            align-items: center;
            height: 100%;
            width: 2rem;

            time {
                flex: 1;
                font-size: 0.3rem;
            }

            span {
                width: .3rem;
                overflow: hidden;
            }

            em {
                position: absolute;
                width: 100%;
                height: 100%;
            }
        }
    }

    .tab {
        height: 1rem;
        align-items: center;
        justify-content: space-around;
        display: flex;
        background: #f6f6f6;

        p {
            width: 2.24rem;
            height: 0.58rem;
            line-height: .58rem;
            background-color: #ffffff;
            border-radius: 0.12rem;
            border: 1px solid #fff;
            text-align: center;
        }

        .active {
            border: 1px solid #ff6c60;
            color: #ff6c60;
        }
    }

    .product {
        ul {
            li {
                padding: 0.27rem .3rem .38rem;
                border-top: 2px solid #f6f6f6;
                display: flex;
                align-items: center;

                i {
                    width: 1.26rem;
                    height: 1.26rem;
                    background-color: #f75835;
                    border-radius: 0.12rem;
                    overflow: hidden;
                }

                div {
                    height: 1.26rem;
                    flex: 1;
                    padding-left: .36rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    h3 {
                        font-weight: bold;
                        font-size: 0.3rem;
                        width: 5.1rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    p {
                        font-size: 0.24rem;
                        display: flex;

                        a {
                            padding-left: .53rem;
                        }
                    }
                }
            }
        }
    }
}
</style>
<style>
.el-message-box {
    width: 80%;
}
</style>