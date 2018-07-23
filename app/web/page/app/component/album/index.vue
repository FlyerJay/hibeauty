<template>
    <!-- 正式环境启用 -->
    <img class="album" :src="'http://i.snowyet.cc/static/images/' + cover" :alt="title" @click="viewAlbum">
    <!-- 开发阶段和谐一下图片 -->
    <!-- <img class="album" :src="'http://i.snowyet.cc/static/naruto.jpg'" :alt="title" @click.stop="viewAlbum"> -->
</template>
<script>
export default {
  props: ['albumI', 'cover', 'title', 'albumId'],
  data() {
    return {
      staticURI: 'http://i.snowyet.cc/static/images/',
      thumbnailList: []
    };
  },
  computed: {
    album() {
      return this.$store.state.album;
    }
  },
  methods: {
    viewAlbum() {
      this.$store.dispatch('FETCH_ALBUM_DETAIL', this.albumId).then(data => {
        this.$photoswipe.open(
          0,
          this.album.map(v => {
            return {
              src: this.staticURI + v.picUrl,
              w: v.width,
              h: v.height
            };
          })
        );
      });
    }
  }
};
</script>
<style scoped lang="less">
.album {
  float: left;
  width: 33%;
  .px2rem(margin-top, 5);
  &:nth-child(3n + 2),
  &:nth-child(3n) {
    margin-left: 0.5%;
  }
  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3) {
    .px2rem(margin-top, 0);
  }
}
</style>

