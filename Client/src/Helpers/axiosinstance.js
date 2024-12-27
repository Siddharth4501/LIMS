import axios from "axios";

const BASE_URL="http://localhost:5001/api/v1";

const axiosInstance=axios.create();

axiosInstance.defaults.baseURL=BASE_URL;// to make BASE_URL as base url

axiosInstance.defaults.withCredentials=true;//to send or receive data

//axiosInstance.defaults.timeout=5000;


export default axiosInstance;