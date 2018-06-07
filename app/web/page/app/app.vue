<template>
  <layout>
    <transition :name="pageTurnAnimate">
      <router-view></router-view>
    </transition>
  </layout>
</template>
<script type="text/babel">
  import Vue from "vue";
  import PhotoSwipe from "./component/photoswipe";
  import Tip from "./component/tip";
  import { sync } from "vuex-router-sync";
  import store from "./store/app";
  import router from "./router";
  
  sync(store, router);
  Vue.use(PhotoSwipe);
  if(!Vue.prototype.$isServer) {
    Vue.prototype.$bus = new Vue();
    Vue.prototype.$tip = Tip;
    // document.addEventListener('DOMContentLoaded', () => {
    //   FastClick.attach(document.body);
    // }, false)
  }
  export default {
    data() {
      return {
        routesHistory: [], // 记录页面访问历史
      }
    },
    router,
    store,
    computed: {
      pageTurnAnimate() {
        return this.$store.state.pageTurnAnimate;
      }
    },
    watch: {
      '$route'(to, from) {
        let animate;
        let routeIndex = this.routesHistory.indexOf(to.path);
        if (routeIndex === -1) {
          animate = 'push';
          if(to.path === '/') {
            this.routesHistory = ['/'];
          }else{
            this.routesHistory.push(to.path);
          }
        } else {
          animate = 'pop';
          if(to.path === '/') {
            this.routesHistory = ['/'];
          }else{
            this.routesHistory = this.routesHistory.slice(0, routeIndex + 1);
          }
        }
        if(to.path === '/login' && from.path !== '/register' || from.path === '/login' && to.path !== '/register') {
        } else {
          this.$store.dispatch('CHANGE_PAGE_TURN_ANIMATE', animate);
        }
      }
    },
    mounted() {
      if(this.$route.path === '/login') { // 登录页不能是首屏
        this.$router.push('/');
        this.routesHistory.push('/');
      }else{
        this.routesHistory.push(this.$route.path);
      }
    },
  };
</script>
<style lang="less">
  .popover-enter-active {
    transition: all .3s ease-out;
    transform: translate3d(0,0%,0);
    z-index: 1000;
    width: 100%;
    position: fixed;
    height: 100%;
  }
  .popover-leave-active {
    transition: all .3s ease-out;
    z-index: 999;
    width: 100%;
    opacity: 0;
    position: fixed;
    height: 100%;
  }
  .popover-leave{
    z-index: 999;
    width: 100%;
    opacity: 1;
    position: fixed;
    height: 100%;
  }
  .popover-enter{
    transform: translate3d(0,100%,0);
    z-index: 1000;
    width: 100%;
    position: fixed;
    height: 100%;
  }

  .slidedown-enter-active {
    transition: all .3s ease-out;
    z-index: 999;
    width: 100%;
    opacity: 1;
    position: fixed;
    height: 100%;
  }
  .slidedown-leave-active {
    transition: all .3s ease-out;
    transform: translate3d(0,100%,0);
    z-index: 1000;
    width: 100%;
    position: fixed;
    height: 100%;
  }
  .slidedown-leave{
    transform: translate3d(0,0%,0);
    z-index: 1000;
    width: 100%;
    position: fixed;
    height: 100%;
  }
  .slidedown-enter{
    z-index: 999;
    width: 100%;
    opacity: 0;
    position: fixed;
    height: 100%;
  }

  .push-enter-active {
    transition: all .2s ease-out;
    transform: translate3d(0%,0,0);
    z-index:1001;
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .push-leave-active {
    transition: all .2s ease-out;
    transform: translate3d(0%,0,0);
    z-index: 1000;
    opacity:0;
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .push-leave{
    transform: translate3d(0%,0,0);
    z-index: 1000;
    opacity:1;
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .push-enter{
    transform: translate3d(100%,0,0);
    z-index:1001;
    position: fixed;
    width: 100%;
    height: 100%;
  }

  .pop-enter-active {
    transition: all .2s ease-out;
    transform: translate3d(0%,0,0);
    opacity:1;
    z-index:1000;
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .pop-leave-active {
    transition: all .2s ease-out;
    transform: translate3d(100%,0,0);
    z-index: 10001;
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .pop-leave{
    transform: translate3d(0%,0,0);
    z-index: 10001;
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .pop-enter{
    transform: translate3d(0%,0,0);
    z-index:1000;
    opacity:0;
    position: fixed;
    width: 100%;
    height: 100%;
  }
  
</style>