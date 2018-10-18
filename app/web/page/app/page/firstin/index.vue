<template>
  <div class="firstin">
    <d-header></d-header>

    <p class="newuser-tip">
      欢迎使用点滴守护，<br>
      作为新用户，请尽量完善你的基本信息
    </p>

    <van-cell-group>
      <van-cell is-link icon="more" to="/personal">个人信息</van-cell>
      <van-cell is-link icon="location" to="/address">地址信息</van-cell>
      <van-cell is-link icon="shopping-cart" to="/area">活跃区域</van-cell>
      <van-cell is-link icon="phone" to="/contact">联系人人信息</van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import Cell from 'vant/lib/cell';
import CellGroup from 'vant/lib/cell-group';
import Header from '../../component/header';
import 'vant/lib/vant-css/cell.css';
export default {
  data() {
    return {

    };
  },

  components: {
    'van-cell': Cell,
    'van-cell-group': CellGroup,
    'd-header': Header
  }
};
</script>
<style lang="less" scoped>
  .firstin{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #f8f8f8;

    .newuser-tip{
      .px2rem(font-size, 26);
      .px2rem(padding-left, 30);
      .px2rem(padding-right, 30);
      .px2rem(line-height, 40);
      .px2rem(margin-top, 60);
      .px2rem(margin-bottom, 20);
      color: #888;
    }
  }
</style>
<style lang="less">
  .firstin{
    .van-cell{
      .van-icon{
        color: #2db7f5;
      }
    }
  }
</style>



