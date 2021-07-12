<template>
  <section class="classify">
    <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" />
    <one-tab></one-tab>
    <side-bar></side-bar>
  </section>
</template>
<script>
import OneTab from '../components/OneTab.vue';
import SideBar from '../components/SideBar.vue';

export default {
  data() {
    return {
      value: '',
    };
  },
  components: {
    OneTab,
    SideBar,
  },
};
</script>
<style lang="less" scoped>
.classify{
  .van-search {
    padding-bottom: 0;
  }
}
</style>
