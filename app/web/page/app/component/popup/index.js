import Index from './index.vue';
import Vue from 'vue';

let seed = 0;
let instance;
const instances = [];

const PopupController = Vue.extend(Index);

const Popup = function(options) {
  if (Vue.prototype.$isServer) return;
  this.seed = seed++;
  this.instance = new PopupController({
    data: options,
    template: `<popup>${options.content}</popup>`,
  });
};

export default Popup;
