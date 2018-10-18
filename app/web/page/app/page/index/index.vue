<template>
  <div class="index">
    <div class="wrapper" ref="wrapper" :class="{ 'show-menu': isMenu }">
      <d-header :nextBtn="true" :onNextBtnClick="toggleMenu"></d-header>

      <div class="defend-btn-wrapper" :class="{'active': opendefence}">
        <button @click="changeOpenState">
          <span v-if="opendefence">
            守护中
          </span>
          <span v-else>
            开启
          </span>
        </button>
      </div>

      <aside>
        <p v-if="opendefence">保持应用开启，有助于更好地预警你的安全状态</p>
        <p v-else>即刻开启点滴守护，预警你的安全状态</p>
      </aside>
    </div>
    <transition name="drawer">
      <d-menu v-show="isMenu"></d-menu>
    </transition>
  </div>
</template>
<script>
import Header from '../../component/header';
import Menu from '../../component/menu';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      opendefence: false,
      isMenu: false
    };
  },

  computed: {
    ...mapState({
      _opendefence: state => state.opendefence
    })
  },

  components: {
    'd-header': Header,
    'd-menu': Menu,
  },

  mounted() {
    this.opendefence = this._opendefence;
  },

  methods: {
    changeOpenState() {
      this.opendefence = !this.opendefence;
      this.$store.commit('CHANGE_DEFENCE_STATE', this.opendefence);
    },

    toggleMenu() {
      this.isMenu = !this.isMenu;
    }
  }
};
</script>
<style scoped lang="less">
  .index{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #f7f7f7;
    .wrapper{
      transition: all .3s ease;
      &.show-menu{
        transform: translateX(-200px);
      }
      .iconfont{
        transition: all .3s ease;
        display: inline-block;
      }
    }
  }

  .defend-btn-wrapper{
    .px2rem(width, 300);
    .px2rem(height, 300);
    .px2rem(line-height, 300);
    margin: 0 auto;
    .px2rem(margin-top, 300);
    .px2rem(border-radius, 150);
    overflow: hidden;
    box-shadow: 1px 1px 30px #888;
    button{
      border: none;
      outline: none;
      background-color: #fff;
      width: 100%;
      height: 100%;
      .px2rem(font-size, 48);
      
    }
    &.active{
      box-shadow: 1px 1px 50px #888;
      button{
        background-color: #2db7f5;
        color: #fff;
      }
    }
  }

  aside{
    .px2rem(margin-top, 50);
    .px2rem(font-size, 28);
    text-align: center;
    color: #2db7f5;
  }

  .slideInRight{
    animation: slideInRight .3s ease;
  }

  .slideOutRight{
    animation: slideOutRight .3s ease;
  }

  .drawer-enter-active{
    .slideInRight;
  }

  .drawer-leave-active{
    .slideOutRight;
  }
</style>
<style lang="less">
  .index{
    .wrapper{
      &.show-menu{
        .iconfont{
          
          transform: rotate(45deg);
        }
      }
    }
  }
</style>

