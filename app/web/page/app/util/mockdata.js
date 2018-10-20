/**
 * @desc 数据埋点
 * @author flyerjay
 * @since 2018-10-19
 */

'use stict';

const users = [
  {
    title: '23岁单身女性', // 设置时显示的标题
    personal: { // 个人信息
      name: '红梅',
      sex: '女',
      age: 23, // 年龄
      marry: '未婚', // 婚姻状况
      health: '良好', // 健康状况
      job: '在职', // 职业状况
      index: 0, // 索引，方便轨迹回放时根据这个寻找
    },
    address: { // 地址信息
      home: '重庆市渝北区仙桃大桥', // 居住地址
      security: '有保安', // 小区安保
      type: '租房', // 居住方式
      company: '互联网产业园', // 公司地址
      institution: '工作日上班', // 公司制度
      start: '8:30', // 上班时间
      end: '17:30', // 下班时间
      scale: 11,
      route: 'drive',
      gutter: 30,
      homelocation: { // 家庭地址定位
        lng: 106.559789,
        lat: 29.740675
      },
      companylocation: { // 公司地址定位
        lng: 106.497267,
        lat: 29.627913
      },
      startpoint: {
        lng: 106.497267,
        lat: 29.627913
      },
      destination: [{ // 经过的点
        lng: 106.642504,
        lat: 29.765379,
        delay: 3000,
        desc: '在此停留超过4小时',
        danger: false,
        warning: true,
      }, {
        lng: 106.782712,
        lat: 29.767166,
        delay: 0,
        desc: '在此停留超过2小时',
        danger: true,
        warning: true,
      }]
    },
    contact: { // 联系人信息
      home: {
        name: '',
        phone: ''
      },
      other: {
        name: '李狗蛋',
        phone: '15178831138'
      }
    }
  }, {
    title: '6岁小孩', // 设置时显示的标题
    personal: { // 个人信息
      name: '小明',
      sex: '男',
      age: 6, // 年龄
      marry: '未婚', // 婚姻状况
      health: '良好', // 健康状况
      job: '无', // 职业状况
      index: 1, // 索引，方便轨迹回放时根据这个寻找
    },
    address: { // 地址信息
      home: '重庆市南岸区弹子石新街34号', // 居住地址
      security: '有保安', // 小区安保
      type: '保有住房', // 居住方式
      company: '互联网产业园', // 公司地址
      institution: '不上班', // 公司制度
      start: '', // 上班时间
      end: '', // 下班时间
      scale: 16,
      route: 'walk',
      gutter: 100,
      homelocation: { // 家庭地址定位
        lng: 106.593349,
        lat: 29.587503
      },
      companylocation: { // 公司地址定位
      },
      startpoint: {
        lng: 106.593349,
        lat: 29.587503
      },
      destination: [{ // 经过的点
        lng: 106.593996,
        lat: 29.586906,
        delay: 500,
        desc: '',
        danger: false,
        warning: false,
      }, { // 经过的点
        lng: 106.590151,
        lat: 29.586357,
        delay: 3000,
        desc: '接近江河湖海、水塘等危险区域',
        danger: true,
        warning: true,
      }]
    },
    contact: { // 联系人信息
      home: {
        name: '爸爸',
        phone: '15178831138'
      },
      other: {
        name: '',
        phone: ''
      }
    }
  }
];

export default users;