// 侧边栏二级导航
<template>
  <section class="sideBar" ref="sideBar">
    <div
    v-for="(item, i) in sideBarList " :key="item"
    :class="{active: index == i}"
    @touchend="scrollTo(i, $event)"
    @touchstart="move = false"
    @touchmove="move = true"
    >
      {{ i == 0 ? '全部' : item }}
    </div>
  </section>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import tool from '../util/tool';

export default {
  data() {
    return {
      index: 0,
      move: false,
    };
  },
  computed: {
    ...mapState(['sideBarList', 'goodsList']),
  },
  methods: {
    ...mapActions(['getGoodsList']),
    ...mapMutations(['resetGoodList']),
    scrollTo(i, e) {
      if (this.move) return;
      this.index = i;
      const { sideBar } = this.$refs;
      const itemTop = e.target.getBoundingClientRect().top;
      const itemHeight = e.target.offsetHeight;
      const warpperTop = sideBar.getBoundingClientRect().top;
      const warpperHeight = sideBar.offsetHeight;
      tool.moveTo(sideBar.scrollTop, itemTop + itemHeight / 2 - warpperTop - warpperHeight / 2, sideBar, 'scrollTop');
      this.resetGoodList();
      this.getGoodsList({
        type: this.sideBarList[i],
        page: 1,
        sort: 'all',
      });
    },
  },
  mounted() {
    this.resetGoodList();
    this.getGoodsList({
      type: this.sideBarList[0],
      page: 1,
      sort: 'all',
    });
  },
};
</script>
<style lang="less" scoped>
.sideBar{
  width: 79px;
  overflow: auto;
  position: fixed;
  left: 0;
  top: 135px;
  bottom: 50px;
  background: #f8f8f8;
  div{
    width: 79px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
  }
  &::-webkit-scrollbar {
    width: 0;
    background: none;
  }
  .active{
    font-weight: bold;
    color: #ff1a90;
  }
  .active::before {
    position: absolute;
    width: 6px;
    height: 18px;
    background-color: #ff1a90;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    content: "";
  }
}
</style>
