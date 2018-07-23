import Vue from 'vue';

const instances = {};
let hasModal = false;

const PopupManager = {
  zIndex: 1000,

  modalFade: true,

  getInstance(id) {
    return instances[id];
  },

  register(id, instance) {
    if (id && instance) {
      instances[id] = instance;
    }
  },

  deregister(id) {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },

  nextZIndex() {
    return this.zIndex++;
  },

  modalStacks: [],

  onModalClick() {
    const topItem = this.modalStacks[this.modalStacks.length - 1];
    if (!topItem) return;

    const instance = this.getInstance(topItem.id);
    if (instance && instance.closeOnModalClick) {
      instance.close();
    }
  }
};

const getModal = function() {
  if (Vue.prototype.$isServer) return;
  let modalDom = PopupManager.modalDom;
  if (modalDom) {
    hasModal = true;
  } else {
    hasModal = false;
    modalDom = document.createElement('div');

    PopupManager.modalDom = modalDom;

    modalDom.addEventListener('touchmove', function(event) {
      event.preventDefault();
      event.stopPropagation();
    });

    modalDom.addEventListener('click', function() {
      PopupManager.onModalClick && PopupManager.onModalClick();
    });

    return modalDom;
  }
};

export default PopupManager;