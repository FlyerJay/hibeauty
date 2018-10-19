<template>
  <div class="area">
    <d-tip :level="level"></d-tip>
    <div id="map"></div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Tip from '../../../component/tip';
import * as Icon from '../../../util/customIcon.js';
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
        fillOpacity: 0.1, // 填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' // 边线的样式，solid或dashed。
      },
      drawingManager: {}, // 绘制工具
      area: '', // 活跃区域
      areaList: '', // 活跃区域列表
      address: '', // 用户位置信息
      warnArea: '', // 警告区域
      dangerArea: '', // 危险区域
      alertDialog: true, // 是否弹框
      level: 0, // 安全等级
    };
  },

  computed: {
    ...mapState({
      _area: state => state.area,
      _address: state => state.address
    })
  },

  components: {
    'd-tip': Tip,
  },

  mounted() {
    this.address = this._address;
    // 初始化百度地图
    this.initBmap();
  },

  methods: {
    initBmap() {
      if (typeof BMap === 'undefined') {
        return setTimeout(() => {
          this.initBmap();
        }, 200);
      }
      this.map = new BMap.Map('map');
      this.home = {
        x: this.address.homelocation.lng,
        y: this.address.homelocation.lat
      };
      this.company = {
        x: this.address.companylocation.lng,
        y: this.address.companylocation.lat
      };
      this.center = {
        x: (this.home.x + this.company.x) / 2,
        y: (this.home.y + this.company.y) / 2
      };
      this.homePoint = new BMap.Point(this.home.x, this.home.y);
      this.companyPoint = new BMap.Point(this.company.x, this.company.y);
      this.point = new BMap.Point(this.center.x, this.center.y);

      // console.log(this.computeEuclidDistance(this.home, this.center));
      // // this.point = new BMap.Point(this.codinrate.x, this.codinrate.y);
      // 创建点坐标
      this.map.centerAndZoom(this.point, 11);

      // 初始化地图控件
      this.initControl();
      // 标注所在位置
      this.markerPosition();
      // 画出路径
      this.drawRoutePath();
    },

    initControl() {
      this.map.addControl(new BMap.NavigationControl());
      this.map.addControl(new BMap.ScaleControl());
      this.map.addControl(new BMap.OverviewMapControl());
      // this.map.addControl(new BMap.MapTypeControl());
      this.map.setCurrentCity('重庆');
    },

    markerPosition() {
      // const marker = new BMap.Marker(this.point);
      // this.map.addOverlay(marker);

      // 标记家的位置
      const homeMarker = new BMap.Marker(this.homePoint, {
        icon: Icon.home,
        shadow: Icon.shadow
      });
      this.map.addOverlay(homeMarker);

      // 标记公司位置
      const companyMarker = new BMap.Marker(this.companyPoint, {
        icon: Icon.company,
        shadow: Icon.shadow
      });
      this.map.addOverlay(companyMarker);

      this.area = new BMap.Circle(new BMap.Point(this.center.x, this.center.y), this.computeEuclidDistance(this.center, this.home), this.styleOptions);
      this.dengerArea = new BMap.Circle(new BMap.Point(this.center.x, this.center.y),
        this.computeEuclidDistance(this.center, this.home) * 2, Object.assign(this.styleOptions, {
          strokeColor: 'red', // 边线颜色
          fillColor: 'white', // 填充颜色。当参数为空时，圆形将没有填充效果。
          fillOpacity: 0.1,
        }));
      // this.dengerArea = new BMap.Circle(new BMap.Point(this.center.x, this.center.y), this.computeEuclidDistance(this.center, this.home), this.styleOptions);
      this.map.addOverlay(this.area);
      this.map.addOverlay(this.dengerArea);
      // this.map.addOverlay(this.dengerArea);
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
    },

    // 计算两点间的欧式距离
    computeEuclidDistance(pointX, pointY) {
      return Math.sqrt(((pointX.x - pointY.x) * (pointX.x - pointY.x)) + ((pointX.y - pointY.y) * (pointX.y - pointY.y))) / 0.00001 * 1.5;
    },

    drawRoutePath() {
      const me = this;
      const map = this.map;
      const destination = this.address.destination;
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
            me.car = new BMap.Marker(points[0], {
              icon: Icon.walk,
              shadow: Icon.shadow
            });
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
      route.search(this.companyPoint, new BMap.Point(destination[index].lng, destination[index].lat));
    },

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

      const isInArea = BMapLib.GeoUtils.isPointInCircle(point, this.area);
      // const isInWarnArea = BMapLib.GeoUtils.isPointInCircle(point, this.warnArea);
      const isInDangerArea = BMapLib.GeoUtils.isPointInCircle(point, this.dengerArea);
      if (!isInDangerArea) {
        // 非常危险，直接发短信
        this.level = 2;
      } else if (!isInArea) {
        // 有危险，提示用户确认
        this.level = 1;
      }
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
    #map{
      height: 100%;
      width: 100%;
    }
  }
</style>



