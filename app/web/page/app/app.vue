<template>
  <layout>
    <transition :name="pageTurnAnimate">
      <router-view class="router-view"></router-view>
    </transition>
  </layout>
</template>
<script type="text/babel">
  import Vue from 'vue';
  import storage from './util/storage.js';
  import { sync } from 'vuex-router-sync';
  import store from './store/app';
  import router from './router';
  import 'vant/lib/vant-css/base.css';
  
  sync(store, router);
  if (!Vue.prototype.$isServer) {
    Vue.prototype.$bus = new Vue();
    // Vue.use(Vant);
  }

  const ROUTE = '$route';
  function noop() {}
  
  export default {
    data() {
      return {
        routesHistory: ['/'], // 记录页面访问历史
      };
    },
    router,
    store,
    computed: {
      pageTurnAnimate() {
        return this.$store.state.pageTurnAnimate;
      }
    },
    watch: {
      [ROUTE](to, from) {
        let animate;
        const routeIndex = this.routesHistory.indexOf(to.path);
        if (routeIndex === -1) {
          animate = 'push';
          if (to.path === '/') {
            this.routesHistory = ['/'];
          } else {
            this.routesHistory.push(to.path);
          }
        } else {
          animate = 'pop';
          if (to.path === '/') {
            this.routesHistory = ['/'];
          } else {
            this.routesHistory = this.routesHistory.slice(0, routeIndex + 1);
          }
        }
        this.$store.dispatch('CHANGE_PAGE_TURN_ANIMATE', animate);
      }
    },

    beforeMount() {
      this.$store.dispatch('FLUSH_APPLICATION_DATA');
      // if (!this.$store.state.olduser) {
      //   this.$router.push('/firstin');
      //   this.$store.commit('MARK_AS_OLDUSER');
      // }
    }
  };
</script>
<style lang="less">
  @import "../../asset/css/global.css";
  #app{
    height: 100%;
  }

  .page-container{
    max-width: 640px;
    margin: 0 auto;
    height: 100%;
    background-color: #f7f7f7;
    overflow: hidden;
  }

  .slideInRight{
    animation: slideInRight .3s ease;
  }

  .slideOutLeft{
    animation: slideOutLeft .3s ease;
  }

  .slideOutRight{
    animation: slideOutRight .3s ease;
  }

  .slideInLeft{
    animation: slideInLeft .3s ease;
  }

  .slideInUp{
    animation: slideInUp .3s ease-in;
  }

  .slideInDown{
    animation: slideInDown .3s linear;
  }

  .slideOutDown{
    animation: slideOutDown .3s ease-in;
  }

  .slideOutUp{
    animation: slideOutUp .3s linear;
  }

  .animateTotal{
    height: 100%;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
  }

  .slideup-enter-active {
    .slideInUp;
    z-index: 1000;
    .animateTotal
  }

  .slideup-leave-active {
    transition: .25s all linear;
    .animateTotal;
    z-index: 999;
  }

  .slidedown-leave-active {
    .slideOutDown;
    z-index: 1000;
    .animateTotal
  }

  .slidedown-enter-active {
    transition: .25s all linear;
    .animateTotal;
    z-index: 999;
  }

  .push-enter-active{
    .slideInRight;
    .animateTotal;
    z-index: 1000;
  }
  .push-leave-active{
    .slideOutLeft;
    .animateTotal;
    z-index: 999;
  }

  .pop-leave-active{
    .slideOutRight;
    .animateTotal;
    z-index: 1000;
  }
  .pop-enter-active,{
    .slideInLeft;
    .animateTotal;
    z-index: 999;
  }
</style>