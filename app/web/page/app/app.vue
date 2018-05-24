<template>
  <layout>
    <div>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <bottom-tab></bottom-tab>
    </div>
  </layout>
</template>
<script type="text/babel">
  import Vue from "vue";
  import PhotoSwipe from "./component/photoswipe";
  import { sync } from "vuex-router-sync";
  import store from "./store/app";
  import router from "./component/router";
  import BottomTab from "./component/bottomtab";
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
    computed: {},
    mounted() {},
    components: { BottomTab }
  };
</script>