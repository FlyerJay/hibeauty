/**
 * @desc 用户相关服务
 * @author flyerjay
 * @since 2018-06-05
 */

'use strict';

const Service = require('egg').Service;
const jwt = require('../util/jwt');

class UserService extends Service {
  async login(opts) {
    const {
      password,
      loginId
    } = opts;
    const userInfo = await this.ctx.model.User.getUser({
      password,
      loginId
    });
    if (userInfo) {
      const realTime = new Date().getTime();
      const query = {
        loginId: {
          $eq: loginId
        }
      };
      await this.ctx.model.User.update({
        lastLoginTime: realTime
      }, {
        where: query
      });
      const encodeJwt = jwt.encode(userInfo);
      this.ctx.cookies.set('access_token', encodeJwt, {
        maxAge: 1 * 24 * 3600 * 1000, // cookie有效期为1天
        httpOnly: false
      });
      return {
        code: 200,
        msg: '欢迎来到hibeauty！'
      };
    }
    return {
      code: -1,
      msg: '亲，您的账号或密码不在服务区！'
    };
  }

  async register(opts) {
    const {
      password,
      loginId
    } = opts;
    const user = await this.ctx.model.User.initUser(opts);
    if (user) {
      return {
        code: 200,
        msg: '恭喜您，注册成为会员用户！'
      };
    }
    return {
      code: -1,
      msg: '亲，账号已经被使用了！'
    };
  }

  async detail(opts) {
    const {
      loginId
    } = opts;
    const user = await this.ctx.model.User.getUserById(loginId);
    if (user) {
      return {
        code: 200,
        data: user
      };
    }
    return {
      code: -1,
      msg: '获取用户信息出错了！'
    };
  }

  async edit(opts) {
    const {
      loginId
    } = this.ctx.userInfo;
    const user = await this.ctx.model.User.updateUser(loginId, opts);
    if (user) {
      return {
        code: 200,
        data: user
      };
    }
    return {
      code: -1,
      msg: '更新信息出错了！'
    };
  }
}

module.exports = UserService;