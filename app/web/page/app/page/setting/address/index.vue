<template>
  <div class="address">
    <d-header></d-header>
    <van-cell-group>
      <van-field left-icon="location" v-model="address.home" placeholder="居住地址" :clearable="true"/>
      <van-field left-icon="more" v-model="address.security" placeholder="小区安保" :clearable="true"/>
      <van-field left-icon="browsing-history" v-model="address.type" placeholder="居住方式" :clearable="true"/>
    </van-cell-group>
    <van-cell-group>
      <van-field left-icon="location" v-model="address.company" placeholder="公司地址" :clearable="true"/>
      <van-field left-icon="checked" v-model="address.institution" placeholder="工作制度" :clearable="true"/>
      <d-datepicker left-icon="underway" v-model="address.start" placeholder="上班时间" :clearable="true"></d-datepicker>
      <d-datepicker left-icon="underway" v-model="address.end" placeholder="下班时间" :clearable="true"></d-datepicker>
    </van-cell-group>
  </div>
</template>
<script>
import CellGroup from 'vant/lib/cell-group';
import Field from 'vant/lib/field';
import 'vant/lib/vant-css/cell.css';
import 'vant/lib/vant-css/field.css';
import Header from '../../../component/header';
import DatePicker from '../../../component/datepicker';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      address: {
        home: '', // 居住地址
        security: '', // 小区安保
        type: '', // 居住方式
        company: '', // 公司地址
        institution: '', // 公司制度
        start: '', // 上班时间
        end: '' // 下班时间
      }
    };
  },

  computed: {
    ...mapState({
      _address: state => state.address
    })
  },

  mounted() {
    this.address = this._address;
  },

  components: {
    'van-cell-group': CellGroup,
    'van-field': Field,
    'd-header': Header,
    'd-datepicker': DatePicker
  },

  destroyed() {
    this.$store.commit('SAVE_ADDRESS', this.address);
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



