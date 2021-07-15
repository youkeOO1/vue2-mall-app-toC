import axios from '../await';

const getSideList = (type) => axios.get('/getsidebar', {
  params: {
    type,
  },
});
/**
 * 获取商品列表
 * @param {*} type 商品名称
 * @param {*} page  页码
 * @param {*} size  每页多少条数据
 * @param {*} sort  数据排序方式
 * @returns
 */
const getGoodsList = (type, page, size, sort) => axios.get('/getGoodsList', ({
  params: {
    type,
    page,
    size,
    sort,
  },
}));
/**
 * 模糊搜索
 */
const likeSearch = (likeValue) => axios.get('/likeSearch', ({
  params: {
    likeValue,
  },
}));
/**
 * 搜索商品
 */
const search = (type, page, size) => axios.get('/search', {
  params: {
    type,
    page,
    size,
  },
});

export default {
  getSideList,
  getGoodsList,
  likeSearch,
  search,
};
