<template>
  <section>
    <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" />
    <one-tab></one-tab>
  </section>
</template>
<script>
import OneTab from '../components/OneTab.vue';

export default {
  data() {
    return {
      value: '',
    };
  },
  components: {
    OneTab,
  },
};
</script>
