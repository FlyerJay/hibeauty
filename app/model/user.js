/**
 * @author flyerjay
 * @since 2017-11-09
 * @desc 用户信息实体类
 */

'use strict';
// 注意：实体的classmthods中不要出现sequelize中的保留方法，否则会覆盖保留方法如(create,update,destroy,find等);
// 复杂的业务逻辑写在service中，classMethods只处理简单逻辑

module.exports = app => {
  const {
    STRING,
    INTEGER,
    BIGINT
  } = app.Sequelize;

  const User = app.model.define('User', {
    userId: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '用户自增主键，用户唯一标识',
    },
    loginId: {
      type: STRING(15),
      allowNull: false,
      comment: '用户登录名,15位以内',
    },
    nickName: {
      type: STRING(15),
      allowNull: true,
      comment: '用户昵称，1位以内'
    },
    sex: {
      type: INTEGER,
      allowNull: true,
      comment: '性别'
    },
    birthday: {
      type: STRING(15),
      allowNull: true,
      comment: '生日，时间戳格式'
    },
    password: {
      type: STRING(64),
      allowNull: false,
      comment: '经过简单加密的密码密文'
    },
    registerTime: {
      type: STRING(15),
      allowNull: true,
      comment: '注册时间,时间戳字符串'
    },
    lastLoginTime: {
      type: STRING(15),
      allowNull: true,
      comment: '上次登录时间，时间戳格式字符串'
    },
    phone: {
      type: STRING(15),
      allowNull: true,
      comment: '手机号码，不超过15位'
    },
    email: {
      type: STRING(30),
      allowNull: true,
      comment: '邮箱'
    },
    level: {
      type: INTEGER,
      allowNull: true,
      comment: '等级,'
    },
    exp: {
      type: INTEGER,
      allowNull: true,
      comment: '经验'
    },
    avator: {
      type: STRING(256),
      allowNull: true,
      comment: '头像'
    }
  }, {
    freezeTabName: true,
    tableName: 'user',
    underscored: true,
    timestamps: false
  });

  /**
   * sequelize V4不再支持classMethods的写法了,
   * 使用model.methods代替classMethods,model.prototype.methods
   * 代替instanceMthods，目的是为了兼容es6（are you ok?还是原来的写法好看）。
   **/
  User.getUser = async function(opts) {
    if (!opts.loginId || !opts.password) return false;
    const query = {
      loginId: {
        $eq: opts.loginId
      },
      password: {
        $eq: opts.password
      }
    };
    const exist = await this.findOne({
      where: query,
      attributes: ['loginId', 'nickName', 'avator', 'lastLoginTime']
    });
    return exist ? exist : false;
  };

  User.getUserById = async function(loginId) {
    if (!loginId) return false;
    const query = {
      loginId: {
        $eq: loginId
      }
    };
    const userInfo = await this.findOne({
      where: query
    });
    return userInfo ? userInfo : false;
  };

  User.initUser = async function(opts) {
    if (!opts.loginId || !opts.password) return false;
    const query = {
      loginId: {
        $eq: opts.loginId
      }
    };
    const exist = await this.findOne({
      where: query
    });
    const userInfo = {
      loginId: opts.loginId,
      password: opts.password,
      nickName: randomNickName(),
      sex: 0,
      registerTime: new Date().getTime(),
      level: 1,
      exp: 0,
      avator: 'http://www.gravatar.com/avatar/'
    };
    return exist ? false : await this.create(userInfo);
  };

  User.updateUser = async function(loginId, opts) {
    if (!loginId) return false;
    const query = {
      loginId: {
        $eq: loginId
      }
    };
    const user = await this.findOne({
      where: query
    });
    for (const key in opts) {
      if (opts[key]) {
        user[key] = opts[key];
      }
    }
    return await user.save();
  };

  // 随机生成用户昵称
  function randomNickName() {
    const firstName = ['上官', '司马', '轩辕', '南宫', '欧阳', '端木', '夏侯', '皇甫', '慕容'];
    const lastName = ['遇', '旖', '恍', '情', '游', '弋', '斐', '棋', '瑟', '狐'];
    const nickName = firstName[Math.floor(Math.random() * firstName.length)] + lastName[Math.floor(Math.random() * lastName.length)];
    return nickName;
  }

  return User;
};