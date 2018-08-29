/**
 * @author flyerjay
 * @desc 微信签名
 * @since 2018-08-29
 */

'use strict';

const Controller = require('egg').Controller;

class WechatController extends Controller {
  async sign() {
    const {
      ctx,
      service
    } = this;
    const sign = await ctx.service.wechat.sign(ctx.query);
    ctx.body = sign;
  }
}

module.exports = WechatController;