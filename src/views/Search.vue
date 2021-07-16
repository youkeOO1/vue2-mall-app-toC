<template>
  <main class="search-warp">
    <section class="search-heaher">
      <van-icon name="arrow-left" class="arr-left" @click="$router.goBack()" />
      <van-search
      class="search-content"
      v-model="value"
      :placeholder="place"
      clearable
      show-action
      @search="onSearch"
      @input="input"
      @focus="focus"
      autofocus
      >
      <template #action v-if="isLikeShow">
        <div @click="onSearch(value)">搜索</div>
      </template>
      <template #action v-else>
        <van-icon
          name="cart-o"
          id="shopping-cart"
          class="shop-car"
          :badge="badge"/>
      </template>
      </van-search>
    </section>
    <template v-if="likeList.length > 0 && isLikeShow">
      <section class="likeSearch-content">
        <van-list>
          <van-cell v-for="item in likeList" :key="item" @click="onSearch(item)" >
            <template>
              <span class="custom-title" v-html="formatHTML(item)"></span>
            </template>
          </van-cell>
        </van-list>
      </section>
    </template>
    <template v-if="goodsList.length > 0 && !isLikeShow">
      <section class="goodList-content">
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
      </section>
    </template>
    <template v-if="isLikeShow && likeList.length === 0">
      <section class="history-content">
        <history :historyList="historyList" @search="onSearch"></history>
      </section>
    </template>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import api from '../api/index';
import GoodsCard from '../components/GoodsCard.vue';
import History from '../components/History.vue';

export default {
  data() {
    return {
      value: '',
      likeList: [],
      time: null,
      finished: false,
      loading: false,
      place: '酒',
      goodsList: [],
      page: 1,
      size: 5,
      isLikeShow: true,
      historyList: [],
    };
  },
  computed: {
    ...mapState(['counterMap']),
    /** 购物车商品数量 */
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
  components: {
    GoodsCard,
    History,
  },
  methods: {
    /**
     * 加载数据
     */
    async onLoad() {
      this.loading = true;
      this.finished = false;
      const { list, total } = await api.search(this.value, this.page, this.size);
      this.goodsList = [...this.goodsList, ...list];
      console.log(this.goodsList);
      this.loading = false;
      if (this.goodsList.length >= total) {
        this.finished = true;
      } else {
        this.page += 1;
      }
    },
    /**
     * 搜索
     */
    onSearch(value) {
      /**
       * 用户将模糊搜索值传递过来
       * 用户不适用模糊搜索直接进行搜索
       * 搜索值确定将其模糊值置为空
       * 将搜索值保存起来
       * 添加历史记录功能
       * 当用户进行搜索时，将其搜索值保存下来格式为[{value: string, time: date}]
       * 当搜索值已存在数组中，更新其time属性，对数组进行重新排序按照时间的大小进行排序
       * 只保存10条搜索记录
       * 当满足十条记录时，将数组最后一位删除，在数组开头添加新记录
       */
      if (value) {
        this.value = value;
      } else {
        this.value = this.place;
      }
      const result = this.historyList.find((ele) => ele.value === this.value);
      if (result) {
        result.time = new Date().getTime();
        this.historyList.sort((a, b) => b.time - a.time);
      } else {
        this.historyList.unshift({
          value: this.value,
          time: new Date().getTime(),
        });
        if (this.historyList.length >= 10) {
          this.historyList.pop();
        }
      }
      this.likeList = [];
      this.goodsList = [];
      this.isLikeShow = false;
      this.onLoad();
      localStorage.setItem('history', JSON.stringify(this.historyList));
    },
    /**
     * 用户输入进行模糊搜索
     */
    async input(value) {
      /**
       * 当用户啥都没有输入就搜索
       * 设置防抖
       */
      if (value === '') {
        this.likeList = [];
        return false;
      }
      if (this.time) {
        clearTimeout(this.time);
        this.time = null;
      } else {
        this.time = setTimeout(async () => {
          const { result } = await api.likeSearch(value);
          console.log(result);
          this.likeList = result;
          clearTimeout(this.time);
          this.time = null;
        }, 300);
      }
      return true;
    },
    /**
     *输入框获得焦点时触发
     */
    focus() {
      this.isLikeShow = true;
    },
    /**
     * 格式化模糊搜索的结果
     * 突出显示模糊搜索词
     */
    formatHTML(item) {
      const reg = RegExp(this.value, 'g');
      return item.replace(reg, this.value.fontcolor('red'));
    },
  },
  created() {
    this.historyList = JSON.parse(localStorage.getItem('history'));
  },

};
</script>

<style lang="less" scoped>
.search-warp{
  width: 100%;
  height: 100vh;
  background: #fff;
  position: relative;
  z-index: 10;
  .search-heaher{
    width: 345px;
    background: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 15px;
    z-index: 22;
    .arr-left {
      font-size: 22px;
    }
    .search-content {
      flex: 1;
    }
  }
  .likeSearch-content {
    position: relative;
    top: 50px;
    padding-left: 33px;
    box-sizing: border-box;
  }
  .goodList-content {
    position: relative;
    top: 50px;
    width: 345px;
    margin: 0 auto;
    background: #fff;
    z-index: 10;
  }
  .history-content{
    position: absolute;
    top: 50px;
    left: 10px;
    width: 350px;
    z-index: 1;
  }
}
</style>
