<template>
  <div class="tip warning" v-if="level === 1">
    <div class="label">安全状态确认</div>
    <div class="button-group">
      <button class="error">危险</button>
      <button class="unknow">未知</button>
      <button class="success">安全</button>
    </div>
  </div>
  <div class="tip danger" v-else-if="level === 2">
    <div class="label">处于危险状态</div>
  </div>
</template>
<script>
const LEVEL = 'level';
export default {
  data() {
    return {
    };
  },

  props: {
    /**
     * 安全等级
     * 0.没有危险
     * 1.有危险
     * 2.非常危险
     */
    level: {
      type: Number,
      default: 0
    }
  },

  watch: {
    [LEVEL](val) {
      if (val === 2) {
        this.sendMessage();
      }
    }
  },

  methods: {
    sendMessage() {
      // 发出危险短信
    }
  }
};
</script>
<style lang="less" scoped>
  .tip{
    .px2rem(height, 60);
    .px2rem(line-height, 60);
    .px2rem(padding, 30);
    .px2rem(padding-top, 20);
    .px2rem(padding-bottom, 20);
    .px2rem(top, 0);
    .px2rem(left, 0);
    .px2rem(right, 0);
    color: #fff;
    position: fixed;
    z-index: 1000;
    &.warning{
      background-color: #ff9900;
    }
    &.danger{
      background-color: #ed4014;
    }
    .label{
      float: left;
    }
    .button-group{
      float: right;
      button{
        .px2rem(padding-left, 20);
        .px2rem(padding-right, 20);
        .px2rem(margin-left, 10);
        outline: none;
        border: none;
        &.error{
          background-color: #ed4014;
        }
        &.unknow{
          background-color: #5cadff;
        }
        &.success{
          background-color: #19be6b;
        }
      }
    }
  }
</style>


