<template>
  <transition :name="transitionAnimate">
    <div class="snowyet-popup" v-if="visible">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
export default {
  props: ['value'],
  data() {
    return {
      visible: this.value,
      transitionAnimate: 'slide-up'
    };
  },
  watch: {
    value(newVal) {
      if (newVal !== this.display) {
        this.visible = newVal;
        this.$emit('input', newVal);
      }
    }
  },
  name: 'snowyet-popup'
};
</script>
<style lang="less" scoped>
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

  .snowyet-popup{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    overflow: hidden;
  }
</style>


