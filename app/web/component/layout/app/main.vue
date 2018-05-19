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
    margin: 0 auto;
  }
</style>
<script type="text/babel">
  export default{}
</script>
