<template>
  <div class="share">分享测试</div>
</template>
<script>
  import axios from 'axios';
  const wxConfig = {
    title: '戒易花', // 分享标题
    desc: '送你一张优惠券', // 分享描述
    link: 'http://i.snowyet.cc', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: '', // 分享图标
    type: 'link', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
  };
  const jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone'];
  export default {
    data() {
      return {

      };
    },

    mounted() {
      axios.get('/hibeauty/api/wxsign', { url: '' }).then(rs => {
        const config = Object.assign({}, rs.data, { jsApiList, debug: true });
        wx.config(config);
      });

      wx.ready(() => {
        this.wxShare();
      })
    },

    methods: {
      wxShare() {
        wx.onMenuShareTimeline(wxConfig);
        wx.onMenuShareAppMessage(wxConfig);
        wx.onMenuShareQQ(wxConfig);
        wx.onMenuShareQZone(wxConfig);
      },
    }
  };
</script>

