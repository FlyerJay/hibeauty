<template>
  <div class="d-datepicker">
    <van-field 
      v-model="currentValue" 
      class="d-select" 
      :icon="icon" 
      :clearable="clearable" 
      :placeholder="placeholder" 
      :left-icon="leftIcon"
      :readonly="true"
      @focus="popupPicker"
      >
    </van-field>
    <input type="hidden" :value="currentValue">
    <van-popup 
      v-model="popupShow"
      position="bottom">
      <van-datetime-picker
        v-model="datetimeValue"
        :type="type"
        @cancel="popupShow = false"
        @confirm="popupShow = false"
        @change="onPickerChange"
        ref="picker">
      </van-datetime-picker>
    </van-popup>
  </div>
</template>
<script>
import Field from 'vant/lib/field';
import Popup from 'vant/lib/popup';
import DatetimePicker from 'vant/lib/datetime-picker';
import 'vant/lib/vant-css/field.css';
import 'vant/lib/vant-css/popup.css';
import 'vant/lib/vant-css/picker.css';

const VALUE = 'value';
export default {
  components: {
    'van-field': Field,
    'van-popup': Popup,
    'van-datetime-picker': DatetimePicker
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
    type: {
      type: String,
      default: 'time'
    }
  },

  data() {
    return {
      currentValue: this.value,
      popupShow: false,
      datetimeValue: this.value
    };
  },

  watch: {
    [VALUE](val) {
      this.setCurrentValue(val);
    }
  },

  methods: {
    setCurrentValue(val) {
      this.$emit('input', val);
      this.currentValue = val;
      this.datetimeValue = val;
    },

    onPickerChange(picker, values) {
      this.setCurrentValue(picker.getValues().join(':'));
    },

    popupPicker() {
      this.popupShow = true;
      if (!this.currentValue) {
        this.setCurrentValue('00:00');
      }
    }
  },
};
</script>
<style lang="less">
  .d-datepicker{
    .van-picker__columns{
      display: block;
      .van-picker-column{
        float: left;
        width: 50%;
      }
    }
  }
</style>


