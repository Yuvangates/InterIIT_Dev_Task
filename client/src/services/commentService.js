import axios from 'axios';
const API_URL = `${process.env.REACT_APP_API_URL}/comments/`;

// Helper to get the auth token from local storage
const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? `Bearer ${user.token}` : '';
};

const getAll = () => {
  return axios.get(API_URL);
};

const create = (commentData) => {
  return axios.post(API_URL, commentData, {
    headers: { Authorization: getToken() },
  });
};

const upvote = (id) => {
  return axios.patch(`${API_URL}${id}/upvote`, {}, {
    headers: { Authorization: getToken() },
  });
};

const commentService = {
  getAll,
  create,
  upvote,
};

export default commentService;