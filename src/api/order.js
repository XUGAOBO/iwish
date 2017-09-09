import http from '../utils/request';
export const getDiyInfo = (clothesId, fabricId, diyId) => {
  return http.get(`diy/select/${clothesId}/${fabricId}/${diyId}`)
}
export const orderPay = (fabricId, size) => {
  return http.get(`order/${fabricId}/${size}`)
}
export const orderWithDiyPay = (fabricId, size, patternNo = '') => {
    return http.get(`order/${fabricId}/${size}/${patternNo}`)
  }
