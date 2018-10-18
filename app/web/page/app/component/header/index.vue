<template>
  <header class="d-header">
    <div class="title">点滴守护</div>
    <i class="iconfont icon-add" @click="onNextBtnClick" v-if="nextBtn"></i>
  </header>
</template>
<script>
export default {
  props: {
    nextBtn: false,
    onNextBtnClick: {
      type: Function,
      default() {}
    }
  }
};
</script>
<style lang="less" scoped>
  .d-header{
    .px2rem(height, 100);
    .px2rem(line-height, 100);
    text-align: center;
    .px2rem(font-size, 32);
    position: relative;
    background-color: #2db7f5;
    color: #fff;
    width: 100%;
    .iconfont{
      position: absolute;
      .px2rem(right, 30);
      .px2rem(top, 0);
      font-weight: bold;
    }
  }
</style>


