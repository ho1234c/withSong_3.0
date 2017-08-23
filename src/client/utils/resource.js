import axios from'axios';

const resource = (() => ({
  get: async (url, params) => { await axios({ method: 'get', params, url }); },
  post: async (url, data) => { await axios({ method: 'post', url, data }); }
}))();

export default resource;
