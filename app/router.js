
module.exports = app => {
  // app.beforeStart(async function(){
  //     await app.model.sync();
  // });
  //用户
  app.post('/hibeauty/api/login','user.login');
  app.get('/hibeauty/api/logout','user.logout');
  app.post('/hibeauty/api/register','user.register');
  app.get('/hibeauty/api/user/detail', 'user.detail');

  //相册图片相关接口
  app.get('/hibeauty/api/album', 'album.album');
  app.get('/hibeauty/api/album/:id', 'album.picture');
  
  app.get('(/.+)?', app.controller.app.index);
};
