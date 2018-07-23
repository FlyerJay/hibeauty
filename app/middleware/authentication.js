const jwt = require('../util/jwt');

const filterUrl = ['/mine', '/collection'];

module.exports = () => {
  return async function(ctx, next) {
    const accessToken = ctx.cookies.get('access_token');
    if (accessToken) {
      try {
        const userInfo = jwt.decode(accessToken);
        ctx.userInfo = userInfo;
      } catch (err) {
        ctx.redirect('/login');
      }
      await next();
    } else {
      if (filterUrl.indexOf(ctx.url) > -1) {
        ctx.redirect('/login');
      } else {
        await next();
      }
    }
  };
};