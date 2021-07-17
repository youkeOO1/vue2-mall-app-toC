<template>
  <section class="Tab-bar">
    <van-tabbar v-model="active" route fixed>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" :to="{ name: 'classify'}">分类</van-tabbar-item>
      <van-tabbar-item
      id="shopping-cart"
      icon="cart-o"
      :to="{name: 'shopping'}"
      :badge="badge"
      >
      购物车
      </van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </section>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    ...mapState(['counterMap']),
    badge() {
      let count = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
      if (count > 99) {
        count = '99+';
      }
      if (count < 1) {
        count = null;
      }
      return count;
    },
  },
};
</script>
