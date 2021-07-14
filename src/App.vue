<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations(['setCounterMap']),
  },
  created() {
    console.log(localStorage.getItem('goods'), 'parse');
    const counterMap = JSON.parse(localStorage.getItem('goods')) || {};
    this.setCounterMap(counterMap);
  },
};
</script>
<style lang="less">

</style>
