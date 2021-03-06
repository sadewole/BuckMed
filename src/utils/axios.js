import axios from 'axios';

const axiosInstance = axios.create({
  // withCredentials: true,
  //   baseURL: 'https://hospital-manage-project.herokuapp.com/api/',
  //   headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    );
  }
);

export default axiosInstance;
