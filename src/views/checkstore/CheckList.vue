<template>
    <div class="CheckList">
        <header>
            <div>
                <p>{{today_num}}</p>
                <span>今日核销</span>
            </div>
            <div>
                <p>{{total}}</p>
                <span>总核销</span>
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
        <div class="product">
            <ul>
                <li v-for="item in checklist">
                   <i><img :src="$imgUrl + item.thumb_img" alt="" /></i>
                    <div>
                        <h3>{{item.project_name}}</h3>
                        <p>
                            <span>用户：{{item.wechat_nickname}}</span>
                            <a>{{item.tel_phone}}</a>
                        </p>
                        <p>
                            <span>核销人：{{item.user_name}}</span>
                            <a>{{toTime(item.add_time)}}</a>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <mt-datetime-picker type="date" ref="picker" year-format="{value} 年" month-format="{value} 月"  @confirm="handleConfirm" :startDate="startDate">
        </mt-datetime-picker>
    </div>
</template>
<script>
import { DatetimePicker } from 'mint-ui';

import Vue from "vue";

Vue.component(DatetimePicker.name, DatetimePicker);
export default {
    name: 'CheckList',
    data() {
        let date = this.$dayjs().subtract(1, 'year').format('YYYY-MM')
        let date1 = this.$dayjs().format('YYYY-MM')
        return {
            startDate: new Date(date),
            dateTime: date1,
            checklist: [],
            shop: {},
            today_num: 0,
            total: 0,
            page: 1,
            currSize: 0,
            pageSize: 10,
        }
    },
    components: {},
    methods: {
        toTime(time) {
            return this.$dayjs.unix(time).format('YYYY-MM-DD')
        },
        //开启时间选择器
        openPicker() {
            this.$refs.picker.open()
        },
        //点击确定按钮
        handleConfirm(data) {
            let date = this.$dayjs(data).format('YYYY-MM')
            this.dateTime = date;
            this.$refs.picker.close()
            this.getCheckList()
            event.stopPropagation()
        },
        //获取店铺信息 及核销信息
        async getShop() {
            let userInfo = this.$localstore.get('business_user')
            let res = await this.$getRequest('/cancle/ShopInfo', { business_id: userInfo.business_id })
            this.shop = res.data.data.shopinfo
            this.today_num = res.data.data.cur_nums.nums
            this.total = res.data.data.all_nums.nums
        },
        //获取核销记录
        async getCheckList() {
            this.checklist = []
            let userInfo = this.$localstore.get('business_user')
            let data = {
                page: this.page,
                date: this.dateTime,
                admin_id: userInfo.user_id,
                business_id: userInfo.business_id,
            }
            let res = await this.$getRequest('/cancle/CancleList', data)
            if (res.data.data.list) {
                this.checklist = res.data.data.list;
                this.currSize = res.data.data.list.length
                this.pageSize = res.data.data.count
            }
        },
        //获取更多核销记录
        async getCheckListMore() {
            let userInfo = this.$localstore.get('business_user')
            let data = {
                page: this.page,
                date: this.dateTime,
                admin_id: userInfo.user_id,
                business_id: userInfo.business_id,
            }
            let res = await this.$getRequest('/cancle/CancleList', data)
            if (res.data.data.list) {
                this.checklist = this.checklist.concat(res.data.data.list);
                this.currSize = res.data.data.list.length
            }
        },

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.title = "核销记录"
        document.body.style.background = "#fff";

        let userInfo = this.$localstore.get('business_user')


        this.getShop()
        this.getCheckList()

        window.onscroll = () => {
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            //滚动条到底部的条件
            if (scrollTop + windowHeight == scrollHeight) {
                if (this.currSize >= this.pageSize) {
                    this.page++;
                    this.getCheckListMore(this.cid)
                }
            }
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
    beforeDestroy() {
          window.onscroll = null
    },

    // 销毁完成状态
    destroyed() {}

}
</script>
<style lang="scss" scoped>
.CheckList {
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

    .product {
        ul {
            li {
                padding: 0.27rem .3rem .38rem;
                border-top: 2px solid #f6f6f6;
                display: flex;
                align-items: center;

                img {
                    height: 100%;
                }

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