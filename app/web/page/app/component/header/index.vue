<template>
    <div class="snowyet-header clearfix">
        <div class="header-lbtn" @click="goBack">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-back"></use>
            </svg>
        </div>
        <div class="header-title">{{title}}</div>
        <div class="header-rbtn">
            <slot></slot>
        </div>
    </div>
</template>
<style lang="less" scoped>
.snowyet-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  .px2rem(height, 90);
  .px2rem(line-height, 90);
  background-color: #fff;
  border-bottom: 1px solid #eee;
  @media screen and (min-width: 640px) {
    width: 640px;
    margin: 0 auto;
  }
  .header-lbtn,
  .header-rbtn {
    float: left;
    width: 15%;
    height: 100%;
    text-align: center;
    .px2rem(font-size, 36);
    color: #666;
  }
  .header-title {
    float: left;
    width: 70%;
    text-align: center;
    .px2rem(font-size, 32);
    color: #666;
  }
}
</style>
<script>
export default {
  props: ['title'],
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>


