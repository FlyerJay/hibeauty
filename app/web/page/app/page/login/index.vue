<template>
    <div class="login">
        <s-header title="登录">
            <router-link class='register-link' to="/register">注册</router-link>
        </s-header>
        <form class="user-form">
            <div class="input-control clearfix">
                <span class="append">账号</span>
                <input type="text" name="loginId" v-model="loginParam.loginId" placeholder="大小写字母、数字，4-15位">
            </div>
            <div class="input-control clearfix">
                <span class="append">密码</span>
                <input type="password" name="pwd" v-model="loginParam.password" placeholder="大小写字母、数字或@_，8-15位">
            </div>
            <div class="btn login-btn" @click="login">登录</div>
        </form>
    </div>
</template>
<style lang="less" scoped>
    @import "../../../../asset/style/mixin-px.less";
    .login{
        min-height: 100vh;
        background-color: #f7f7f7;
        overflow: hidden;
        .register-link{
            .px2rem(font-size, 28);
            text-decoration: none;
            color: #41bfaa;
        }
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
            .login-btn{
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
import { getCookie } from '../../util/cookie';
import router from '../../router';
export default {
    beforeRouteEnter(to, from, next) {
        // 登录后不允许进入登录页，直接返回前一个页面
        getCookie('access_token') ? router.go(-1) : next();
    },
    data () {
        return {
            loginParam: {
                loginId: '',
                password: ''
            }
        }
    },
    components: {
        SHeader
    },
    computed: {
        jumpPage() {
            return this.$store.state.jumpPage;
        }
    },
    methods: {
        login() {
            let regId = /[0-9a-zA-Z]{4,15}/;
            let regPwd = /[0-9a-zA-Z_@]{8,15}/;
            if(!regId.test(this.loginParam.loginId)) {
                return false;
            }
            if(!regPwd.test(this.loginParam.password)) {
                return false;
            }
            var param = {
                loginId: this.loginParam.loginId,
                password: aesEncrypt(this.loginParam.password)
            }
            this.$store.dispatch('USER_LOGIN', param).then(rs => {
                if(rs.data.code === 200) {
                    this.$router.push({path: this.jumpPage});
                }
            })
        }
    }
}
</script>


