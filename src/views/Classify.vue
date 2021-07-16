<template>
  <section class="classify">
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
import { mapActions, mapMutations, mapState } from 'vuex';
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
    ...mapState(['showContent', 'sideBarList']),
  },
  components: {
    OneTab,
    SideBar,
    GoodsList,
  },
  methods: {
    ...mapActions(['getGoodsList']),
    ...mapMutations(['resetGoodList']),
  },
  /**
   * 当数据加载完成后获取商品列表
   */
  watch: {
    showContent() {
      if (this.showContent) {
        this.resetGoodList();
        this.getGoodsList({
          type: this.sideBarList[0],
          page: 1,
          sort: 'all',
        });
      }
    },
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
