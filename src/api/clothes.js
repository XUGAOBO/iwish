import http from '../utils/request';

export const getClothes = (id) => {
  return http.get(`diy/basic/${id}`)
}

export const getClothesFabric = (id, type) => {
  return http.get(`diy/basic/${id}/${type}`)
}

export const getDiyTypes = () => {
  return http.get(`diy/diyTypes`)
}
