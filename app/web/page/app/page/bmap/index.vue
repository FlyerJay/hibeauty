<template>
  <div class="bmap" id="bmap">
  </div>
</template>
<script>
export default {
  data() {
    return {
      codinrate: {}, // 定位坐标
      mapInstance: {}, // 地图实例
    };
  },

  mounted() {
    this.mapInstance = new BMap.Map('bmap');
    let point = new BMap.Point(116.404, 39.915);
    // 创建点坐标
    this.mapInstance.centerAndZoom(point, 15);
  },

  methods: {
  }
};
</script>
<style lang="less" scoped>
  .bmap{
    height: 100%;
  }
</style>


