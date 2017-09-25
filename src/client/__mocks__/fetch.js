import fs from 'fs';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const readfile = promisify(fs.readFile);

const data = {};

(async () => {
  const files = await readdir(__dirname + '/dummy');

  for(let file of files) {
    const json = await readfile(__dirname + '/dummy/' + file, 'utf-8');
    data[file.substr(0, file.indexOf('.'))] = JSON.parse(json);
  }
})();

function createResolve(resource) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => resolve(resource));    
  })
}

module.exports = {
  fetchList: () => createResolve(data.list),
  fetchSong: () => createResolve(data.song),
  auth: {
    login: () => createResolve(data.user),
    logout: () => createResolve(),
    register: () => createResolve(data.user),
  }
}
