import axios from 'axios';
import { AuthInputs } from '../types/auth';
import Cookies from 'js-cookie';

export const signIn = (credentials: AuthInputs) =>
  axios
    .post(
      `${import.meta.env.VITE_BACKEND_DOMAIN}/login`,
      {
        email: credentials.email,
        password: credentials.password,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      Cookies.set('hedgeAppCookie', 'success');
      return res.data;
    });

export const signUp = (credentials: AuthInputs) =>
  axios
    .post(`${import.meta.env.VITE_BACKEND_DOMAIN}/register`, {
      email: credentials.email,
      password: credentials.password,
    })
    .then((res) => {
      return res.data;
    });
