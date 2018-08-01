<template>
  <div class="page-container" ref="container">
    <slot name="main"></slot>
  </div>
</template>
<style lang="less">
  
</style>
<script>
  export default{
    mounted() {
      this.$refs.container.addEventListener('touchmove', function(e) {
        e.preventDefault();
        console.log(1);
      }, { passive: false });
    }
  };
</script>
