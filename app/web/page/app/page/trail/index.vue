<template>
  <!-- 轨迹回放 -->
  <div class="trail" id="trail"></div>
</template>
<script>
import mockData from '../../util/mockdata.js';
import * as Icon from '../../util/customIcon.js';
// const BMap = window.BMap;
export default {
  data() {
    return {
      map: {}, // 地图实例
      point: {}, // 地图坐标点
      route: '', // 路径
      timer: '', // 定时器
      trailData: {}, // 回放数据
    };
  },

  mounted() {
    const id = this.$route.query.id;
    this.trailData = mockData[id].address;
    // 初始化百度地图
    this.initBmap();
    // 初始化地图控件
    this.initControl();
    // 创建路径
    this.createRoute();
    // 寻找路径
    // this.searchRoute();
  },

  methods: {
    initBmap() {
      this.map = new BMap.Map('trail');
      this.point = new BMap.Point(this.trailData.companylocation.lng, this.trailData.companylocation.lat);
      // 创建点坐标
      this.map.centerAndZoom(this.point, 11);
    },

    initControl() {
      this.map.addControl(new BMap.NavigationControl());
      this.map.addControl(new BMap.ScaleControl());
      this.map.addControl(new BMap.OverviewMapControl());
    },

    createRoute() {
      const me = this;
      const map = this.map;
      const destination = this.trailData.destination;
      let index = 0;
      const route = this.route = new BMap.DrivingRoute(map, {
        // renderOptions: { map },
        onSearchComplete(rs) {
          if (route.getStatus() === BMAP_STATUS_SUCCESS) {
            const points = me.points = rs.getPlan(0).getRoute(0).getPath();
            // 画面移动到起点和终点的中间
            const centerPoint = me.centerPoint = new BMap.Point((points[0].lng + points[points.length - 1].lng) / 2, (points[0].lat + points[points.length - 1].lat) / 2);
            // me.map.panTo(centerPoint);
            // 连接所有点
            // me.map.addOverlay(new BMap.Polyline(points, { strokeColor: 'black', strokeWeight: 5, strokeOpacity: 1 }));
            me.car = new BMap.Marker(points[0], { icon: Icon.walk, shadow: Icon.shadow });
            me.map.addOverlay(me.car);
            // 回放轨迹
            me.trailRoute(0, function() {
              if (!destination[index + 1]) return;
              route.search(new BMap.Point(destination[index].lng, destination[index].lat), new BMap.Point(destination[index + 1].lng, destination[index + 1].lat));
              index++;
            });
          }
        }
      });
      route.search(this.point, new BMap.Point(destination[index].lng, destination[index].lat));
    },

    // searchRoute() {
    //   this.route.search(new BMap.Point(this.trails[0].x, this.trails[0].y), new BMap.Point(this.trails[1].x, this.trails[1].y));
    // },

    trailRoute(index = 0, callback) {
      const points = this.points;
      const point = points[index];
      const car = this.car;
      if (index > 0) {
        this.map.addOverlay(new BMap.Polyline([points[index - 1], point], { strokeColor: 'red', strokeWeight: 3, strokeOpacity: 1 }));
      }
      car.setPosition(point);
      index++;
      if (index < points.length) {
        this.timer = window.setTimeout(() => {
          this.trailRoute(index, callback);
        }, 30);
      } else {
        this.map.panTo(point);
        callback && callback();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.trail {
  height: 100%;
}
</style>


