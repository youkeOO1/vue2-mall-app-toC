<template>
  <section class="OneTab-warp" ref="oneTab">
    <div class="tab-item"
    v-for="(menu, i) in menuList" :key="menu.title"
    :class="{active: i === index}"
    @touchend="scrollTo(i, $event)"
    @touchstart="move = false"
    @touchmove="move = true"
    >
    <div class="img-warp">
      <img :src="menu.imgURL" alt="">
    </div>
    <div class="tab-title">{{ menu.title }}</div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      move: false,
      index: 1,
      menuList: [
        {
          title: '时令水果',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg',
        },
        {
          title: '酒水冲调',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg',
        },
        {
          title: '安心乳品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg',
        },
        {
          title: '休闲零食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg',
        },
        {
          title: '肉蛋食材',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg',
        },
        {
          title: '新鲜蔬菜',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg',
        },
        {
          title: '熟食餐饮',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg',
        },
        {
          title: '海鲜水产',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg',
        },
        {
          title: '粮油调味',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg',
        },
        {
          title: '某手美食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg',
        },
        {
          title: '纸杯清洁',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg',
        },
        {
          title: '个人护理',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg',
        },
        {
          title: '美妆护肤',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg',
        },
        {
          title: '家居收纳',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg',
        },
        {
          title: '家用电器',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg',
        },
        {
          title: '3C数码',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg',
        },
        {
          title: '母婴用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg',
        },
        {
          title: '鲜花绿植',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg',
        },
        {
          title: '宠物用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg',
        },
        {
          title: '图书玩具',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg',
        },
        {
          title: '手表配饰',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg',
        },
      ],
    };
  },
  methods: {
    /**
     * 计算滚动值
     * @param {Number} i 索引值
     * @param {event} e 事件源
      */
    scrollTo(i, e) {
      if (this.move) return false;
      this.index = i;
      const { oneTab } = this.$refs;
      const itemWidht = e.target.offsetWidth;
      const itemLeft = e.target.getBoundingClientRect().left;
      const warpperWidth = oneTab.offsetWidth;
      this.moveTo(oneTab.scrollLeft, itemWidht / 2 + itemLeft - warpperWidth / 2);
      return true;
    },
    /**
     * 移动到某一点
     * @param {Number} start 起点
     * @param {Number} end 终点
     */
    moveTo(start, end) {
      // 移动距离
      let dis = 0;
      // 移动速度
      let speed = 5;
      //  当需要往右运动 也就是在滚动条中心线左侧，需要往右侧滚动才能到中心线
      if (end < 0) {
        speed *= -1;
      }
      const time = setInterval(() => {
        dis += speed;
        this.$refs.oneTab.scrollLeft = start + dis;
        if (Math.abs(dis) > Math.abs(end)) {
          clearInterval(time);
        }
      }, 2);
    },
  },
};
</script>

<style lang="less" scoped>
.OneTab-warp{
  width:375px;
  height: 104px;
  display: flex;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  .tab-item{
    width: 50px;
    height: 70px;
    padding: 10px 5px;
    .img-warp {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid #fff;
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
    }
    .tab-title{
      font-size: 12px;
      margin-top: 5px;
      text-align: center;
    }
    &.active{
      .img-warp {
        border-color: #d13193;
      }
      .tab-title {
        color: #fff;
        background: #d13193;
        font-weight: bold;
        border-radius: 30px;
      }
    }
  }
}
</style>
