import resource from'../Utils/resource';

export function fetchList(params) {
  return resource.get('/api/list', params);
}
