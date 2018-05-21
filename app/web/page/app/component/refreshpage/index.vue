<template>
    <div class="refresh-page" @touchstart.stop="touch" @touchmove.stop="touch" @touchend.stop="touch">
        <slot></slot>
        <div class="upglide-widget" ref="upglideWidget" v-if="isLoadAbel">
            <div class="upglide-continue" v-show="upglideMode === 0" @click="load">上滑加载</div>
            <div class="upglide-release" v-show="upglideMode === 1">释放加载</div>
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
        },
        isLoadAbel: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            upglideMode: 0, //上滑状态0.继续上滑、1.释放可加载、2.加载中
            touchStart: 0, //触摸开始
            touchEnd: 0, //触摸结束
            scrollTop: 0, //距离顶部距离
            threshold: 0.1, //预设滑动系数
            scrollOb: "", //滚动条观察者
        }
    },
    computed: {
        scrollBottom() {
            return window.document.documentElement.scrollHeight - this.scrollTop - window.document.documentElement.clientHeight
        }
    },
    mounted() {
        //移动端不支持onscoll事件，使用固定时间间隔获取scrollTop
        this.scrollOb = window.setInterval(() => {
            this.scrollTop = window.document.body.scrollTop || window.document.documentElement.scrollTop;
        }, 40);
    },
    destroyed() {
        //销毁时清除观察者避免内存泄露
        window.clearInterval(this.scrollOb);
    },
    watch: {
        upglideMode(val) {
            if(val === 0) {
                this.$el.style.transform = 'translateY(0px)';
                this.$el.style.transition = '300ms';
            }
        }
    },
    methods: {
        touch(event) {
            if(this.upglideMode === 2 || !this.isLoadAbel) { //如果正在刷新中就不能再拖动了
                event.preventDefault();
                return;
            }
            let touch = event.touches[0];
            switch(event.type) {
                case 'touchstart':
                    this.$el.style.transition = 'none';
                    this.touchStart = touch.clientY - this.scrollBottom;
                    break;
                case 'touchmove':
                    this.touchEnd = touch.clientY;
                    let percent = (this.touchStart - this.touchEnd) / window.document.documentElement.clientHeight;
                    if(this.scrollBottom <= 0) {
                        if(percent > 0) {
                            event.preventDefault();
                            let transitionY = Math.abs(this.touchStart - this.touchEnd) * 0.5;
                            let upglideHeight = this.$refs.upglideWidget.clientHeight;
                            this.$el.style.transform = 'translateY('+ (transitionY > upglideHeight ? -upglideHeight : -transitionY) + 'px)';
                        }
                        if(Math.abs(percent) > this.threshold && percent > 0) {
                            this.upglideMode = 1;
                        }
                    }
                    break;
                case 'touchend':
                    if(this.upglideMode === 1) {
                        this.upglideMode = 2;
                        this.onLoading().then(() => {
                            this.upglideMode = 0;
                            this.scrollTop = -1;
                            // let transitionY = this.$el.style.transform.match(/\d+/)[0];
                            let upglideHeight = this.$refs.upglideWidget.clientHeight;
                            this.$nextTick(() => {
                                window.document.body.scrollTop ? window.document.body.scrollTop += upglideHeight : window.document.documentElement.scrollTop += upglideHeight;
                            })
                        }, () => {
                            this.upglideMode = 0;
                        }).catch(err => {
                            this.upglideMode = 0;
                        })
                    }else{
                        this.upglideMode = 0;
                    }
                    break;
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


