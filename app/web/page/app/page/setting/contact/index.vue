<template>
  <div class="contact">
    <d-header></d-header>
    <h2>家庭联系人</h2>
    <van-cell-group>
      <van-field left-icon="user" v-model="contact.home.name" placeholder="姓名" :clearable="true"/>
      <van-field left-icon="phone" v-model="contact.home.phone" placeholder="电话" :clearable="true"/>
    </van-cell-group>

    <h2>其他联系人</h2>
    <van-cell-group>
      <van-field left-icon="user" v-model="contact.other.name" placeholder="姓名" :clearable="true"/>
      <van-field left-icon="phone" v-model="contact.other.phone" placeholder="电话" :clearable="true"/>
    </van-cell-group>
  </div>
</template>
<script>
import CellGroup from 'vant/lib/cell-group';
import Field from 'vant/lib/field';
import 'vant/lib/vant-css/cell.css';
import 'vant/lib/vant-css/field.css';
import Header from '../../../component/header';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      contact: {
        home: {
          name: '',
          phone: ''
        },
        other: {
          name: '',
          phone: ''
        }
      }
    };
  },

  computed: {
    ...mapState({
      _contact: state => state.contact
    })
  },

  mounted() {
    this.contact = this._contact;
  },

  components: {
    'van-cell-group': CellGroup,
    'van-field': Field,
    'd-header': Header
  },

  destroyed() {
    this.$store.commit('SAVE_CONTACT', this.contact);
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



