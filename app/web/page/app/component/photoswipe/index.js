import PhotoSwipeComponent from './index.vue';

let $vm;

export default {
  // 组件注册
  install(Vue) {
    // ssr时避免代码在后端执行
    if (Vue.prototype.$isServer) {
      return;
    }
    const PhotoSwipe = Vue.extend(PhotoSwipeComponent);

    if (!$vm) {
      $vm = new PhotoSwipe({ el: document.createElement('div') });
      document.body.appendChild($vm.$el);
    }

    Vue.$photoswipe = {
      open(index, items, options) {
        $vm.open(index, items, options);
      },
      close() {
        $vm.close();
      }
    };
    // 混合，类似于给Vue.prototype加属性
    Vue.mixin({
      created() {
        this.$photoswipe = Vue.$photoswipe;
      }
    });
  }
};