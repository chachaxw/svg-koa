import axios from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const instance = axios.create({
  baseURL: '/',
  timeout: 10000
});

instance.interceptors.response.use(
  response => {
    return response
  }, error => {
    return Promise.reject(error);
  }
);

Vue.prototype.$http = instance;
