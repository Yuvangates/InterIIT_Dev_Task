import axios from 'axios';
const API_URL = `${process.env.REACT_APP_API_URL}/auth/`;

const signup = (name, email, password) => {
  return axios.post(API_URL + 'signup', { name, email, password });
};

const login = (email, password) => {
  return axios.post(API_URL + 'login', { email, password });
};

const authService = {
  signup,
  login,
};

export default authService;