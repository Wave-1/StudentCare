// apiConfig.jsx
const API_BASE_URL = 'https://localhost:7281/api';
const API_ROUTES = {
    
}

export const API_HEADERS = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  };
  
  export { API_BASE_URL, API_ROUTES };