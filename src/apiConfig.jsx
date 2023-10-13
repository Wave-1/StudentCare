// apiConfig.jsx
const API_BASE_URL = 'https://localhost:7281/api/';
//const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjMiLCJSb2xlSUQiOiIxIiwiVG9rZW5JRCI6ImNlMDc3MzE0LWM1OTYtNDY2Ni05YzgyLTAxMGMyNzU1MjdjYSIsImV4cCI6MTY5NjQyMjU1MSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI4MSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyODEifQ.2EbGGp_XmJ464-VGy-qgKUpHIScfGzJ-xxLouyMKJNU'
const API_ROUTES = {
    Login: 'Auth/Login',
    WorkSchedule: 'WorkSchedule',
    Teacher: 'Teacher',
    Student: 'Student',
    Problem: 'Problem',
    Inquiries: 'Inquiries',
    Certificates: 'Certificates',
    Loginn:'Login',
    ResultsAnswered: 'ResultsAnswered',
    ResultsCertification: 'ResultsCertification',
}
export const API_HEADERS = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
};

export { API_BASE_URL, API_ROUTES };