import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:3001",
});

export const login = (data) => API.get(`/users?email=${data.email}&password=${data.password}`);
export const register = (data) => API.post('/users', data);