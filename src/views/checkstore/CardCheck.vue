<template>
    <div class="MyTeam">
        <header>
            <span><img src="../../assets/head_portrait2.png" alt=""></span>
            <div>
                <h3>
          <a>{{cardInfo.child_name}}【3岁】</a>
        </h3>
                <p>
                    <a>1362541254125</a>
                </p>
            </div>
        </header>
        <ul class="team_member">
            <li v-for="(item , index) in cardInfo.pro_list" @click="cardCheckFn(index)">
                <i><img :src="item.thumb_img" alt=""></i>
                <div>
                    <p class="name">
                        <b>{{item.card_name}}</b>
                    </p>
                    <p>剩余 {{item.limit_num}} 次</p>
                </div>
                <span><img  src="../../assets/icon_schedule.png" alt=""></span>
            </li>
        </ul>
        <a class="sub_btn">确定</a>
    </div>
</template>
<script>
export default {
    name: 'MyTeam',
    data() {
        return {
            cardInfo: {}
        }
    },
    components: {},
    methods: {
        cardCheckFn(index) {
            this.list[index].state = !this.list[index].state
        },
    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态 
    created() {
        document.body.style.background = "#F0F0F0";
        document.title = "卡片核销"
        let list = this.$localstore.get('cehckGoods')
        this.cardInfo = list.product_info
        console.log(this.cardInfo);
        // const date1 = this.$dayjs().format('YYYY-MM-DD')
        // const date2 = this.$dayjs(this.cardInfo.birthday)
        // date1.diff(date2, 'year')
        // console.log(date1.diff(date2, 'year'));
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
.MyTeam {
    header {
        height: 2.4rem;
        background: #FF6C5F;
        display: flex;
        align-items: center;
        padding-left: .38rem;

        span {
            width: 1.32rem;
            height: 1.32rem;
            overflow: hidden;
            border: 5px solid #fff;
            border-radius: 50%;
        }

        div {
            padding-left: .33rem;
            color: #fff;

            h3 {
                display: flex;
                font-size: .3rem;
                align-items: center;

                a {
                    color: #fff;
                }

                i {
                    margin-left: .28rem;
                    font-size: 0.24rem;
                    font-weight: normal;
                    font-style: normal;
                }
            }

            p {
                padding-top: .15rem;
                display: flex;
                align-items: center;
                font-size: .28rem;

                a {
                    color: #fff;
                }
            }
        }
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

            div {
                padding-left: .4rem;
                flex: 1;

                p {
                    font-size: .28rem;
                    color: #000000;
                    display: flex;

                    b {
                        font-size: .32rem;
                        width: 4.1rem;
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

            span {
                width: 0.46rem;
                height: 0.46rem;
                overflow: hidden;
                border-radius: 50%;
                background-image: linear-gradient(#e4e4e4,
                    #e4e4e4),
                    linear-gradient(#ff6c60,
                    #ff6c60);
                background-blend-mode: normal,
                    normal;
                border: solid 0.03rem #c8c8c8;
            }
        }
    }

    .sub_btn {
        margin: .54rem .68rem 0;
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