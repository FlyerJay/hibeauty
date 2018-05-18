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
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    </head>
    <body :class="baseClass">
    ${tpl}
    </body>
  </html>`
};
