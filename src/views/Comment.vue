<template>
    <div class="Comment">
        <!--         <header>
            <div class="icon_return" @click="$router.go(-1)"><span><img src="../assets/icon_return_h.png" alt=""></span></div>
            <div class="tel">发表评价</div>
            <div class="add"></div>
        </header> -->
        <div class="commodity">
            <span><img :src="$imgUrl + this.thumb_img" alt=""></span>
            <div class="right">
                <p>{{title}}</p>
                <div class="bottom">
                    <a>评分</a>
                    <van-rate v-model="star_level" />
                </div>
            </div>
        </div>
        <div class="comment_text">
            <div class="textareas">
                <textarea v-model="content" placeholder="快来发表你的评论吧"></textarea>
            </div>
            <div class="camera">
                <p v-for="(item,index) in imagesUrl">
                    <span><img :src="$imgUrl+item" alt=""></span>
                    <em @click="removeImages(index)"><img src="../assets/icon_close.png" alt=""></em>
                </p>
                <p>
                    <input type="file" id="upload-ele" multiple name="image" accept=“image/*” @change='handleInputChange'>
                    <i><img src="../assets/icon_camera.png" alt=""></i>
                </p>
            </div>
            <div class="anonymity" @click="anonymityFn">
                <i v-if="anonymityState"><img src="../assets/icon_pitch_on.png" alt=""></i>
                <i v-else><img src="../assets/icon_unselected.png" alt=""></i>
                <p>匿名评价</p>
            </div>
        </div>
        <span class="btn" @click="submit()">提 交</span>
    </div>
</template>
<script>
// import { log } from 'util';
import { postRequest } from '@/lib/axios'
import lrz from 'lrz'

export default {
    name: 'Comment',
    data() {
        return {
            star_level: 0,
            title: '',
            thumb_img: '',
            content: '',
            imagesUrl: [],
            anonymityState: 0
        }
    },
    components: {},
    methods: {
        //图片上传
        handleInputChange(ev) {
            const that = this;
            if (this.imagesUrl.length >= 10) {
                this.$message('最多只能上传10张！');
                return false;
            }

            let fil = document.getElementById('upload-ele').files;
            let arr = [];
            for (var i = 0; i < fil.length; i++) {
                if (fil[i].size > 5 * 1024 * 1024) {
                    this.$message('上传文件大小不能超过 5MB!');
                } else {
                    arr.push(fil[i])
                }
            }

            let instance = that.$message({
                message: '图片正在上传中',
                duration: 5000
            });

            let imagesUrlArr = that.imagesUrl;
            var length = arr.length;
            for (let i = 0; i < length; i++) {
                lrz(arr[i], {
                        width: 300,
                        quality: 0.8,
                    })
                    .then(function(rst) {
                        postRequest('/upload/UpBase64Image', { img: rst.base64 })
                            .then(res => {
                                // that.$message(res.data.msg);
                                if (res.data.code == 1) {
                                    // that.imgUrl = res.data.data
                                    that.imagesUrl.push(res.data.data)
                                } else {
                                    that.$message(res.data.msg);
                                }
                                // instance.close();
                            })
                            .catch(function(error) {
                                // instance.close();
                                console.log(error);
                            });
                        //成功时执行

                    }).catch(function(error) {
                        //失败时执行
                        that.$message('图片上传失败');
                    }).always(function() {
                        //不管成功或失败，都会执行
                        instance.close();
                    })


            }
            that.imagesUrlLength = that.imagesUrl.length
        },
        //删除图片
        removeImages(index) {
            const that = this;
            that.imagesUrl.splice(index, 1)
        },
        anonymityFn() {
            const that = this;
            that.anonymityState = !that.anonymityState
        },

        //获取商品
        async getGoods() {
            var url = ''
            let type = this.$route.query.type
            let data = { id: this.$route.query.goods_id }
            if (type == 1) {
                url = '/home/GetGoodsDetail'
            } else if (type == 2) {
                url = '/home/GetPlus'
            } else if (type == 3) {
                url = '/home/GetCardDetail'
            } else if (type == 4) {
                url = '/home/GetStoreDetail'
                data = { store_id: this.$route.query.goods_id }
            }

            //获取详情
            let res = await this.$getRequest(url, data);
            if (res.data.code == 1) {
                if (type != 4) {
                    if (type == 1) {
                        this.title = res.data.data.goods_name
                    } else if (type == 2) {
                        this.title = res.data.data.name
                    } else if (type == 3) {
                        this.title = res.data.data.card_name
                    }
                    this.thumb_img = res.data.data.thumb_img || res.data.data.thumb
                } else {
                    this.title = res.data.data.business_name
                    this.thumb_img = res.data.data.thumb_img || res.data.data.business_img[0]
                }
            }
        },

        //发表评论
        async submit() {
            let userInfo = this.$localstore.get('wx_user')
            let data = {
                user_id: userInfo.user_id,
                user_name: userInfo.username,
                anonymous: this.anonymityState ? 1 : 0,
                content: this.content,
                star_level: this.star_level,
                order_id: this.$route.query.id,
                goods_id: this.$route.query.goods_id,
                comment_type: this.$route.query.type,
                thumb: this.imagesUrl.join(','),
            }

            let res = await this.$postRequest('/comment/AddComments', data)
            this.$message(res.data.msg);
            if (res.data.code == 1) {
                this.$router.replace({ name: 'CommentSucceed' })
            }
        }

    },

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {
        document.title = "评论"
        document.body.style.background = "#F6F6F6";
        this.getGoods()
    },

    // 挂载前状态
    beforeMount() {},

    // 挂载结束状态
    mounted() {

    },

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
.Comment {
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

    .commodity {
        background: #fff;
        padding: .44rem .46rem .8rem;
        display: flex;
        align-items: center;


        span {
            display: block;
            margin-right: .2rem;

            img {
                display: block;
                width: 2.04rem;
                height: 2.04rem;
                object-fit: cover
            }
        }

        .right {
            display: flex;
            flex-direction: column;
            // align-items: center;
            // justify-content: center;

            .bottom {
                margin-top: 0.2rem;
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            a {
                font-size: .28rem;
                color: #535D70;
                padding-right: .22rem;
            }

            p {
                display: flex;
                font-size: .28rem;
                word-break: break-all;

                i {
                    width: .28rem;
                    overflow: hidden;
                    margin-right: 5px;
                }
            }
        }

    }

    .comment_text {
        background: #fff;
        margin-top: 10px;
        padding: .5rem .52rem;

        .textareas {
            display: block;
            height: 1.6rem;
            overflow: hidden;

            textarea {
                width: 100%;
                height: 100%;
                outline: medium;
                border: none;
                font-size: 14px;
            }
        }

        .camera {
            display: flex;

            p {
                width: 1rem;
                height: 1rem;
                position: relative;
                margin-right: .2rem;

                input {
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                i {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }

                span {
                    overflow: hidden;
                    width: 1rem;
                    height: 1rem;
                    display: block;
                }

                em {
                    position: absolute;
                    top: -.15rem;
                    right: -.15rem;
                    width: .3rem;
                    height: .3rem;
                }
            }
        }
    }

    .anonymity {
        display: flex;
        padding: .4rem 0 .72rem;
        margin-top: .8rem;
        border-top: 1px solid #CCCCCC;
        align-items: center;
        font-size: .28rem;

        i {
            width: .3rem;
            overflow: hidden;
            padding-right: .12rem;
        }
    }

    .btn {
        width: 5.6rem;
        line-height: .8rem;
        height: .8rem;
        text-align: center;
        color: #fff;
        background: #FF6666;
        box-shadow: 0px 5px 10px rgba(255, 128, 128, 0.6);
        display: block;
        margin: 1rem auto 0;
        border-radius: 50px;

    }
}

.van-icon-star-o {
    font-size: 0.36rem !important;
    color: #CCCCCC !important;
}

.van-icon-star {
    font-size: 0.36rem !important;
    color: #FB4950 !important;
}
</style>