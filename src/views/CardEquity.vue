<template>
    <div class="CardEquity">
        <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_w.png" alt=""></span></div>
            <h3>权益中心</h3>
            <div class="to_be_used">
                <div class="image">
                    <i><img :src="$imgUrl + card.thumb_img" alt=""></i>
                    <div>
                        <p>卡号：{{card.card_num}}</p>
                        <!-- <span id="qrcode"><img src="../assets/code2.png" alt=""></span> -->
                    </div>
                </div>
                <div class="user">
                    <span><img :src="$imgUrl + card.head_img" alt=""></span>
                    <p>{{card.child_name}}</p>
                </div>
                <div class="content">
                    <div class="text">
                        <p>{{card.card_name}}</p>
                        <span>剩余{{card.days}}天</span>
                    </div>
                    <div class="right">
                        <a>已领取{{total_num || 0}}/{{card.free_num}}</a>
                    </div>
                </div>
            </div>
        </header>
        <div class="warning">
            <i><img src="../assets/icon_warning2.png" alt=""></i>
            <p>领取之后，各商家的指定消费权益将绑定在该卡内，凭借上方二维码即可核销使用，消费时间请以卡包内商家说明为准（可点击对应卡内产品介绍查询）。部分商家需预约使用，最终解释权归属于小圆圈所有。</p>
        </div>
        <div class="search">
            <p>
                <i><img src="../assets/icon_shop.png" alt=""></i>
                <b style="font-size:0.26rem;">可领取福利</b>
            </p>
            <div>
                <i @click="getList"><img src="../assets/icon_search2.png" alt=""></i>
                <input type="text" v-model="search" @keyup.enter="getList" @blur="getList">
            </div>
        </div>
        <div class="project_select">
            <!--             <div class="distance" @click="actionsheetShow(1)">
                <span>{{selectTypes.distance}}</span>
                <i v-if="distance"><img src="../assets/icon_up.png" alt=""></i>
                <i v-else><img src="../assets/icon_pull_down.png" alt=""></i>
            </div> -->
            <div class="types" @click="actionsheetShow(2)">
                <span>{{selectTypes.types}}</span>
                <i v-if="distance"><img src="../assets/icon_up.png" alt=""></i>
                <i v-else><img src="../assets/icon_pull_down.png" alt=""></i>
            </div>
            <div class="age" @click="actionsheetShow(3)">
                <span>{{selectTypes.age}}</span>
                <i v-if="distance"><img src="../assets/icon_up.png" alt=""></i>
                <i v-else><img src="../assets/icon_pull_down.png" alt=""></i>
            </div>
        </div>
        <div class="project_list">
            <ul>
                <li v-for="(item,index) in list" :key="index" :class="!$calcTime2(item.limit_type,item.limit_days,item.limit_stime,item.limit_etime) ? 'li_color' : ''">
                    <div class="image" @click="goProject(item)">
                        <i><img :src="$imgUrl+item.thumb_img" alt=""></i>
                        <p>库存<span>{{item.store}}</span></p>
                    </div>
                    <div class="text">
                        <h3 @click="goProject(item)">
                          <span>{{item.project_name}}</span>
                          <b>畅玩{{item.use_num}}次</b>
                        </h3>
                        <div class="text_div" @click="goProject(item)">
                            <div class="text-clip">{{item.project_dsc}}</div>
                            <p style="margin: 5px 0;" v-if="$calcTime2(item.limit_type,item.limit_days,item.limit_stime,item.limit_etime)">{{$calcTime2(item.limit_type,item.limit_days,item.limit_stime,item.limit_etime)}}</p>
                            <p style="margin: 5px 0;" v-else>已过期</p>
                            <em v-if="item.is_deduct == 2">消耗1次权益</em>
                            <em v-else>免费</em>
                        </div>
                        <div class="price_div" style="margin-top: 15px;">
                            <b>价值￥{{item.project_price}}</b>
                            <template v-if="$calcTime2(item.limit_type,item.limit_days,item.limit_stime,item.limit_etime)">
                                <template v-if="item.project_cancle_status == 3 || item.project_cancle_status == 4">
                                    <a class="gray" href="javascript:;">已领取</a>
                                </template>
                                <template v-else>
                                    <a v-if="item.is_deduct == 2" @click="getPlus(item)">领 取</a>
                                    <a v-else @click="getPlus(item)">免费领取</a>
                                </template>
                            </template>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="sub_btn" @click="useCard"><span>去使用</span></div>
        <van-actionsheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" />
    </div>
</template>
<script>
import QRCode from 'qrcode'
import { Actionsheet } from 'vant';

export default {
    name: 'CardEquity',
    data() {
        return {
            distance: false,
            types: false,
            search: '',
            age: '',
            cid: '',
            user: {},
            card: {},
            list: [],
            total_num: 0,
            page: 1,
            currSize: 0,
            pageSize: 10,
            show: false,
            actions: [],
            types: [],
            actionsIndex: 0,
            selectTypes: {
                distance: "距离",
                types: "类型",
                age: "年龄"
            }
        }
    },
    components: {
        Actionsheet
    },
    methods: {
        //切换下拉
        onSelect(item, index) {
            const that = this;
            that.show = false;
            if (that.actionsIndex == 1) {
                that.selectTypes.distance = item.name;
            } else if (that.actionsIndex == 2) {
                that.selectTypes.types = item.name;
                that.cid = item.value;
            } else if (that.actionsIndex == 3) {
                that.selectTypes.age = item.name;
                that.age = item.value;
            }

            // 接口请求
            this.getList()

        },
        //项目详情
        goProject(item) {
            this.$router.push({ name: 'CardProjectDetails', query: { project_id: item.project_id, card_id: 1, type: 1 } })
        },
        actionsheetShow(num) {
            const that = this;
            that.actionsIndex = num;
            if (num == 1) {
                that.actions = [{
                            name: '不限'
                        },
                        {
                            name: '1km以内',
                        },
                        {
                            name: '3km以内',
                        },
                        {
                            name: '5km以内',
                        },
                        {
                            name: '10km以上',
                        }
                    ],
                    that.show = true;
            } else if (num == 2) {
                that.actions = that.types,
                    that.show = true;
            } else if (num == 3) {
                that.actions = [{
                            name: '全部',
                            value: ''
                        },
                        {
                            name: '0-3岁',
                            value: '0-3'
                        },
                        {
                            name: '6-12岁',
                            value: '6-12'
                        },
                        {
                            name: '12岁以上',
                            value: '12'
                        }
                    ],
                    that.show = true;
            }
        },
        //领取
        async getPlus(item) {
            if (item.is_vip == 2 && this.user.status == 0) {
                this.$message('该项目只限会员领取！')
                return false
            }

            if (item.is_deduct == 2) {
                if (this.total_num == this.card.free_num) {
                    this.$message('你的权益次数已领取完！')
                    return false
                }
                let num = this.card.free_num - this.total_num
                this.$dialog.alert({
                    showCancelButton: true,
                    message: '你当前消耗剩余' + num + '次权益，领取将消耗1次机会'
                }).then(async () => {
                    let res = await this.$postRequest('/card/SureProject', { project_id: item.project_id, cd_id: this.card.cdid })
                    this.$message(res.data.msg)
                    this.getList()
                }).catch(() => {

                });
            } else {
                let res = await this.$postRequest('/card/SureProject', { project_id: item.project_id, cd_id: this.card.cdid })
                this.$message(res.data.msg)
                this.getList()
            }

        },
        //使用卡片
        useCard() {
            this.$router.push({ name: 'UseCard' })
        },
        async getType() {
            let res = await this.$getRequest('/business/ProjectCate')
            let arr = [{
                name: '全部',
                value: ''
            }]
            this.actions = res.data.data
            res.data.data.map(item => {
                arr.push({ name: item.c_name, value: item.c_id })
            })
            this.types = arr
        },
        //项目列表
        async getList() {
            let data = { cd_id: this.card.cdid, get_rights: this.card.get_rights, age: this.age, search: this.search, type: this.cid }
            let res = await this.$getRequest('/card/GetProjectList', data)
            this.list = res.data.data.list
            this.total_num = res.data.data.total_num.use_num
            this.currSize = res.data.data.list.length
            this.pageSize = 10
            this.project_price = res.data.data.project_price
        },
        //项目列表更多
        async getListMore() {
            let data = { cd_id: this.card.cdid, get_rights: this.card.get_rights, age: this.age, search: this.search, type: this.cid }
            let res = await this.$getRequest('/card/GetProjectList', data)
            this.list = this.list.concat(res.data.data.list);
            this.currSize = res.data.data.list.length
            this.total_num = res.data.data.total_num.use_num
        },
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        document.title = "卡片权益"
        document.body.style.background = "#F6F6F6";
        let card = this.$localstore.get('usecard')
        this.card = card

        if (!card) {
            this.$router.push({ name: "Index" })
        }
        let user = this.$localstore.get('wx_user')
        if (user) {
            this.user = user
        }
        this.getList()
        this.getType()

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
                    // this.getListMore()
                }
            }
        }

    },

    // 挂载前状态
    beforeMount() {},

    // 挂载结束状态
    mounted() {
        // let qrcode = new QRCode('qrcode', {
        //     // width: 60,
        //     // height: 60, // 高度
        //     text: this.card.cancle_code, // 二维码内容
        //     // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        //     // background: '#f0f',
        //     // foreground: '#ff0'
        // })
    },

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
.CardEquity {
    header {
        background: linear-gradient(147deg, rgba(255, 102, 102, 1) 0%, rgba(255, 179, 137, 1) 100%) center top/100% 4.76rem no-repeat;

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

        h3 {
            line-height: 1.6rem;
            text-align: center;
            font-weight: bold;
            color: #fff;
            font-size: .32rem;
        }

        .to_be_used {
            width: 6.6rem;
            margin: 0 auto;
            border-radius: 10px;
            overflow: hidden;
            background: #fff;

            .image {
                height: 2.4rem;
                position: relative;

                i {
                    overflow: hidden;
                    display: block;
                }

                div {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    p {
                        position: absolute;
                        left: .28rem;
                        top: .18rem;
                        color: #fff;
                    }

                    span {
                        width: 1.5rem;
                        height: 1.5rem;
                        overflow: hidden;
                    }
                }
            }

            .user {
                display: flex;
                padding-left: .4rem;
                height: .6rem;
                position: relative;

                span {
                    width: .88rem;
                    height: .88rem;
                    border-radius: 50%;
                    overflow: hidden;
                    position: absolute;
                    top: -.44rem;
                }

                p {
                    padding-left: 1.1rem;
                    font-size: .28rem;
                    color: #515C6F;
                    flex: 1;
                    padding-top: 2px;
                }

                a {
                    font-size: .24rem;
                    color: #FF6666;
                    padding-right: .32rem;
                    padding-top: 2px;
                }
            }

            .content {
                display: flex;
                padding: 0 .28rem .2rem .4rem;
                align-items: flex-end;

                .text {
                    display: flex;
                    align-items: flex-start;
                    flex: 1;
                    flex-direction: column;
                    justify-content: flex-start;

                    p {
                        font-size: .26rem;
                        color: #535D70;
                    }

                    span {
                        font-size: .26rem;
                        color: #FFB389;
                        padding-top: .1rem;
                    }
                }

            }
        }
    }

    .warning {
        width: 6.6rem;
        display: flex;
        margin: 0 auto;
        padding-top: .14rem;

        i {
            width: .3rem;
            height: .3rem;
            overflow: hidden;
        }

        p {
            flex: 1;
            font-size: .22rem;
            color: #515C6F;
            line-height: .3rem;
            padding: 0 6px;
        }
    }

    .search {
        margin-top: .08rem;
        background: #fff;
        display: flex;
        align-items: center;
        height: 1.04rem;

        p {
            display: flex;
            align-items: center;
            padding-left: .76rem;
            flex: 1;

            i {
                width: .38rem;
                overflow: hidden;
            }

            b {
                font-size: .26rem;
                color: #515C6F;
                padding-left: .06rem;
            }
        }

        div {
            display: flex;
            align-items: center;
            margin-right: .44rem;
            background: #F6F6F6;
            border-radius: 20px;
            height: .6rem;
            overflow: hidden;

            i {
                width: .4rem;
                overflow: hidden;
                padding-left: .3rem;
            }

            input {
                flex: 1;
                height: 100%;
                padding-left: .1rem;
                background: none;
            }
        }
    }

    .project_select {
        display: flex;
        justify-content: space-around;
        padding: 0 .7rem;
        height: .82rem;
        align-items: center;
        background: #fff;
        margin-top: 2px;

        div {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .28rem;
            color: #515C6F;

            i {
                width: .15rem;
                overflow: hidden;
                padding-left: .18rem;
            }
        }
    }

    .project_list {
        margin-top: .1rem;
        padding-bottom: 1rem;

        ul {

            li.li_color {
                .image {
                    img {
                        -webkit-filter: grayscale(1);
                        /* Webkit */
                        filter: gray;
                        /* IE6-9 */
                        filter: grayscale(1);
                        /* W3C */
                    }

                }

                .text-clip {
                    color: #999999;
                }

                .text {
                    h3 {
                        span {
                            color: #999999;
                        }

                        b {
                            color: #999999;
                        }
                    }

                    .price_div {
                        b {
                            color: #999999;
                        }
                    }
                }
            }

            li {
                display: flex;
                padding: .44rem .45rem .8rem;
                background: #fff;
                margin-bottom: .2rem;

                .image {
                    width: 2.04rem;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    i {
                        display: block;
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

                    p {
                        position: absolute;
                        top: 2.1rem;
                        font-size: .24rem;
                        color: #515C6F;

                        span {
                            color: #FF6666;
                            padding: 0 4px;
                        }
                    }
                }

                .text {
                    padding-left: .26rem;
                    flex: 1;

                    h3 {
                        display: flex;
                        align-items: center;
                        margin-bottom: 5px;

                        span {
                            flex: 1;
                            font-size: .28rem;
                            color: #535D70;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            width: .5rem;
                        }

                        b {
                            font-weight: bold;
                            font-size: .24rem;
                            color: #FF6666;
                        }
                    }

                    .text_div {
                        // height: 1.3rem;

                        .text-clip {
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            font-size: .3rem;
                        }

                        p {
                            font-size: .24rem;
                            color: #999999;
                        }

                        em {
                            font-style: normal;
                            display: inline-block;
                            // width: 1.54rem;
                            height: .34rem;
                            padding: 0.03rem 0.08rem;
                            line-height: .34rem;
                            border: 1px solid #FFB389;
                            color: #FFB389;
                            text-align: center;
                        }
                    }

                    .price_div {
                        display: flex;
                        align-items: center;

                        .gray {
                            background: #ddd;
                        }

                        b {
                            flex: 1;
                            font-size: .28rem;
                            color: #535D70;
                        }

                        a {
                            border-radius: 50px;
                            background: #FF6666;
                            color: #fff;
                            text-align: center;
                            width: 1.42rem;
                            line-height: .52rem;
                            height: .52rem;
                        }
                    }
                }
            }
        }
    }

    .sub_btn {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        width: 100%;
        bottom: .2rem;

        span {
            font-size: 0.32rem;
            font-weight: bold;
            background: #FF6666;
            font-weight: bold;
            color: #fff;
            width: 100%;
            text-align: center;
            line-height: .8rem;
            border-radius: 50px;
            margin: 0 .96rem;
        }
    }
}
</style>