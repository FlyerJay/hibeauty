<template>
  <div class="d-select">
    <van-field 
      v-model="currentValue" 
      class="d-select" 
      :icon="icon" 
      :clearable="clearable" 
      :placeholder="placeholder" 
      :left-icon="leftIcon"
      :readonly="true"
      @focus="popupShow = true"
      >
    </van-field>
    <input type="hidden" :value="currentValue">
    <van-popup 
      v-model="popupShow"
      position="bottom">
      <van-picker 
        :columns="options" 
        :show-toolbar="true"
        @cancel="popupShow = false"
        @confirm="popupShow = false"
        @change="onPickerChange">
      </van-picker>
    </van-popup>
  </div>
</template>
<script>
import Field from 'vant/lib/field';
import Picker from 'vant/lib/picker';
import Popup from 'vant/lib/popup';
import 'vant/lib/vant-css/picker.css';
import 'vant/lib/vant-css/field.css';
import 'vant/lib/vant-css/popup.css';

const CURRENT_VALUE = 'currentValue';
const VALUE = 'value';
export default {
  components: {
    'van-field': Field,
    'van-picker': Picker,
    'van-popup': Popup
  },

  props: {
    value: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    leftIcon: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  data() {
    return {
      currentValue: this.value,
      popupShow: false
    };
  },

  watch: {
    [VALUE](val) {
      this.setCurrentValue(val);
    },
    [CURRENT_VALUE](val) {
      this.setCurrentValue(val);
    }
  },

  methods: {
    setCurrentValue(val) {
      this.$emit('input', val);
      this.currentValue = val;
    },

    onPickerChange(picker, values) {
      this.setCurrentValue(values);
    }
  }
};
</script>
<style lang="less">
  .van-picker__columns{
    flex-direction: column;
  }
</style>

