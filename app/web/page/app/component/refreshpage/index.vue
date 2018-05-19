<template>
    <div class="refresh-page">
        <slot></slot>
        <div class="upglide-widget">
            <div class="upglide-continue" v-show="upglideMode === 0" @click="load">上滑加载</div>
            <div class="upglide-release" v-show="upglideMode === 1">释放刷新</div>
            <div class="upglide-loading" v-show="upglideMode === 2">加载中</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        onLoading: {
            type: Function,
            default() {
                return{}
            }
        }
    },
    data() {
        return {
            upglideMode: 0,
            touchStart: 0,
            touchEnd: 0,
        }
    },
    computed: {
        scrollBottom() {
            return window.document.body.scrollHeight - window.document.body.scrollTop - window.document.body.clientHeight
        }
    },
    methods: {
        touch(event) {
            if(this.upglideMode === 2) { //如果正在刷新中就不能再拖动了
                event.preventDefault();
                return;
            }
            let touch = event.touches[0];
            switch(event.type) {
                case 'touchstart':
                    window.document.body.style.transition = "none";
                    this.touchStart = touch.clientY + window.document.body.scrollTop;
                    break;
                case 'touchmove':
                    this.touchEnd = touch.clientY;
                    let percent = (this.touchStart - this.touchEnd) / window.document.body.clientHeight;
                    if(this.scrollBottom === 0) {
                        if(percent > 0) {
                            event.preventDefault();
                            var transitionY = Math.abs(this.touchStart - this.touchEnd) * 0.5;
                            window.document.body.style.transform = 'translateY('+ transitionY + 'px)';
                        }
                    }
            }
        },
        load() {
            this.onLoading();
        }
    }
}
</script>
<style lang="less" scoped>
    @import "../../../../asset/style/mixin-px.less";
    .refresh-page{
        .upglide-widget{
            .px2rem(height, 80);
            .px2rem( line-height, 80 );
            .px2rem( margin-bottom, -80 );
            width: 100%;
            background-color: #fff;
            text-align: center;
        }
    }
</style>


