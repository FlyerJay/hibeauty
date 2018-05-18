/**
 * @author flyerjay
 * @since 2017-11-09
 * @desc 用户信息实体类
 */

'use strict';
//注意：实体的classmthods中不要出现sequelize中的保留方法，否则会覆盖保留方法如(create,update,destroy,find等);
//复杂的业务逻辑卸载service中，classMethods只处理简单逻辑

module.exports = app => {
    const { STRING, INTEGER, BIGINT } = app.Sequelize;

    const User =  app.model.define('User',{
        userId: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: "用户自增主键，用户唯一标识",
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
            type: STRING(30),
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
            type: STRING(50),
            allowNull: true,
            comment: '头像'
        }
    },{
        freezeTabName: true,
		tableName: "user",
        underscored: true,
        timestamps: false//sequelize V4不再支持classMethods的写法了,使用model.methods代替classMethods,model.prototype.methods代替instanceMthods，目的是为了兼容es6（are you ok?还是原来的写法好看）。
    });

    User.login = async function (options) {
        if(!options.loginId) return {
            code: -1,
            msg: '用户名不能为空'
        }
        if(!options.password) return {
            code: -1,
            msg: '密码不能为空'
        }
        var exist = await this.findOne({
            where: {
                loginId: {
                    $eq: options.loginId
                },
                password: {
                    $eq: options.password
                }
            },
            attributes:['nickName','avator','level','exp','lastLoginTime'] //获取简要的用户信息作为展示使用
        });

        if(!exist) return {
            code: -1,
            msg: '用户名或密码错误' //直接提示用户名或密码错误，不验证是否注册
        }
        exist.lastLoginTime = new Date().getTime(); //更新最后登录时间
        exist.save();
        return { //简单返回登录信息,主要还是在于设置cookie
            code: 200,
            msg: '登录成功',
            data: exist
        }
    }

    User.register = async function(options) {
        if(!options.loginId) return {
            code: -1,
            msg: '缺少用户名'
        }
        if(!options.password) return {
            code: -1,
            msg: '缺少密码'
        }
        var exist = await this.findOne({
            where: {
                loginId: {
                    $eq: options.loginId
                }
            }
        })

        if(exist) return {
            code: -1,
            msg: '用户名已经被注册啦~~~'
        }

        var defaultInfo = {
            registerTime: new Date().getTime(),
            level: 0,
            exp: 0,
        }
        try{
            await this.create(Object.assign(options,defaultInfo));
        }catch(err){
            return {
                code: -1,
                msg: '发生了意外',
                err: err,
            }
        }
        return {
            code: 200,
            msg: '注册成功'
        }
    }

    return User;
}