import http from '../utils/request';
export const fileUpload = (formData) => {
  return http.post('img/upload', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
  })
}
