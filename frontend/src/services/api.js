import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const signup = (formData) => API.post('/auth/register', formData);
export const getMe = () => API.get('/auth/me');

export const getEmployees = () => API.get('/employees');
export const createEmployee = (data) => API.post('/employees', data);
export const updateEmployee = (id, data) => API.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);

export const getTasks = () => API.get('/tasks');
export const getMyTasks = () => API.get('/tasks/my');
export const createTask = (data) => API.post('/tasks', data);
export const updateTaskStatus = (id, status) => API.put(`/tasks/${id}/status`, { status });
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export const getLeaves = () => API.get('/leaves');
export const getMyLeaves = () => API.get('/leaves/my');
export const applyLeave = (data) => API.post('/leaves', data);
export const updateLeaveStatus = (id, status) => API.put(`/leaves/${id}/status`, { status });

export const getAttendance = () => API.get('/attendance');
export const getMyAttendance = () => API.get('/attendance/my');
export const markLogin = () => API.post('/attendance/login');
export const markLogout = () => API.post('/attendance/logout');

export default API;
