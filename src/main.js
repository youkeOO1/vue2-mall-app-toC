import Vue from 'vue';
// 引入移动端组件库
import Vant from 'vant';
import App from './App.vue';
import router from './router';
import store from './store';
// 手机端适配
import 'lib-flexible';
// 引入移动端组件库样式文件
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
