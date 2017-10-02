import http from '../utils/request';
export const getPattern = (styleId, fabricId, diyId, diyStyleId) => {
  return http.get(`diy/select/${styleId}/${fabricId}/${diyId}/${diyStyleId}`)
}

export const getDiyStyle = (styleId, fabricId, diyId) => {
    return http.get(`diy/diyStyle/${styleId}/${fabricId}/${diyId}`)
}
export const orderPay = (fabricId, size) => {
  return http.get(`order/${fabricId}/${size}`)
}
export const orderWithDiyPay = (fabricId, size, diyStyle, patternNo = '') => {
    return http.get(`order/${fabricId}/${size}/${diyStyle}/${patternNo}`)
  }
