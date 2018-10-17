<template>
  <div class="index">
    <header>
      <div class="title">点滴守护</div>
      <i class="iconfont icon-add" @click="goMap"></i>
    </header>

    <div class="defend-btn-wrapper" :class="{'active': isOpen}">
      <button @click="changeOpenState">
        <span v-if="isOpen">
          守护中
        </span>
        <span v-else>
          开启
        </span>
      </button>
    </div>

    <aside>
      <p v-if="isOpen">保持应用开启，有助于更好地预警你的安全状态</p>
      <p v-else>即刻开启点滴守护，预警你的安全状态</p>
    </aside>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  components: {
  },
  preFetch({ state, dispatch, commit }) {
    // return Promise.all([dispatch('FETCH_ALBUM_LIST', { page: this.page })]);
  },
  mounted() {
  },
  methods: {
    changeOpenState() {
      this.isOpen = !this.isOpen;
    },

    goMap() {
      this.$router.push('/bmap');
    }
  }
};
</script>
<style scoped lang="less">
  header{
    .px2rem(height, 100);
    .px2rem(line-height, 100);
    text-align: center;
    .px2rem(font-size, 32);
    position: relative;
    background-color: #2db7f5;
    color: #fff;
    .iconfont{
      position: absolute;
      .px2rem(right, 30);
      .px2rem(top, 0);
      font-weight: bold;
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
</style>
