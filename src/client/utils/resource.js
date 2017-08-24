import axios from 'axios';

const resource = (() => ({
  get: async (url, params) => {
    const res = await axios({ method: 'get', params, url });
    return res;
  },
  post: async (url, data) => {
    const res = await axios({ method: 'post', url, data });
    return res;
  }
}))();

export default resource;
