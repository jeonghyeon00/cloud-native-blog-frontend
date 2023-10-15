import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:8080/api`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'),
  },
  withCredentials: false,
});

export default api;
