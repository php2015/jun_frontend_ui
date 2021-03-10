import axios from 'axios';
import {Toast} from 'antd-mobile';

axios.interceptors.request.use(function (config) {
    config.headers.Authorization = localStorage.getItem("token");
    Toast.loading('加载中..', 10);
    return config;
});

axios.interceptors.response.use(function (config) {
    setTimeout(
        () => Toast.hide(),
        10
    );
    return config;
});