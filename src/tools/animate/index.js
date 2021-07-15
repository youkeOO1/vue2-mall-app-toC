import vue from 'vue';
import item from './animate.vue';
import store from '../../store/index';

const Animate = vue.extend(item);
export default function ({
  startX, startY, endX, endY, width, height, src, id, value,
}) {
  const app = new Animate({
    el: document.createElement('div'),
    data() {
      return {
        moveX: startX,
        moveY: startY,
        width,
        height,
        src,
        opacity: 1,
        scX: 1,
        scY: 1,
        isVisible: false,
        id,
        value,
      };
    },
  });
  document.body.appendChild(app.$el);
  // console.log(store.commit('ceshi'), 'animate');
  setTimeout(() => {
    app.moveX = endX;
    app.moveY = endY;
    app.scX = 0.1;
    app.scY = 0.1;
    app.opacity = 0;
  }, 0);
  setTimeout(() => {
    app.isVisible = true;
    store.commit('storageChange', { id: app.id, value: app.value });
  }, 600);
}
