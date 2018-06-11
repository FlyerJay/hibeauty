import Vue from 'vue';
import Index from './index.vue';

const TipController = Vue.extend(Index);

let instance;
const instances = [];
let seed = 1;
let zIndex = 1003;

const Tip = function(opts) {
  if (Vue.prototype.$isServer) return;
  opts = opts || {};
  opts.type === 'error' ? opts.transitionAnimate = 'error-up' : '';
  if (typeof opts === 'string') {
    opts = {
      message: opts
    };
  }
  const id = 'tip_' + seed++;
  const userOnClose = opts.onClose;

  opts.onClose = function() {
    Tip.close(id, userOnClose);
  };

  instance = new TipController({
    data: opts
  });

  instance.id = id;
  instance.vm = instance.$mount(); // 手动挂载获取到实例
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  instance.dom = instance.vm.$el;
  instance.dom.style.zIndex = zIndex++;
  instances.push(instance);
  return instance.vm;
};

Tip.close = function(id, userOnClose) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
};

export default Tip;