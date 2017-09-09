import http from '../utils/request';
export const getMenuList = () => {
  return http.get(`home/select`)
}
