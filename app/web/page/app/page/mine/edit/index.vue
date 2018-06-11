<template>
    <div class="mine-edit">
        <s-header title="编辑">
            <div class="compelete-edit" @click="compeleteEdit">完成</div>
        </s-header>
        <div class="edit-info-list">
            <div class="edit-info-item clearfix">
                <label for="nickName">昵称</label>
                <input type="text" id="nickName" name="nickeName" placeholder="请输入昵称" v-model="editUserInfo.nickName">
            </div>
            <div class="edit-info-item clearfix">
                <label for="phone">手机号</label>
                <input type="text" id="phone" name="phone" placeholder="请输入手机号" v-model="editUserInfo.phone">
            </div>
            <div class="edit-info-item clearfix">
                <label for="email">邮箱</label>
                <input type="text" id="email" name="email" placeholder="请输入邮箱" v-model="editUserInfo.email">
            </div>
            <div class="edit-info-item clearfix">
                <label for="sex">性别</label>
                <input type="text" id="sex" name="sex" placeholder="请选择性别" v-model="editUserInfo.sex">
            </div>
            <div class="edit-info-item clearfix">
                <label for="birthday">生日</label>
                <input type="text" id="birthday" name="birthday" placeholder="请选择生日" v-model="editUserInfo.birthday">
            </div>
        </div>
    </div>
</template>
<script>
import SHeader from '../../../component/header';
const noop = function() {};
export default {
    data() {
        return {
            editUserInfo: {
                nickName: '',
            }
        }
    },
    components: {
        SHeader
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        }
    },
    beforeMount() {
        this.editUserInfo.nickName = this.userInfo.nickName;
        this.editUserInfo.sex = this.userInfo.sex;
        this.editUserInfo.birthday = this.userInfo.birthday;
        this.editUserInfo.phone = this.userInfo.phone;
        this.editUserInfo.email = this.userInfo.email;
    },
    beforeDestroy() {
        this.goBack = noop;
    },
    methods: {
        compeleteEdit() {
            let me = this;
            this.$store.dispatch('USER_EDIT', this.editUserInfo).then(rs => {
                if (rs.data.code === 200) {
                    this.$tip({
                        message: '资料修改成功',
                        type: 'success',
                        onClose() {
                            me.goBack();
                        }
                    })
                } else {
                    this.$tip({
                        message: rs.data.msg,
                        type: 'error'
                    })
                }
            }).catch(err => {
                this.$tip({
                    message: err.message,
                    type: 'error'
                })
            })
        },
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="less" scoped>
    @import "../../../../../asset/style/mixin-px.less";
    .mine-edit{
        min-height: 100%;
        background-color: #f7f7f7;
        .px2rem(padding-top, 90);
        .compelete-edit{
            .px2rem(font-size, 30);
            color: #41bfaa;
        }
        .edit-info-list{
            .edit-info-item{
                .px2rem(height, 90);
                .px2rem(line-height, 90);
                .px2rem(margin, 30);
                .px2rem(margin-top, 10);
                .px2rem(margin-bottom, 0);
                border-bottom: 1px solid #e8e8e8;
                label{
                    .px2rem(font-size, 28);
                    color: #666;
                }
                input{
                    .px2rem(line-height, 86);
                    .px2rem(font-size, 28);
                    .px2rem(width, 500);
                    float: right;
                    border: none;
                    outline: none;
                    text-align: right;
                    background-color: transparent;
                }
            }
        }
        ::-webkit-input-placeholder{
            color:#ddd;
        }
        :-moz-placeholder{
            color:#ddd;
        }
        ::-moz-placeholder{
            color:#ddd;
        }
        :-ms-input-placeholder{
            color:#ddd;
        }
    }
</style>


