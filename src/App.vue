<template>
  <div id="app">
    <van-button type="primary">主要按钮</van-button>
    <router-view/>
  </div>
</template>

<style lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  #app {
    width: 750px;
    height: 50px;
    background: red;
  }
</style>
