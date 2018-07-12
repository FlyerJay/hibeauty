'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const {
      ctx,
      service
    } = this;
    const user = await ctx.service.user.login(ctx.request.body);
    ctx.body = user;
  }
  async register() {
    const {
      ctx,
      service
    } = this;
    ctx.body = await ctx.service.user.register(ctx.request.body);
  }
  async detail() {
    const {
      ctx,
      service
    } = this;
    ctx.body = await ctx.service.user.detail(ctx.userInfo);
  }
  async logout() {
    const {
      ctx,
      service
    } = this;
    ctx.cookies.set('access_token', null);
    ctx.redirect('/');
  }
  async edit() {
    const {
      ctx,
      service
    } = this;
    ctx.body = await ctx.service.user.edit(ctx.request.body);
  }
}

module.exports = UserController;