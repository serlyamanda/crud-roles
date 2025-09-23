import axios from 'axios';
import {baseUrl} from '../config/constat';

// bikin instance axios
const API = axios.create({
  baseURL: baseUrl,
});

// otomatis attach Authorization header
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
