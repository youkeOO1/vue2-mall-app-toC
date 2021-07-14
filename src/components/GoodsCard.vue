<template>
  <section class="goods-card">
    <div class="card-img">
      <img :src="images[0]" alt="">
    </div>
    <div class="card-content">
      <div class="title ellipsis">{{ title}}</div>
      <div class="desc ellipsis"> {{ desc }}</div>
      <div class="tags">
        <div v-for="item in tags" :key="item">{{ item }}</div>
      </div>
      <div class="price"> ${{ price }}</div>
      <div class="product-num">
        <div v-if="num" @touchend="changeNum(id, -1)">
          <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png" alt="">
        </div>
        <div v-if="num" class="num">{{ num }}</div>
        <div @touchend="changeNum(id, 1)">
          <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: ['images', 'tags', 'title', 'price', 'desc', 'id', 'num'],
  methods: {
    ...mapMutations(['storageChange']),
    changeNum(id, value) {
      console.log(id, value, 'click');
      this.storageChange({ id, value });
    },
  },
};
</script>

<style lang="less" scoped>
.goods-card {
  width: 100%;
  height: 100px;
  display: flex;
  .card-img {
    width: 90px;
    margin-right: 20px;
    img{
      width: 90px;
      height: 90px;
    }
  }
  .card-content {
    flex: 1;
    position: relative;
    > div {
      width: 170px;
    }
    .title{
      font-size:  13px;
      color: #1a1a1a;
      margin-top: 5px;
    }
    .desc{
      color: #aaa;
      font-size: 11px;
      margin-top: 5px;
    }
    .tags {
      display: flex;
      margin-top: 4px;
      > div{
        font-size: 10px;
        padding: 2px;
        color: #aaa;
        border: 1px solid #aaa;
        border-radius: 3px;
        margin-right: 5px;
      }
    }
    .price {
      color: #ff1a90;
      font-size: 14px;
      font-weight: 600;
      margin-top: 4px;
    }
    .product-num{
      position: absolute;
      right: 15px;
      bottom: 13px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      > div:not(.num) {
        width: 16px;
        height: 16px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .num {
        padding: 0 5px;
        height: 22px;
        line-height: 22px;
      }
    }
  }
  .ellipsis{
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
}
</style>
