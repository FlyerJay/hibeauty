/**
 * @desc 数据买点
 */

'use stict';

const users = [
  {
    title: '23岁单身女性',
    personal: {
      name: '',
      sex: '女',
      age: 23, // 年龄
      marry: '未婚', // 婚姻状况
      health: '良好', // 健康状况
      job: '在职', // 职业状况
    },
    address: {
      home: '重庆市渝北区仙桃大桥', // 居住地址
      security: '', // 小区安保
      type: '', // 居住方式
      company: '互联网产业园', // 公司地址
      institution: '', // 公司制度
      start: '', // 上班时间
      end: '', // 下班时间
      homelocation: {
        lng: 106.559789,
        lat: 29.740675
      },
      companylocation: {
        lng: 106.497267,
        lat: 29.627913
      },
      destination1: {
        lng: 106.467145,
        lat: 29.767717
      },
      destination2: {
        lng: 106.577795,
        lat: 29.913189
      }
    },
  }
];

export default users;