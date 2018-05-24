<template>
    <div class="bottom-tab">
        <router-link :to="item.link" v-for="(item, index) in routes" :key="index" class="tab-item">
            <div @click="onRouteClick">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="item.icon"></use>
                </svg>
                {{item.text}}
            </div>
        </router-link>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                routes: [
                    {
                        link: '/hibeauty/',
                        icon: "#icon-recommend",
                        text: '推荐',
                        index: 0,
                    }, {
                        link: '/hibeauty/collection',
                        icon: '#icon-collection',
                        text: '收藏',
                        index: 1,
                    }, {
                        link: '/hibeauty/mine',
                        icon: '#icon-mine',
                        text: '我的',
                        index: 2
                    }
                ]
            }
        },
        methods: {
            onRouteClick(event) {
                if(event.currentTarget.parentNode.className.indexOf('router-link-active') > -1) {
                    this.$bus.$emit('refresh');
                }
            }
        }
    }
</script>
<style scoped lang="less">
    @import "../../../../asset/style/mixin-px.less";
    .bottom-tab{
        max-width: 675px;
        width: 100%;
        .px2rem(height, 80);
        position: fixed;
        bottom: 0;
        background-color: #f7f7f7;
        z-index: 100;
        box-shadow: 1px 1px 30px #888;
        .tab-item{
            .px2rem(line-height, 80);
            .px2rem(height, 80);
            .px2rem(font-size, 28);
            float: left;
            text-decoration: none;
            color: #888;
            width: 33.33%;
            text-align: center;
            .icon{
                .px2rem(font-size, 32);
            }
            &.router-link-exact-active{
                color: #19be6b;
            }
        }
    }
</style>


