<template>
  <section class="classify">
    <!-- <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" /> -->
    <router-link to="/search" tag="div" class="search-warp">
      <van-icon name="search" />
      <p>苹果特价1元1斤</p>
    </router-link>
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
  .search-warp{
    width: 355px;
    height: 33px;
    background: #EEEEEE;
    border-radius: 10px;
    color: #a1a1a1;
    font-size: 14px;
    margin: 11px auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
