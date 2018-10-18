<template>
  <!-- 轨迹回放 -->
  <div class="trail" id="trail"></div>
</template>
<script>
export default {
  data() {
    return {
      codinrate: { x: 106.499074, y: 29.626498 }, // 定位坐标
      map: {}, // 地图实例
      point: {}, // 地图坐标点
      trails: [
        {
          x: 106.499074,
          y: 29.626498
        },
        {
          x: 106.496797,
          y: 29.629265
        }
      ],
      route: '', // 路径
      timer: '', // 定时器
    };
  },

  mounted() {
    // 初始化百度地图
    this.initBmap();
    // 初始化地图控件
    this.initControl();
    // 创建路径
    this.createRoute();
    // 寻找路径
    this.searchRoute();
  },

  methods: {
    initBmap() {
      this.map = new BMap.Map('trail');
      this.point = new BMap.Point(this.codinrate.x, this.codinrate.y);
      // 创建点坐标
      this.map.centerAndZoom(this.point, 17);
    },

    initControl() {
      this.map.addControl(new BMap.NavigationControl());
      this.map.addControl(new BMap.ScaleControl());
      this.map.addControl(new BMap.OverviewMapControl());
    },

    createRoute() {
      const me = this;
      const map = this.map;
      const route = this.route = new BMap.WalkingRoute(map, {
        // renderOptions: { map },
        onSearchComplete(rs) {
          if (route.getStatus() === BMAP_STATUS_SUCCESS) {
            const points = me.points = rs.getPlan(0).getRoute(0).getPath();
            // 画面移动到起点和终点的中间
            const centerPoint = me.centerPoint = new BMap.Point((points[0].lng + points[points.length - 1].lng) / 2, (points[0].lat + points[points.length - 1].lat) / 2);
            me.map.panTo(centerPoint);
            // 连接所有点
            // me.map.addOverlay(new BMap.Polyline(points, { strokeColor: 'black', strokeWeight: 5, strokeOpacity: 1 }));
            me.car = new BMap.Marker(points[0]);
            me.map.addOverlay(me.car);
            // 回放轨迹
            me.trailRoute();
          }
        }
      });
    },

    searchRoute() {
      this.route.search(new BMap.Point(this.trails[0].x, this.trails[0].y), new BMap.Point(this.trails[1].x, this.trails[1].y));
    },

    trailRoute(index = 0) {
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
          this.trailRoute(index);
        }, 100);
      } else {
        this.map.panTo(point);
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


