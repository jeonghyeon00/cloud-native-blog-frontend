import axios from 'axios';

const api = axios.create({
  baseURL: `/api`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'),
  },
  withCredentials: false,
});

export default api;
