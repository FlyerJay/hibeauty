import MainLayout from './main';

const tpl = '<div id="app"><div class="page-container"><slot></slot></div></div>';

export default {
  name: 'Layout',
  props: [ 'title', 'description', 'keywords' ],
  components: {
    MainLayout
  },
  computed: {
    vTitle() {
      return this.$root.title || this.title || '点滴守护-基于个人行为数据进行AI深度学习的生命安全预警产品';
    },
    vKeywords() {
      return this.$root.keywords || this.keywords || '点滴守护,个人行为数据,AI深度学习,生命安全预警';
    },
    vDescription() {
      return this.$root.description || this.description || '点滴守护-基于个人行为数据进行AI深度学习的生命安全预警产品';
    },
    baseClass() {
      return this.$root.baseClass;
    }
  },
  template: typeof window === 'object' ? tpl : `<!DOCTYPE html>
  <html lang="en">
    <head>
    <title>{{vTitle}}</title>
    <meta name="keywords" :content="vKeywords">
    <meta name="description" :content="vDescription">
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">
    <meta http-equiv="Cache-Control" content="no-transform "/>
    <meta name="format-detection" content="telephone=no, address=no">
    <meta name="apple-touch-fullscreen" content="yes" >
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="x5-fullscreen" content="true">
    <meta name="full-screen" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <script src="http://i.snowyet.cc/static/js/flexible.js"></script>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    <link href="//at.alicdn.com/t/font_876244_fp56w0rgzh.css" rel="stylesheet"/>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" rel="stylesheet"/>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=3bgputczmGg6qfykGa3DX68BAijgstuP"></script>
    </head>
    <body :class="baseClass">
    ${tpl}
    </body>
  </html>`
};
