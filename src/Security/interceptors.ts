import axios from "axios";

axios.interceptors.request.use(function (config) {

    let token = window.localStorage.getItem("token");
    if(token == null)
        token = window.sessionStorage.getItem("token");

    if(token != null){
        config.headers!.Authorization = "bearer "+token;
    }

    return config;

}, function (error) {

    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {

    return response;
}, function (error) {

    if(error.response?.data == null){
        return Promise.reject("Something went wrong");
    }
    return Promise.reject(error);
});