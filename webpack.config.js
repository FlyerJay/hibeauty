'use strict';
const path = require('path');
module.exports = {
  egg: true,
  framework: 'vue',
  entry: {
    include: ['app/web/page'],
    exclude: ['app/web/page/[a-z]+/component', 'app/web/page/elementjs'],
    loader: {
      lessMixin: 'app/web/framework/vue/loader/less-mixin.js',
      client: 'app/web/framework/vue/entry/client-loader.js',
      server: 'app/web/framework/vue/entry/server-loader.js',
    }
  },
  alias: {
    server: 'app/web/framework/vue/entry/server.js',
    client: 'app/web/framework/vue/entry/client.js',
    app: 'app/web/framework/vue/app.js',
    asset: 'app/web/asset',
    component: 'app/web/component',
    framework: 'app/web/framework',
    store: 'app/web/store',
    vue: 'vue/dist/vue.js'
  },
  dll: ['vue', 'axios', 'vue-router', 'vuex', 'vuex-router-sync'],
  plugins: {
    serviceworker: true
  },
  loaders: {
    vue: {
      test: /\.vue$/,
      exclude: [/node_modules/],
      use: [
        'vue-loader',
        {
          loader: path.resolve(__dirname, './app/web/framework/loader/less-mixin.js'),
          options: {
            mixinPath: path.resolve(__dirname, './app/web/asset/style/mixin-px.less'),
          }
        },
      ]
    }
  },
  optimization: {},
  done() {
    console.log(this.loaders);
    console.log('如果启动成功后, Chrome控制台浏览器脚本报错, 可以尝试执行 npm run clean 清除缓存解决');
  }
};