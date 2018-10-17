'use strict';

const Controller = require('egg').Controller;

class FetchPicController extends Controller {
  async login() {
    const {
      ctx,
      service
    } = this;
    const user = await ctx.service.user.login(ctx.request.body);
    ctx.body = user;
  }
}

module.exports = FetchPicController;