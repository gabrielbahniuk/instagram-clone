import axios from 'axios';
import config from './config';
const api = axios.create({
  baseURL: `http://${config.ipAddress}:3333`
});

export default api;
