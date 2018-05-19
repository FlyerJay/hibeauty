import PhotoSwipeComponent from './index.vue';

let $vm;

export default {
  install(Vue) {
    if (typeof document !== 'object') {
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

    Vue.mixin({
      created() {
        this.$photoswipe = Vue.$photoswipe;
      }
    });
  }
};