'use strict';

module.exports = app => {
    class UserController extends app.Controller {
        async login() {
            const { ctx, service } = this;
            const user = await service.login(ctx.request.body);
            ctx.body = user;
        }
        async register() {
            const { ctx, service } = this;
            ctx.body = service.register(ctx.request.body);
        }
    }
    return UserController;
}