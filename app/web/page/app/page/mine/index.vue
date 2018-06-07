<template>
    <div class="mine">
        <refresh-page :onRefresh="getUserInfo" ref="refreshPage" :upglideAble="false">
            <div class="us-card clearfix">
                <div class="us-avatar"><img :src="userInfo.avator" alt=""></div>
                <div class="us-base">
                    <div class="us-name">
                        {{userInfo.nickName}}
                        <i class="us-level">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-level"></use>
                            </svg>
                            <span>{{userInfo.level}}</span>
                        </i>
                    </div>
                </div>
                <i class="us-edit">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-edit"></use>
                    </svg>
                </i>
            </div>
            <div class="us-info">
                <div class="us-info-item">
                    <i class="label">账号</i>
                    <span>{{userInfo.loginId}}</span>
                </div>
                <div class="us-info-item">
                    <i class="label">手机号</i>
                    <span>{{userInfo.phone || '未填写'}}</span>
                </div>
                <div class="us-info-item">
                    <i class="label">邮箱</i>
                    <span>{{userInfo.email || '未填写'}}</span>
                </div>
                <div class="us-info-item">
                    <i class="label">性别</i>
                    <span>{{userInfo.sex || '未知'}}</span>
                </div>
                <div class="us-info-item">
                    <i class="label">生日</i>
                    <span>{{userInfo.birthday || '未填写'}}</span>
                </div>
                <div class="us-info-item">
                    <i class="label">经验值</i>
                    <span class="exp">
                        {{userInfo.exp}}
                    </span>
                </div>
            </div>
            <a  href="/hibeauty/api/logout" class="logout-btn">退出登录</a>
        </refresh-page>
        <bottom-tab></bottom-tab>
    </div>
</template>
<style lang="less" scoped>
    @import "../../../../asset/style/mixin-px.less";
    .mine{
        background-color: #f1f1f1;
        .us-card{
            .px2rem(height, 200);
            .px2rem(padding-left, 30);
            .px2rem(padding-right, 30);
            background: linear-gradient(135deg, #41bfaa, #6eedd8);
            .us-avatar{
                float: left;
                .px2rem(width, 150);
                .px2rem(height, 150);
                .px2rem(border-radius, 75);
                .px2rem(margin-top, 25);
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .us-base{
                float: left;
                .px2rem(height, 50);
                .px2rem(margin-top, 75);
                .px2rem(margin-left, 30);
                .us-name{
                    .px2rem(font-size, 32);
                    .px2rem(line-height, 50);
                    color: #fff;
                    .us-level{
                        .px2rem(font-size, 30);
                        color: #ed9000;
                        span{
                            font-family: "Georgia";
                            .px2rem(font-size, 24);
                            position: relative;
                            .px2rem(left, -15);
                            .px2rem(top, 3);
                        }
                    }
                }
            }
            .us-edit{
                float: right;
                .px2rem(height, 80);
                .px2rem(line-height, 80);
                .px2rem(margin-top, 60);
                .px2rem(font-size, 40);
                color: #aaa;
            }
        }
        .us-info{
            .us-info-item{
                .px2rem(padding-left, 30);
                .px2rem(padding-right, 30);
                .px2rem(height, 90);
                .px2rem(line-height, 90);
                .px2rem(font-size, 28);
                color: #333;
                border-bottom: 1px solid #f1f1f1;
                background-color: #fff;
                span{
                    float: right;
                    color: #999;
                    &.exp{
                        .px2rem(font-size, 24);
                        color: #ed9000;
                    }
                }
            }
        }
        .logout-btn{
            .px2rem(height, 90);
            .px2rem(line-height, 90);
            .px2rem(font-size, 28);
            .px2rem(margin-top, 3);
            text-align: center;
            color: #666;
            background-color: #fff;
            color: #444;
            border-bottom: 1px solid #f1f1f1;
            border-top: 1px solid #f1f1f1;
            display: block;
            text-decoration: none;
        }
    }
</style>
<script>
import BottomTab from "../../component/bottomtab";
import RefreshPage from "../../component/refreshpage";
export default {
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        }
    },
    components: {
        BottomTab,
        RefreshPage
    },
    beforeMount() {
        this.getUserInfo();
    },
    methods: {
        getUserInfo() {
            return this.$store.dispatch('FETCH_USER_INFO', {page: this.page});
        }
    }
}
</script>

