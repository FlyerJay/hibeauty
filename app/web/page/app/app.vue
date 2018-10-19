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
      // this.$store.dispatch('SEND_DANGER_MESSAGE', {
      //   mobile: 15178831138,
      //   url: 'http://i.snowyet.cc/trail?id=0',
      //   name: '费仁杰'
      // });
      if (!this.$store.state.opendefence) {
        this.$router.push('/firstin');
        // this.$store.commit('MARK_AS_OLDUSER');
      }
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

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .van-icon {
    position: relative;
    display: inline-block;
    font-family: "iconfont", "vant-icon" !important;
    font-size: 16px;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .van-icon-quit:before {
    content: "\e620";
  }

  .van-icon-contact:before {
    content: "\e626";
  }

  .van-icon-type:before {
    content: "\e6a5";
  }

  .van-icon-user:before {
    content: "\e645";
  }

  .van-icon-time:before {
    content: "\e61d";
  }

  .van-icon-marray:before {
    content: "\e72e";
  }

  .van-icon-age:before {
    content: "\e849";
  }

  .van-icon-job:before {
    content: "\e661";
  }

  .van-icon-sex:before {
    content: "\e638";
  }

  .van-icon-health:before {
    content: "\e625";
  }

  .van-icon-security:before {
    content: "\e602";
  }

  .van-icon-ins:before {
    content: "\e601";
  }

  .van-icon-phone:before {
    content: "\e604";
  }

  .van-icon-location:before {
    content: "\e63a";
  }

  .icon-add:before {
    content: "\e600";
  }

  .van-icon-area::before{
    content: "\e6ba";
  }

  .van-icon-trail::before{
    content: "\e74b";
  }
</style>