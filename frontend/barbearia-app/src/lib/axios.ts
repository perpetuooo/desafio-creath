import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8081',
  withCredentials: true
});

// export const setAxiosHeadersToken = (token:string) => {
//   if (token) {
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common['Authorization'];
//   }
// };