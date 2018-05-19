<template>
  <div class="page-container">
    <slot name="main"></slot>
  </div>
</template>
<style lang="less">
  @import "../../../asset/css/global.css";
  @import "../../../asset/style/mixin-px.less";
  .page-container{
    max-width: 675px;
    position: fixed;
    top: 0;
    .px2rem(bottom, 80);
    overflow-x: auto;
  }
</style>
<script type="text/babel">
  export default{}
</script>
