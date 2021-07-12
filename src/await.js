import axios from 'axios';

const appkey = 'youkeOO1_1624003094702';
const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/goods',
  params: {
    appkey,
  },
});
instance.interceptors.response.use((user) => user.data);
export default instance;
