const jwt = require('../util/jwt');

const filterUrl = ['/mine', '/collection'];

module.exports = () => {
    return async function (ctx, next) {
        if(filterUrl.indexOf(ctx.url) === -1) {
            await next();
        }else{
            const accessToken = ctx.cookies.get('access_token');
            if (accessToken) {
                const userInfo = jwt.decode(accessToken);
                ctx.userInfo = userInfo;
            }
            await next();
        }
    }
}