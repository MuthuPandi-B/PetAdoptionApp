
import axios from 'axios';

const api =axios.create ({
    baseURL: 'https://petadoption-backend-fyy5.onrender.com/api',

});
api.interceptors.request.use(
     (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
         Promise.reject(error);   
    }   
);
export const getFilteredPets = async (filters) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/pets?${params}`);
    return response.data;
  };

export default api;