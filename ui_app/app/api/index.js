import axios from 'axios';

axios.interceptors.response.use(response => response, error => {
  const requestConfig = error.config;
  if (!requestConfig._loading && error.response.status === 401) {
    requestConfig._loading = true;
    return restoreSession().then(() => {
      return axios({
        ...requestConfig,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
    }).catch(() => {
      localStorage.clear();
      window.location.href = '/';
    });
  }
  return Promise.reject(error);
});

const restoreSession = () => {
  const refresh_token = localStorage.getItem('refresh_token');
  if (!refresh_token) {
    return Promise.reject();
  }
  return axios.post('http://localhost:8080/token/refresh', { refresh_token })
    .then(response => {
      if (!response.error && response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
      }
    });
};

export const login = (login, password) => {
  return axios.post('http://localhost:8080/login', {
    login,
    password,
  }).then(response => saveTokenData(response.data));
};

const saveTokenData = (data) => {
  if (data) {

    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
  }
};

export const makeRequest = (url, config) => {
  return axios({
    data: config.data,
    params: config.params,
    method: config.method,
    url,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
  });
};

