import MainLayout from './main';

const tpl = '<div id="app"><MainLayout><div slot="main"><slot></slot></div></MainLayout></div>';

export default {
  name: 'Layout',
  props: [ 'title', 'description', 'keywords' ],
  components: {
    MainLayout
  },
  computed: {
    vTitle() {
      return this.$root.title || this.title || 'SnowYet-做专业的技术社区';
    },
    vKeywords() {
      return this.$root.keywords || this.keywords || 'snowyet,雪依旧,tatel Zhang,论坛,编辑器';
    },
    vDescription() {
      return this.$root.description || this.description || 'snowyet-做专业的技术社区';
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
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <script src="http://www.snowyet.cc/static/js/flexible.js"></script>
    <script src="//at.alicdn.com/t/font_673098_txa1c6d666pkqpvi.js"></script>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    </head>
    <body :class="baseClass">
    ${tpl}
    </body>
  </html>`
};
