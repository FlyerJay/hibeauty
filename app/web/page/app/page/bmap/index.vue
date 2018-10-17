<template>
  <div class="bmap" id="bmap">
  </div>
</template>
<script>
export default {
  data() {
    return {
      codinrate: { x: 106.497138, y: 29.627971 }, // 定位坐标
      map: {}, // 地图实例
      point: {}, // 地图坐标点
    };
  },

  mounted() {
    // 初始化百度地图
    this.initBmap();
    // 初始化地图控件
    this.initControl();
    // 标注所在位置
    this.markerPosition();
  },

  methods: {
    initBmap() {
      this.map = new BMap.Map('bmap');
      this.point = new BMap.Point(this.codinrate.x, this.codinrate.y);
      // 创建点坐标
      this.map.centerAndZoom(this.point, 15);
    },

    initControl() {
      this.map.addControl(new BMap.NavigationControl());
      this.map.addControl(new BMap.ScaleControl());
      this.map.addControl(new BMap.OverviewMapControl());
      this.map.addControl(new BMap.MapTypeControl());
      this.map.setCurrentCity('重庆');
    },

    markerPosition() {
      const maker = new BMap.Marker(this.point);
      this.map.addOverlay(maker);
    }
  }
};
</script>
<style lang="less" scoped>
  .bmap{
    height: 100%;
  }
</style>


