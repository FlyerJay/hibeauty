<template>
    <div class="refresh-page" @touchstart.stop="touch" @touchmove.stop="touch" @touchend.stop="touch">
        <!-- 下拉刷新组件 -->
        <div class="slide-widget" key="slideWidget" ref="slideWidget" v-if="isLoadAbel && hasMounted">
            <svg class="icon glide" aria-hidden="true" :class="{'upglide': slideMode === 1}" v-show="slideMode !== 2">
                <use xlink:href="#icon-glide"></use>
            </svg>
            <span class="slide-continue slide-status" v-show="slideMode === 0">
                继续吟唱
            </span>
            <span class="slide-release slide-status" v-show="slideMode === 1">
                施放大招
            </span>
            <span class="slide-loading slide-status" v-show="slideMode === 2">卍</span>
            <svg class="icon loading" aria-hidden="true" :class="{'upglide': slideMode === 0}" v-show="slideMode === 2">
                <use xlink:href="#icon-rotate"></use>
            </svg>
            <span class="slide-loading slide-status" v-show="slideMode === 2">解</span>
        </div>
        <!-- 页面主体插槽 -->
        <slot></slot>
        <!-- 上滑加载组件 -->
        <div class="upglide-widget" key="upglideWidget" ref="upglideWidget" v-if="isLoadAbel && hasMounted && upglideAble">
            <svg class="icon glide" aria-hidden="true" :class="{'upglide': upglideMode === 0}" v-show="upglideMode !== 2">
                <use xlink:href="#icon-glide"></use>
            </svg>
            <span class="upglide-continue upglide-status" v-show="upglideMode === 0">
                继续吟唱
            </span>
            <span class="upglide-release upglide-status" v-show="upglideMode === 1">
                施放大招
            </span>
            <span class="upglide-loading upglide-status" v-show="upglideMode === 2">卍</span>
            <svg class="icon loading" aria-hidden="true" :class="{'upglide': upglideMode === 0}" v-show="upglideMode === 2">
                <use xlink:href="#icon-rotate"></use>
            </svg>
            <span class="upglide-loading upglide-status" v-show="upglideMode === 2">解</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        onLoading: { //加载的具体实现，必须是Promise
            type: Function,
            default() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, 500)
                })
            }
        },
        onRefresh: { //刷新的具体实现，必须是Promise
            type: Function,
            default() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, 500)
                })
            }
        },
        isLoadAbel: {
            type: Boolean,
            default: true
        },
        upglideAble: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            upglideMode: 0, //上滑状态0.继续上滑、1.释放可加载、2.加载中
            slideMode: 0, //下拉状态0.继续下拉、1.释放可刷新、2.刷新中
            touchStart: 0, //触摸开始
            touchEnd: 0, //触摸结束
            scrollTop: 0, //距离顶部距离
            scrollOb: "", //滚动条观察者
            hasMounted: false, //页面是否已挂载
        }
    },
    computed: {
        scrollBottom() {
            return window.document.documentElement.scrollHeight - this.scrollTop - window.document.documentElement.clientHeight
        }
    },
    mounted() {
        this.hasMounted = true;
        //移动端不支持onscoll事件，使用固定时间间隔获取scrollTop
        this.scrollOb = window.setInterval(() => {
            //移动端是以body作为滚动元素，而pc以根节点作为滚动元素，这一点很迷，可能和我的页面结构有关系
            this.scrollTop = window.document.body.scrollTop || window.document.documentElement.scrollTop;
        }, 30);
        document.ontouchmove = e => e.preventDefault();
    },
    destroyed() {
        //销毁时清除观察者避免内存泄露
        window.clearInterval(this.scrollOb);
    },
    watch: {
        upglideMode(val) {
            if(val === 0) {
                // 当upglideMode从其他状态变为0时，取消upglideWidget的位移
                this.$el.style.transform = 'translateY(0px)';
                // this.$el.style.transition = '300ms';
            }
        },
        slideMode(val) {
            if(val === 0) {
                // 当slideMode从其他状态变为0时，取消slideWidget的位移
                this.$el.style.transform = 'translateY(0px)';
                // this.$el.style.transition = '300ms';
            }
        }
    },
    methods: {
        touch(event) {
            if(this.upglideMode === 2 || this.slideMode === 2 || !this.isLoadAbel) { //如果正在刷新就不触发后续判断
                // event.preventDefault();
                return;
            }
            let touch = event.touches[0];
            //获取上滑加载组件的高度，下拉组件高度与之一样，不再重复获取
            let upglideHeight = this.$refs.slideWidget.clientHeight;
            switch(event.type) {
                case 'touchstart':
                    this.$el.style.transition = 'none';
                    this.touchStart = touch.clientY;
                    break;
                case 'touchmove':
                    this.touchEnd = touch.clientY;
                    //计算底部的真实位移变换
                    let transitionU = this.touchStart - this.touchEnd - this.scrollBottom;
                    let transitionS = this.touchStart - this.touchEnd - this.scrollTop;
                    //上滑判断
                    if(this.scrollBottom <= 0 && this.upglideAble) {
                        if(transitionU > 0) {
                            event.preventDefault();
                            this.$el.style.transform = 'translateY('+ (transitionU > upglideHeight ? -upglideHeight : -transitionU) + 'px)';
                        }
                        if(Math.abs(transitionU) > upglideHeight && transitionU > 0) {
                            this.upglideMode = 1;
                        }
                    }
                    //下拉判断
                    if(this.scrollTop <= 0) {
                        if(transitionS < 0) {
                            event.preventDefault();
                            this.$el.style.transform = 'translateY('+ -transitionS + 'px)';
                        }
                        //下拉超过下拉条高度1.5倍时触发刷新
                        if(Math.abs(transitionS) > upglideHeight * 1.5 && transitionS < 0) {
                            this.slideMode = 1;
                        }
                    }
                    break;
                case 'touchend':
                    if(this.upglideMode === 1 && this.upglideAble) { //上滑加载
                        this.upglideMode = 2;
                        this.onLoading().then(() => { //加载数据
                            this.upglideMode = 0;
                            this.scrollTop = -1;
                            this.$nextTick(() => { //加载后调整滚动条位置，让人感觉不那么突兀
                                window.document.body.scrollTop ? window.document.body.scrollTop += upglideHeight : window.document.documentElement.scrollTop += upglideHeight;
                            })
                        }, () => {
                            this.upglideMode = 0;
                        }).catch(err => {
                            this.upglideMode = 0;
                        })
                    }else if(this.slideMode === 1) { //下拉刷新
                        this.slideMode = 2;
                        this.$el.style.transition = '300ms';
                        this.$el.style.transform = `translateY(${upglideHeight}px)`;
                        this.onRefresh().then(() => { //刷新数据
                            this.slideMode = 0;
                        }, () => {
                            this.slideMode = 0;
                        }).catch(err => {
                            this.slideMode = 0;
                        })
                    }else{
                        this.$el.style.transform = 'translateY(0px)';
                        this.$el.style.transition = '300ms';
                    }
                    break;
            }
        },
        forceRefresh() {
            if(window.document.documentElement.scrollTop === 0 && window.document.body.scrollTop === 0) {
                let upglideHeight = this.$refs.upglideWidget.clientHeight;
                this.slideMode = 2;
                this.$el.style.transition = '300ms';
                this.$el.style.transform = `translateY(${upglideHeight}px)`;
                setTimeout(() => {
                    this.onRefresh().then(() => { //刷新数据
                        this.slideMode = 0;
                    }, () => {
                        this.slideMode = 0;
                    }).catch(err => {
                        this.slideMode = 0;
                    })
                },300)
            }else{
                window.document.documentElement === 0 ? '' : this.scrollTo(window.document.documentElement, 0 );
                window.document.body === 0 ? '' : this.scrollTo(window.document.body, 0);
            }
        },
        scrollTo(ob, pt, sp) { //纵坐标滚动
            var speed = sp || ob.scrollTop / 20;
            let frameId;
            function scroll() {
                if(ob.scrollTop === 0) {
                    cancelAnimationFrame(frameId);
                }else{
                    ob.scrollTop -= speed;
                    frameId = requestAnimationFrame(scroll)
                }
            }
            frameId = requestAnimationFrame(scroll)
        }
    }
}
</script>
<style lang="less" scoped>
    @import "../../../../asset/style/mixin-px.less";
    .refresh-page{
        min-height: 100vh;
        .upglide-widget,.slide-widget{
            .px2rem(height, 80);
            .px2rem( line-height, 80 );
            .px2rem( margin-bottom, -80 );
            width: 100%;
            text-align: center;
            color: #999;
            .slide-release,.upglide-release{
                color: #2d8cf0;
            }
            .icon{
                .px2rem(font-size, 32);
                &.glide{
                    transition: all .3s ease;
                }
                &.upglide{
                    transform: rotate(-180deg);
                }
                &.loading{
                    animation: rotate infinite linear .6s;
                }
            }
            .upglide-loading{
                color: #19be6b;
            }
        }
        .slide-widget{
            .px2rem( margin-top, -80 );
            .px2rem( margin-bottom, 0 );
            .icon{
                &.upglide{
                    color: #2d8cf0;
                }
            }
        }
        .upglide-widget{
            .icon{
                &.glide{
                    color: #2d8cf0;
                }
                &.upglide{
                    color: #999;
                }
            }
        }
    }
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        } to {
            transform: rotate(360deg);
        }
    }
</style>


