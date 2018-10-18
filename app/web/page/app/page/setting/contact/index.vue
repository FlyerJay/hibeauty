<template>
  <div class="contact">
    <d-header></d-header>
    <h2>家庭联系人</h2>
    <van-cell-group>
      <van-field left-icon="like" v-model="personal.name" placeholder="姓名" :clearable="true"/>
      <van-field left-icon="more" v-model="personal.sex" placeholder="电话" :clearable="true"/>
    </van-cell-group>

    <h2>其他联系人</h2>
    <van-cell-group>
      <van-field left-icon="like" v-model="personal.name" placeholder="姓名" :clearable="true"/>
      <van-field left-icon="more" v-model="personal.sex" placeholder="电话" :clearable="true"/>
    </van-cell-group>
  </div>
</template>
<script>
import CellGroup from 'vant/lib/cell-group';
import Field from 'vant/lib/field';
import 'vant/lib/vant-css/cell.css';
import 'vant/lib/vant-css/field.css';
import Header from '../../../component/header';
export default {
  data() {
    return {
      personal: {
        name: '', // 姓名
        sex: '', // 性别
        age: '', // 年龄
        marry: '', // 婚姻状况
        health: '', // 健康状况
        job: '', // 职业状况
      }
    };
  },

  components: {
    'van-cell-group': CellGroup,
    'van-field': Field,
    'd-header': Header
  }
};
</script>
<style lang="less" scoped>
  .contact{
    background-color: #f7f7f7;
    height: 100%;
    h2{
      .px2rem(height, 100);
      .px2rem(line-height, 100);
      .px2rem(padding-left, 30);
      .px2rem(font-size, 28);
      color: #888;
    }
  }
</style>
<style lang="less">
  .contact{
    .van-field{
      .px2rem(height, 90);
      .px2rem(font-size, 26);
      .px2rem(line-height, 90);
      .van-icon{
        .px2rem(font-size, 32);
        .px2rem(margin-right, 30);
        color: #2db7f5;
        &.van-icon-clear{
          .px2rem(margin-right, 0);
        }
      }
      input{
        .px2rem(line-height, 45);
      }
    }
  }
</style>



