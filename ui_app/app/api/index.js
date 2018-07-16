import axios from 'axios';

axios.interceptors.response.use(response => response, error => {
    console.log(error);
    const requestConfig = error.config;
    if (error.response.status === 401 && !requestConfig._loading) {
        requestConfig._loading = true;
        return axios.post('http://localhost:8080/token/refresh', {
            data:{
                refresh_token: localStorage.getItem('refresh_token')
            }
        })
        .then(response => {
            localStorage.setItem('access_token', response.data.access_token)
        })
        .then(() => axios(requestConfig))
        .catch(() => localStorage.clear());
    }
    return Promise.reject();
})

export const login = (login, password) => {
    return axios.post('http://localhost:8080/login', {
        login,
        password,
    }).then(response => saveTokenData(response.data));
}

const saveTokenData = (data) => {
    if(data){

        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
    }
}

export const makeRequest = (url, config) => {
    return axios({
        data: config.data,
        params: config.params,
        method: config.method,
        url,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
    })
}

