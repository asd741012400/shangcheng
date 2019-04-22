<template>
    <div class="StoreList">
        <header>
            <div>
                <p>￥999</p>
                <span>当月提现</span>
            </div>
            <div>
                <p>￥999</p>
                <span>累计提现</span>
            </div>
        </header>
        <div class="titles">
            <p>全部记录</p>
            <div>
                <time>{{dateTime}}</time>
                <span><img src="../../assets/icon_pull_down.png" alt=""></span>
                <em @click="openPicker"></em>
            </div>
        </div>
        <div class="list">
            <ul>
                <li>
                    <div>
                        <h3>
                            <span>金额：￥500</span>
                            <a>已提现</a>
                        </h3>
                        <em>商户流水号：000000</em>
                        <p>
                            <span>2018-5-6 10:00</span>
                            <a>明细></a>
                        </p>
                    </div>
                </li>
                <li>
                    <div>
                        <h3>
                            <span>金额：￥500</span>
                            <a>已提现</a>
                        </h3>
                        <em>商户流水号：000000</em>
                        <p>
                            <span>2018-5-6 10:00</span>
                            <a>明细></a>
                        </p>
                    </div>
                </li>
                <li>
                    <div>
                        <h3>
                            <span>金额：￥500</span>
                            <a>已提现</a>
                        </h3>
                        <em>商户流水号：000000</em>
                        <p>
                            <span>2018-5-6 10:00</span>
                            <a>明细></a>
                        </p>
                    </div>
                </li>
                <li>
                    <div>
                        <h3>
                            <span>金额：￥500</span>
                            <a>已提现</a>
                        </h3>
                        <em>商户流水号：000000</em>
                        <p>
                            <span>2018-5-6 10:00</span>
                            <a>明细></a>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
 
        <mt-datetime-picker
            type="date"
            ref="picker"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="handleConfirm"
            :startDate="startDate">
        </mt-datetime-picker>
    </div>
</template>
<script>
import { DatetimePicker } from 'mint-ui';

import Vue from "vue";

Vue.component(DatetimePicker.name, DatetimePicker);
export default {
    name: 'StoreList',
    data() {
        return {
            startDate: new Date('2019-01-01'),
            dateTime:'请选择时间'
        }
    },
    components: {},
    methods: {
        //开启时间选择器
        openPicker () {
            this.$refs.picker.open()
        },
        //点击确定按钮
        handleConfirm (data) {
            let date = this.$dayjs().format('YYYY-MM-DD')
            this.dateTime = date;
            this.$refs.picker.close()
            event.stopPropagation()
        },

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.title = "提现记录"
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
.StoreList{
    header{
        height: 2.4rem;
        background: #FF6C5F;
        display: flex;
        align-items: center;
        justify-content: center;
        div{
        width: 2.6rem;
        color: #fff;
        display: flex;
        align-items: center;
        flex-direction: column;
        font-size: .28rem;
        p{
            font-size: .48rem;
            padding-bottom: .1rem;
        }
        }
    }
    .titles{
        height: 1.15rem;
        display: flex;
        align-items: center;
        padding-right: .5rem;
        p{
            flex: 1;
            font-size: 0.3rem;
            padding-left: .43rem;
        }
        div{
            position: relative;
            display: flex;
            align-items: center;
            height: 100%;
            width: 2rem;
            time{
                flex: 1;
                font-size: 0.3rem;
            }
            span{
                width: .3rem;
                overflow: hidden;
            }
            em{
                position: absolute;
                width: 100%;
                height: 100%;
            }
        }
    }
    .list{
        ul{
            li{
                padding: 0.33rem .43rem .42rem .51rem;
                border-top: 2px solid #f6f6f6;
                display: flex;
                align-items: center;
                div{
                    display: flex;
                    flex: 1;
                    height: 1.4rem;
                    flex-direction: column;
                    justify-content: space-between;
                    h3{
                        font-size: 0.3rem;
                        display: flex;
                        span{
                            flex: 1;
                            font-weight: bold;
                        }
                        a{
                            font-weight: bold;
                        }
                    }
                    em{
                        font-size: 0.24rem;
                        color: #666666;
                        font-style: normal;
                    }
                    p{
                        font-size: 0.24rem;
                        display: flex;
                        span{
                            flex: 1;
                            color: #666666;
                        }
                        a{
                            text-decoration: underline;
                            font-size: 0.3rem;
                        }
                    }
                }
            }
        }
    }
}
</style>
<style>
.el-message-box{
    width: 80%;
}
</style>