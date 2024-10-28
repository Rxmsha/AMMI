// Axios instance to centralize API calls (API requests to backend) and set default configurations
// Define how to interact with backend services, such as fetching data, sending data, or handling specific API endpoints.

import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // The base URL is set to match the proxy
});

export default api;
