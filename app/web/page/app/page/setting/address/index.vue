<template>
  <div class="address">
    <d-header></d-header>
    <van-cell-group>
      <van-field left-icon="location" v-model="address.name" placeholder="居住地址" :clearable="true"/>
      <van-field left-icon="more" v-model="address.sex" placeholder="小区安保" :clearable="true"/>
      <van-field left-icon="browsing-history" v-model="address.age" placeholder="居住方式" :clearable="true"/>
    </van-cell-group>
    <van-cell-group>
      <van-field left-icon="location" v-model="address.marry" placeholder="公司地址" :clearable="true"/>
      <van-field left-icon="checked" v-model="address.health" placeholder="工作制度" :clearable="true"/>
      <van-field left-icon="underway" v-model="address.job" placeholder="上班时间" :clearable="true"/>
      <van-field left-icon="underway" v-model="address.job" placeholder="下班时间" :clearable="true"/>
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
      address: {
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
  .address{
    background-color: #f7f7f7;
    height: 100%;
  }
</style>
<style lang="less">
  .address{
    .van-cell-group{
      .px2rem(margin-top, 20);
    }
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



