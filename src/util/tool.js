function moveTo(start, end, dom, type) {
  const evnet = dom;
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
    evnet[type] = start + dis;
    if (Math.abs(dis) > Math.abs(end)) {
      clearInterval(time);
    }
  }, 2);
}

export default {
  moveTo,
};
