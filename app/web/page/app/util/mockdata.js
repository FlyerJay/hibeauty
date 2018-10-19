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
      homelocation: { // 家庭地址定位
        lng: 106.559789,
        lat: 29.740675
      },
      companylocation: { // 公司地址定位
        lng: 106.497267,
        lat: 29.627913
      },
      destination: [{ // 经过的点
        lng: 106.467145,
        lat: 29.767717
      }, {
        lng: 106.577795,
        lat: 29.913189
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
  }
];

export default users;