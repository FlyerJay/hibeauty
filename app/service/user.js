/**
 * @desc 用户相关服务
 * @author flyerjay
 * @since 2018-06-05
 */

"use strict";

const Service = require('egg').Service;

class UserService extends Service {
    async login(opts) {
        let { password, loginId } = opts;
        let userInfo = this.ctx.model.User.getUser({ password, loginId });
        if(userInfo) {
            var realTime = new Date().getTime();
            let query = { loginId: { $eq: loginId } };
            await this.ctx.model.update({ lastLoginTime: realTime }, { where: quer });
            return { code: 200, msg: '欢迎来到hibeauty！' }
        }
        return { code: -1, msg: '亲，您的账号或密码不在服务区！' }
    }
    
    async register(opts) {
        let { password, loginId } = opts;
        let user = await this.ctx.model.User.initUser(opts);
        console.log(user);
        if(user) return { code: 200, msg: '恭喜您，注册成为会员用户！' }
        return { code: -1, msg: '亲，账户名已经被使用了！' }
    }
}

module.exports = UserService;

