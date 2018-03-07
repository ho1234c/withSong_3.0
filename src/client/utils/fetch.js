import axios from 'axios';
import { URL } from '../config';

const fetch = {
  get: async (url, params) => {
    const res = await axios({ method: 'get', params, url });
    return res;
  },
  post: async (url, data) => {
    const res = await axios({ method: 'post', url, data });
    return res;
  }
};

export const resource = {
  getAlbum: ({ word, num }) => fetch.get(URL.GET_ALBUM, { word, num }),
  getSong: ({ id }) => fetch.get(URL.GET_SONG, { id })
};

export const auth = {
  login: ({ email, password }) => fetch.post(URL.LOGIN, { email, password }),
  logout: () => fetch.get(URL.LOGOUT),
  register: ({ email, password, nickname }) => fetch.post(URL.REGISTER, { email, password, nickname }),
  session: ({ userId }) => fetch.get(URL.SESSION, { userId })
};
