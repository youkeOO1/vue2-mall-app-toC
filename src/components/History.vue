<template>
  <section class="history-wrapper">
    <h4 >历史记录：</h4>
    <div
    class="history-item"
    v-for="item in historyList" :key="item.time"
    @click="search(item.value)
    ">
      {{ item.value }}
    </div>
  </section>
</template>

<script>
export default {
  props: {
    historyList: {
      default() {
        return [];
      },
    },
  },
  methods: {
    search(value) {
      this.$emit('search', value);
    },
  },
};
</script>

<style lang="less" scoped>
.history-item{
  display: inline-block;
  padding: 15px;
  background: #eee;
  border-radius: 10px;
  margin-left: 10px;
  margin-bottom: 10px;

}
</style>
