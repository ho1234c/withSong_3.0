import axios from 'axios';

const resource = {
  get: async (url, params) => {
    const res = await axios({ method: 'get', params, url });
    return res;
  },
  post: async (url, data) => {
    const res = await axios({ method: 'post', url, data });
    return res;
  }
};

export function fetchList({ word, num }) {
  console.log(resource.get('/api/list', { word, num }));
  return resource.get('/api/list', { word, num });
}

export function fetchSong({ id }) {
  return resource.get('/api/list/song', { id });
}

export const auth = {
  login: ({ email, password }) => resource.post('/api/user/login', { email, password }),
  logout: () => resource.get('/api/user/logout'),
  register: ({ email, password, nickname }) =>
    resource.post('/api/user/create', { email, password, nickname })
};
