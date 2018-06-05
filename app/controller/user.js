'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async login() {
        const { ctx, service } = this;
        const user = await ctx.service.user.login(ctx.request.body);
        ctx.body = user;
    }
    async register() {
        const { ctx, service } = this;
        ctx.body = await ctx.service.user.register(ctx.request.body);
    }
}

module.exports = UserController;