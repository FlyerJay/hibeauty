<template>
    <transition name="slide-up">
        <div :class="['snowyet-tip', typeClass]" v-show="visible">
            {{message}}
        </div>
    </transition>
</template>
<style lang="less" scoped>
    @import "../../../../asset/style/mixin-px.less";
    .slide-up-leave,.slide-up-enter-active {
        opacity: 1;
        transform: translate3d(0, 0%, 0);
        transition: .3s all ease-in;
    }
    .slide-up-enter,.slide-up-leave-active {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
        transition: .3s all ease-out;
    }
    .snowyet-tip{
        position: fixed;
        .px2rem(height, 90);
        .px2rem(line-height, 90);
        .px2rem(font-size, 28);
        text-align: center;
        width: 100%;
        bottom: 0;
        background-color: #fff;
        color: #5cadff;
        &.snowyet-tip-info {
            color: #5cadff;
            background-color: #d4f2f9;
        }
        &.snowyet-tip-error {
            color: #ed3f14;
            background-color: #f7dfd9;
        }
        &.snowyet-tip-warning {
            color: #ff9900;
            background-color: #fcf7e6;
        }
        &.snowyet-tip-success {
            color: #41bfaa;
            background-color: #d0f5ef;
        }
    }
</style>
<script>
const types = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error'
}
export default {
    data() {
        return {
            visible: false,
            message: '',
            duration: 3000,
            type: 'info',
            closed: false,
            timer: null,
            onClose: null
        }
    },
    computed: {
        typeClass() {
            return this.type ? `snowyet-tip-${this.type}` : '';
        }
    },
    watch: {
        closed(newVal) {
            if(newVal) {
                this.visible = false;
                this.$el.addEventListener('transitionend', this.destroyElement);
            }
        }
    },
    methods: {
        destroyElement() {
            this.$el.removeEventListener('transitionend', this.destroyElement);
            this.$el.parentNode.removeChild(this.$el);
            this.$destroy(true);
        },

        close() {
            this.closed = true;
            if (typeof this.onClose === 'function') {
                this.onClose(this);
            }
        },

        clearTimer() {
            clearTimeout(this.timer);
        },

        startTimer() {
            if (this.duration > 0) {
                this.timer = setTimeout(() => {
                    if(!this.closed) {
                        this.close();
                    }
                }, this.duration)
            }
        },
    },
    mounted() {
        this.startTimer();
    }
}
</script>

