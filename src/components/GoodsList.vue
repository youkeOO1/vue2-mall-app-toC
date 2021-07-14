<template>
  <section class="goodsList">
    <div class="list-header van-hairline--top-bottom">
      <div @click="changeType('all')" :class="{active: sort === 'all'}">综合</div>
      <div @click="changeType('sale')" :class="{active: sort === 'sale'}">销量</div>
      <div
      class="sort-price"
      @click="changeType('price')"
      :class="{
        'price-up': sort === 'price-up',
        'price-down': sort === 'price-down'
      }"
      >
      价格
      </div>
    </div>
    <div class="list-content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check= "false"
        >
          <goods-card
          v-for="item in goodsList" :key="item.id"
          v-bind="item"
          :num="counterMap[item.id]"
          ></goods-card>
        </van-list>
      </van-pull-refresh>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import GoodsCard from './GoodsCard.vue';

export default {
  data() {
    return {
      refreshing: false, // 下拉刷新-是否处于加载中状态
      loading: false, // 重新加载数据-是否处于加载状态，加载过程中不触发load事件
      finished: false, // 重新加载数据-是否已加载完成，加载完成后不再触发load事件
      sort: 'all',
      page: 1,
    };
  },
  computed: {
    ...mapState(['goodsList', 'type', 'counterMap']),
  },
  components: {
    GoodsCard,
  },
  methods: {
    ...mapMutations(['resetGoodList']),
    ...mapActions(['getGoodsList']),
    /**
     * 下拉刷新
     */
    onRefresh() {
      console.log('下拉刷新');
      this.refreshing = true;
      this.loading = false;
      this.finished = false;
      this.page = 1;
      this.resetGoodList();
      this.getGoodsList({
        type: this.type,
        page: this.page,
        sort: this.sort,
      });
      this.refreshing = false;
    },
    /**
     * 滚动条与底部距离小于 offset 时触发
     */
    async onLoad() {
      console.log('重加加载数据');
      this.refreshing = false;
      this.loading = true;
      this.page += 1;
      const isTrue = await this.getGoodsList({
        type: this.type,
        page: this.page,
        sort: this.sort,
      });
      console.log(isTrue);
      if (isTrue) {
        this.loading = false;
      } else {
        this.finished = true;
      }
    },
    changeType(type) {
      if (type === 'all') {
        this.sort = 'all';
      } else if (type === 'sale') {
        this.sort = 'sale';
      } else if (this.sort === 'price-up') {
        this.sort = 'price-down';
      } else {
        this.sort = 'price-up';
      }
      this.onRefresh();
    },
  },
};
</script>

<style lang="less" scoped>
.goodsList{
  .list-header{
    width: 296px;
    position: relative;
    left: 79px;
    display: flex;
    justify-content: flex-end;
    padding: 0 8px;
    box-sizing: border-box;
    > div{
      width: 50px;
      height: 25px;
      text-align: center;
      line-height: 25px;
      color: #cecece;
      position: relative;
    }
    .active, .price-up, .price-down {
      color: #ff1a90;
      font-weight: bold;
    }
    .sort-price::after {
      content: "";
      border: 4px solid transparent;
      border-top-color: #aaa;
      position: absolute;
      top: 7px;
      right: 0;
    }
    .sort-price::before {
      content: "";
      border: 4px solid transparent;
      border-bottom-color: #aaa;
      position: absolute;
      bottom: 7px;
      right: 0;
    }
    .price-up::before {
      border-bottom-color: #ff1a90;
    }
    .price-down::after {
      border-top-color: #ff1a90;
    }
  }
  .list-content{
    width: 296px;
    position: fixed;
    right: 0;
    top: 170px;
    bottom: 50px;
    overflow: auto;
  }
}
</style>
