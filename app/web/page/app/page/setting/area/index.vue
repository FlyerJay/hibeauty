<template>
  <div class="area" id="area">
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      codinrate: { x: 106.497138, y: 29.627971 }, // 定位坐标
      map: {}, // 地图实例
      point: {}, // 地图坐标点
      styleOptions: { // 绘制参数
        strokeColor: 'green', // 边线颜色
        fillColor: 'green', // 填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3, // 边线的宽度，以像素为单位。
        strokeOpacity: 0.8, // 边线透明度，取值范围0 - 1。
        fillOpacity: 0.6, // 填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' // 边线的样式，solid或dashed。
      },
      drawingManager: {}, // 绘制工具
      area: '', // 活跃区域
      areaList: '', // 活跃区域列表
    };
  },

  computed: {
    ...mapState({
      _area: state => state.area
    })
  },

  mounted() {
    // 初始化百度地图
    this.initBmap();
    // 初始化地图控件
    this.initControl();
    // 标注所在位置
    this.markerPosition();
    // 添加绘制工具
    // this.addDrawingManager();
    // 初始化活跃区域
    this.initArea();
    // 绑定事件
    this.bindEvents();
  },

  methods: {
    initBmap() {
      this.map = new BMap.Map('area');
      this.point = new BMap.Point(this.codinrate.x, this.codinrate.y);
      // 创建点坐标
      this.map.centerAndZoom(this.point, 15);
    },

    initControl() {
      this.map.addControl(new BMap.NavigationControl());
      this.map.addControl(new BMap.ScaleControl());
      this.map.addControl(new BMap.OverviewMapControl());
      // this.map.addControl(new BMap.MapTypeControl());
      this.map.setCurrentCity('重庆');
    },

    markerPosition() {
      const marker = new BMap.Marker(this.point);
      marker.enableDragging();
      this.map.addOverlay(marker);
    },

    initArea() {
      this.areaList = this._area;
      if (this.areaList.type === 'polygon') {
        this.area = new BMap.Polygon(this.areaList.points, this.styleOptions);
        this.map.addOverlay(this.area);
      }
    },

    addDrawingManager() {
      this.drawingManager = new BMapLib.DrawingManager(this.map, {
        isOpen: true, // 是否开启绘制模式
        enableDrawingTool: true, // 是否显示工具栏
        drawingToolOptions: {
          anchor: BMAP_ANCHOR_TOP_RIGHT, // 位置
          offset: new BMap.Size(5, 5), // 偏离值
        },
        circleOptions: this.styleOptions, // 圆的样式
        polylineOptions: this.styleOptions, // 线的样式
        polygonOptions: this.styleOptions, // 多边形的样式
        rectangleOptions: this.styleOptions // 矩形的样式
      });
    },

    bindEvents() {
      const me = this;
      const points = [];
      this.map.addEventListener('click', function(event) {
        points.push(event.point);

        if (points.length > 0) {
          if (me.area) {
            me.map.removeOverlay(me.area);
          }
          me.area = new BMap.Polygon(points, me.styleOptions);
          me.map.addOverlay(me.area);
        }
      });
    }
  },

  destroyed() {
    const me = this;
    if (me.area.getPath) {
      this.$store.commit('SAVE_AREA', {
        type: 'polygon',
        points: me.area.getPath()
      });
    }
  }
};
</script>
<style lang="less" scoped>
  .area{
    height: 100%;
  }
</style>



