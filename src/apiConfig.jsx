// apiConfig.jsx
const API_BASE_URL = 'https://localhost:7281/api/';
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjEiLCJSb2xlSUQiOiIxIiwiVG9rZW5JRCI6IjRjZjQwM2QxLWJkODctNDY0MS1iZjU4LWMyMjI3NTA4MjQ0YSIsImV4cCI6MTY5NTEwMTU3NywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI4MSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyODEifQ.UclNsxW2FjlVnSEWmbMk2nSBAR2PBikl4ZB_lB83910'
const API_ROUTES = {
    Login: 'Auth/Login',
    WorkSchedule: 'WorkSchedule',
    Teacher: 'Teacher',
    Student: 'Student',
    Problem: 'Problem',
}
export const API_HEADERS = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
};

export { API_BASE_URL, API_ROUTES };