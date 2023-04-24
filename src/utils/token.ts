import axiosApi from 'src/common/axios';

export function setToken(token: string | null) {
  if (token) {
    axiosApi.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete axiosApi.defaults.headers.common['Authorization'];
  }
}
