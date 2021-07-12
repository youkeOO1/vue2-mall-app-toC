import axios from '../await';

const getSideList = (type) => axios.get('/getsidebar', {
  params: {
    type,
  },
});

export default {
  getSideList,
};
