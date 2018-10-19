<template>
  <!-- 右侧边栏菜单 -->
  <div class="d-menu" :v-if="show">
    <van-cell-group>
      <van-cell is-link icon="user" to="/personal">个人信息</van-cell>
      <van-cell is-link icon="location" to="/address">地址信息</van-cell>
      <van-cell is-link icon="phone" to="/contact">联系人人信息</van-cell>
      <van-cell is-link icon="area" to="/area">行为监控</van-cell>
      <van-cell icon="quit" @click="quit">清除缓存</van-cell>
      <!-- <van-cell is-link icon="trail" to="/trail">轨迹回放</van-cell> -->
    </van-cell-group>
  </div>
</template>
<script>
import Cell from 'vant/lib/cell';
import CellGroup from 'vant/lib/cell-group';
import 'vant/lib/vant-css/cell.css';
export default {
  components: {
    'van-cell': Cell,
    'van-cell-group': CellGroup,
  },

  props: {
    show: false
  },

  methods: {
    quit() {
      this.$store.dispatch('CLEAR_APPLICATION_DATA').then(() => {
        this.$router.push('/firstin');
      });
    }
  },
};
</script>
<style lang="less" scoped>
  .d-menu{
    .px2rem(width, 400);
    .px2rem(right, 0);
    .px2rem(top, 0);
    .px2rem(bottom, 0);
    height: 100%;
    position: absolute;
    z-index: 1000;
    background-color: #fff;
  }
</style>
<style lang="less">
  .d-menu{
    .van-cell{
      .van-icon{
        color: #2db7f5;
      }
    }
  }
</style>


