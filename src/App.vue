<template>
  <div id="app">
    <transition :name="transitionName" :mode="$router.back ? 'out-in' : 'in-out'">
      <router-view class="view"/>
    </transition>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      transitionName: 'left',
    };
  },
  methods: {
    ...mapMutations(['setCounterMap']),
  },
  created() {
    console.log(localStorage.getItem('goods'), 'parse');
    const counterMap = JSON.parse(localStorage.getItem('goods')) || {};
    this.setCounterMap(counterMap);
  },
  watch: {
    $route(to, from) {
      if (to.name === 'classify' && from.name === 'search') {
        this.$router.back = true;
      }
      if (this.$router.back) {
        this.transitionName = 'right';
      } else {
        this.transitionName = 'left';
      }
      this.$router.back = false;
    },
  },
};
</script>
<style lang="less">
  .view {
    transition: all .3s linear;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .left-enter {
    transform: translate(100%, 0);
  }
  .right-leave-to {
    transform: translate(100%, 0);
  }
</style>
