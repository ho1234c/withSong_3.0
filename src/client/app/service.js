import resource from '../utils/resource';

export function fetchList(params) {
  return resource.get('/api/list', params);
}

export function fetchList2() {
  return resource.get('/api/list');
}
