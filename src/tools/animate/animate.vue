<template>
  <section
  class="move-shopping-cart"
  v-if="!isVisible"
  :style="{
    width: `${width}px`,
    height: `${height}px`,
    opacity,
    transform: `translate(${moveX}px, ${moveY}px) scale(${scX}, ${scY})`,
  }">
    <img :src="src" alt="">
  </section>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
.move-shopping-cart {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  transition: all 0.5s;
  transform-origin: 0% 0%;
  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>
