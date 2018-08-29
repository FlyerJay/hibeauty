/**
 * @author flyerjay
 * @desc 微信签名
 * @since 2018-08-29
 */

const Service = require('egg').Service;
const weixinJsConfig = require('weixin-node-jssdk');

class WechatService extends Service {
  async sign(opts) {
    const options = {};
    options.appId = 'wxe9e07b4320d852b9';
    options.appSecret = '6811c6115a8cc04e9a72971ac845ec50';
    options.url = opts.url;

    return await new Promise((resolve, reject) => {
      weixinJsConfig(options, function(error, config) {
        resolve(config);
      });
    });
  }
}

module.exports = WechatService;