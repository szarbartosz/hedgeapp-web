import axios from 'axios';
import { LoginInputs } from '../types/auth';

export const login = (credentials: LoginInputs) =>
  axios
    .post(`${import.meta.env.VITE_BACKEND_DOMAIN}/login`, {
      email: credentials.email,
      password: credentials.password,
    })
    .then((res) => {
      return res.data;
    });
