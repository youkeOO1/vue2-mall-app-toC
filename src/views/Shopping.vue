<template>
  <main class="shopping-wrapper">
    <section class="header-nav">
      <van-nav-bar title="购物车" right-text="删除" @click-right="dell" />
    </section>
    <section class="card-list" v-if="list.length > 0">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <div class="card-box" v-for="item in list" :key="item.id">
          <van-checkbox class="check" :name="item.id"></van-checkbox>
          <goods-card
          v-bind="item"
          :num="counterMap[item.id]"
          :nofly="true"
          ></goods-card>
        </div>
      </van-checkbox-group>
    </section>
    <section class="card-no" v-else>
      <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/shopping_bg.jpg" alt="">
    </section>
    <section class="bootm-submit">
      <van-submit-bar :price="totalPrice" :button-text="`提交订单(${totalNum})`" @submit="onSubmit">
        <van-checkbox v-model="checked"  @click="checkAll">全选</van-checkbox>
      </van-submit-bar>
    </section>
  </main>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import { Toast, Dialog } from 'vant';
import api from '../api/index';
import GoodsCard from '../components/GoodsCard.vue';

export default {
  data() {
    return {
      result: [],
      price: 0,
      checked: false,
      list: [],
    };
  },
  components: {
    GoodsCard,
  },
  computed: {
    ...mapState(['counterMap']),
    totalNum() {
      /**
       * 计算所购买商品的数量
       * 添加进购物车不代表要购买
       * 先获取那些商品被选中，通过this.result保存的是被选中的商品id
       * 将选中的商品进行进行叠加，可以通过id在counterMap中查找购买数量
       */
      const checkArr = this.list.filter((ele) => this.result.includes(ele.id));
      const count = checkArr.reduce((prev, next) => prev + this.counterMap[next.id] || 0, 0);
      return count;
    },
    totalPrice() {
      /**
       * 计算所购买商品的总价钱
       * 先获取this.list 商品中那些被选中啦，将其过滤出来
       * 将过滤出来的商品进行叠加
       */
      const checkArr = this.list.filter((ele) => this.result.includes(ele.id));
      const price = checkArr.reduce((prev, next) => {
        /**
         * 先获取该商品的数量
         * 在乘上该商品的单价
         */
        const count = this.counterMap[next.id];
        return prev + count * next.price * 100;
      }, 0);
      return price;
    },
  },
  methods: {
    ...mapMutations(['storageChange']),
    async getDateAll() {
      /**
       *  获取添加到购物车商品， 商品id与购买的商品数量 都存在 vuex的counterMap中
       *  将counterMap 中的key值全部提取数来存于数组中，获取商品的api接口可以添加多个商品id值
       */
      const key = Object.keys(this.counterMap);
      const res = await api.getGoodsByIds(key.join());
      this.list = res.list;
    },
    /**
     * 删除
     */
    async dell() {
      /**
       * 删除选中的商品
       * 当用户没有选中一个商品，就单击删除，啥也不干 直接return
       * 获取选中商品，可能是多个 故选择遍历
       * 当用户想要删除商品时，可能是手误，需要弹出提示框，当用户确认删除才可以删除
       * 缓存中删除：
       * 将其 counterMap 对应的商品数量修改为负值 会从本地存储中删除
       * 页面上删除：
       * 将其this.list 过滤掉已经删除的数组
       */
      if (this.result.length === 0) {
        Toast('请选择商品');
        return;
      }
      try {
        await Dialog.confirm({
          message: '是否删除选中的商品',
        });
        this.result.forEach((ele) => {
          this.storageChange({
            id: ele,
            value: -Infinity,
          });
          this.list = this.list.filter((e) => !this.result.includes(e.id));
        });
      } catch {
        Toast('用户取消删除');
      }
    },
    checkAll() {
      /**
       * 全选商品
       * 当购物车没有商品 提示出购物车为空
       * 当前this.list 为空说明没有商品，就禁止选中
       */
      if (this.list.length === 0) {
        Toast('请添加商品');
        this.checked = false;
        return;
      }
      const { checkboxGroup } = this.$refs;
      if (this.checked) {
        checkboxGroup.toggleAll(true);
      } else {
        checkboxGroup.toggleAll(false);
      }
    },
    onSubmit() {
      /**
       * 提交
       * 当前没有选中任何效果不能提交
       */
      if (this.result.length === 0) {
        Toast('没有选择任何商品');
        return;
      }
      /**
       * 提交成功后
       * 将已提交的商品删除，从页面上
       * 将已提交的商品从本地缓存中删除
       * 将商品选中状态置空
       */
      this.list = this.list.filter((ele) => !this.result.includes(ele.id));
      this.result.forEach((ele) => this.storageChange({
        id: ele,
        value: -Infinity,
      }));
      this.result = [];
      console.log(this.list, 'list');
      console.log(this.counterMap, 'map');
      console.log(this.result, 'result');
    },
  },
  created() {
    /**
     * 加载数据
     */
    this.getDateAll();
  },
  watch: {
    /**
     * 监听是否真的全选
     * 当用户没有点击全选，将商品全部选上 开启全选状态
     * 当用户点击全选后，取消一个商品的选中 关闭全选状态
     */
    result() {
      if (this.result.length === this.list.length && this.list.length !== 0) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
    counterMap() {
      /**
       * 当商品数量少于1 会将本地缓存中删除，但不会删除页面的商品信息
       * 当用户将商品的数量减为0 将其从this.list中删除
       * 商品的选中效果也要置空
       */
      const ids = Object.keys(this.counterMap) || [];
      this.list = this.list.filter((ele) => ids.includes(ele.id.toString()));
      this.result = this.result.filter((e) => ids.includes(e.id));
    },
  },
};
</script>
<style lang="less" scoped>
.shopping-wrapper {
  background: #eee;
  height: 92vh;
  height: 100vh;
  position: relative;
  // z-index: 10;
  .header-nav{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .card-list{
    position: absolute;
    top: 47px;
    background: #fff;
    z-index: 0;
    padding: 10px 10px 100px 10px;
    box-sizing: border-box;
    width: 100%;
    .card-box{
      display: flex;
      justify-content: center;
      .check {
        margin-right: 10px;
        flex-shrink: 0;
      }
    }
  }
  .card-no {
    width: 100%;
    position: absolute;
    top: 47px;
    height: calc(100% - 145px);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .van-submit-bar {
    bottom: 50px;
  }
}
</style>
