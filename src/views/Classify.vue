<template>
  <section class="classify">
    <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" />
    <one-tab></one-tab>
    <template v-if="showContent">
      <side-bar></side-bar>
      <goods-list></goods-list>
    </template>
    <van-loading type="spinner" vertical  v-else/>
  </section>
</template>
<script>
import { mapState } from 'vuex';
import OneTab from '../components/OneTab.vue';
import SideBar from '../components/SideBar.vue';
import GoodsList from '../components/GoodsList.vue';

export default {
  data() {
    return {
      value: '',
    };
  },
  computed: {
    ...mapState(['showContent']),
  },
  components: {
    OneTab,
    SideBar,
    GoodsList,
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
