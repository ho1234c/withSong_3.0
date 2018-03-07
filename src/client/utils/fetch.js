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

function fetchCreator(url) {
  return ({ ...params }) => fetch.get(url, { ...params });
}

/**
 * getAlbum
 * @param {number} id
 * @param {string} word
 * getSong
 * @param  {number} id
 * like
 * @param  {number} id
 */
export const resource = {
  getAlbum: fetchCreator(URL.GET_ALBUM),
  getSong: fetchCreator(URL.GET_SONG),
  like: fetchCreator(URL.LIKE)
};

export const auth = {
  login: ({ email, password }) => fetch.post(URL.LOGIN, { email, password }),
  logout: () => fetch.get(URL.LOGOUT),
  register: ({ email, password, nickname }) => fetch.post(URL.REGISTER, { email, password, nickname }),
  session: ({ userId }) => fetch.get(URL.SESSION, { userId })
};
