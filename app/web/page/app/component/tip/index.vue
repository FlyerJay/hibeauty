<template>
    <transition :name="transitionAnimate">
        <div :class="['snowyet-tip', typeClass]" v-show="visible">
            {{message}}
        </div>
    </transition>
</template>
<style lang="less" scoped>
.errorIn {
  animation: shake 0.2s 0.2s linear, slideInUp 0.2s 0s linear;
}
.otherIn {
  animation: slideInUp 0.2s 0s linear;
}
.slideOutDown {
  animation: slideOutDown 0.2s ease-in;
}
.slide-up-enter-active {
  .otherIn;
}
.slide-up-leave-active {
  .slideOutDown;
}
.error-up-enter-active {
  .errorIn;
}
.error-up-leave-active {
  .slideOutDown;
}
.snowyet-tip {
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
};
export default {
  data() {
    return {
      visible: false,
      message: '',
      duration: 3000,
      type: 'info',
      closed: false,
      timer: null,
      onClose: null,
      transitionAnimate: 'slide-up'
    };
  },
  computed: {
    typeClass() {
      return this.type ? `snowyet-tip-${this.type}` : '';
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
        this.$el.addEventListener('animationend', this.destroyElement);
      }
    }
  },
  methods: {
    destroyElement() {
      this.$el.removeEventListener('animationend', this.destroyElement);
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
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    }
  },
  mounted() {
    this.startTimer();
  }
};
</script>

