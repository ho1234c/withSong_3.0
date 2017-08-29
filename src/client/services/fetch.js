import resource from '../utils/resource';

export function fetchList(params) {
  return resource.get('/api/list', params);
}
