
module.exports = app => {
  // app.beforeStart(async function(){
  //     await app.model.sync();
  // });
  //用户
  app.get('/app/api/login','user.login');
  app.get('/app/api/register','user.register');

  //相册图片相关接口
  app.get('/app/api/album', 'album.album');
  app.get('/app/api/album/:id', 'album.picture');
  
  app.get('(/.+)?', app.controller.app.index);
};