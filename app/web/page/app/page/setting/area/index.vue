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
      this.map = new window.BMap.Map('map');
      if (!this.address.homelocation) return;
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
      if (!this.company.x) {
        this.center = {
          x: this.home.x,
          y: this.home.y
        };
        this.homePoint = new window.BMap.Point(this.home.x, this.home.y);
        this.point = new window.BMap.Point(this.center.x, this.center.y);
      } else {
        this.homePoint = new window.BMap.Point(this.home.x, this.home.y);
        this.companyPoint = new window.BMap.Point(this.company.x, this.company.y);
        this.point = new window.BMap.Point(this.center.x, this.center.y);
      }

      // console.log(this.computeEuclidDistance(this.home, this.center));
      // // this.point = new window.BMap.Point(this.codinrate.x, this.codinrate.y);
      // 创建点坐标
      this.map.centerAndZoom(this.point, this.address.scale);

      // 初始化地图控件
      this.initControl();
      // 标注所在位置
      this.markerPosition();
      // 画出路径
      this.drawRoutePath();
    },

    initControl() {
      this.map.addControl(new window.BMap.NavigationControl());
      this.map.addControl(new window.BMap.ScaleControl());
      this.map.addControl(new window.BMap.OverviewMapControl());
      // this.map.addControl(new window.BMap.MapTypeControl());
      this.map.setCurrentCity('重庆');
    },

    markerPosition() {
      // const marker = new window.BMap.Marker(this.point);
      // this.map.addOverlay(marker);

      // 标记家的位置
      const homeMarker = new window.BMap.Marker(this.homePoint, {
        icon: Icon.home,
        shadow: Icon.shadow
      });
      this.map.addOverlay(homeMarker);

      // 标记公司位置
      if (this.companyPoint) {
        const companyMarker = new window.BMap.Marker(this.companyPoint, {
          icon: Icon.company,
          shadow: Icon.shadow
        });
        this.map.addOverlay(companyMarker);
      }

      this.area = new window.BMap.Circle(new window.BMap.Point(this.center.x, this.center.y), this.computeEuclidDistance(this.center, this.company), this.styleOptions);
      this.dengerArea = new window.BMap.Circle(new window.BMap.Point(this.center.x, this.center.y),
        this.computeEuclidDistance(this.center, this.company) * 2, Object.assign(this.styleOptions, {
          strokeColor: 'red', // 边线颜色
          fillColor: 'white', // 填充颜色。当参数为空时，圆形将没有填充效果。
          fillOpacity: 0.1,
        }));
      // this.dengerArea = new window.BMap.Circle(new window.BMap.Point(this.center.x, this.center.y), this.computeEuclidDistance(this.center, this.home), this.styleOptions);
      this.map.addOverlay(this.area);
      this.map.addOverlay(this.dengerArea);
      // this.map.addOverlay(this.dengerArea);
    },

    initArea() {
      this.areaList = this._area;
      if (this.areaList.type === 'polygon') {
        this.area = new window.BMap.Polygon(this.areaList.points, this.styleOptions);
        this.map.addOverlay(this.area);
      }
    },

    addDrawingManager() {
      this.drawingManager = new window.BMap.DrivingRoute(this.map, {
        isOpen: true, // 是否开启绘制模式
        enableDrawingTool: true, // 是否显示工具栏
        drawingToolOptions: {
          anchor: window.BMAP_ANCHOR_TOP_RIGHT, // 位置
          offset: new window.BMap.Size(5, 5), // 偏离值
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
          me.area = new window.BMap.Polygon(points, me.styleOptions);
          me.map.addOverlay(me.area);
        }
      });
    },

    // 计算两点间的欧式距离
    computeEuclidDistance(pointX, pointY) {
      if (!pointY.x) return 500;
      return Math.sqrt(((pointX.x - pointY.x) * (pointX.x - pointY.x)) + ((pointX.y - pointY.y) * (pointX.y - pointY.y))) / 0.00001 * 1.5;
    },

    drawRoutePath() {
      const me = this;
      const map = this.map;
      const destination = this.address.destination;
      const startpoint = this.address.startpoint;
      const startPoint = new window.BMap.Point(startpoint.lng, startpoint.lat);
      let index = 0;
      me.car = new window.BMap.Marker(new window.BMap.Point(startpoint.lng, startpoint.lat), {
        icon: Icon.walk,
        shadow: Icon.shadow
      });
      me.map.addOverlay(me.car);
      let routeType = '';
      if (this.address.route === 'drive') {
        routeType = window.BMap.DrivingRoute;
      } else {
        routeType = window.BMap.WalkingRoute;
      }
      const route = this.route = new routeType(map, {
        // renderOptions: { map },
        onSearchComplete(rs) {
          if (route.getStatus() === window.BMAP_STATUS_SUCCESS) {
            const points = me.points = rs.getPlan(0).getRoute(0).getPath();
            // 画面移动到起点和终点的中间
            const centerPoint = me.centerPoint = new window.BMap.Point((points[0].lng + points[points.length - 1].lng) / 2, (points[0].lat + points[points.length - 1].lat) / 2);
            // 回放轨迹
            me.trailRoute(0, function() {
              if (destination[index].desc) {
                const infoWindow = new window.BMap.InfoWindow(destination[index].desc, {
                  title: '',
                  width: 80,
                  height: 30,
                });
                me.map.openInfoWindow(infoWindow, new window.BMap.Point(destination[index].lng, destination[index].lat));
              }
              if (!destination[index + 1]) {
                if (destination[index].danger) {
                  me.car.setIcon(Icon.danger);
                } else if (destination[index].warning) {
                  me.setIcon(Icon.warning);
                }
                return;
              }
              setTimeout(() => {
                route.search(new window.BMap.Point(destination[index].lng, destination[index].lat), new window.BMap.Point(destination[index + 1].lng, destination[index + 1].lat));
                me.map.closeInfoWindow();
                if (destination[index].danger) {
                  const dangerMarker = new window.BMap.Marker(new window.BMap.Point(destination[index].lng, destination[index].lat), {
                    icon: Icon.danger,
                    shadow: Icon.shadow
                  });
                  me.map.addOverlay(dangerMarker);
                } else if (destination[index].warning) {
                  const warningMarker = new window.BMap.Marker(new window.BMap.Point(destination[index].lng, destination[index].lat), {
                    icon: Icon.warning,
                    shadow: Icon.shadow
                  });
                  me.map.addOverlay(warningMarker);
                }
                index++;
              }, destination[index].delay);
            });
          }
        }
      });
      route.search(startPoint, new window.BMap.Point(destination[index].lng, destination[index].lat));
    },

    trailRoute(index = 0, callback) {
      const points = this.points;
      const point = points[index];
      const car = this.car;
      if (index > 0) {
        this.map.addOverlay(new window.BMap.Polyline([points[index - 1], point], { strokeColor: 'red', strokeWeight: 3, strokeOpacity: 1 }));
      }
      car.setPosition(point);
      index++;
      if (index < points.length) {
        this.timer = window.setTimeout(() => {
          this.trailRoute(index, callback);
        }, this.address.gutter);
      } else {
        this.map.panTo(point);
        callback && callback();
      }
      const isInArea = window.BMapLib.GeoUtils.isPointInCircle(point, this.area);
      // const isInWarnArea = window.BMapLib.GeoUtils.isPointInCircle(point, this.warnArea);
      const isInDangerArea = window.BMapLib.GeoUtils.isPointInCircle(point, this.dengerArea);
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



