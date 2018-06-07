<template>
    <div class="register">
        <s-header title="注册"></s-header>
        <form class="user-form">
            <div class="input-control clearfix">
                <span class="append">账号</span>
                <input type="text" name="loginId" v-model="registerParam.loginId" placeholder="大小写字母、数字，4-15位">
            </div>
            <div class="input-control clearfix">
                <span class="append">密码</span>
                <input type="password" name="password" v-model="registerParam.password" placeholder="大小写字母、数字或@_，8-15位">
            </div>
            <div class="btn register-btn" @click="register">注册</div>
        </form>
    </div>
</template>
<style lang="less" scoped>
    @import "../../../../asset/style/mixin-px.less";
    .register{
        min-height: 100vh;
        background-color: #f7f7f7;
        overflow: hidden;
        .user-form{
            .px2rem(margin-top, 400);
            border-top: 1px solid #f1f1f1;
            .input-control{
                background-color: #fff;
                .px2rem(height, 100);
                .px2rem(line-height, 100);
                .px2rem(padding-left, 30);
                .px2rem(padding-right, 30);
                .px2rem(font-size, 28);
                border-bottom: 1px solid #f1f1f1;
                .append{
                    float: left;
                    .px2rem(width, 80);
                    text-align: justify;
                    color: #999;
                }
                input{
                    border: none;
                    outline: none;
                    .px2rem(width, 500);
                }
            }
            .register-btn{
                .px2rem(height, 90);
                .px2rem(line-height, 90);
                .px2rem(margin, 30);
                .px2rem(font-size, 32);
                .px2rem(border-radius, 10);
                color: #fff;
                background-color: #41bfaa;
                text-align: center;
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
        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px white inset;
        }
    }
</style>
<script>
import SHeader from '../../component/header';
import { aesEncrypt } from '../../util/crypto';
export default {
    data () {
        return {
            registerParam: {
                loginId: '',
                password: ''
            }
        }
    },
    components: {
        SHeader
    },
    methods: {
        register() {
            let regId = /[0-9a-zA-Z]{4,15}/;
            let regPwd = /[0-9a-zA-Z_@]{8,15}/;
            if(!regId.test(this.registerParam.loginId)) {
                return false;
            }
            if(!regPwd.test(this.registerParam.password)) {
                return false;
            }
            var param = {
                loginId: this.registerParam.loginId,
                password: aesEncrypt(this.registerParam.password)
            }
            this.$store.dispatch('REGISTER_USER', param);
        }
    }
}
</script>


