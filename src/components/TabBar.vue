<template>
  <section class="Tab-bar">
    <van-tabbar v-model="active" route fixed>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" :to="{ name: 'classify'}">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" :to="{name: 'shopping'}">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </section>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>
