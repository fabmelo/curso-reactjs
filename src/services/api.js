import axios from 'axios';

// http://localhost:3001/api
// http://rocketseat-node.herokuapp.com/api
const api = axios.create({baseURL: 'http://localhost:3001/api'});

export default api;

