<template>
  <layout>
    <transition :name="pageTurnAnimate">
      <router-view></router-view>
    </transition>
  </layout>
</template>
<style lang="less">
  .popover-enter-active {
    transition: all .3s ease-out;
    transform: translate3d(0,0%,0) rotateY(0deg);
    z-index: 1000;
    width: 100%;
    position: fixed;
  }
  .popover-leave-active {
    transition: all .3s ease-out;
    z-index: 999;
    width: 100%;
    opacity: 0;
    position: fixed;
  }
  .popover-leave{
    z-index: 999;
    width: 100%;
    opacity: 1;
    position: fixed;
  }
  .popover-enter{
    transform: translate3d(0,-100%,0) rotateY(30deg);
    z-index: 1000;
    width: 100%;
    position: fixed;
  }

  .slidedown-enter-active {
    transition: all .3s ease-out;
    z-index: 999;
    width: 100%;
    opacity: 1;
    position: fixed;
  }
  .slidedown-leave-active {
    transition: all .3s ease-out;
    transform: translate3d(0,-100%,0) rotateY(-30deg);
    z-index: 1000;
    width: 100%;
    position: fixed;
  }
  .slidedown-leave{
    transform: translate3d(0,0%,0) rotateY(0deg);
    z-index: 1000;
    width: 100%;
    position: fixed;
  }
  .slidedown-enter{
    z-index: 999;
    width: 100%;
    opacity: 0;
    position: fixed;
  }
  
</style>

<script type="text/babel">
  import Vue from "vue";
  import PhotoSwipe from "./component/photoswipe";
  import { sync } from "vuex-router-sync";
  import store from "./store/app";
  import router from "./router";
  
  sync(store, router);
  Vue.use(PhotoSwipe);
  if(typeof document === 'object') {
    Vue.prototype.$bus = new Vue();
    // document.addEventListener('DOMContentLoaded', () => {
    //   FastClick.attach(document.body);
    // }, false)
  }
  export default {
    router,
    store,
    computed: {
      pageTurnAnimate() {
        return this.$store.state.pageTurnAnimate;
      }
    },
    mounted() {},
  };
</script>